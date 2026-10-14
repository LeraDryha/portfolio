---
name: Lera Dryha Portfolio
description: A product designer's portfolio where every case is shown by one piece of real evidence instead of a picture.
colors:
  mulberry-ink: "oklch(48% 0.15 352)"
  mulberry-ink-night: "oklch(74% 0.11 352)"
  paper: "#f4f4f2"
  tile: "#ffffff"
  ink: "#16181d"
  graphite: "#4a515b"
  pencil: "#656b74"
  hairline: "#e1e2df"
  focus-blue: "#3b5bdb"
  night: "#0e0f10"
  night-tile: "#18191b"
  night-edge: "#2a2c2f"
  night-ink: "#f2f2f0"
  night-graphite: "#b4b9c0"
  night-pencil: "#8b919a"
  night-focus: "#8ea2ff"
typography:
  display:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(40px, 5.4vw, 68px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  proof:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(44px, 6vw, 84px)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontFeature: "'tnum' 1"
  headline:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(48px, 6vw, 80px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 42px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
  voice:
    fontFamily: "Newsreader, Baskerville, Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.3
    fontVariation: "'ital' 1"
  voice-quote:
    fontFamily: "Newsreader, Baskerville, Georgia, serif"
    fontSize: "clamp(26px, 2.8vw, 36px)"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "-0.01em"
    fontVariation: "'ital' 1"
rounded:
  focus: "4px"
  swatch: "6px"
  tile: "22px"
  pill: "999px"
spacing:
  tile-gap: "16px"
  tile-pad: "36px"
  tile-pad-hero: "56px"
  nav-gap: "56px"
  section: "104px"
  section-mobile: "80px"
  gutter: "24px"
  gutter-mobile: "16px"
components:
  case-tile:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.tile}"
    padding: "36px"
  case-tile-night:
    backgroundColor: "{colors.night-tile}"
    textColor: "{colors.night-graphite}"
    rounded: "{rounded.tile}"
    padding: "36px"
  case-tile-hero:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.tile}"
    padding: "56px"
  case-title:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  proof-mark:
    textColor: "{colors.mulberry-ink}"
    typography: "{typography.proof}"
  proof-mark-night:
    textColor: "{colors.mulberry-ink-night}"
    typography: "{typography.proof}"
  view-case-link:
    textColor: "{colors.mulberry-ink}"
    typography: "{typography.body}"
  nav-link:
    textColor: "{colors.pencil}"
    typography: "{typography.voice}"
  nav-link-current:
    textColor: "{colors.ink}"
    typography: "{typography.voice}"
  pill-button:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  lang-tag:
    textColor: "{colors.pencil}"
    rounded: "{rounded.focus}"
    padding: "1px 5px"
---

# Design System: Lera Dryha Portfolio

## Overview

**Creative North Star: "The Proof Sheet"**

The site is a sheet of evidence. Each case is a quiet white tile that leads with its name and ends with one real fact taken from the case: a number, a user's own words, a release status. No screenshots, no mockups, no decoration standing in for the work. A recruiter who skims for ten seconds should leave with that fact.

The frame is calm and literary: an italic vertical index in the top-left corner (after shud.in), a hairline separating it from the content, generous space between sections. The tiles bring the confidence: big Geist titles and Apple-style tiles in a two-up grid, with the owner's own product as the one full-width tile. Colour is rationed to a single ink, Mulberry Ink, which marks only evidence and actions.

Motion is restrained: a short multilingual greeting on the first visit, a small lift on tile hover, nothing else moves by itself. Light and dark themes are equal citizens; the accent is re-tuned per theme, never reused as-is.

**Key Characteristics:**
- One piece of real evidence per case, set large, instead of an image.
- One accent colour, used only for evidence, the italic emphasis in headings and "View case".
- Italic serif as the quiet voice (navigation, section labels, quotes); Geist as the confident voice (names, titles, numbers).
- White tiles on warm-neutral paper, flat at rest.
- Restrained motion; everything readable without it.

## Colors

A near-monochrome paper-and-graphite palette with one deep mulberry ink.

### Primary
- **Mulberry Ink** (light theme): the only accent. Evidence marks inside tiles, the italic emphasis in the hero heading and the closing line, and "View case" links. It came from Prevently and was kept as the owner's own colour.
- **Mulberry Ink, Night** (dark theme): a lighter, softer version of the same hue so evidence keeps about 7:1 contrast on night tiles.

### Neutral
- **Paper**: page background. Slightly warm so white tiles read as objects lying on it.
- **Tile**: case tile surface.
- **Ink**: names, titles, headings, primary links.
- **Graphite**: running text and tile descriptions.
- **Pencil**: small print: year and role lines, captions under evidence, navigation at rest, language tags. Never lighter than this; it is the 4.5:1 floor.
- **Hairline**: the navigation divider, pill-button borders, link underlines at rest.
- **Focus Blue / Night Focus**: keyboard focus ring only. It is deliberately not the accent.
- **Night, Night Tile, Night Edge, Night Ink, Night Graphite, Night Pencil**: the dark-theme counterparts. Night tiles get a 1px Night Edge contour because tile and page are too close in value to separate on their own.

### Named Rules
**The One Ink Rule.** Mulberry Ink is the only colour that is not a neutral. It marks evidence and actions, never surfaces, borders or large fills.

**The Re-tune Rule.** Every accent use has a dark-theme value of its own. Reusing the light value on a night tile fails contrast (2.5:1) and is a bug.

**The Pencil Floor Rule.** Small text never goes lighter than Pencil (light) or Night Pencil (dark). Opacity is not a way to make text quieter; mix the colour toward the surface and check it stays at 3:1 or more for large text, 4.5:1 for small.

## Typography

