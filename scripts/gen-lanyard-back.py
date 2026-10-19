from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1024, 1440
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "interact" / "lanyard" / "card-back.png"
QR = ROOT / "public" / "interact" / "lanyard" / "linkedin-qr.png"

BG = (24, 8, 36)
PINK = (250, 78, 171)
MUTED = (170, 145, 185)
WHITE = (255, 255, 255)

BOLD = [
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
]
REGULAR = [
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\segoeui.ttf",
]


def load_font(candidates, size):
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def main():
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    font_name = load_font(BOLD, 56)
    font_nick = load_font(BOLD, 48)
    font_title = load_font(BOLD, 40)
    font_body = load_font(REGULAR, 32)
    font_hint = load_font(REGULAR, 28)

    # Clear the punch-hole zone at the top.
    draw.text((72, 160), "CUI CONGWEN", fill=WHITE, font=font_name)
    draw.text((72, 230), "EVELYN", fill=PINK, font=font_nick)
    draw.rectangle([72, 300, W - 72, 308], fill=PINK)

    draw.text((72, 420), "Scan to connect on LinkedIn", fill=MUTED, font=font_title)

    qr = Image.open(QR).convert("RGBA")
    # Sample QR bg and blend onto card so edges disappear.
    qr_bg = qr.getpixel((8, 8))[:3]
    size = 620
    qr = qr.resize((size, size), Image.Resampling.LANCZOS)

    # Soft rounded panel behind QR using QR's own purple.
    panel = Image.new("RGBA", (size + 36, size + 36), (0, 0, 0, 0))
    pd = ImageDraw.Draw(panel)
    pd.rounded_rectangle(
        [0, 0, panel.size[0] - 1, panel.size[1] - 1],
        radius=28,
        fill=(*qr_bg, 255),
    )
    qx = (W - panel.size[0]) // 2
    qy = 490
    img.paste(panel, (qx, qy), panel)
    img.paste(qr, (qx + 18, qy + 18), qr)

    url = "linkedin.com/in/congwen-cui"
    uw = draw.textbbox((0, 0), url, font=font_body)[2]
    draw.text(((W - uw) / 2, qy + panel.size[1] + 28), url, fill=PINK, font=font_body)

    hint = "Drag · flip · throw the card"
    hw = draw.textbbox((0, 0), hint, font=font_hint)[2]
    draw.text(((W - hw) / 2, H - 90), hint, fill=MUTED, font=font_hint)

    img.save(OUT, "PNG", optimize=True)
    print(f"saved {OUT} {img.size}")


if __name__ == "__main__":
    main()
