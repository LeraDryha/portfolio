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
  verdict-green: "#1e7a3e"
  verdict-red: "#b42318"
  verdict-green-night: "#5fcf86"
  verdict-red-night: "#f28b82"
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
  proof-hero:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(36px, 4.4vw, 60px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  closing:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(28px, 3.2vw, 40px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  greeting:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(32px, 5vw, 56px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
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
    lineHeight: 1.6
    letterSpacing: "0.01em"
  action:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
  tag:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
  caption:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  voice:
    fontFamily: "Newsreader, Baskerville, Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.6
  voice-nav:
    fontFamily: "Newsreader, Baskerville, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  voice-quote:
    fontFamily: "Newsreader, Baskerville, Georgia, serif"
    fontSize: "clamp(26px, 2.8vw, 36px)"
    fontWeight: 400
    lineHeight: 1.22
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.45
  subhead:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  stat:
    fontFamily: "Geist, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
  voice-note:
    fontFamily: "Newsreader, Baskerville, Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "4px"
  swatch: "6px"
  tile: "22px"
  image: "12px"
  pill: "999px"
spacing:
  tile-gap: "16px"
  tile-pad: "36px"
  tile-pad-hero: "56px"
  tile-pad-compact: "28px"
  figure-pad: "12px"
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
    typography: "{typography.action}"
  nav-link:
    textColor: "{colors.pencil}"
    typography: "{typography.voice-nav}"
  nav-link-current:
    textColor: "{colors.ink}"
    typography: "{typography.voice-nav}"
  pill-button:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "22px"
    height: "44px"
  lang-tag:
    textColor: "{colors.pencil}"
    typography: "{typography.tag}"
    rounded: "{rounded.focus}"
    padding: "5px"
  case-lead:
    textColor: "{colors.ink}"
    typography: "{typography.lead}"
  chapter-subhead:
    textColor: "{colors.ink}"
    typography: "{typography.subhead}"
  voice-note:
    textColor: "{colors.ink}"
    typography: "{typography.voice-note}"
  stat-number:
    textColor: "{colors.mulberry-ink}"
    typography: "{typography.stat}"
  phase-link:
    textColor: "{colors.pencil}"
    typography: "{typography.voice-nav}"
  phase-link-current:
    textColor: "{colors.ink}"
    typography: "{typography.voice-nav}"
  phase-half-active:
    backgroundColor: "{colors.mulberry-ink}"
  phase-half-active-night:
    backgroundColor: "{colors.mulberry-ink-night}"
  summary-block:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.tile}"
    padding: "28px"
  summary-block-title:
    textColor: "{colors.ink}"
    typography: "{typography.voice}"
  proof-strip:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.mulberry-ink}"
    typography: "{typography.proof}"
    rounded: "{rounded.tile}"
    padding: "36px"
  figure-frame:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.pencil}"
    typography: "{typography.caption}"
    rounded: "{rounded.tile}"
    padding: "12px"
  figure-image:
    rounded: "{rounded.image}"
  results-table:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.tile}"
    padding: "28px"
  results-table-head:
    textColor: "{colors.pencil}"
    typography: "{typography.label}"
  result-improved:
    textColor: "{colors.mulberry-ink}"
  case-end-link:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    height: "44px"
---

# Design System: Lera Dryha Portfolio

## Overview

**Creative North Star: "The Proof Sheet"**

The site is a sheet of evidence. Each case is a quiet white tile that leads with its name and ends with one real fact taken from the case: a number, a user's own words, a release status. No screenshots, no mockups, no decoration standing in for the work. A recruiter who skims for ten seconds should leave with that fact.

The frame is calm and literary: an italic vertical index in the top-left corner (after shud.in), a hairline separating it from the content, generous space between sections. The tiles bring the confidence: big Geist titles and Apple-style tiles in a two-up grid, with the owner's own product as the one full-width tile. Colour is rationed to a single ink, Mulberry Ink, which marks only evidence and actions.

