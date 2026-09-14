---
name: fmwworks
description: Garage operations tracker styled as a stamped time-rack — cars clock in and clock out, and nothing is ever overwritten.
colors:
  ground: "#f2efe8"
  surface: "#fbfaf6"
  surface-sunken: "#e8e3d7"
  ink: "#201d17"
  ink-muted: "#6d6558"
  border: "#d9d2c1"
  border-strong: "#b9b09a"
  stamp-red: "#a3291d"
  stamp-red-ink: "#7c1f16"
  stamp-red-tint: "#f4e2de"
  amber: "#ad7415"
  amber-ink: "#855810"
  amber-tint: "#f2e6cf"
  green: "#43594e"
  green-ink: "#303f37"
  green-tint: "#e2e8e3"
typography:
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  stamp:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontWeight: 600
    letterSpacing: "0.02em"
components:
  card-car:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "16px 20px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    padding: "10px 20px"
  button-punch:
    backgroundColor: "{colors.stamp-red}"
    textColor: "{colors.surface}"
    rounded: "999px"
    size: "64px"
---

# Design System: fmwworks

## Overview

**Creative North Star: "The Time Rack"**

fmwworks renders a car's life in the shop as a wall-mounted punch-clock rack, not a generic admin dashboard. Every car is a stamped card: it clocks in on intake and clocks out on delivery, and every status change in between adds a new stamp on top of the last rather than replacing it — the full history is always there to read, never silently overwritten. This is a working tool for garage staff, not a showcase; steel-gray and off-white grounds, ink-red/amber/green stamp colors, and a stamp-styled monospace for every registration number, VIN, and timestamp carry the identity, while the rest of the interface stays quiet, legible, and gets out of the way of the task.

The system deliberately avoids the two ruts a project like this defaults to: the soft-shadow, blue-sidebar SaaS dashboard template, and the racing/checkered-flag "auto shop" cliché. Urgency and status are read from stamp color and type weight, never from bolted-on colored badge chips.

**Key Characteristics:**
- Append-only stamp history — status changes are added, never overwritten, on every car record.
- Registration numbers, VINs, and timestamps always render in the stamp monospace; nothing else does.
- Stats are shown as a single ruled ledger strip, never as separate hero-metric cards.
- One card per row on mobile; a fluid multi-column rack on wider screens.

## Colors

A warm steel/paper palette at rest, with three stamp colors doing all the semantic work: ink-red for incoming/urgent, amber for in-progress work, settled green for anything delivered.

### Primary
- **Stamp Red** (`#a3291d`, ink `#7c1f16` on tint `#f4e2de`): the incoming/urgent stamp color, the punch-button ("register a new car") background, and form error states. Used sparingly — one accent action per screen.

### Secondary
- **Stamp Amber** (`#ad7415`, ink `#855810` on tint `#f2e6cf`): in-progress and ready status stamps.
- **Stamp Green** (`#43594e`, ink `#303f37` on tint `#e2e8e3`): outgoing/delivered status stamps and the "mark as outgoing" action.

### Neutral
- **Ground** (`#f2efe8`): page background — a warm steel/off-white, not pure white, matching a shop-floor paper-and-steel scene.
- **Surface** (`#fbfaf6`): card and panel background, one step lighter than ground.
- **Surface Sunken** (`#e8e3d7`): recessed areas (empty photo slots, dashed empty states).
- **Ink** (`#201d17`): primary text and the sign-in button fill.
- **Ink Muted** (`#6d6558`): secondary text, labels, timestamps in prose.
- **Border / Border Strong** (`#d9d2c1` / `#b9b09a`): hairline dividers and input borders.

Dark mode exists (see `globals.css` `prefers-color-scheme` block) inverting to a near-black steel ground with brightened stamp inks for contrast; it has not been visually inspected as thoroughly as light mode.

### Named Rules
**The One Stamp Rule.** A car's status is communicated by exactly one device — its stamp mark (border + ink color + label) — never duplicated as a separate colored badge, dot, or icon elsewhere on the same card.

## Typography

**Body Font:** Inter (with system-ui, sans-serif fallback)
**Stamp/Data Font:** IBM Plex Mono (with ui-monospace, monospace fallback)

**Character:** A quiet workhorse sans carries every sentence of UI copy; the stamp monospace is reserved entirely for data that is literally stamped, measured, or logged — registration numbers, VINs, prices, and timestamps — so its appearance always means "this is a recorded fact."

### Hierarchy
- **Display** (semibold, `text-2xl`–`text-4xl`): car registration number on cards and the detail page header, always in the stamp monospace.
- **Title** (semibold, `text-xl`): page headings ("All cars", "Incoming", "Car details").
- **Body** (regular, `text-sm`): all prose, labels, form text, in Inter.
- **Label** (semibold, `text-xs`, `0.1em`–`0.14em` tracking, uppercase): section headers ("STAMP HISTORY", "PARTS INSTALLED") and the stamp's own status word.

