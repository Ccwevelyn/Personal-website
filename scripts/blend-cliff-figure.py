from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "interact" / "cliff-evelyn.bak.png"
OUT = ROOT / "public" / "interact" / "cliff-evelyn.png"

if not SRC.exists():
    SRC = OUT


def main():
    im = Image.open(SRC).convert("RGBA")
    arr = np.array(im).astype(np.float32)
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]
    luma = 0.2126 * rgb[:, :, 0] + 0.7152 * rgb[:, :, 1] + 0.0722 * rgb[:, :, 2]

    # Near-black plate → transparent; keep purple rim / skin / suit.
    t0, t1 = 12.0, 36.0
    black_fade = np.clip((luma - t0) / (t1 - t0), 0.0, 1.0)
    new_alpha = alpha * black_fade
    new_alpha = np.where(alpha < 6, 0.0, new_alpha)

    out = arr.copy()
    out[:, :, 3] = new_alpha
    img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGBA")

    r, g, b, al = img.split()
    soft = al.filter(ImageFilter.GaussianBlur(radius=1.1))
    soft_arr = np.array(soft).astype(np.float32)
    # Keep solid core crisp; only feather the silhouette.
    soft_arr = np.where(new_alpha > 220, new_alpha, soft_arr)
    soft_arr = np.where(luma < t0, 0.0, soft_arr)

    # Unmultiply leftover dark fringe in RGB near edges.
    edge = (soft_arr > 8) & (soft_arr < 220) & (luma < 55)
    rgb2 = rgb.copy()
    rgb2[edge] = np.minimum(255, rgb2[edge] * 1.15 + 8)

    result = Image.merge(
        "RGBA",
        (
            Image.fromarray(np.clip(rgb2[:, :, 0], 0, 255).astype(np.uint8)),
            Image.fromarray(np.clip(rgb2[:, :, 1], 0, 255).astype(np.uint8)),
            Image.fromarray(np.clip(rgb2[:, :, 2], 0, 255).astype(np.uint8)),
            Image.fromarray(np.clip(soft_arr, 0, 255).astype(np.uint8)),
        ),
    )
    result.save(OUT, "PNG", optimize=True)
    a = np.array(result)[:, :, 3]
    print(f"saved {OUT} alpha0={(a == 0).sum()} mid={((a > 0) & (a < 255)).sum()} solid={(a == 255).sum()}")


if __name__ == "__main__":
    main()
