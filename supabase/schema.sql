-- fmwworks garage tracker schema
-- Run this in the Supabase SQL editor for your project.

create type car_status as enum ('incoming', 'in_progress', 'ready', 'outgoing');

create table cars (
  id uuid primary key default gen_random_uuid(),
  registration_number text not null unique,
  make text,
  model text,
  year int,
  customer_name text,
  customer_phone text,
  status car_status not null default 'incoming',
  intake_notes text,
  price numeric,
  intake_date timestamptz not null default now(),
  outgoing_date timestamptz,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table car_stamps (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null references cars (id) on delete cascade,
  status car_status not null,
  note text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table car_parts (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null references cars (id) on delete cascade,
  part_name text not null,
  cost numeric,
  notes text,
  installed_at timestamptz not null default now()
);

create type photo_angle as enum ('front', 'back', 'left', 'right', 'dashboard', 'plate');

create table car_photos (
  id uuid primary key default gen_random_uuid(),
  car_id uuid not null references cars (id) on delete cascade,
  angle photo_angle not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index car_stamps_car_id_idx on car_stamps (car_id);
create index car_parts_car_id_idx on car_parts (car_id);
create index car_photos_car_id_idx on car_photos (car_id);
create index cars_status_idx on cars (status);

-- Row Level Security: any signed-in employee (no public signup exists,
-- accounts are admin-invited only) can read and write every table.
alter table cars enable row level security;
alter table car_stamps enable row level security;
alter table car_parts enable row level security;
alter table car_photos enable row level security;

create policy "Authenticated staff can read cars" on cars
  for select to authenticated using (true);
create policy "Authenticated staff can write cars" on cars
  for insert to authenticated with check (true);
create policy "Authenticated staff can update cars" on cars
  for update to authenticated using (true) with check (true);

create policy "Authenticated staff can read stamps" on car_stamps
  for select to authenticated using (true);
create policy "Authenticated staff can add stamps" on car_stamps
  for insert to authenticated with check (true);

create policy "Authenticated staff can read parts" on car_parts
  for select to authenticated using (true);
create policy "Authenticated staff can add parts" on car_parts
  for insert to authenticated with check (true);

create policy "Authenticated staff can read photos" on car_photos
  for select to authenticated using (true);
create policy "Authenticated staff can add photos" on car_photos
  for insert to authenticated with check (true);

-- Storage bucket for intake photos. Create it once (public read so the
-- app can render thumbnails via a plain public URL; writes are restricted
-- to signed-in staff).
insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do nothing;

create policy "Authenticated staff can upload car photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'car-photos');

create policy "Anyone can view car photos"
  on storage.objects for select
  using (bucket_id = 'car-photos');
