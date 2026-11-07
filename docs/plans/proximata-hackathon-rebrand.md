# Rebrand plan: confer clone → Proximata "Building Better Worlds" hackathon

Source of truth: `brand-book/Proximata Brand book.pdf` and the Luma event (public URL https://luma.com/rrnm4pul).
The pixel clone is tagged `confer-clone-baseline` for reference.

## Event facts (Luma)
- **Building Better Worlds Hackathon**, Proximata's flagship hackathon, jointly with START Vienna, powered by HOIV.
- **Fri 13 Nov 2026, 14:00 → Sat 14 Nov 2026, 18:00 (CET)** — 24h build.
- **HOIV – Home of InnoVation**, Arsenalstraße 11, 1100 Wien.
- Tracks: Systems for built space · Robotics & embodied AI · AI systems & agentic infrastructure · Fintech & crypto.
- Partners so far: START Vienna, Hackathonhub, Rhomberg, Kicks Vienna, HOIV (poster also shows techbold, EWOR and others).
- Registration on Luma, host approval required. 135 going at time of writing.

## Brand rules that drive the work
- **Colours:** ink `#23201E` (body text / dark bg), paper `#F4F7F8` (main light bg), blue `#202D85` (main accent), ice `#C8F1FF` (secondary accent), white, green `#9DE146` (small highlights only), red `#D82434` (signals/icons only).
- **Approved pairings:** ink bg → white primary + green secondary · blue bg → white + ice · ice bg → blue + black.
- **Type:** Archivo Black for headlines only; JetBrains Mono Regular/Medium for everything else. No loosened letter-spacing, no text strokes, no gradients or outlines on the logo.
- **Logo:** wordmark ≥ 120×32 px, mark ≥ 40 px; clear space = height of the "o" (wordmark) / one blade (mark); never over busy backgrounds; never rotated, recoloured outside the palette, or split.
- **Visual language:** HUD / technical micro-elements (`[+]`, crosshairs, dotted rings, status micro-copy). At most two per composition, small, in corners or as a subtle background layer.

## Phases
1. **Brand foundation** — new branch `feat/proximata-hackathon`; move `sites/confer` → `sites/proximata`; swap tokens, fonts (next/font: Archivo Black + JetBrains Mono), remove tracking and text strokes, recolour buttons/pills/tags per the pairings, logo in nav/footer, favicon, metadata + OG image.
2. **Background & hero** — remove pillars and flowers; recolour the glow to brand blue/ice; keep the grain; add the new background concept; hero title becomes "Building Better Worlds" with event cards (date, Vienna, HOIV) and a live countdown.
3. **Content mapping** — every section re-pointed at hackathon content (table below), keeping layouts and interactions.
4. **Your assets** — drop in hosts/mentors, last-event photos and video, partner logos, agenda as they arrive (all data-driven from one content file).
5. **QA & launch** — desktop/tablet/phone pass, accessibility and performance check, OG preview, deploy (Vercel) and domain; content freeze the day before the event.

## Section mapping
| Template section | Becomes | Content | Status |
|---|---|---|---|
| Nav | Proximata logo; About / Tracks / Agenda / FAQ anchors; "Register" → Luma | Luma | ready |
| Hero | "Building Better Worlds" title, "Hackathon · Vienna", cards Date / City / Venue, countdown | Luma | ready |
| About | Event pitch paragraph with the scroll word reveal; side images → last-event photos or HUD marks | Luma + photos | partly |
| Ticker band | "Who should join": builders, students, designers & PMs, founders, robotics, AI builders | Luma | ready |
| Video | Last event aftermovie | needed | blocked |
| Learn (sticky cards) | The 4 tracks (sticky stack grows from 3 to 4 columns) | Luma; track visuals needed | partly |
| Speakers + metrics | Mentors / jury / hosts carousel; metrics: 24h · 4 tracks · 135+ builders · prize pool | needed | blocked |
| Agenda | Two-day timeline (Fri check-in → Sat awards) | needed | blocked |
| Sponsors ticker | Partner logos | SVGs needed | blocked |
| Gallery | Last-event photos; HUD bracket frames replace the ornate frames | needed | blocked |
| FAQ | Hackathon FAQ (cost, team size, what to bring, approval, IP/MIT licence, food, sleeping) | drafted, needs confirmation | draft |
| Journal | Parked as-is (later: challenge briefs) | — | parked |
| Pricing | Decision pending (prizes / perks / hide) | — | open |
| Footer | Flat Proximata wordmark, tagline "A new generation of innovation.", HOIV address, socials, Luma CTA | brand book | ready |
| Template badge | Floating "Register on Luma" pill, or removed | Luma | open |

## Decisions (2026-11-07)
- **Colour mode:** dark ink `#23201E` base with the glow recoloured to brand blue/ice; white headlines, green only for small labels, ice blue as secondary text.
- **Background:** slowly rotating wireframe globe (the brand's sphere icon) behind the hero with a Vienna marker, HUD corner labels (HOIV coordinates, live countdown, status micro-copy), and thin ruler/scale marks sliding out at the edges where the pillars were. Flowers removed.
- **Hero title:** keep the liquid-glass shader, applied to "BUILDING BETTER WORLDS" in Archivo Black, tinted ice blue/blue. The Proximata logo stays flat everywhere.
- **Pricing section:** becomes Prizes (1st / 2nd / 3rd, middle card highlighted).
- **Register link:** public Luma URL without the personal `tk` invite token.
- **START Vienna:** "in cooperation with START Vienna" lockups in the hero and footer, START first among partners, and in the page title / link preview. The nav stays Proximata-only.
- **Missing content:** on-brand "Announced soon" / "TBA" placeholders for mentors, agenda and prizes; gallery and aftermovie hidden until media exist; Journal kept in code but not rendered. No fictional people or facts from the confer template on the live site.
- **Implementation plan:** phased task list approved on 2026-11-07 (branch `feat/proximata-hackathon`).

## Still needed from the organisers
- Logo files as SVG: Proximata wordmark and mark (the brand book only embeds raster versions; tracing them is the fallback).
- Partner logos (SVG preferred): START Vienna, HOIV, Hackathonhub, Rhomberg, Kicks Vienna, plus the others on the poster.
- Prize pool: amounts or prizes for 1st/2nd/3rd.
- Agenda: the Fri/Sat timeline.
- Hosts, mentors, jury: names, roles, photos, links.
- Last-event photos and aftermovie (gallery, about images, video band).
- FAQ facts: cost, team size, what to bring, sleeping, eligibility.
- Deployment target and domain.