**Display Font:** Geist (with Helvetica Neue, Arial)
**Voice Font:** Newsreader italic (with Baskerville, Georgia)

**Character:** Geist speaks with confidence: names, numbers, titles, tight and heavy. Newsreader italic is the quiet human voice around it: the index, the section names, a user's quote, the one emphasised phrase in a heading.

### Hierarchy
- **Display** (600, clamp 40–68px, line-height 1, −0.03em): the hero greeting only. Its last phrase switches to Voice in Mulberry Ink.
- **Headline** (600, clamp 48–80px): the name of the full-width hero tile.
- **Title** (600, clamp 30–42px, line-height 1.02): case names in tiles. Ink, never accent.
- **Proof** (600, clamp 44–84px, line-height 0.95, tabular numerals): the evidence mark in each tile. Numbers stay on one line.
- **Body** (400, 16px, line-height 1.6): descriptions and lists. Measure under 40em.
- **Body Lead** (400, 17px): the intro paragraph.
- **Label** (400, 13px, +0.01em): year · field · team lines, placed under the description.
- **Voice** (Newsreader italic 400, 17–19px): navigation links and section labels.
- **Voice Quote** (Newsreader italic 400, clamp 26–36px, line-height 1.22): user quotes used as evidence.

### Named Rules
**The Two Voices Rule.** Geist states, Newsreader italic speaks. Never set a case name, a number or a button in italic serif, and never set the index or a quote in Geist.

**The No Eyebrow Rule.** Nothing small sits above a title. Year, field and role go under the description.

## Layout

Two columns on desktop: a 112px index column with a 1px hairline on its right, a 56px gap, then the content column. Max width 1240px, side gutter 24px.

Work is an Apple-style tile grid: two equal columns with a 16px gap. The owner's own product spans both columns as the hero tile. Other main cases fill the two-up rows. Secondary cases are not tiles: they sit behind a "More work" pill and open as a plain list.

Sections are separated by 104px. Inside a tile, copy sits top-left and evidence sits at the bottom, so the space between them is intentional air rather than a gap to fill.

At 860px and below: one column, 16px gutter, 80px between sections. The index becomes a sticky horizontal row at the top with a hairline underneath and 48px-tall touch targets. Tiles stack; the hero tile stays visibly larger (56px title, 40px evidence).

## Elevation & Depth

Flat by default. Depth comes from tone (white tile on warm paper) rather than shadows. A single soft shadow appears only on hover, together with a 3px lift. In dark theme tiles carry a 1px inner contour instead of relying on tone.

### Shadow Vocabulary
- **Tile lift** (`0 14px 32px -18px rgba(22,24,29,.28)`): hover state of case tiles only.
- **Night contour** (`inset 0 0 0 1px #2a2c2f`): resting edge of tiles in dark theme.

### Named Rules
**The Flat at Rest Rule.** Nothing has a shadow until the visitor points at it.

## Shapes

Large soft corners on tiles (22px), fully round pills for the few buttons, small 4–6px corners on tags and swatches. Borders are 1px hairlines or nothing. No decorative geometry.

## Components

### Case Tile
Quiet white object, confident inside.
- **Corner Style:** 22px.
- **Background:** Tile (light), Night Tile with Night Edge contour (dark).
- **Internal Padding:** 36px; 56px for the hero tile; 28px × 24px on mobile.
- **Structure, top to bottom:** Title (the link), description, label line, "View case" with an arrow icon; evidence mark pinned to the bottom.
- **Link behaviour:** the title is the only link and stretches over the whole tile, so screen readers announce just the case name. "View case" is decorative. A secondary action (e.g. App Store) sits above the stretched link.
- **Hover / Focus:** 3px lift with the tile-lift shadow; the arrow moves 4px right. Keyboard focus outlines the whole tile.

### Proof Mark (signature component)
One real fact from the case, set in Proof type in Mulberry Ink, with an optional Pencil caption under it. Allowed forms: a number or before → after, a short list of the metrics users actually check, a user quote in Voice Quote, a factual status line. It is always real case content, never invented, and always has a plain-text equivalent for screen readers.

### Navigation
Italic Voice links in Pencil, the current section in Ink (scroll-spy, `aria-current="location"`). Desktop: vertical, right-aligned, sticky, hairline on the right. Mobile: sticky horizontal row with a hairline underneath.

### Buttons
- **Shape:** fully round pill (999px).
- **Pill button:** Tile background, Ink text, Hairline border, 14px × 22px padding. Hover darkens the border to Pencil.
- There is no filled accent button. Actions are text links in Mulberry Ink.

### Lists (More work, Writing)
Ink title at 500 weight, Graphite line under it, no bullets, 22px between items. Ukrainian articles carry `lang="uk"`, an English gloss line and a small UA tag.

### Greeting Curtain
On first visit a full-screen curtain shows "Hello", then "Привіт", then a few more languages, about 170ms each, then slides up over 0.8s. Click or Esc skips it. With reduced motion it shows only "Hello" and fades out.

## Do's and Don'ts

### Do:
- **Do** show each case through one real fact from the case itself.
- **Do** keep Mulberry Ink for evidence, the italic emphasis and "View case" only.
- **Do** give every accent a separate dark-theme value and check contrast in both themes.
- **Do** keep small text at Pencil or darker (4.5:1 or more).
- **Do** let the owner's own product be the single full-width tile.
- **Do** greet in English first, then Ukrainian.

### Don't:
- **Don't** put screenshots or mockups on the home page tiles; mixed case imagery reads as noise.
- **Don't** use a bright colour on the first screen.
- **Don't** show popovers or extra panels when hovering a case.
- **Don't** place a label or eyebrow above a title.
- **Don't** make text quieter with opacity.
- **Don't** include Russian or Belarusian anywhere, including the greeting.
