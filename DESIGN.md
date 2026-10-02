---
name: Master Imóveis
description: Blue-hour Vitória. The page rides an elevator from the térreo to the cobertura.
colors:
  ink-night: "#0b111c"
  ink-deep: "#070b12"
  ink-panel: "#121a28"
  ink-raise: "#1a2536"
  stone-travertine: "#ebe5db"
  stone-light: "#f5f1ea"
  stone-shade: "#ddd5c8"
  on-dark: "#f3efe8"
  text-ink: "#141820"
  text-slate: "#50575f"
  master-red: "#c72923"
  master-red-press: "#a8201b"
  error-red: "#a3211c"
  field-stroke: "#8c8478"
  placeholder: "#6b6f75"
  white: "#ffffff"
typography:
  wordmark:
    fontFamily: "Anton, Impact, Arial Narrow, sans-serif"
    fontSize: "min(26cqi, 27vw)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.012em"
  display:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.35rem, 1.2rem + 3.9vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.018em"
    fontVariation: "'opsz' 56"
  display-xl:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.8rem, 1.2rem + 4.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 72"
  headline:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(2.5rem, 1.35rem + 3.2vw, 4.8rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.018em"
    fontVariation: "'opsz' 72"
  numeral:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(4.6rem, 2.6rem + 6vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
    fontFeature: "'lnum' 1, 'tnum' 1"
    fontVariation: "'opsz' 96"
  list:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "clamp(1.4rem, 1rem + 1.15vw, 2.15rem)"
    fontWeight: 400
    lineHeight: 1.38
    fontVariation: "'opsz' 48"
  subhead:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, Georgia, serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.1
    fontVariation: "'opsz' 40"
  lede:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.94rem + 0.28vw, 1.18rem)"
    fontWeight: 400
    lineHeight: 1.55
  title:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1.16rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  input:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.45
  button:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
  label:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.18em"
  logo:
    fontFamily: "Anton, Impact, Arial Narrow, sans-serif"
    fontSize: "1.62rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.025em"
  logo-sub:
    fontFamily: "Albert Sans, system-ui, sans-serif"
    fontSize: "0.54rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.66em"
rounded:
  tag: "3px"
  field: "6px"
  card: "8px"
  panel: "12px"
  pill: "99px"
spacing:
  gutter: "clamp(1.25rem, 4.6vw, 5.5rem)"
  section: "clamp(5rem, 10vw, 9rem)"
  header: "5.25rem"
  content-max: "88rem"
components:
  button-primary:
    backgroundColor: "{colors.master-red}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: "3.25rem"
    padding: "0 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.master-red-press}"
  button-ink:
    backgroundColor: "{colors.ink-night}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: "3.25rem"
    padding: "0 1.5rem"
  button-ink-hover:
    backgroundColor: "{colors.ink-raise}"
  button-line-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    height: "3.25rem"
    padding: "0 1.5rem"
  card-listing:
    backgroundColor: "{colors.stone-light}"
    textColor: "{colors.text-ink}"
    rounded: "{rounded.card}"
    padding: "1.3rem"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.text-ink}"
    rounded: "{rounded.field}"
    height: "3rem"
    padding: "0.75rem 0.9rem"
  tag-annotation:
    backgroundColor: "rgba(9, 14, 23, 0.6)"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "0.58rem 0.8rem"
  search-dock:
    backgroundColor: "rgba(9, 14, 23, 0.74)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.panel}"
    padding: "1.1rem 1.25rem 1.25rem"
    width: "min(25.5rem, 31vw)"
---

# Design System: Master Imóveis

## Overview

**Creative North Star: "Do térreo à cobertura"**

The page is the building Master sells. It is lit at blue hour in Vitória, the moment when the towers of Praia do Canto turn their windows on and the sky is still blue. Everything takes its light and color from that scene. Night-ink fields carry the photographs and the ride; travertine fields, the stone of a lobby floor, carry reading and choosing. Master's red belongs to the brand's three rising blocks. On the page it is the lit edge of whatever is moving, plus one decisive action per section.

