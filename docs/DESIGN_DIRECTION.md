# Design Direction

Portfolio of Thallapalli Indrasena Reddy, AI / ML Engineer.

## Visual concept

**A night-time AI workspace, lit in teal.** The hero is an illustrated avatar render (art direction
supplied by Indrasena) brought to life with real depth: a WebGL depth-parallax layer moves the avatar,
desk and room at different rates as the pointer moves. Around it sit a breathing teal rim light, an
orbit with a travelling comet, a pulsing orb, a blinking robot companion and floating motes.

Everything below the hero uses the same language: deep navy (`#070b13`), teal / cyan accents,
letter-spaced uppercase labels, bold display headings with a teal gradient accent word, and short
cyan accent bars. Copy is deliberately short. Detail lives on the case-study pages.

## Information architecture

| # | Section | Content |
|---|---|---|
| — | Hero | Hello! I'm · name · AI / ML Engineer · View Work / Download Resume · socials · "AI Systems Engineer" |
| 01 | About | One-line statement, chat-style intro card (typing → message), four focus areas |
| 02 | Work | 3 flagship systems with live execution traces + 3 compact system cards |
| 03 | Experience | Onusworks, VCodez (one line + work tracks), education + certifications |
| 04 | AI Lab | 7 compact experiment cards with status and repo links |
| 05 | Skills | Interactive ecosystem: select a tool to see where it shipped |
| 06 | Contact | Avatar ring, "Let's build something intelligent.", email / resume / socials |

Case studies (`/projects/[slug]`): Problem → Constraints → Architecture → Contribution → Decisions → Stack → Outcome.

## Motion

- Hero: line-mask name reveal, staggered fade-ups, growing accent bars, depth parallax, CSS ambient loops.
- Sections: one reveal per module (≤ 28px, 0.8s, `cubic-bezier(.16,1,.3,1)`), not per paragraph.
- Micro-interactions: magnetic CTAs, card spotlight, 3D tilt on the intro card, trace node inspector, cursor dot + ring (fine pointers only).
- `prefers-reduced-motion`: static image, no loops, everything visible.

## Hero 3D / performance

- No three.js: the depth effect is ~3 KB of raw WebGL (one quad, two textures).
- The `<img>` paints first (LCP, ~29–62 KB WebP). The canvas renders identical pixels at rest and fades in.
- Depth map: 2 KB grayscale WebP from `scripts/make-depth-map.py` (GrabCut segmentation + gradients).
- Render loop runs only while the hero is visible and the tab is active. Low-end / Save-Data devices keep the static image.
- Overlays are positioned in the render's own coordinate space (container-query units), so they stay
  aligned at every viewport size.

## Asset pipeline

The optimised artwork in `public/images` (hero render, depth map, footer scene) is final; the original
reference PNGs were removed from the repo after the text baked into them was inpainted out.

```
python scripts/make-depth-map.py   # rebuilds the hero depth map from public/images/hero-avatar-1672.webp
python scripts/optimize-assets.py <dir-with-favicon.png>   # favicons + OpenGraph card
```
