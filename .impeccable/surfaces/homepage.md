---
version: 1
slug: "homepage"
primary_target: "homepage"
related_targets: []
---

# Surface: Homepage + car registration + incoming/outgoing

## Scope and visitor mode

Operate. Primary surfaces: homepage (car rack), car detail, car registration wizard, incoming/outgoing views with income stats, login (admin-invited auth). All company employees, same access level.

## Audience, job, action, proof, constraints

Garage staff, day-to-day, on shared desktop or personal phone browser. Job: see every car's status at a glance, register a new car fast, track parts/notes/status per car, see income from outgoing cars. Constraints: Next.js + Supabase (PRODUCT.md); Supabase Auth email/password, admin-invited only, no public signup; photo capture is a guided UI wizard, not an AI vision service.

## Direction contract

THESIS: The car's journey through the shop is told as a stamped time-rack card, not a generic dashboard tile — every status change adds a stamp on top of the last rather than replacing it, refusing the soft-shadow SaaS-card default.

OWN-WORLD: Steel-gray/off-white ground, ink-red stamp accent for fresh/urgent, muted amber for in-progress, settled green-gray for done/outgoing. Stamp-styled monospace for VIN/registration numbers, timestamps, and IDs; a quiet workhorse sans for all body text and labels. Urgency reads as type-scale/weight jumps, never colored badges.

STORY: Staff land on the rack of car cards, see each one's plate, make/model, and most recent stamp at a glance, tap a card for its full stamp history, parts, and notes, or tap the punch-button "+" to register a new car through the guided photo wizard, ending on outgoing cars closed out with a final price feeding the income stats.

FIRST VIEWPORT: A single-column rack of car cards on mobile (one per row), a fluid multi-column rack on wider screens; each card shows plate/registration large in stamp-mono, make/model beneath, and the latest stamp (date + status word) at bottom in its status color; the "+" register action is a fixed punch-button, bottom-right on mobile, not a subtle icon.

FORM: candidate 6 of 7 on the ranked list ("The Time Rack" — in/out stamp-card metaphor), assigned by the direction roll; seed key f70474cc.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

Registering a car: tapping "+" opens a full-screen guided capture wizard with a silhouette overlay per required angle (front, back, left, right, dashboard/odometer, plate close-up) before the registration-number and detail form.

## Unresolved decisions

Exact intake fields beyond registration number; parts catalog vs. free-text installation entries; outgoing definition and pricing capture; whether roles will ever differ.