The signature is architectural, not decorative. The MASTER wordmark stands at building scale behind the real skyline through a matte cut from the photograph. The scroll then rides an elevator: a pinned stage where each floor is a category of the inventory, a Bodoni floor numeral steps through every level, and annotation tags hang off the photos on hairline leader lines, like tags on a sales-stand scale model. Density is low and spacing generous; every section shows one photograph and one voice.

The build rejects the generic real-estate template: a hero, a search bar and a grid of cards with nothing that belongs to the place. It also rejects any look that could belong to a city other than Vitória.

**Key Characteristics:**
- Two grounds only: night ink and travertine, alternating by section.
- Anton for the brand wordmark only; Bodoni Moda for display and numerals; Albert Sans for everything you read and operate.
- Real Vitória photography (public-domain MTur series) for place; labeled stock for illustrative interiors.
- Motion is spatial and scroll-driven: the word sinks behind towers, floors enter from above, numerals step.
- Content is visible by default; motion is an enhancement layer.

## Colors

A two-field night-and-stone palette with one brand red used as light, never as fill for decoration.

### Primary
- **Master Red** (#c72923): the brand red from the logo. Used on the moving edges: the active tab underline, the elevator rail's progress and marker, the counter's name bar, the hand-drawn swash under the hero headline, focus rings and text selection. Also used as the fill of each section's single primary action (Buscar imóveis, Ver todos os imóveis, Enviar pelo WhatsApp, Chamar no WhatsApp).
- **Pressed Red** (#a8201b): hover and pressed state of red actions.

### Neutral
- **Blue-Hour Ink** (#0b111c): the night field. Used for the ascent stage, the neighborhoods section, ink buttons and the mobile search band.
- **Deep Night** (#070b12): the deepest field. Used for the footer, the full-screen menu, the owners band and the scrollbar track.
- **Panel Ink** (#121a28) and **Raised Ink** (#1a2536): photo placeholders and hover of ink buttons.
- **Travertine** (#ebe5db): the light field. Used for listings, the About section and the contact section.
- **Lobby Stone** (#f5f1ea): cards, the services strip and the owner form; also the light text color on photos (as On-Dark, #f3efe8).
- **Stone Shade** (#ddd5c8): image and map placeholders on stone.
- **Ink Text** (#141820) and **Slate Text** (#50575f): primary and secondary text on stone (slate holds 5.6:1 on travertine).
- **Field Stroke** (#8c8478): input borders, kept at 3:1 or more against white.
- **Error Red** (#a3211c): validation messages and invalid field borders.

### Named Rules
**The Moving Edge Rule.** Red marks what moves or what is active: underlines that slide, the rail that fills, the swash that draws, the pressed state. The only red fill at rest is the one primary action of a section. No red headings, red backgrounds or red decoration.

**The Two Fields Rule.** A section is either night ink or travertine. Photographs sit on ink. Never introduce a third ground or a gradient field.

## Typography

**Wordmark Font:** Anton (with Impact, Arial Narrow)
**Display Font:** Bodoni Moda (with Bodoni 72, Didot, Georgia)
**Body Font:** Albert Sans (with system-ui)

**Character:** Anton is the heavy condensed voice of Master's own logotype, used at the scale of a building. Bodoni Moda brings the hairline elegance of the reference landing pages, tuned with a lower optical size (56–72) so its hairlines survive on photographs. Albert Sans carries the interface with quiet geometric clarity and tracked capitals for labels.

### Hierarchy
- **Wordmark** (Anton 400, min(26cqi, 27vw), line-height 1): the hero MASTER behind the skyline, and the outlined MASTER that closes the footer.
- **Logo** (Anton 1.62rem over Albert Sans 600 0.54rem tracked 0.66em): the header and footer lockup next to the three-block mark. The small IMÓVEIS line is part of the logotype, not a text size.
- **Display XL** (Bodoni Moda 400, clamp(2.8rem → 6rem), 1): the ascent's opening line only.
- **Display** (Bodoni Moda 400, clamp(2.35rem → 5.5rem), 1.08): the hero headline and the ascent finale; italics for the emphasized word.
- **Headline** (Bodoni Moda 400, clamp(2.5rem → 4.8rem), 1.02): section titles, floor titles and the full-screen menu, one italic word per title at most.
- **List** (Bodoni Moda 400, clamp(1.4rem → 2.15rem), 1.38): neighborhood names as links.
- **Subhead** (Bodoni Moda 400, 1.6rem, 1.1): listing prices and the owner form title.
- **Numeral** (Bodoni Moda 400, clamp(4.6rem → 9rem), 0.92, lining tabular figures): the elevator counter, floor numbers, and the "30" in the About heading.
- **Title** (Albert Sans 600, 1.16rem, 1.25): card titles, service names.
- **Lede** (Albert Sans 400, clamp(1rem → 1.18rem), 1.55): the first paragraph of a section and the text under floor titles.
- **Body** (Albert Sans 400, 1.0625rem, 1.6; 1rem on phones): paragraphs, capped at about 31–36rem measure.
- **Input** (Albert Sans 400, 1rem): fields and selects, never smaller, so phones do not zoom.
- **Small** (Albert Sans 400, 0.875rem, 1.45): card places and specs, service lines, secondary buttons, form status.
- **Caption** (Albert Sans 500, 0.8rem): photo captions, hints, errors, notes, the hero's CRECI and hours line.
- **Label** (Albert Sans 600, 0.72rem, 0.16–0.24em tracking, uppercase): field labels, tags, the counter's "Andar", contact keys. Never below 0.72rem, never used as an eyebrow above a heading.

### Named Rules
**The Stepping Numeral Rule.** Floor numbers step through every integer (T, 01, 02 … 16 … C) in tabular Bodoni; they never tween through fractions or float between values.

**The Short Caps Rule.** Uppercase is for labels of a few words. Captions and credits are set in sentence case.

## Layout

Full-bleed sections with a fluid gutter (clamp(1.25rem, 4.6vw, 5.5rem)) and generous vertical rhythm (clamp(5rem, 10vw, 9rem)); content caps at 88rem. The hero is one viewport tall (at least 620px). Its photo stage keeps the photograph's own aspect ratio (2560:1708), anchored to the top, so the skyline and the word hold their relationship at every viewport. The headline sits bottom-left, the search dock bottom-right and a thin rail on the far right.

Two-column splits (figure + content, content + form, info + map) collapse to one column at 1023px. At the same breakpoint the hero becomes two rows (first screen, then the search band), and listing cards become a horizontal snap carousel. At 640px everything stacks to a single column; the elevator counter moves to the bottom-left and one tag per floor remains.

The ascent is a pinned 100svh stage of about 0.55 viewport heights of scroll per timeline unit (0.5 on phones). Without JavaScript or with reduced motion it is a plain vertical list of full-bleed floors.

## Elevation & Depth

Depth comes from photography and layering, not from lifted surfaces. The page is flat at rest; shadows are long, soft and offset downward, used only for floating panels over photos and for hover lift. Blur appears only where text must stay legible over a photograph: the search dock, tags, floor link pills, the header's solid state.

### Shadow Vocabulary
- **Dock** (`box-shadow: 0 30px 60px -28px rgba(0, 0, 0, 0.75)`): the search dock over the hero.
- **Form** (`box-shadow: 0 34px 80px -34px rgba(0, 0, 0, 0.8)`): the owner form over the keys photo.
- **Card Lift** (`box-shadow: 0 26px 44px -26px rgba(11, 17, 28, 0.5)`): listing card on hover, with a 5px rise.
- **Float** (`box-shadow: 0 14px 34px -12px rgba(0, 0, 0, 0.55)`): the floating WhatsApp button.

### Named Rules
**The Skyline Rule.** Depth between type and photograph comes from a matte derived from the photograph itself (sky versus facades). Never approximate a building's contour with a hand-drawn polygon or a geometric mask.

## Shapes

The shapes echo architecture. Pills (99px) for every action and chip, circles for arrow controls (3.4–4.6rem), small 3px corners on badges and tags, 6px on fields, 8px on cards and photo frames, 12px on the large floating panels. The entrance to the ascent is an arch: a clip-path inset with rounded top corners that opens to full screen. Borders are 1px hairlines at 13–14% opacity; leader lines are 1px at 70% with a 0.5–0.62rem dot.

## Components

### Buttons
- **Shape:** full pill (99px), 3.25rem tall (2.75rem small).
- **Primary:** Master Red with white text, Albert Sans 600 0.95rem, 0 1.5rem padding. One per section.
- **Hover / Focus:** Pressed Red on hover; the trailing arrow slides 3px right; 2px red focus ring with 3px offset; 0.97 scale on press.
- **Ink:** Blue-Hour Ink on stone, Raised Ink on hover.
- **Line on dark:** transparent with a 42% On-Dark hairline, full On-Dark on hover.
- **Circle arrow:** 3.6rem outlined circle (dark on stone) or 4.6rem solid stone circle (on photos); fills red when pressed.

### Chips
- **Floor links:** 2.75rem pills with a 34% On-Dark hairline and a light blur over photos; they fill red on press.
- **Badges:** Lobby Stone with Ink Text, 3px corners, uppercase 0.7rem ("Venda", "Aluguel"); "Ilustrativo" chip in translucent ink at the top right of every illustrative card.

### Cards / Containers
- **Corner Style:** gently rounded (8px).
- **Background:** Lobby Stone with a 1px stone hairline.
- **Shadow Strategy:** flat at rest, Card Lift on hover; the photo scales to 1.05 over 1.4s.
- **Internal Padding:** 1.3rem; specs row separated by a hairline; price in Bodoni under a "Valor de exemplo" label.

### Inputs / Fields
- **Style:** white fields, 1px Field Stroke, 6px corners, 3rem minimum height (search selects on dark are borderless with a bottom hairline and a floating label).
- **Focus:** stroke turns Ink Text plus a 3px 22% red halo; on dark selects the bottom hairline turns red.
- **Error:** Error Red border and message below the field; the form shakes once (reduced motion: no shake).

### Navigation
- Transparent over the hero, solid ink with a blur after it. The header hides on scroll down and returns on scroll up; it stays hidden during the ascent. Links carry a 1px red underline that draws from the left on hover and marks the active section. Below 1024px, a "Menu" pill opens a full-screen night menu with Bodoni links, focus trap and Escape to close.

### Elevator (signature)
A pinned stage with stacked floors. The next floor enters from the top edge as a clip reveal while the current scene slides down and dims, so the camera seems to rise. A measured rail on the right has one tick per floor and a red marker and fill that climb. The counter at the bottom right has an "Andar" label, a stepping Bodoni numeral and the floor name after a red bar. Tags with a dot, a leader line and a translucent label appear after each floor settles. The ride ends by pulling back to Vitória at night.

### Annotation tag
A 0.62rem On-Dark dot with a soft ring, a 2.3rem hairline and an uppercase label in translucent ink. Tags stay out of the bottom-left text zone and within 15.5rem of the right edge.

## Do's and Don'ts

### Do:
- **Do** keep Master Red on moving edges and on the single primary action of a section (#c72923, pressed #a8201b).
- **Do** alternate night ink (#0b111c / #070b12) and travertine (#ebe5db) fields, with photographs on ink.
- **Do** set floor numbers and counters in tabular Bodoni Moda and step them one floor at a time.
- **Do** hang captions and tags on a dot plus a 1px leader line.
- **Do** derive any type-behind-architecture effect from a matte of the actual photograph.
- **Do** keep every section's content visible without JavaScript and under reduced motion.

### Don't:
- **Don't** put a kicker or eyebrow above a heading; floor levels sit beside the floor, never above its title.
- **Don't** use Anton for anything but the MASTER wordmark.
- **Don't** set labels below 0.72rem or uppercase whole captions.
- **Don't** use gradient text, colored side stripes, hard offset shadows or blur as decoration.
- **Don't** present stock interiors as Master's listings; illustrative cards carry the "Ilustrativo" chip and "Valor de exemplo".
