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
  comfy-green: "#007d0f"
  comfy-green-night: "#00b302"
  grg-gold: "#996100"
  grg-gold-night: "#f5a70f"
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
  verdict-green-tint: "#e9f6ee"
  verdict-orange: "#b54708"
  verdict-orange-tint: "#fdf1e6"
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

On top lies a quiet Figma layer, the thing that makes the site hers: pointing at a tile selects it the way Figma does (a square blue frame, four handles, the live size in a label), role cursors (UX designer, Researcher, Developer) sit on the tiles they would care about, the visitor's own pointer carries a "You" tag, and on the Comfy screen Lera's comments explain design decisions, one per step of the story.

Opening a case moves the tile's product to the top of the case page (a browser page transition), and the story continues in one reading column. Evidence is marked in Mulberry Ink; everything else is ink and grey.

The previous direction ("The Proof Sheet": paper, white tiles, italic side index, Double Diamond navigation) is archived in `docs/concept/v1/`.

**Key Characteristics:**
- White page, grey tiles with large soft corners, equal gaps; text in tiles aligned to the left edge.
- The three lead cases (Prevently, GRG, Comfy): the product, alive, fills the tile; the name, a short line and one fact sit at the bottom on a blur of it. The two smaller cases: evidence first (ink), then the name and a line, then the product.
- One brand tile: Prevently, Lera's own product, in its pink gradient.
- Figma layer: square blue selection on hover and focus, role cursors, a "You" tag, decision comments on Comfy.
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
- **Component Violet** (Figma's own colour for components): the frames and names of a product's parts, in the GRG tile animation and the live product's "Show components" layer, and the part pills under it.
- **Redline**: measurements in the GRG case (token tags on the Modal specimen, highlighted lines of code) and the parts of a screen made for one page only, in the components layer.
- **People in the file**: Lera in Mulberry Ink, UX designer violet, Developer green, Researcher red-orange: Figma's own multiplayer palette.

### Brand and verdict
- **Prevently pink** (three stops, 160° gradient): only the Prevently tile and its case hero.
- **Yahoo violet** and **LinkedIn blue**: only the two contact logos.
- **Type Green** (#0d8a4b): only the type measurement on the GRG modal specimen.
- **Verdict Green / Orange**: only the paired "what works / what doesn't" lists on case pages: what works on a light green card with its title in Verdict Green, what doesn't on a light orange card with its title in a dark orange; both re-tuned at night (deep green and deep brown cards, lighter titles).

### Named Rules
**The Client Accent Rule.** A client case may take the client's brand colour as its evidence accent instead of Mulberry Ink, on its case page only: Comfy uses its green (#00b302), deepened to #007d0f in the light theme so text keeps 4.5:1 on a tile, and the brand value itself at night. GRG uses its gold (#f5a70f), deepened to #996100 in the light theme (4.75:1 on a tile), the brand gold at night. The home page, the intro and Lera's own colour in the Figma layer stay Mulberry Ink.

**The Ink Headline Rule.** Where a tile has a headline (the smaller cases), it is evidence, set in ink. The accent belongs to case pages and the intro's italic phrase.

**The Figma Only Rule.** Figma Blue appears only as the Figma layer (selection, focus, "You", the components layer over a live product and the part names that select in it). It is never a link colour or a button fill.

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
- **Label** (Geist 500, 13px, Pencil, sentence case, no tracking): every small label inside a case block (Jobs, Thinking, Before and after, a journey layer, a table head, a phone caption, the lightbox caption). No Geist Mono and no uppercase for labels: mono stays for what is measured or typed (Figma sizes, code, file names, PR numbers, a tile fact), so it never reads as decoration.

## Layout

- **Top bar** (sticky, frosted page colour): the mark on the left (back to the top), the filter in the centre, the theme switch on the right. On phones the filter drops to a second row.
- **Bento**: 4 columns, 250px rows, 20px gaps, max 1100px, 64px under the top bar. Desktop places every tile by name (layout A): intro (2 wide), email, LinkedIn; Prevently (2 wide, 3 tall) on the left, GRG (2 × 2) beside it with Medium and Learning (1 × 1) under GRG; then Comfy (2 × 2), Adtelligent and Smart Financial Assistant (1 × 2 each). GRG's two rows are lower (208px): its tile ends just under the Invoices table at the last step, with no empty space; Comfy keeps 250px rows; Prevently is the tallest. At 860px and below: 2 columns, 200px rows, 14px gaps, 22px corners; at 640px: 168px rows, 16px gutters.
- **More work**: a pill under the bento opens four small cards in a row (2 on tablets, 1 on phones).
- **Case page**: no top bar. A round close button top right (Esc does the same) returns to the tile; the hero (the tile's product, 280–480px tall) sits on top; one reading column below; a back-to-top button appears after scrolling. The page ends with "All work" on the left and "Next case: <title> →" on the right.
- **Wide bands** (GRG): the live product and the token anatomy break out of the reading column to the page width (1100px; the screen minus 32px on phones), centred on it. Everything else stays in the column.
- **Figures in a row** share one 4:3 image area so captions line up; any card with an image, a title and a line follows this rule.

## Elevation & Depth

Flat. Tiles have no border or shadow in either theme. Only floating controls lift: the round case buttons and the hover actions on logo tiles (soft shadows), the selected filter (a hairline shadow) and the Comfy comments (a soft drop shadow).

## Shapes

Tiles 28px corners (22px at 860px and below); product insets 14px; case figures 16px; blocks (proof, stats, lists, hypotheses) 20px; pills fully round. The Figma selection is square: no corner radius, ever.

## Components

### Case Tile (signature)
Two forms. **Lead** (Prevently, GRG, Comfy): the product fills the tile edge to edge; at the bottom, on a blur of the product (no line, no shadow), the name in bold, a short line and one fact in Geist Mono on the right (iOS live · Android in review; 59 components; 30% → 40%); on phones the fact goes under the name. The caption follows the site's theme on GRG (its product turns dark too); it stays light on Comfy, whose product is light in both themes; white on Prevently's pink. **Small** (Adtelligent, Smart Financial Assistant): evidence first, in ink; under it the product name in bold and a short line; the product below, alive. A case that has no evidence it can show (Adtelligent: a redesign, no numbers are public) leaves the evidence out and starts with the name and line; nothing stands in for it. The whole tile is one link (the product name carries the accessible name). Hover or focus shows the Figma selection; animations play only while the tile is on screen and pause on hover so the product can be read.

### The products, alive
- **Bloom** (Prevently, tile and case hero): the white flower turns; a phone in iOS glass (a translucent frame with a light edge and a Dynamic Island) rises with the lock screen (9:41 and the date), and the app's real reminders, translated, arrive in it one by one (three on screen; two in a low box such as a case hero on a phone). The reminders follow iOS's lock-screen notification: the app icon, a bold title with "now" on the right, the body under it, SF text on the system's light material with large corners; they keep a real phone's width (about 300px), so on a small phone frame they reach past its edges. The phone keeps its size (at least 540px tall): in a low box only its top shows, the rest below the edge. The reminder icon is the app's own: the pink flower on white. the phone slides down and away; the results count up, one big (downloads) and two under it (page conversion, rating with a star), white on the pink; then everything fades and the flower comes back (14.4s loop). With reduced motion the figures rest on the screen.
- **Story** (Comfy, 30s): whole screens in scale. The camera zooms into the before (the tooltip and the bank icons) and a "needs improvement" comment opens; it zooms out, a white bar with a grip wipes in the after, the camera zooms into its highlighted price block and a design-decision comment opens. Then the camera zooms out and the installment offers slide in like a drawer, seen whole, with a comment on the payment timeline. Each comment drops in as a closed pin, then opens, as in Figma. Before / After badges. In a tile the screen covers the product area; at the top of the case page it is contained. With reduced motion: the zoomed after with its comment, still. On phones a pin in the upper half opens its note below.
- **Pan** (Adtelligent): the report fills its box (cover) and moves slowly across it and back (18s): sideways in the tall tile, top to bottom in the wide case hero.
- **Phones** (Smart Financial Assistant): screens change one after another (20s); on the case hero the whole sheet pans.
- **Assemble** (GRG, about 18s): the system builds the product, each step named by a component frame in Component Violet. Atoms sit in two rows so their frame keeps a margin inside the tile. Primitives (gold, neutral, green swatches) → five become semantic tokens (their dots move into named chips) → atoms (Input, Select, Button, Badge, Action Button) → molecules (the toolbar; the Badge and the copy button drop into their places in a table row, which appears under them) → organism (the Invoices table on its white surface) → product (the top bar drops in, the menu items slide in one by one, the title, Download and Create invoice land, the table settles). Once assembled, Topbar Navigation, Sidebar Navigation, Page Header, Button and Table are named together until the loop restarts. A camera zooms like Figma, from the atoms out to the whole page. Every part from the atoms on is the real component, captured from the Storybook's Invoices page (`npm run grg:assemble`, 2×, transparent around each part; the search and filters keep the white they have on the surface, so their border reads on grey) and lands exactly where it sits on that page. The white surface arrives only with the organism. It follows the site's theme with the system's own dark theme: the parts are captured in both themes, and the primitives, the tokens' colours (each token shown with the primitive it is made of in that theme), the page and the surface come from the system's tokens; switching the theme restarts it. With reduced motion: the assembled product with its names, still. On the case page the product is live (see Live Product).

### Figma Selection
A 1.5px Figma Blue square frame 5px outside the element, four white handles, the live size in a Geist Mono label under it. On tiles, mini cards and case figures, on hover and keyboard focus.

### Role Cursors and "You"
A Figma cursor with a name tag in the person's colour. They arrive when their tile scrolls into view and drift slightly. Decorative (hidden from screen readers), hidden on phones and with reduced motion they stay still.

### Logo Tiles
Yahoo (copies the email, "Email copied" toast), LinkedIn and Medium (open in a new tab). Just the logo; a round action button appears on hover (always visible on phones).

### Text Tile
Learning & recognition: a title (21px, ink) and a line (Pencil) at the bottom-left, no action button; the whole tile opens the page the way a case tile opens its case (the title moves into the page heading). The page: a lead and a "Now" line (what is being learned), Recognition (the DEV Challenge award), Courses as grey cards two in a row (the certificate whole on the page colour, title, school · year, the result the certificate shows in ink medium; the card opens the certificate), then the CASES foundations as one line of links and a note on the previous surname. Filtered under About.

### Filter and Theme
Pill segmented control: All / About / Work / Writing hides and shows tiles; the tiles that stay close up in the same order with no holes and slide to their new places (Work: Prevently and GRG side by side, then Comfy, Adtelligent, Financial Assistant). More work shows only with All and Work. Theme cycles Auto → Light → Dark and is remembered; a script in the page head applies it before first paint.

### Case Page Blocks
Facts (labels in a column, values aligned; a value can be a link), Problem / What we did / Result, Proof Block, Stats (3 in a row), Quote, Insight (heading, quote, meaning), Hypothesis (If / Then / Because / This will lead to, with Mixpanel events in mono), Figure (opens larger in the screen lightbox; figures in a row are one set), Figures in a row, Verdict Lists, Results Table (improved values in accent), Note.

**Business Canvas** (Comfy): the combined Business Model Canvas and Lean Canvas as a live block on the page width instead of a picture: white cells (inner corners) on a grey block, the top row in the Lean Canvas order (Problem with Existing alternatives, Solution over Metrics, Unique value proposition with the slogan in Newsreader italic in the case accent, Unfair advantage over Channels, Customer segments with Early adopters), the business-model cells under it (Cost structure, Revenue streams, Key partners, Key resources); each cell a semibold title over a numbered list in 13px; two columns on tablets, one on phones; the caption under it.

**Interview Quotes** (Comfy): quotes from interviews as separate white cards, three in a row on a grey block (two on tablets, one on phones): the quote in Newsreader italic in Graphite with its key phrase in the case accent, the first name under it as a label; a title on the left and an EN / UA switch on the right (the original Ukrainian, with names in Ukrainian), both on the page above the grey panel, the same switch as the Prevently voice table; a note under it that the quotes are translated and use first names only. No photos.

**Interview Boards** (Comfy): under the quotes, the same layout (title and EN / UA on the page, grey panel): the interview guide as a numbered list in three columns in a white card (two on tablets, one on phones), then every respondent's board as a small picture at its own shape, four in a row (three on tablets, two on phones), the first name as a label under each; the pictures are kept small (800px) on purpose so the private answers can't be read, and a note says so.

**Survey Charts** (Comfy): the survey's answers rebuilt as bar charts, two in a row of white cards on a grey panel (one on tablets and phones), title on the page above it: who took part in one line, then per card the question, “90 responses” as a label, and the top answers, each a label with its share (one decimal, ink semibold, tabular) over an 8px bar in the case accent on a tile-coloured track; a note under it says the answers are translated and where several could be chosen.

**Define blocks** (Comfy), each like the other research blocks (title on the page, grey panel, white cards, no photos):
- **Persona**: the person, a line about them and their own words (Newsreader italic, case accent) in a tall card on the left; Jobs and Goal (the goal in Newsreader italic, ink) over Needs and Fears in four cards; their story in a full-width card under them; one column on tablets and phones.
- **Journey Map**: a table in a white card, the steps across the top (number over the step name), a row per layer (Doing, Thinking, Saying, Feelings, Ideas) with the layer name as a label in a column that stays in view while the table scrolls sideways (only on narrow screens); the Saying row in Newsreader italic in the case accent.
- **Problem Board**: the problems worth solving, three white cards in a row (one on tablets and phones): “Problem 1” as a label, the problem as a subhead, the research notes behind it on yellow paper stickies.
- **HMW Board**: How Might We as rows of white cards: the question on a green sticky (“HMW 1”, a tag like “business requirement” where the board had one), the team's ideas on grey-blue stickies beside it; stacked on tablets and phones. Stickies are paper, the same in both themes, slightly turned.
- **Problem Solved** (Deliver): one problem from Develop carried into the design. In the reading column: the problem at chapter-title size, numbered like a heading in a document (“1. Lack of transparency…”, the number in the case accent; no separate label), the survey evidence, and the How Might We it answers on a green HMW tag in Newsreader italic. Then, on the page width, a grey card “Before” (left out when the problem had no screen before) (an orange pill, what was wrong as a list, the old screen) and a grey card per decision: “01” in Geist semibold in the case accent, the decision as a 20–26px title, why, and the How Might We ideas it came from as grey-blue sticky chips (“HMW 5 · A credit calculator”); on the right the desktop screen with the phone mockup over its lower right corner (two phones side by side where the flow needs both). The Before card can carry the old screen's own popup over it (as it opened) and further old screens as small thumbnails under it; a decision with no HMW idea behind it shows no chips. Every screen opens in the lightbox. Stacked on tablets and phones, the phones under the screen. The same block carries a redesign by area (Adtelligent): the heading is the area (“2. My reports”), there is no HMW tag, the Before card shows the old screen of that area (its own window over it where it had one), and the panel over the screen's corner is a menu or side panel from that screen, not a phone. A decision can carry the designer's own question as **Thinking**: a quote under its text, “Thinking” as a label over it, Newsreader italic, a case-accent rule on the left, on the raised colour.
- **Value Proposition** (the canvas as the method draws it): on a white card, the value map as a square cut by two lines into Products & services, Gain creators and Pain relievers (a gift where they meet) and the customer profile as a circle cut into Gains, Pains and Customer job (a face in the middle), arrows between, all in ink line; small headings over them as labels. The team's stickies, shortened (yellow; pains orange; the job pink; paper, the same in both themes), sit in their regions, slightly turned. When it scrolls into view the canvas is empty and the stickies drop into place region by region (products, gain creators, pain relievers, job, gains, pains); with reduced motion they are simply there. Below 860px, and for screen readers, the same content as the two-column lists.
- **Value Canvas**: two columns, what the company offers (products and services, gain creators, pain relievers) beside what the customer wants (job, gains, pains); gains on the light green card and pains on the light orange one, titles in the verdict colours.

**Competitor Matrix** (Comfy): the features where the stores differ as a compact table on a grey block: stores as columns (no group labels: the stats above name the direct and secondary competitors), the client's column on the raised colour; each cell a drawn mark whose shape and colour both carry the answer (filled green dot has it, half-filled orange partly or hard to find, red ring doesn't have it, grey dash not checked) with a legend over it; the points of parity as one line under it, which also says the table shows the features where the stores differ (no separate caption); scrolls sideways on phones. The original research files sit as small white pills, “Artifact 1”, “Artifact 2” with the open-in-new-tab icon, at the top right, level with the legend (under it on phones); each opens the PDF so a reader can check the numbers in the source, and its accessible name says what the file is. Followed by the client's own points of difference as figures with titles.

**Ideas** (Comfy, its own Growth chapter): ideas for the business, set apart from the UX fixes, one per row on the page width: a grey card (tile corners) with “Idea 1 of 4” as the label, the idea's title (20–26px, ink) and its why on the left, the concept large on the right (opens in the lightbox, the four ideas are one set); on tablets and phones the text sits over the image.

### Live Product (GRG case page)
The GRG card frames its animation: a 4px inner edge in the card's own colour (tile and hero), so the white product never runs into the white page. On the GRG case the hero is the same grey card as the tile, at the size of every case hero, with the same assembly (in a wider box the animation's canvas gets shorter, so the product still fills the width) (the tile moves up into it); the live product comes after the summary (Problem, What I did, Result, the proof). The case's product, live: the GRG Storybook's Dashboard story in a frame, on a grey band with the screen's name, a line on what to try in it, and a Product / Show components switch (the filter's pill control on the page colour). On desktop widths the product keeps its 1440 layout scaled to fit; on narrow screens it shows its own phone layout. Show components outlines every system component in Figma Blue and the parts made for this page in dashed Redline; the one under the pointer is selected with its name. Under the product, the parts it is built from as pills (with ×count): hovering or focusing one selects it in the product; a system part opens its Storybook page. A legend and a line say the Storybook is rebuilt for the portfolio. The product follows the site's theme. Until the frame answers, the tile's screenshot stands in.