Case pages extend the same sheet. A summary sheet answers the recruiter first (role, problem, what was done, the strongest real number), then the case is read through the process it actually followed, drawn as the page's own navigation. Case images appear here, never on the home tiles: shown as they are, uncropped, inside calm white frames with a caption.

Motion is restrained: a short multilingual greeting on the first visit, a small lift on tile hover, nothing else moves by itself. Light and dark themes are equal citizens; the accent is re-tuned per theme, never reused as-is.

**Key Characteristics:**
- One piece of real evidence per case, set large, instead of an image.
- One accent colour, used only for evidence, the italic emphasis in headings and "View case".
- Italic serif as the quiet voice (navigation, section labels, quotes); Geist as the confident voice (names, titles, numbers).
- White tiles on warm-neutral paper, flat at rest.
- Restrained motion; everything readable without it.
- Case pages answer first (summary sheet), then follow the real process (Phase Index), with images as-is in white frames.

## Colors

A near-monochrome paper-and-graphite palette with one deep mulberry ink.

### Primary
- **Mulberry Ink** (light theme): the only accent. Evidence marks inside tiles, the italic emphasis in the hero heading and the closing line, and "View case" links. It came from Prevently and was kept as the owner's own colour.
- **Mulberry Ink, Night** (dark theme): a lighter, softer version of the same hue so evidence keeps about 7:1 contrast on night tiles.
- **On case pages** Mulberry Ink also marks the reader's position: the outline and growing fill of the phase being read in the Phase Index, and a 16% tint of the accent (20% of the night value) on finished phases. It also sets inline research counts (Stat), user quotes and the improved values in results tables.

### Verdict
- **Verdict Green / Verdict Red** (Night: a lighter green and red): only for the titles of paired lists that judge something, such as "What Comfy covers well" (green) and "What it doesn't fully cover" (red), so a case page is not all white and mulberry. Never for body text, fills, borders or numbers. Both keep at least 5:1 on tiles in both themes.

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
**The One Ink Rule.** Mulberry Ink is the only accent colour. It marks evidence and actions, never surfaces, borders or large fills. The only other non-neutrals are the Verdict pair (titles of good / bad lists) and brand logos.

**The Improved Only Rule.** In a results comparison Mulberry Ink marks only values that improved. A worse or unchanged number stays Ink, and a footnote says why it moved and that highlighted values are the improved ones.

**The Reading Position Rule.** The only Mulberry fill in the system is the Phase Index half being read, growing with reading progress. Finished halves keep the faint tint; unread halves are outline only.

**The Re-tune Rule.** Every accent use has a dark-theme value of its own. Reusing the light value on a night tile fails contrast (2.5:1) and is a bug.

**The Pencil Floor Rule.** Small text never goes lighter than Pencil (light) or Night Pencil (dark). Opacity is not a way to make text quieter; mix the colour toward the surface and check it stays at 3:1 or more for large text, 4.5:1 for small.

## Typography

**Display Font:** Geist (with Helvetica Neue, Arial)
**Voice Font:** Newsreader italic (with Baskerville, Georgia)

Display, Headline, Title, Proof, Proof Hero, Closing, Greeting and Voice Quote are fluid: their tokens are `clamp()` ranges that shrink with the viewport. Every Voice role is set in italic (`font-style: italic`); the token format has no field for style, so treat italic as part of the role.

**Character:** Geist speaks with confidence: names, numbers, titles, tight and heavy. Newsreader italic is the quiet human voice around it: the index, the section names, a user's quote, the one emphasised phrase in a heading.

