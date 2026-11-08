# confer.framer.website — page brief

Source: https://confer.framer.website/ (Framer template "Confer", event: First AI Summit 2026).
Local route: `/` (replaces the template homepage). Single page; all other links point to the source origin.

## Evidence in this folder
- `sections/<name>.txt` — desktop (1440×900) styled DOM dumps per section: `x,y WxH`, flex/gap/padding, colors, borders (`::after-border` = dashed overlay border), transforms, text styles. `m-<name>.txt` = phone (390px) dumps. y values are page-absolute.
- `content.json` — all copy (agenda, speakers, FAQ Q&A, journal, pricing, footer) and image hashes.
- `raw/svg-symbols.json`, `raw/svg-extra.json` — icon symbol paths (Instagram, LinkedIn, check, arrow, bolt) and sponsor logo SVGs.
- `screens/` (local only, gitignored) — `src-1440-sNN.png` scroll pass, `src-390-sNN.png` phone pass, `src-1024-*` tablet, `states/*` hover/open states.

## Breakpoints
Desktop ≥1200 · Tablet 810–1199 · Phone <810. Max content width 1200 (section padding 100px 120px on desktop). Phone sections mostly use 32px side padding and 100px vertical.

## Tokens
- Page bg `#000`. Accent green `rgb(69,255,134)` (#45FF86); dim green `rgba(69,255,134,.37)`.
- Text: white; muted `rgba(255,255,255,.6)`; list text `rgba(255,255,255,.7)`.
- Dashed borders are 1px dashed overlays (`::after`, inset 0): nav pills `rgba(255,255,255,.14)`, cards `rgba(255,255,255,.2)`, agenda rows/metric dividers `rgb(40,40,40)`. Pricing cards use 2px dashed.
- Button "Filled": bg `rgb(10,28,10)`, 1px dashed `rgba(255,255,255,.2)`, `box-shadow: inset 0 0 8px 4px rgba(32,179,147,.73)`, noise tile overlay at 11% opacity (`images/bg/noise.png`, background-size 158.5px), label Be Vietnam Pro 16px green. Hover: bg `rgba(0,0,0,.4)`, shadow `inset 0 0 3px 1px`.
- Button "Unfilled": transparent, 1px dashed `rgba(69,255,134,.37)`, noise overlay, green label; hover label → `rgba(69,255,134,.37)`.
- Dark panel `rgb(17,17,20)` (mobile menu, newsletter input).

## Typography (desktop → phone)
| Role | Family | Size/LH | Notes |
|---|---|---|---|
| h1/h2 section titles, metrics | Clash Grotesk 400 | 48/57.6 → 38/45.6 → 32/38.4 | white, centered, title box max-width 560, `-webkit-text-stroke: 1px white` |
| Ticker words | Clash Grotesk Variable, wght 500 | 72/86.4 → 48/57.6 | white, uppercase |
| Card titles h5 (learn, agenda) | Clash Variable wght 500 | 28/33.6 → 18/21.6 | |
| h6 (speaker name, journal title, footer blurb) | Clash Variable wght 500 | 24/28.8 → 16/19.2 | |
| Day label h4 | Clash Variable wght 500 | 32/38.4 → 20/24 | green |
| Price h4 | Clash Variable wght 500 | 40/48 ls −1.6 → 24/28.8 | ffs blwf,cv03,cv04,cv09,cv11 |
| Info label (DATE/CITY/VENUE, SCROLL/MORE) | Clash Variable wght 500 | 16/19.2 ls 1.6 uppercase | white 60% |
| Body | Be Vietnam Pro 400 | 16/22.4 | muted |
| Body large | Be Vietnam Pro 400 | 20/24 → 16/19.2 | |
| About paragraph | Be Vietnam Pro 400 | 32/38.4 ls −1.2 → 24/28.8 | scroll word reveal |
| Nav/footer links | Be Vietnam Pro 400 | 14/21 ls −0.42 | white 60% |
| Section tag | Inter Display 500 | 16/22.4 ls 0.96 | green, uppercase |

Fonts are local in `public/sites/confer/fonts/` and exposed as CSS vars (see `src/components/sites/confer/fonts.ts`).

## Page-wide layers and behavior
- Lenis smooth scroll, `duration: 1.7`.
- Fixed BG (z 0): animated grain canvas (800×600, pixelated, rgb(87,87,87), opacity .07, new frame every 16.7ms); hero glow image (base opacity .22, ×1→×0.1 as hero info cards cross 50% viewport); left/right flowers (opacity 1 → .1 while About title crosses viewport bottom → .6 while the pricing section crosses the viewport bottom).
- Fixed pillars (z 4) at left −68px / right edge, 205×900 contain; translate ±50px outward while About title crosses viewport bottom. Load-in: from ±110px, opacity 0, delay .3 dur .8 ease [.12,.23,.5,1]. Flowers load-in delay .5 dur .7.
- Fixed nav (z 8) centered; template badge fixed bottom 63 right 20 (desktop/tablet only). Framer's own "Made in Framer" badge is not reproduced.

## Sections (desktop y / height)
1. Hero 0/900 — LogoGlass WebGL canvas 850×169 (fade in delay .8 dur .5), h1 (delay .9, y 4→0), info cards row 3×300×85 gap 20 (bg .8 black, blur 5px) inside full-width dashed strip, rotating "Scroll ↓ More" badge (18°/s).
2. About 900/834 — tag, h2 (fade y10), statue head (left, rot −3°, mask fade) + helmet (right, rot 8°), paragraph 660 wide with scroll word reveal (offset start .7 / end .5, opacity .15→1, spring 400/60).
3. Ticker strip 1734/110 — green radial gradient, inset white glow, noise 14%; marquee 50px/s, gap 32, items icon 65px + word.
4. Video 1844/755 — full-width autoplay loop muted `video/crowd.mp4`, cover.
5. Learn 2599/1619 — sticky title (top 100) + 3 sticky rows (top 300), each 1200 wide with one visible 400px card in column 1/2/3 → cards stack into one row. Cards: black, dashed .2, image 400×211, title + body.
6. Speakers 4218/995 — carousel of 6 cards (319×395, gap 40, snap center, edge fade mask 12.5%, arrows 40px at x 72 / right 72, pages by viewport); hover: green dashed border + social bar slides up. Metrics row 4×310 with dashed `rgb(40,40,40)` left borders (+ right on last).
7. Agenda 5213/3220 — 3 days; Day pill sticky top 100; session rows sticky top 200, stacking. Row: time col 226 + info; speaker chips 254×84 with green radial bg + rays overlay.
8. Sponsors 8433/498 — ticker 30px/s gap 28, pauses on hover; tiles 254×88 bg .25 black, dashed .2, logos as masks filled white 82%.
9. Gallery 8930/791 — ticker 30px/s gap 48, pauses on hover; ornate frame 570×381 with photo 462×278 centered; each frame scales .9→1 + fades when entering view.
10. FAQ 9721/970 — 7 accordion items 800 wide gap 21, bg .8 black, dashed .2, 20px question; sparkle icon 30px → 42px rotated 45° when open; answers 540 wide; independent toggles.
11. Journal 10691/933 — 3 article cards 397 wide gap 24, image 220 tall; "Explore All" unfilled button.
12. Pricing 11623/1025 — eagle video (lighten blend) top-left; 3 cards 379×616 gap 32 (2px dashed .2, bg .4 black, blur 8); pro card has green silk image + noise; ticket notch divider; "What's included:" stays invisible (opacity 0) in the source; feature list with green check icons; Filled buttons full width.
13. Footer 12649/649 — gradient to .8 black, blur 10, dashed top; big LogoGlass (1392×278, seed 11, speed .34, mask fade bottom); blurb + newsletter form; link pills; rights row.

## Motion presets (Framer)
- Section title words: blur(10px), opacity 0, y 10 → clear; per-word stagger .05s; dur .6 ease [.44,0,.56,1]; trigger when 50% in view, once.
- Tag: laurels slide in from ∓10px (dur .5 ease [.12,.23,.5,1]); text scramble from center, 4 scrambled letters, 48ms/char, scrambled glyphs `rgba(69,255,134,.37)`, hidden glyphs opacity 0.
- Cards (speakers, FAQ, pricing): opacity 0, y 20 → 0, dur .5 ease [.12,.23,.5,1], stagger .1 per index.
- Gallery frames: scale .9, opacity 0 → 1, delay .1 dur .6.

## Out-of-scope links (point to source origin)
`/about`, `/speakers`, `/venue`, `/contact`, `/policies`, `/blog`, `/blog/*`; Register Now → `#ticket` (pricing section id `ticket`).
