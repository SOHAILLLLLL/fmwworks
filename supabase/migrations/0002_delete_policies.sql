-- Adds delete permissions needed for the car-deletion feature.
-- Run this once in the Supabase SQL editor for an already-provisioned project
-- (a fresh project should just use the updated supabase/schema.sql instead).

create policy "Authenticated staff can delete cars" on cars
  for delete to authenticated using (true);

create policy "Authenticated staff can delete stamps" on car_stamps
  for delete to authenticated using (true);

create policy "Authenticated staff can delete parts" on car_parts
  for delete to authenticated using (true);

create policy "Authenticated staff can delete photos" on car_photos
  for delete to authenticated using (true);

create policy "Authenticated staff can delete car photo files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'car-photos');