### Hierarchy
- **Display** (600, clamp 40–68px, line-height 1, −0.03em): the hero greeting only. Its last phrase switches to Voice in Mulberry Ink.
- **Headline** (600, clamp 48–80px): the name of the full-width hero tile.
- **Title** (600, clamp 30–42px, line-height 1.02): case names in tiles. Ink, never accent.
- **Proof** (600, clamp 44–84px, line-height 0.95, tabular numerals): the evidence mark in each tile. Numbers stay on one line.
- **Proof Hero** (600, clamp 36–60px, line-height 1): the evidence line in the full-width hero tile.
- **Closing** (600, clamp 28–40px, line-height 1.08): the closing invitation in Contact; its last phrase switches to Voice in Mulberry Ink.
- **Greeting** (600, clamp 32–56px): the words on the first-visit greeting curtain.
- **Body** (400, 16px, line-height 1.6): descriptions and lists. Measure under 40em.
- **Body Lead** (400, 17px): the intro paragraph.
- **Label** (400, 13px, +0.01em): year · field · team lines, placed under the description.
- **Action** (500, 15px): "View case", secondary text links and the pill button.
- **Tag** (500, 11px, +0.06em): language tags such as UA.
- **Caption** (400, 14px, line-height 1.4): the small Pencil note under an evidence mark.
- **Voice** (Newsreader italic 400, 19px): section labels.
- **Voice Nav** (Newsreader italic 400, 17px): navigation links.
- **Voice Quote** (Newsreader italic 400, clamp 26–36px, line-height 1.22): user quotes used as evidence. On case pages, interview quotes in Mulberry Ink with a Caption attribution under them ("A shopper in an interview, translated from Ukrainian").
- **Lead** (400, 20px, line-height 1.45, Ink): the one-line context under a case name, and a single stated conclusion inside a chapter (such as the value proposition). Measure about 30–32em.
- **Subhead** (600, 22px, line-height 1.25, −0.015em, Ink): step headings inside a case chapter. A leading number ("1.") is part of the heading, in Ink.
- **Stat** (600, 30px, line-height 1.1, −0.02em, tabular numerals): inline research counts in Mulberry Ink, each with a Caption under it.
- **Voice Note** (Newsreader italic 400, 18px, Ink): a short aside between figures, such as why a label was renamed.

On case pages, running text is Body Lead (17px) on desktop and Body (16px) at 860px and below, at a 38em measure. Chapter titles use Title, with a one-line Voice subtitle in Graphite under them. Voice in Ink also titles content inside tiles: summary blocks, table captions, paired list tiles. In results tables, cells are Body and column heads are Label in Pencil.

### Named Rules
**The Two Voices Rule.** Geist states, Newsreader italic speaks. Never set a case name, a number or a button in italic serif, and never set the index or a quote in Geist.

**The No Eyebrow Rule.** Nothing small sits above a title. Year, field and role go under the description.

**The Plain Numbering Rule.** A heading's number belongs to the heading: same Ink, same weight. The accent never decorates a counter.

## Layout

Two columns on desktop: a 112px index column with a 1px hairline on its right, a 56px gap, then the content column. Max width 1240px, side gutter 24px.

Work is an Apple-style tile grid: two equal columns with a 16px gap. The owner's own product spans both columns as the hero tile. Other main cases fill the two-up rows. Secondary cases are not tiles: they sit behind a "More work" pill and open as a plain list.

Sections are separated by 104px. Inside a tile, copy sits top-left and evidence sits at the bottom, so the space between them is intentional air rather than a gap to fill.

Case pages keep the same frame with a wider index column (168px) to hold the Phase Index. The content column stacks a summary sheet and then one chapter per phase, 104px apart (80px on phones), 22px between items inside a chapter. Running text holds a 38em measure; figures, figure pairs, tables, stat rows and proof strips use the full column. Summary blocks sit three across with a 16px gap and the proof strip spans all three; figure pairs and list tiles sit two across. A copy-beside-figure layout keeps its copy sticky on desktop.

