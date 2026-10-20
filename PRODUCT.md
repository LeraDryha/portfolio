# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) with TypeScript, content as MDX files in the repository, hosted on Vercel with Vercel Web Analytics. Chosen by the owner. The repository is public: https://github.com/LeraDryha/portfolio

## Users

Hiring managers and recruiters deciding whether to talk to Valeriia (Lera) Dryha for a **Product Designer** or **Product Design Engineer** role. They skim many portfolios, often quickly, on desktop and on phones. No specific country or market is targeted.

## Product Purpose

A personal portfolio site that replaces the current Notion portfolio (https://app.notion.com/p/Hi-I-m-Lera-13b44bdcbfce80dfba23e68b5324093f) and presents Lera's work so it reads as solid and shows her strengths.

The site has worked when:
- a recruiter or hiring manager reaches out or invites her to an interview;
- within seconds a visitor understands who she is and what she is strong at;
- the site itself is evidence: its build quality shows her level in design and engineering.

## Positioning

A product designer who combines three things a typical portfolio shows one at a time:
- **Decisions that move metrics:** research, hypotheses and numbers (Comfy's credit order goal from 30% to 40%, A/B-framed onboarding, task-flow conversion work).
- **Systems thinking:** design systems, detailed specs and hand-off (GRG Design System, a Storybook built from scratch, articles about hand-off).
- **Taking a product to release alone:** Prevently went from idea to the App Store with Lera doing research, design and build, working with AI tools.

## Operating Context

- Visitors arrive from LinkedIn, a CV, or a direct link, and decide in seconds whether to open a case.
- The site is in English. Lera's two Medium articles are in Ukrainian and are presented as such.
- Lera is not a developer. She works with AI tools as a designer; the code is written with Claude acting as product design engineer.

## Capabilities and Constraints

- Pages: Home (a bento of tiles: intro, contacts, case tiles, Medium, More work, filtered by About / Work / Writing), one case page template at `/work/<slug>`, About.
- No NDA material; all listed cases can be shown.
- Case texts and images are ready in Notion; case images are moved into the repository. Each case tile shows its product alive (animated screenshots).
- GRG Design System lives in Figma: a legacy system Lera updated alone in 2026 (35 components, 2,700+ variants, 371 colour tokens, usage guidelines for 33 components). Screens for payments, a crypto exchange, internal admin panels and a website with API references are built on it. A Storybook for it (React 19 + PrimeReact 10.9.9, unstyled, tokens generated from Figma) is being built with Claude in a separate project, `grg-design-system`; the case will link to it once deployed. The case shows only the gold (light) and dark themes, never the white-label themes, and never the product logos (GRX Pay, GRX Exchange, Golden Ratio Exchange); the client is named Golden Ratio Group.
- Prevently: iOS app live in the App Store; Android app in review, no Google Play link yet.
- Contacts: email and LinkedIn. A phone number exists but whether to show it is undecided, so it is never committed to the public repository.
- Title on the site is "Product Designer" for now.
- **Russian and Belarusian must never appear anywhere**, including the multilingual greeting.
- Open: the visitor's single primary action is still to be researched.

## Brand Commitments

- Name: Lera Dryha (Valeriia Dryha).
- Voice: first person, plain and direct ("Hi, I'm Lera").
- Prevently is the owner's own product and leads the work section.

## Evidence on Hand

Notion case studies (texts and images ready):
- **Comfy: UX Case Study** (2024, e-commerce, team of 4 designers). A Projector school course project: the business came to the course and all work was handed over to Comfy. Business goal: credit order share from 30% to 40%. Full research cycle.
- **Solutions for Adtelligent** (2025, AdTech B2B SaaS). Role and Skills are empty in Notion and must be filled with Lera, not invented.
- **From Transaction Log to Smart Financial Assistant** (2024, fintech, US market), for hubmee (https://hubmee.com). Includes the user problem "I connected my accounts… and then what?". Focus and Skills are empty in Notion.
- **Task Creation Reimagined** (2025, sole designer). Has conversion and usability metrics in Notion.
- **Onboarding through Hypotheses & A/B Testing** (2025, concept project).
- **Mental health support MVP** (2023).
- **Dnipropetrovsk Regional Center for Educational Quality Assessment** (very little text).

Other evidence:
- **GRG Design System** (Golden Ratio Group, https://goldenratiogroup.co) in Figma: https://www.figma.com/design/r3E5XdifyoiiNeuj7mOjBk/ (the case page is built from it; logos are removed from the exported images). No metrics beyond the scale of the system.
- **Prevently**: https://preventlyapp.com and the App Store listing; iOS in SwiftUI, Android in Kotlin.
- **Writing**: two Medium articles in Ukrainian, "Місце, де UX помер" and "Hand-off без сліз".

Absent, never fabricate: CV (coming later), testimonials, client logos, results for Adtelligent and Smart Financial Assistant beyond what Notion states, a Google Play link.

## Product Principles

1. **Show, don't claim.** Every strength on the site is backed by a real fact from a case.
2. **Ten seconds are enough.** The strongest proof is visible without scrolling far or opening anything.
3. **The site is part of the portfolio.** Its craft, accessibility and performance are evidence of Lera's level.
4. **Honest status.** Unfinished things are labelled as such (Android in review, CV coming soon); nothing is invented to fill a gap.
5. **Own product first.** Prevently, built end to end, is the lead story.

## Accessibility & Inclusion

Target WCAG 2.2 AA: text contrast of at least 4.5:1 in both themes, full keyboard use, meaningful screen reader names, and respect for reduced-motion settings. Ukrainian content is marked with `lang="uk"`.