### Token Anatomy and Code (GRG case page)
After primereact.dev: the Sign up modal from Lera's Figma (simplified: Email filled and active with its floating label, Password, Sign up, or Google / Apple (the system's Social Button values and its own Brand social icon files), Log in (Button, Text, sm); every part follows its Storybook component (Modal header and content, Input lg with Floating label, Button lg, Social Button) and the icons are the system's own files (Base icons mail and eye, Brand social icons); 44px from the header to the first field, as in Figma, for the label), drawn at its own size in GRG's values and zoomed out as on a Figma canvas (0.8×, 0.62× on phones), on the GRG page colour (or, with its own Light / Dark switch, the dark one). Redline tags around it name its tokens (radius-xl-16, surface-floating, primary-base-1000 above the button, shadow-md); its spacing is measured with a Redline and end ticks, the size in Geist Mono beside it (32 sides and top, 40 between fields); one text is measured for type as on primereact.dev: a Type Green line with end ticks under it and its style in a Type Green tag (Body-md/Regular · 14/20). Beside it, code in tabs (Figma variables, tokens.css, Modal.css, SignUp.tsx): Geist Mono 13px on a grey block, line numbers in Pencil, token names in ink, comments in Pencil, the lines that matter tinted Redline. The specimen uses the GRG product typeface (Nunito Sans), loaded for this block only. No syntax colours.