At 860px and below: one column, 16px gutter, 80px between sections. The index becomes a sticky horizontal row at the top with a hairline underneath and 48px-tall touch targets. Tiles stack; the hero tile stays visibly larger because its Headline and Proof Hero sizes bottom out above the other tiles' Title (48px against 30px). On case pages the index becomes a sticky bar (at least 52px tall, 48px touch targets): back link, the four phase halves turned horizontal, and the current phase name in Voice. Summary blocks, pairs and list tiles stack to one column; the summary facts become a two-column grid.

## Elevation & Depth

Flat by default. Depth comes from tone (white tile on warm paper) rather than shadows. A single soft shadow appears only on hover, together with a 3px lift. In dark theme tiles carry a 1px inner contour instead of relying on tone.

Case-page tiles (summary blocks, proof strips, figure frames, table tiles, list tiles) follow the same law: flat, with the Night contour in dark theme. None of them lifts: on case pages nothing is a tile-shaped link.

### Shadow Vocabulary
- **Tile lift** (`0 14px 32px -18px rgba(22,24,29,.28)`): hover state of home-page case tiles only.
- **Night contour** (`inset 0 0 0 1px #2a2c2f`): resting edge of tiles in dark theme.

### Named Rules
**The Flat at Rest Rule.** Nothing has a shadow until the visitor points at it.

## Shapes

Large soft corners on tiles (22px), fully round pills for the few buttons, small 4–6px corners on tags and swatches. Images inside a figure frame get a 12px corner and sit 12px in from the 22px tile edge (8px on phones), so the corners nest. Borders are 1px hairlines or nothing. No decorative geometry; the Phase Index triangles are navigation, not ornament.

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

### Summary Sheet
The case answers before it explains. Top to bottom: case name in Headline, Lead line, a facts row, then three summary blocks and a full-width proof strip.
- **Facts row:** Label term in Pencil over a 16px 500 Ink value (role, team, year, business goal). A goal is labelled as a goal, never as a result.
- **Summary blocks:** Tile, 22px corners, 28px padding (22px on phones), a Voice title in Ink (Problem / What we did / Result) over Body in Graphite.
- **Proof strip:** a full-width tile (32px × 36px padding; 24px × 22px on phones) carrying a Proof Mark with its Caption beside it, bottom-aligned. On phones the caption drops under the mark and the mark may wrap. The same strip can close a case with a second real number.

### Figure Frame
Case images as they are, in a calm frame.
- **Frame:** Tile, 22px corners, 12px padding (8px on phones); the image has a 12px corner and is the link to the full-size file in a new tab.
- **Caption:** Caption in Pencil, an optional bold Ink lead-in ("Before." / "After."), and a 13px "Full size" hint with an out-arrow that darkens to Ink on hover.
- **Pairs and grids (figure cards in a row):** every frame reserves the same 4:3 image area with the image contained (never cropped), so mismatched screenshots line up. The caption starts right under that area, a stacked title and its line always sit 4px apart, and any spare height stays at the bottom of the card, so titles in a row never jump. Any new card type with an image, a title and a line follows the same rule. Portrait images cap at 560px wide.

### Results Table
A tile (28px side padding) holding a comparison table with a Voice caption in Ink, Label column heads in Pencil, Body cells in Ink with tabular numerals and hairline row dividers. Improved values only are in Mulberry Ink at 600 (The Improved Only Rule); a footnote explains any regression. On phones the header row is visually hidden and each row becomes the metric name followed by labelled values in two or three columns.

### Case End Row
Closes a case under the final Proof strip, 120px below it (80px on phones) so the case clearly ends before the actions, then a hairline. One row of plain text links in Action type (Ink, 500, hairline underline that darkens on hover, 44px tall): "All work" and "Back to summary" on the left, "Next case: <full case title>" with an arrow on the right, the way forward. The arrow nudges 4px right on hover. On phones the row wraps: the two return links first, the next case on its own line below. The next case is a link like the others, not a tile, so the case ends quietly instead of starting another story.

