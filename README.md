# fmwworks — garage tracker

Internal tool for garage staff to track incoming cars, parts installed per car,
and income from outgoing cars. Company-only access.

## Stack

- Next.js 16 (App Router) + Tailwind CSS v4
- Supabase (Postgres + Auth + Storage)

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the Project URL and anon public key.
3. Copy `.env.local.example` to `.env.local` and fill in those two values.
4. Open the **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql) once. It creates the
   `cars`, `car_stamps`, `car_parts`, `car_photos` tables, row-level security
   policies, and the `car-photos` storage bucket.

## 2. Add staff accounts (admin-invited only)

There is no public sign-up page. To add an employee:

1. In the Supabase dashboard, go to **Authentication → Users → Add user**.
2. Enter their email and a temporary password (or use "Send invite" if you've
   configured an email provider), and share the credentials with them directly.
3. They sign in at `/login` with that email and password.

Everyone with an account currently has the same access — there are no
separate roles yet.

## 3. Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to
`/login` until you sign in with a staff account.

## How it's organized

- `/` — every car, as a stamped rack card.
- `/incoming` — cars still in the shop (incoming / in progress / ready).
- `/outgoing` — delivered cars plus an income ledger (total, count, average).
- `/register` — guided photo capture (front, back, both sides, dashboard,
  plate) followed by a details form; creates the car.
- `/cars/[id]` — full stamp history (append-only status timeline), parts
  installed, and the "stamp as outgoing" action that records the final price.

Photo capture uses the device camera (`getUserMedia`) with an on-screen
framing guide per angle, falling back to a plain file/camera picker if camera
access isn't available. No photo is sent to an external AI service — the
guidance is UI-only.

## Open decisions

A few things from the original brief are left as sensible defaults you may
want to change:

- **Currency** is formatted as USD in [`src/lib/format.ts`](src/lib/format.ts) — change the `currency` code there.
- **Intake fields** are registration number (required), make, model, year,
  customer name/phone, and notes — add more in `supabase/schema.sql` and the
  register wizard if you need them.
- **Roles/permissions** — everyone with an account can currently do
  everything; nothing prevents adding role-based access later.
- **Parts** are logged as free-text entries per car, not drawn from a shared
  parts catalog/inventory.
