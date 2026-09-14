import { createClient } from "@/lib/supabase/server";
import type { Car, CarPart, CarPhoto, CarStamp } from "@/lib/types";

export async function getAllCars(): Promise<Car[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("intake_date", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getCarsByStatus(statuses: Car["status"][]): Promise<Car[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .in("status", statuses)
    .order("intake_date", { ascending: false });

  if (error) throw error;
  return data ?? [];
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