### Brand Marks
Logos of the product, client and school sit before a case title, at 0.7em of the title. On home tiles they rest in the title's own colour (Ink; light in the dark theme), so the tiles stay quiet, and fade to their original colours over 0.35s when the tile is hovered or focused. On the case page they are always in their original colours, with no hover. Original colours: multi-colour logos (Prevently, Comfy) show their original file; Adtelligent keeps its arrow in the title colour and gains its pink fold (#ff0066), so it reads in both themes; single-colour brands take their brand colour (Projector blue #3548fe from prjctr.com, hubmee #075f47, light #18d0b1 in the dark theme, Golden Ratio Group #e2a574). Several logos are joined by a small Pencil "+" (Comfy + Projector: a Projector course whose work was handed over to Comfy). The resting logo is a one-colour SVG mask, so one file works in both themes; original files live in `public/logos/color/`. They are decorative (`aria-hidden`); the title names the case. Current set: Prevently, Comfy + Projector, Adtelligent, hubmee (Smart Financial Assistant), Golden Ratio Group (GRG Design System).

### Mini Tiles
Secondary cases ("More work") as small white cards, four in a row (one column on phones): the case name as a stretched link (17px, 600) and its one line (14px Graphite). Same surface, hover lift and focus ring as a case tile, 24px padding, no proof mark.

### Phase Index (signature component)
The case's own process drawn as its navigation (Double Diamond for Comfy). Each phase is one half of a diamond: diverging phases open downward, converging ones close.
- **Desktop:** in the sticky index column, under the back link and "summary", each phase is a Voice Nav label beside a 44 × 34px triangle; "outcome" follows.
- **States:** unread halves are an outline only, which must hold 3:1 against the page; the half being read takes a Mulberry Ink outline and fills with Mulberry Ink in proportion to reading progress through that chapter (`aria-current="location"` on the link); finished halves get an Ink outline and the faint Mulberry tint. Labels follow Navigation: Pencil at rest, Ink when current.
- **Phones:** the same halves turn horizontal in the sticky bar (26 × 30px in 48px targets), labelled for screen readers only; the current phase name shows as Voice text at the right, announced politely.
- **Motion:** the fill follows scroll directly; only the outline colour transitions (250ms), and that transition is removed under reduced motion.
- A case without a Double Diamond uses its own 3–5 phases in the same form.

### Navigation
Italic Voice links in Pencil, the current section in Ink (scroll-spy, `aria-current="location"`). Desktop: vertical, right-aligned, sticky, hairline on the right. Mobile: sticky horizontal row with a hairline underneath.

### Buttons
- **Shape:** fully round pill (999px).
- **Pill button:** Tile background, Ink text, Hairline border, 44px tall with 22px side padding. Hover darkens the border to Pencil.
- There is no filled accent button. Actions are text links in Mulberry Ink.

### Lists (More work, Writing)
Ink title at 500 weight, Graphite line under it, no bullets, 22px between items. Ukrainian articles carry `lang="uk"`, an English gloss line and a small UA tag (11px, Hairline border, 4px corners, 5px side padding).

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
- **Do** open a case page with the summary sheet: role, problem, what was done, result, and the strongest real number.
- **Do** show case images as they are, contained in a Figure Frame with a caption.
- **Do** colour only improved values in Mulberry Ink and footnote any regression.

### Don't:
- **Don't** put screenshots or mockups on the home page tiles; mixed case imagery reads as noise.
- **Don't** use a bright colour on the first screen.
- **Don't** show popovers or extra panels when hovering a case.
- **Don't** place a label or eyebrow above a title.
- **Don't** make text quieter with opacity.
- **Don't** include Russian or Belarusian anywhere, including the greeting.
- **Don't** show logos in colour at rest: they take the title colour and reveal their original colours only on hover; the case page shows them in colour.
- **Don't** colour a worse or unchanged number in Mulberry Ink.
- **Don't** set a heading's number in the accent.
- **Don't** crop case images to fit a frame; contain them.
