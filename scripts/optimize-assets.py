"""Regenerates the favicon set and the OpenGraph card from the original sources.

The originals lived in the previous static site (assets/img, commit 43e1fb5). To regenerate:
    git archive 43e1fb5 assets/img | tar -x -C /tmp/src && python scripts/optimize-assets.py /tmp/src/assets/img
"""
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"
FONTS = Path("C:/Windows/Fonts")

# Icons from the existing 1254px "IA" mark
mark = Image.open(SRC / "favicon.png").convert("RGB")
mark.resize((192, 192), Image.LANCZOS).quantize(colors=128).save(APP / "icon.png", optimize=True)
mark.resize((180, 180), Image.LANCZOS).save(APP / "apple-icon.png", optimize=True)
mark.convert("RGBA").resize((48, 48), Image.LANCZOS).save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

# OpenGraph card 1200x630 from the cleaned hero render in public/images
art = Image.open(PUBLIC / "images" / "hero-avatar-1672.webp").convert("RGB")
W, H = 1200, 630
art = art.resize((round(art.width * H / art.height), H), Image.LANCZOS)
img = Image.new("RGB", (W, H), (7, 11, 19))
img.paste(art, (W - art.width + 150, 0))
shade = Image.new("L", (W, H), 0)
ImageDraw.Draw(shade).rectangle((0, 0, W, H), fill=0)
for x in range(W):
    a = int(max(0, min(235, 235 - (x - 260) * 0.75)))
    ImageDraw.Draw(shade).line([(x, 0), (x, H)], fill=a)
img = Image.composite(Image.new("RGB", (W, H), (7, 11, 19)), img, shade)
d = ImageDraw.Draw(img)
bold = ImageFont.truetype(str(FONTS / "segoeuib.ttf"), 58)
reg = ImageFont.truetype(str(FONTS / "segoeui.ttf"), 30)
mono = ImageFont.truetype(str(FONTS / "consola.ttf"), 22)
d.text((70, 170), "Hello! I'm", font=reg, fill=(63, 224, 242))
d.text((70, 215), "THALLAPALLI", font=bold, fill=(233, 246, 255))
d.text((70, 285), "INDRASENA REDDY", font=bold, fill=(233, 246, 255))
d.text((72, 372), "A I  /  M L   E N G I N E E R", font=mono, fill=(142, 163, 196))
d.rounded_rectangle((72, 412, 132, 416), radius=2, fill=(45, 212, 191))
d.text((72, 470), "GenAI · RAG · Agentic systems · ML", font=reg, fill=(170, 182, 204))
img.save(APP / "opengraph-image.jpg", quality=86, optimize=True, progressive=True)
img.save(APP / "twitter-image.jpg", quality=86, optimize=True, progressive=True)
print("assets written")
