"""Build a 2D gaze map from gaze.mp4: each frame → (lookX, lookY, t).

lookX/lookY are in viewer space: -1 = left/up, +1 = right/down.
Calibrated so mouse-left matches look-left (iris cx is inverted vs viewer).
"""
import imageio.v3 as iio
import numpy as np
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
src = root / "public" / "interact" / "gaze.mp4"
out = root / "public" / "interact" / "gaze-map.json"

frames = list(iio.imiter(src))
n = len(frames)
fps = 24.0  # approximate; seek uses frame/n * duration at runtime


def iris_xy(f):
    results = []
    for x0, x1 in [(505, 595), (685, 775)]:
        eye = f[235:285, x0:x1].astype(np.float32)
        lum = 0.2126 * eye[:, :, 0] + 0.7152 * eye[:, :, 1] + 0.0722 * eye[:, :, 2]
        mask = lum < np.percentile(lum, 20)
        ys, xs = np.where(mask)
        if len(xs) < 5:
            continue
        results.append(
            (float(xs.mean() / eye.shape[1]), float(ys.mean() / eye.shape[0]))
        )
    if len(results) < 2:
        return None
    return (
        (results[0][0] + results[1][0]) / 2,
        (results[0][1] + results[1][1]) / 2,
    )


raw = []
for i, f in enumerate(frames):
    xy = iris_xy(f)
    if xy is None:
        continue
    raw.append({"i": i, "cx": xy[0], "cy": xy[1]})

cxs = np.array([r["cx"] for r in raw])
cys = np.array([r["cy"] for r in raw])
cx0, cy0 = float(cxs.mean()), float(cys.mean())
cx_span = max(float(cxs.max() - cxs.min()), 1e-6)
cy_span = max(float(cys.max() - cys.min()), 1e-6)

# This clip's iris-cx is mirrored vs viewer look: low cx ≈ look right.
# lookX/Y viewer space: -1 = left/up, +1 = right/down.
samples = []
for r in raw:
    look_x = -((r["cx"] - cx0) / (cx_span * 0.5))  # + = look right (viewer)
    look_y = (r["cy"] - cy0) / (cy_span * 0.5)  # + = look down
    # clamp soft
    look_x = float(np.clip(look_x, -1.35, 1.35))
    look_y = float(np.clip(look_y, -1.35, 1.35))
    samples.append(
        {
            "frame": r["i"],
            "tNorm": r["i"] / max(n - 1, 1),
            "lookX": look_x,
            "lookY": look_y,
        }
    )

# Deduplicate near-identical looks (keep denser coverage of extremes)
print(f"frames mapped: {len(samples)} / {n}")
print(
    "left",
    min(samples, key=lambda s: s["lookX"])["frame"],
    "right",
    max(samples, key=lambda s: s["lookX"])["frame"],
)
print(
    "up",
    min(samples, key=lambda s: s["lookY"])["frame"],
    "down",
    max(samples, key=lambda s: s["lookY"])["frame"],
)
print("center", min(samples, key=lambda s: s["lookX"] ** 2 + s["lookY"] ** 2)["frame"])

out.write_text(
    json.dumps(
        {
            "source": "gaze.mp4",
            "totalFrames": n,
            "center": {"cx": cx0, "cy": cy0},
            "samples": samples,
            "note": "lookX/Y viewer space: -1 left/up, +1 right/down. X inverted vs iris cx.",
        },
        indent=2,
    ),
    encoding="utf-8",
)
print("wrote", out)
