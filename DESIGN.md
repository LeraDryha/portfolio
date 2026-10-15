---
name: Lera Dryha Portfolio
description: A product designer's portfolio laid out like a shared design file. A bento of tiles where each case leads with one real piece of evidence and shows its product alive.
colors:
  page: "#ffffff"
  tile: "#f5f5f7"
  raised: "#ffffff"
  ink: "#1d1d1f"
  graphite: "#424245"
  pencil: "#6e6e73"
  hairline: "#e3e3e6"
  mulberry-ink: "oklch(48% 0.15 352)"
  mulberry-ink-night: "oklch(74% 0.11 352)"
  figma-blue: "#0d99ff"
  redline: "#f24822"
  who-designer: "#9747ff"
  who-developer: "#14ae5c"
  who-research: "#f24822"
  prevently-1: "#b8487a"
  prevently-2: "#a83f6d"
  prevently-3: "#8f2f5c"
  yahoo: "#6001d2"
  linkedin: "#0a66c2"
  verdict-green: "#1e7a3e"
  verdict-red: "#b42318"
  night-page: "#000000"
  night-tile: "#1c1c1e"
  night-raised: "#2c2c2e"
  night-ink: "#f5f5f7"
  night-graphite: "#c7c7cc"
  night-pencil: "#98989d"
  night-hairline: "#2c2c2e"
  verdict-green-night: "#5fcf86"
  verdict-red-night: "#f28b82"
typography:
  intro:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 46px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  tile-proof:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(26px, 2.6vw, 36px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontFeature: "'tnum' 1"
  case-title:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 40px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  case-h2:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  case-proof:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  subhead:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
  reading:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  ui:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  voice:
    fontFamily: "Newsreader, Baskerville, Georgia, serif"
    fontSize: "24px"
    fontStyle: "italic"
    fontWeight: 400
    lineHeight: 1.3
  measure:
    fontFamily: "Geist Mono, ui-monospace, Menlo, monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  tile: "28px"
  tile-tablet: "22px"
  inner: "14px"
  figure: "16px"
  block: "20px"
  pill: "999px"
  selection: "0"
spacing:
  tile-gap: "20px"
  tile-gap-phone: "14px"
  tile-pad: "30px"
  page-top: "64px"
  reading-column: "680px"
  gutter: "24px"
  gutter-phone: "16px"
components:
  tile:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
  tile-proof:
    textColor: "{colors.ink}"
    typography: "{typography.tile-proof}"
  tile-brand:
    backgroundColor: "linear-gradient(160deg, {colors.prevently-1}, {colors.prevently-2}, {colors.prevently-3})"
    textColor: "#ffffff"
    rounded: "{rounded.tile}"
  selection:
    borderColor: "{colors.figma-blue}"
    rounded: "{rounded.selection}"
  filter:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.graphite}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
  filter-current:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
  proof-block:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.mulberry-ink}"
    typography: "{typography.case-proof}"
    rounded: "{rounded.block}"
  quote:
    textColor: "{colors.mulberry-ink}"
    typography: "{typography.voice}"
---

# Design System: Lera Dryha Portfolio

## Overview

**Creative North Star: "The Shared File"**

The portfolio reads like a design file Lera is working in, with the people she works with in it. The home page is a bento of grey tiles on a white page: an intro, her contacts as plain logos, and one tile per case. Each case tile leads with one real piece of evidence ("30% → 40%", "Designed, built, shipped.") and shows its product alive underneath: screens drift, a before turns into an after, a report scrolls as if someone were reading it.

On top lies a quiet Figma layer, the thing that makes the site hers: pointing at a tile selects it the way Figma does (a square blue frame, four handles, the live size in a label), role cursors (UX designer, Researcher, Developer) sit on the tiles they would care about, the visitor's own pointer carries a "You" tag, and one open comment on the Comfy screen explains a design decision.

Opening a case moves the tile's product to the top of the case page (a browser page transition), and the story continues in one reading column. Evidence is marked in Mulberry Ink; everything else is ink and grey.

The previous direction ("The Proof Sheet": paper, white tiles, italic side index, Double Diamond navigation) is archived in `docs/concept/v1/`.

