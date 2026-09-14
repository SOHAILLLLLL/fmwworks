# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Frontend: delegated — user asked for "best frontend framework" paired with an explicit choice of Supabase as the backend. Recommendation: Next.js (React) + Supabase. Reasoning: Supabase (Postgres + built-in auth + realtime) pairs naturally with Next.js for an internal, auth-gated business web app — Supabase Auth covers the "members of company only" access requirement, Postgres suits relational data (cars, parts, installations, transactions), and realtime/SSR fit a stats/dashboard-heavy tool well.
Backend: Supabase (explicit user choice).

## Users

Employees ("members of the company") of a car garage — the only people who can access the app. They use it day-to-day on the shop/office floor to track vehicles moving through the garage and to check business stats.

## Product Purpose

An internal operations tool for a garage to track cars moving through the business: which cars are incoming, which parts are installed in which car, and overall stats and income generated from outgoing (sold/serviced) cars. Success means staff have one place to see vehicle status, parts history per car, and financial performance instead of scattered records.

## Positioning

An all-in-one workflow tool tailored to this garage's actual process — incoming car intake, per-car parts/installation tracking, and income/stats reporting in one system, replacing the need for separate spreadsheets or generic inventory/CRM tools.

## Operating Context

- Access restricted to company employees only (internal tool, not public-facing).
- Core workflows: logging incoming cars, recording parts installed per car, viewing aggregate stats, and tracking income from outgoing cars.

## Capabilities and Constraints

Confirmed capabilities:
- Track incoming cars; move a car to outgoing when it leaves.
- Track which parts are installed in which car.
- Show stats/analytics, including income totals from outgoing cars.
- Homepage lists all cars as cards (one per row on mobile, responsive grid on wider screens), with a persistent "+" action to register a new car.
- Two top-level views: Incoming cars and Outgoing cars (outgoing view carries income/stats).
- Registering a car uses a guided photo-capture wizard: on-screen frame/silhouette overlays step the user through required angles (front, back, left side, right side, dashboard/odometer, plate close-up) with instructional copy per step. This is a UX-guided flow, not an AI vision service — no photo is sent to an external model for validation, and registration number/other fields are entered manually by the user after photos are captured.
- Authentication: admin-invited only. No public sign-up page. An admin/owner adds an employee via Supabase, the employee sets a password through an invite/reset link, then logs in with email + password. Supabase Auth (email/password) is the mechanism.

Undecided / open (not yet specified by user):
- Exact car intake fields beyond registration number (make/model/VIN/customer, etc.) — proposed defaults will be used unless corrected.
- Parts catalog/inventory management scope (is parts inventory tracked, or just installation records?).
- Definition of "outgoing" (sold vs. serviced-and-returned) and how income/pricing is captured.
- Roles/permissions within the company (e.g. mechanic vs. manager vs. owner) — currently everyone with an account sees/does the same things.
- Reporting/stats requirements beyond income totals (what other metrics, what time ranges).

## Accessibility & Inclusion

No product-specific accessibility requirement established yet.
