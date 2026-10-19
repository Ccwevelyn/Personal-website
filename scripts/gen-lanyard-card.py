from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1024, 1440
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "interact" / "lanyard" / "card-front.png"
PORTRAIT = ROOT / "public" / "interact" / "lanyard" / "portrait.png"

BG = (244, 236, 245)
HEADER = (28, 10, 40)
PINK = (250, 78, 171)
LABEL = (88, 58, 110)
VALUE = (36, 18, 52)
FOOTER = (170, 145, 185)
CONTACT_TITLE = (120, 70, 150)

BOLD = [
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\calibrib.ttf",
]
REGULAR = [
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\calibri.ttf",
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

    # Leave clear space under the lanyard punch hole (~top 10% of card).
    header_h = 330
    draw.rectangle([0, 0, W, header_h], fill=HEADER)
    draw.rectangle([0, header_h - 18, W, header_h], fill=PINK)

    font_name = load_font(BOLD, 78)
    font_sub = load_font(REGULAR, 34)
    font_section = load_font(BOLD, 36)
    font_label = load_font(REGULAR, 28)
    font_value = load_font(BOLD, 40)
    font_footer = load_font(REGULAR, 24)

    name = "EVELYN CUI"
    nw = draw.textbbox((0, 0), name, font=font_name)[2]
    draw.text(((W - nw) / 2, 155), name, fill=(255, 255, 255), font=font_name)

    sub = "Congwen · Computer Science"
    sw = draw.textbbox((0, 0), sub, font=font_sub)[2]
    draw.text(((W - sw) / 2, 245), sub, fill=(255, 190, 220), font=font_sub)

    portrait = Image.open(PORTRAIT).convert("RGBA")
    pw = 480
    ph = int(portrait.height * pw / portrait.width)
    portrait = portrait.resize((pw, ph), Image.Resampling.LANCZOS)
    side = min(pw, ph)
    left = (pw - side) // 2
    top = max(0, (ph - side) // 2 - 10)
    portrait = portrait.crop((left, top, left + side, top + side)).resize(
        (400, 400), Image.Resampling.LANCZOS
    )

    radius = 36
    mask = Image.new("L", portrait.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, portrait.size[0] - 1, portrait.size[1] - 1],
        radius=radius,
        fill=255,
    )

    px = (W - portrait.size[0]) // 2
    py = header_h + 24
    border = Image.new("RGBA", (portrait.size[0] + 8, portrait.size[1] + 8), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle(
        [0, 0, border.size[0] - 1, border.size[1] - 1],
        radius=radius + 4,
        fill=(255, 255, 255, 230),
    )
    img.paste(border, (px - 4, py - 4), border)
    img.paste(portrait, (px, py), mask)

    cx = 64
    cy = py + portrait.size[1] + 28
    draw.text((cx, cy), "CONTACT", fill=CONTACT_TITLE, font=font_section)

    rows = [
        ("Personal email", "ccwevelyncambridge@outlook.com"),
        ("School email", "P2321167@mpu.edu.mo"),
        ("Phone", "+86 185 1813 8586"),
        ("LinkedIn", "linkedin.com/in/congwen-cui"),
    ]

    y = cy + 48
    for label_t, value_t in rows:
        draw.text((cx, y), label_t, fill=LABEL, font=font_label)
        draw.text((cx, y + 34), value_t, fill=VALUE, font=font_value)
        y += 92

    draw.text((cx, H - 68), "Personal website · atelier", fill=FOOTER, font=font_footer)

    img.save(OUT, "PNG", optimize=True)
    print(f"saved {OUT} {img.size}")


if __name__ == "__main__":
    main()
