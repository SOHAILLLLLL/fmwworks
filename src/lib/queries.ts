import { createClient } from "@/lib/supabase/server";
import type { Car, CarPart, CarPhoto, CarStamp, CarWithThumbnail } from "@/lib/types";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;
type CarRow = Car & { car_photos?: { angle: string; storage_path: string }[] | null };

function pickThumbnailPath(photos: CarRow["car_photos"]): string | null {
  if (!photos || photos.length === 0) return null;
  const front = photos.find((photo) => photo.angle === "front");
  return (front ?? photos[0]).storage_path;
}

function withThumbnail(supabase: SupabaseServerClient, row: CarRow): CarWithThumbnail {
  const { car_photos, ...car } = row;
  const path = pickThumbnailPath(car_photos);
  const thumbnailUrl = path
    ? supabase.storage.from("car-photos").getPublicUrl(path).data.publicUrl
    : null;
  return { ...car, thumbnailUrl };
}

export async function getAllCars(): Promise<CarWithThumbnail[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cars")
    .select("*, car_photos(angle, storage_path)")
    .order("intake_date", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as CarRow[]).map((row) => withThumbnail(supabase, row));
}

export async function getCarsByStatus(statuses: Car["status"][]): Promise<CarWithThumbnail[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cars")
    .select("*, car_photos(angle, storage_path)")
    .in("status", statuses)
    .order("intake_date", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as CarRow[]).map((row) => withThumbnail(supabase, row));
}

export async function getOutgoingStats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cars")
    .select("price")
    .eq("status", "outgoing");

  if (error) throw error;
  const cars = data ?? [];
  const totalIncome = cars.reduce((sum, car) => sum + (car.price ?? 0), 0);
  const count = cars.length;
  const average = count > 0 ? totalIncome / count : 0;

  return { totalIncome, count, average };
}

export async function getCarDetail(id: string) {
  const supabase = await createClient();

  const [carRes, stampsRes, partsRes, photosRes] = await Promise.all([
    supabase.from("cars").select("*").eq("id", id).single(),
    supabase
      .from("car_stamps")
      .select("*")
      .eq("car_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("car_parts")
      .select("*")
      .eq("car_id", id)
      .order("installed_at", { ascending: false }),
    supabase.from("car_photos").select("*").eq("car_id", id),
  ]);

  if (carRes.error) throw carRes.error;

  return {
    car: carRes.data as Car,
    stamps: (stampsRes.data ?? []) as CarStamp[],
    parts: (partsRes.data ?? []) as CarPart[],
    photos: (photosRes.data ?? []) as CarPhoto[],
  };
}