**Key Characteristics:**
- White page, grey tiles with large soft corners, equal gaps; text in tiles aligned to the left edge.
- Every case tile: evidence first (ink), then the product name in bold and a short line, then the product, alive.
- One brand tile: Prevently, Lera's own product, in its pink gradient.
- Figma layer: square blue selection on hover and focus, role cursors, a "You" tag, one comment.
- A top bar with the mark, a filter (All / About / Work / Writing) and a theme switch (Auto / Light / Dark).
- Light and dark themes; motion only where it shows the product, and none with reduced motion.

## Colors

### Neutral
- **Page** (white; black at night) and **Tile** (light grey; near-black grey at night): the page is the canvas, tiles are the objects. Tiles carry no border or shadow.
- **Raised** (white; dark grey at night): the selected filter, action buttons, comments.
- **Ink**: headlines, evidence on tiles, product names, case titles.
- **Graphite**: running text and the short line on tiles.
- **Pencil**: small print, captions, labels, notes.
- **Hairline**: table rules and the line above the case end.

### Accent
- **Mulberry Ink** (lighter at night): the italic "a product designer." in the intro, the mark, and evidence on case pages: the proof block, stat numbers, user quotes, improved values in result tables. Tile headlines stay ink, never accent.

### The Figma layer
- **Figma Blue**: selection frame, handles, size label, keyboard focus ring, the "You" tag. It belongs to the Figma layer only.
- **Redline**: the measurement in the GRG spec animation.
- **People in the file**: Lera in Mulberry Ink, UX designer violet, Developer green, Researcher red-orange: Figma's own multiplayer palette.

### Brand and verdict
- **Prevently pink** (three stops, 160° gradient): only the Prevently tile and its case hero.
- **Yahoo violet** and **LinkedIn blue**: only the two contact logos.
- **Verdict Green / Red**: only the titles of paired "what works / what doesn't" lists on case pages.

### Named Rules
**The Ink Headline Rule.** Tile headlines are evidence, set in ink. The accent belongs to case pages and the intro's italic phrase.

**The Figma Only Rule.** Figma Blue appears only as the Figma layer (selection, focus, "You"). It is never a link colour or a button fill.

**The Re-tune Rule.** Every colour has a night value; nothing reuses the light value on a night tile.

## Typography