### Named Rules
**The Mono-Means-Recorded Rule.** IBM Plex Mono appears only on registration numbers, VINs, prices, and timestamps — never as a generic "technical" flourish elsewhere.

## Layout

Single content column, `max-w-5xl`, centered, with generous horizontal padding (`px-4` mobile, `px-6` desktop). The car rack is a CSS grid: one column on mobile (one card per row, as required), two columns from `sm`, three from `xl`. Stat/income figures render as one bordered strip with internal vertical rules (a ledger row), never as separate cards. Vertical rhythm favors more space above a section heading than below it. The top nav is sticky, its tab row scrolls horizontally on narrow viewports rather than wrapping or clipping. A single fixed punch-button ("+", register a new car) sits bottom-right on every screen except the register flow itself.

## Elevation & Depth

Mostly flat: cards sit on a one-pixel border with no ambient shadow at rest. Depth is reserved for interactive lift — a car card gains a soft offset shadow and rises 2px on hover/focus, signaling "this is the thing you're about to open." The punch-button carries a permanent soft red-tinted shadow since it's a floating, always-available action.

### Shadow Vocabulary
- **Card hover** (`0 6px 16px -4px rgba(32,29,23,0.18)`): car card hover/focus lift.
- **Punch button** (`0 10px 24px -6px rgba(122,31,22,0.55)`): permanent floating-action shadow, tinted from the stamp-red ink.

### Named Rules
**The Flat-Until-Touched Rule.** Nothing carries a shadow at rest except the one permanently-floating action (the punch button). Every other shadow is a response to hover or focus.

## Shapes

Square corners throughout — no rounded rectangles on cards, inputs, or buttons — except the punch-button, which is a true circle (a physical push-button), and the status stamp marks, which are square-cornered but rotated slightly (-1.5deg) to read as an actual rubber stamp impression rather than a UI chip.

## Components

### Buttons
- **Shape:** square corners, no radius.
- **Primary:** ink-black fill (`#201d17`), surface-colored text, `10px 20px` padding.
- **Destructive/close-out:** 2px stamp-green border, transparent fill, green-tinted hover — used only for "mark as outgoing."
- **Ghost/ text link:** ink-muted text, no border, underline on the few inline actions ("Skip this angle").
- **Punch (FAB):** 64px circle, stamp-red fill, white plus-icon, permanent shadow; the one recurring floating action across the app.

### Cards / Containers
- **Corner Style:** square (no radius) everywhere.
- **Background:** surface (`#fbfaf6`) on ground (`#f2efe8`).
- **Shadow Strategy:** flat at rest, lift on hover (see Elevation).
- **Border:** 1px `border` color hairline.
- **Internal Padding:** `16px 20px` on car cards, `16px` on form/panel blocks.

### Inputs / Fields
- **Style:** 1px `border-strong` outline, `ground`-colored fill, square corners.
- **Focus:** border shifts to full `ink` color; no glow or ring.
- **Error:** stamp-red border and tinted background on the message, not the field itself.

### Navigation
- Sticky top bar: wordmark in stamp monospace (uppercase, tracked), tabs as bordered pills with the active tab on a `surface` fill, inactive tabs transparent with muted text. Horizontally scrollable on narrow viewports rather than wrapping.

### Signature Component: Stamp Mark
A rotated, bordered rectangle (never a filled pill) carrying the status word (bold, uppercase, tracked) and a date, colored per status (red/amber/green). It appears on every car card and at the top of the detail page, and is the one visual device the whole system is built around — see "The One Stamp Rule" above.

### Signature Component: Stamp Timeline
An append-only vertical list on the car detail page: each entry is a status word, a timestamp in the stamp monospace, and an optional note, connected by a thin vertical rule with an open-circle marker in the status color. New entries are always added at the top; nothing is ever edited or removed.

## Do's and Don'ts

### Do:
- **Do** keep registration numbers, VINs, prices, and timestamps in the stamp monospace (IBM Plex Mono) everywhere they appear.
- **Do** render status via the Stamp Mark component's border/ink color, never as an additional colored dot or pill on the same element.
- **Do** keep the car rack at one column on mobile; widen only from `sm` and up.
- **Do** show income/stats as a single bordered ledger strip with internal rules, not as separate metric cards.
- **Do** append new stamp-timeline entries rather than editing or replacing prior ones.

### Don't:
- **Don't** add rounded corners to cards, inputs, or buttons — square corners are the system, with the punch-button circle and rotated stamp marks as the only deliberate exceptions.
- **Don't** introduce a second color-coding device (a badge, an icon, a colored left border) alongside the Stamp Mark to indicate status or urgency — see "The One Stamp Rule."
- **Don't** use IBM Plex Mono for ordinary UI copy or labels; it signals "recorded data" and loses that meaning if used decoratively.
- **Don't** show the "register a new car" punch-button on the register flow itself — it's already the active task there.
