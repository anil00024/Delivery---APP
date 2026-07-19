"""
Generates studio-style "product photography" placeholder raster images for every
sneaker in the catalog. These are procedurally rendered (gradient studio backdrop +
soft shadow + shaded sneaker silhouette) rather than hotlinked/scraped photos, so the
app never depends on external image URLs (which break, get rate-limited, or carry
uncertain licensing for real branded product photography).

Drop real photography into public/product-images/<id>.jpg with the same filenames to
replace these instantly -- the app already points <img> tags at these paths.
"""
import math
import os
from PIL import Image, ImageDraw, ImageFilter, ImageOps

OUT_DIR = "/home/claude/stryde-app/public/product-images"
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 900, 900

PALETTE = {
    "teal": (13, 148, 136), "orange": (255, 107, 26), "amber": (217, 119, 6),
    "rose": (225, 29, 72), "emerald": (5, 150, 105), "sky": (2, 132, 199),
    "violet": (124, 58, 237), "indigo": (79, 70, 229), "slate": (100, 116, 139),
}
BODY_COLOR = {
    "stone": (214, 211, 205), "lime": (190, 210, 130), "white": (238, 236, 230),
    "slate": (176, 183, 195), "cream": (245, 238, 220),
}

PRODUCTS = [
    ("p1", "teal", "white", "court"),
    ("p2", "orange", "slate", "runner"),
    ("p3", "amber", "stone", "trail"),
    ("p4", "rose", "white", "court"),
    ("p5", "emerald", "stone", "trail"),
    ("p6", "sky", "white", "runner"),
    ("p7", "violet", "cream", "court"),
    ("p8", "sky", "lime", "runner"),
    ("p9", "rose", "stone", "runner"),
    ("p10", "amber", "stone", "trail"),
    ("p11", "teal", "white", "runner"),
    ("p12", "orange", "stone", "court"),
]


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def studio_background(sole_rgb):
    img = Image.new("RGB", (W, H), (251, 248, 242))
    px = img.load()
    top = (250, 246, 238)
    bottom = lerp((235, 230, 219), sole_rgb, 0.06)
    for y in range(H):
        t = y / H
        row = lerp(top, bottom, t)
        for x in range(0, W, 1):
            px[x, y] = row
    # subtle vignette
    vign = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vign)
    vd.ellipse([-200, -200, W + 200, H + 260], fill=40)
    vign = vign.filter(ImageFilter.GaussianBlur(180))
    dark = Image.new("RGB", (W, H), (20, 20, 25))
    img = Image.composite(img, Image.blend(img, dark, 0.12), ImageOps.invert(vign))
    return img


def draw_shadow(img, cx, cy, w, h):
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2], fill=(20, 16, 12, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    img.paste(shadow, (0, 0), shadow)


def draw_sneaker(img, body_rgb, sole_rgb, variant):
    draw = ImageDraw.Draw(img, "RGBA")
    ox, oy, scale = 150, 260, 5.4

    def pt(x, y):
        return (ox + x * scale, oy + y * scale)

    body_pts = [pt(*p) for p in [
        (8, 52), (10, 44), (18, 36), (30, 33), (46, 31), (54, 24), (66, 20),
        (78, 22), (96, 26), (106, 30), (111, 38), (112, 46), (112, 58),
        (108, 63), (14, 63), (8, 58),
    ]]
    body_shade = lerp(body_rgb, (0, 0, 0), 0.12)
    draw.polygon(body_pts, fill=body_rgb)
    draw.polygon([pt(46, 31), pt(54, 24), pt(66, 20), pt(78, 22), pt(96, 26), pt(104, 30), pt(60, 40)], fill=body_shade + (90,))
    highlight = lerp(body_rgb, (255, 255, 255), 0.55)
    draw.line([pt(20, 40), pt(48, 34)], fill=highlight, width=5)

    sole_pts = [pt(*p) for p in [(8, 58), (112, 58), (112, 66), (108, 70), (12, 70), (8, 66)]]
    draw.polygon(sole_pts, fill=sole_rgb)
    sole_dark = lerp(sole_rgb, (0, 0, 0), 0.25)
    draw.polygon([pt(8, 66), pt(112, 66), pt(112, 70), pt(108, 71), pt(12, 71), pt(8, 70)], fill=sole_dark)

    lace_color = lerp(body_rgb, (30, 30, 30), 0.55)
    for i in range(4):
        x0, y0 = 50 + i * 8, 30 + i * 1.5
        x1, y1 = 58 + i * 8, 40 + i * 1.5
        draw.line([pt(x0, y0), pt(x1, y1)], fill=lace_color, width=3)

    if variant == "trail":
        for i in range(5):
            x = 16 + i * 10
            draw.rectangle([pt(x, 61)[0], pt(x, 61)[1], pt(x, 61)[0] + 14, pt(x, 66)[1]], fill=sole_dark)
    if variant == "runner":
        stripe = lerp(sole_rgb, (255, 255, 255), 0.3)
        draw.polygon([pt(50, 30), pt(88, 24), pt(93, 29.5), pt(54, 36)], fill=stripe + (200,))

    draw_shadow(img, ox + 60 * scale, oy + 78 * scale, 46 * scale, 10 * scale)


def crop_angle_shot(img):
    """Simulate a second product angle: mirrored + slightly tighter crop + rotation."""
    mirrored = ImageOps.mirror(img)
    rotated = mirrored.rotate(-3, resample=Image.BICUBIC, expand=False, fillcolor=(250, 246, 238))
    w, h = rotated.size
    m = int(w * 0.10)
    cropped = rotated.crop((m, int(h * 0.06), w - m, h - int(h * 0.04)))
    return cropped.resize((W, H))


def crop_sole_shot(img, sole_rgb):
    """Simulate a close-up detail shot centred on the sole/outsole band."""
    w, h = img.size
    box = (int(w * 0.08), int(h * 0.55), int(w * 0.92), int(h * 0.88))
    cropped = img.crop(box).resize((W, H))
    cropped = ImageOps.autocontrast(cropped, cutoff=1)
    tint = Image.new("RGB", (W, H), sole_rgb)
    return Image.blend(cropped, tint, 0.06)


def make_image(pid, sole, body, variant):
    sole_rgb = PALETTE[sole]
    body_rgb = BODY_COLOR[body]
    hero = studio_background(sole_rgb)
    draw_shadow(hero, W / 2 + 25, 700, 480, 90)
    draw_sneaker(hero, body_rgb, sole_rgb, variant)
    hero = hero.filter(ImageFilter.SMOOTH_MORE)

    angle = crop_angle_shot(hero)
    sole_shot = crop_sole_shot(hero, sole_rgb)

    hero.convert("RGB").save(os.path.join(OUT_DIR, f"{pid}-1.jpg"), quality=88)
    angle.convert("RGB").save(os.path.join(OUT_DIR, f"{pid}-2.jpg"), quality=88)
    sole_shot.convert("RGB").save(os.path.join(OUT_DIR, f"{pid}-3.jpg"), quality=88)
    # Keep a legacy single-file copy too (used as the card thumbnail / og-image).
    hero.convert("RGB").save(os.path.join(OUT_DIR, f"{pid}.jpg"), quality=88)
    print("wrote", pid, "x3")


for pid, sole, body, variant in PRODUCTS:
    make_image(pid, sole, body, variant)