**Fonts:** Geist (400–800) for everything set upright, Newsreader italic for the voice (the intro's second line, quotes), Geist Mono for Figma measurements.

### Hierarchy
- **Intro** (600, clamp 32–46px, line-height 1, −0.03em): "Hi, I’m Lera," with "a product designer." in Newsreader italic, Mulberry Ink, always on its own line.
- **Tile Proof** (600, clamp 26–36px, 1.05, −0.025em, tabular numerals): the evidence that heads each case tile; 30px on side tiles, 21px on narrow tiles; quotes switch to Newsreader italic.
- **Tile Line** (15px): the bold product name and its short line under the proof.
- **Case Title** (600, clamp 30–40px) and **Case H2** (600, 24px), **Subhead** (600, 18px).
- **Reading** (17px, line-height 1.65; 16px on phones): case text in a 680px column.
- **Case Proof** (600, 40px, Mulberry Ink) and **Stat** (600, 28px, Mulberry Ink).
- **Voice** (Newsreader italic, 24px; 21px inside insights, Mulberry Ink): user quotes.
- **Control** (500, 14px): filter, theme, More work.
- **Caption** (14px, Pencil), **Measure** (Geist Mono 500, 10px): the size label on a selection.

## Layout

- **Top bar** (sticky, frosted page colour): the mark on the left (back to the top), the filter in the centre, the theme switch on the right. On phones the filter drops to a second row.
- **Bento**: 4 columns, 250px rows, 20px gaps, max 1100px, 64px under the top bar. Order: intro (2 wide), email, LinkedIn; Prevently (2 wide, 3 tall) with Comfy (2 × 2) and GRG (2 wide, text left, spec right) beside it; Adtelligent (2 × 2), Smart Financial Assistant (1 × 2), and Medium over Learning (1 × 1 each). At 860px and below: 2 columns, 200px rows, 14px gaps, 22px corners; at 640px: 168px rows, 16px gutters.
- **More work**: a pill under the bento opens four small cards in a row (2 on tablets, 1 on phones).
- **Case page**: no top bar. A round close button top right (Esc does the same) returns to the tile; the hero (the tile's product, 280–480px tall) sits on top; one reading column below; a back-to-top button appears after scrolling. The page ends with "All work" on the left and "Next case: <title> →" on the right.
- **Figures in a row** share one 4:3 image area so captions line up; any card with an image, a title and a line follows this rule.

## Elevation & Depth

Flat. Tiles have no border or shadow in either theme. Only floating controls lift: the round case buttons and the hover actions on logo tiles (soft shadows), the selected filter (a hairline shadow) and the Comfy comment (a soft drop shadow).

## Shapes

Tiles 28px corners (22px at 860px and below); product insets 14px; case figures 16px; blocks (proof, stats, lists, hypotheses) 20px; pills fully round. The Figma selection is square: no corner radius, ever.

## Components

### Case Tile (signature)
Evidence first, in ink; under it the product name in bold and a short line; the product below, alive. The whole tile is one link (the product name carries the accessible name). Hover or focus shows the Figma selection; animations play only while the tile is on screen and pause on hover so the product can be read.

### The products, alive
- **Reveal** (Prevently): the white logo appears in the middle, holds, hides; then the App Store screens slide in and drift (14s loop).
- **Wipe** (Comfy): after wipes over before and back (9s), with Before / After badges and the open comment.
- **Pan** (Adtelligent): the report scrolls top to bottom and back (18s).
- **Phones** (Smart Financial Assistant): screens change one after another (20s); on the case hero the whole sheet pans.
- **Spec** (GRG): type and four colour chips appear, a redline measures the gap.

### Figma Selection
A 1.5px Figma Blue square frame 5px outside the element, four white handles, the live size in a Geist Mono label under it. On tiles, mini cards and case figures, on hover and keyboard focus.

### Role Cursors and "You"
A Figma cursor with a name tag in the person's colour. They arrive when their tile scrolls into view and drift slightly. Decorative (hidden from screen readers), hidden on phones and with reduced motion they stay still.

### Logo Tiles
Yahoo (copies the email, "Email copied" toast), LinkedIn and Medium (open in a new tab). Just the logo; a round action button appears on hover (always visible on phones).

### Text Tile
Learning: a title (21px, ink) and a line (Pencil) at the bottom-left, no action button; the whole tile opens the Learning page the way a case tile opens its case (the title moves into the page heading). The page lists courses and certificates. Filtered under About.

### Filter and Theme
Pill segmented control: All / About / Work / Writing hides and shows tiles with a soft transition; More work shows only with All and Work. Theme cycles Auto → Light → Dark and is remembered; a script in the page head applies it before first paint.

### Case Page Blocks
Facts (labels in a column, values aligned), Problem / What we did / Result, Proof Block, Stats (3 in a row), Quote, Insight (heading, quote, meaning), Hypothesis (If / Then / Because / This will lead to, with Mixpanel events in mono), Figure (opens full size), Figures in a row, Verdict Lists, Results Table (improved values in accent), Note.

### Greeting Curtain
On the first visit only: "Hello", "Привіт", then other languages flash on a dark curtain that slides up. Click or Esc skips. Never Russian or Belarusian.

## Do's and Don'ts

### Do:
- **Do** lead every case tile with one real piece of evidence, in ink.
- **Do** show the product alive in its tile, and the same animation at the top of its case.
- **Do** keep the Figma layer purposeful: selection, people who care about that tile, one decision comment.
- **Do** colour only evidence in Mulberry Ink on case pages.
- **Do** keep every value in `ui/kit.css` tokens.

### Don't:
- **Don't** round the Figma selection.
- **Don't** colour tile headlines.
- **Don't** add labels above tiles (no frame names) or captions under contact logos.
- **Don't** show popovers when hovering a case.
- **Don't** use a bright colour on the first screen except the Prevently brand tile.
- **Don't** make text quieter with opacity.
- **Don't** include Russian or Belarusian anywhere, including the greeting.
- **Don't** crop case images on case pages; contain them.
