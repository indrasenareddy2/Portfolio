"""Builds a soft depth map for the hero avatar render (used by the WebGL depth-parallax shader).

Foreground is segmented with GrabCut seeded around the character; teal rim-glow pixels are forced to
background so the glow stays behind the avatar. Output: public/images/hero-avatar-depth.webp (grayscale, near = white).
"""
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
img = cv2.imread(str(ROOT / "public/images/hero-avatar-1672.webp"))
h, w = img.shape[:2]

mask = np.full((h, w), cv2.GC_PR_BGD, np.uint8)
mask[:120, :] = cv2.GC_BGD
mask[:, :330] = cv2.GC_BGD
mask[:, 1420:] = cv2.GC_BGD
cv2.ellipse(mask, (860, 420), (210, 250), 0, 0, 360, cv2.GC_PR_FGD, -1)
cv2.rectangle(mask, (420, 640), (1300, h), cv2.GC_PR_FGD, -1)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
teal = (hsv[..., 0] > 78) & (hsv[..., 0] < 105) & (hsv[..., 1] > 90) & (hsv[..., 2] > 45)
mask[teal] = cv2.GC_BGD
cv2.ellipse(mask, (880, 430), (125, 145), 0, 0, 360, cv2.GC_FGD, -1)
cv2.rectangle(mask, (650, 720), (1100, h), cv2.GC_FGD, -1)

bgd = np.zeros((1, 65), np.float64)
fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(img, mask, None, bgd, fgd, 6, cv2.GC_INIT_WITH_MASK)
fg = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
n, lab, stats, _ = cv2.connectedComponentsWithStats(fg)
fg = np.where(lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((17, 17), np.uint8))

yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
depth = 0.12 + 0.28 * np.clip((yy / h - 0.62) / 0.38, 0, 1)  # room far, desk/books nearer
avatar = fg.astype(np.float32) / 255
face = np.exp(-(((xx - 880) / 150) ** 2 + ((yy - 420) / 170) ** 2))
depth = np.maximum(depth, avatar * (0.72 + 0.16 * face))
laptop = ((xx > 1010) & (yy > 820)).astype(np.float32)  # laptop lid, bottom right
depth = np.maximum(depth, laptop * 0.95)
depth = cv2.GaussianBlur(depth, (0, 0), 9)

out = cv2.resize((depth * 255).astype(np.uint8), (w // 2, h // 2), interpolation=cv2.INTER_AREA)
cv2.imwrite(str(ROOT / "public/images/hero-avatar-depth.webp"), out, [cv2.IMWRITE_WEBP_QUALITY, 80])
print("depth written", out.shape)