### Theme Wipe (GRG case page)
One product screen, big, in a wide band: the light screen with the dark one over it, cut by a line in Component Violet with a "Light · Dark" pill. Drag it (or move it with the arrow keys); when it first comes into view the line sweeps from the right edge across and settles in the middle (none with reduced motion: it rests in the middle). Product tabs above (Exchange, Payments, Admin); a caption under it. The screens are Figma frames in both themes. A round expand button in the top-right corner of the screen (the float button's look) opens it larger in the screen lightbox: every product in both themes, in order (Exchange · Light, Exchange · Dark, …), starting with the product in view.

### Open Card and Storybook Links (GRG case page)
Open Card: a grey block with a title, a line (an eyebrow only where it adds something) and an ink pill ("Open Storybook ↗") on the right; the whole block is one link with the Figma selection on hover. After the facts and at the end of the case. Doc Links: Storybook pages as grey cards like the stat cards, two in a row with the same 12px gap (one on phones): a 4:3 preview of the page on a white inset, a title, a line; the Figma selection on hover. Every mention of "Storybook" in a case's text links to it.

### Audit Blocks (GRG case page)
Part (an eyebrow and a heading over a hairline: the start of a larger part of the story), Decision (title; "In Figma" and "In the product" side by side on white insets, optional crops; why, in ink), Finding (id in mono, severity pill, what is wrong, "Recommended."), Formats (the ways a value was written, struck through in Redline, then the one rule in Mulberry Ink), Chain (finding → system → product, three cards, with the PR), Chain table (every decision with its PRs), Scenario (a numbered task with Checks / Success / Measure).

### Prevently Case Blocks
- **Phone frames**: a screen in a near-black bezel, the same height for every phone in a row. iPhone with round corners (a Dynamic Island is drawn on screenshots taken on a phone; simulator shots carry their own), Android with smaller corners and a camera dot. A pair (iOS beside Android) sits big on a grey block; a flow is five phones in a row (scrolls sideways on phones) with a mono caption under each and a platform label over the row. Screens come from the real apps: the iOS simulator, the Android emulator, or Lera's phone.
- **Screen lightbox**: every phone frame and every case figure is a button (zoom-in cursor, Figma-blue ring on keyboard focus) that opens its screen larger in a modal on the page: the screenshot whole on a dark scrim (up to the screen height minus room for the caption), its caption as a label with “2 / 5”, a × at the top right where the case's close button sits, and ‹ › to move through the phones in the same row (← → keys too; on phones the arrows sit at the bottom). Esc, × or a click outside closes it and focus returns to the phone; Esc closes the modal before it closes the case.
- **Try it** (as wide as the reading column, like the text above it): the app's questions on the left (an age slider and pill toggles), the plan on the right in an iPhone frame (the same near-black bezel and Dynamic Island as the case's phone frames, 9:41 in the status bar), laid out at a real phone width (375) and zoomed to the screen so it reads like the app, scrolling inside the screen, in the app's own look (Mulish, its category colours, pink "why" chips, the source in mono); a check-up the last change added gets a green ring and "New". The rules are the app's own, translated.
- **Research**: the persona across the top (who she is, then wants, fears and needs in three columns), and under it a five-stage journey map whose rows line up across the stages (pain, a quote from the interviews in Newsreader italic in the accent, and what the app answers with).
- **Voice table** (as wide as the reading column): two columns, before (struck through in Redline) with what was wrong under it in Pencil, and after (in ink); an EN / UA switch above it on the right reads the lines in English or in the app's original Ukrainian (from its Voice and Microcopy System). On phones each line stacks: before, what was wrong, after.
- **Spec to screen**: a real spec from the project, as a document (white page, “Excerpt from the spec” in ink semibold, then its file name in mono, over a hairline, the text in Geist Mono with keys and headings in ink), beside the iPhone with the screen built from it, on a grey block; tabs choose the example, an EN / UA switch on the right of the tabs reads the spec in English or in its original Ukrainian.
- **Chapter break** (every case): each chapter is set apart from the one before it: a 112px gap (72px on phones), a hairline across the reading column, an eyebrow in plain words ("Chapter 4 of 7", Geist 500, 15px, Pencil; the chapter title says what it is about, so there is no extra name) and the chapter title at 26–34px instead of Case H2. Inside a chapter the blocks keep their own tighter spacing, so the gap between chapters is clearly larger than any gap within one.
- **Chapter list** (every case, screens 1400px and wider): the case's chapter titles in a quiet column fixed at the top left, its first line level with the top of the hero card and the close button, 12px Pencil, the chapter in view in ink; built from the page's own sections.
- **Stage table** (as wide as the reading column): the same grey table: each stage of the work in semibold, and the document written before its code; on phones the stage sits over its document.
- **Phone wipe**: one phone screen in both themes, the light one cut by a Component Violet line with the same "Light · Dark" pill as the theme wipe; it sweeps once on first view and rests in the middle (still with reduced motion), then drags.
- Cards (title and a line, three in a row), component pills (with ×2), and reviews quoted without names beside what the release shipped.

### Greeting Curtain
On the first visit only: "Hello", "Привіт", then other languages flash on a dark curtain that slides up. Click or Esc skips. Never Russian or Belarusian.

## Do's and Don'ts

### Do:
- **Do** give every case tile one real piece of evidence: a large headline on the small tiles, a quiet fact in the caption of the lead tiles.
- **Do** show the product alive in its tile, and the same animation at the top of its case.
- **Do** keep the Figma layer purposeful: selection, people who care about that tile, a decision comment for each step of a story, never more than one at a time.
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
