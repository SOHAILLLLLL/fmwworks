"use server";

import { createClient } from "@/lib/supabase/server";
import type { PhotoAngleKey } from "@/lib/types";

export interface UploadedPhoto {
  angle: PhotoAngleKey;
  storagePath: string;
}

export async function createCar(details: {
  registrationNumber: string;
  make: string;
  model: string;
  year: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  photos: UploadedPhoto[];
}): Promise<{ error: string } | { carId: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: car, error: carError } = await supabase
    .from("cars")
    .insert({
      registration_number: details.registrationNumber.trim().toUpperCase(),
      make: details.make.trim() || null,
      model: details.model.trim() || null,
      year: details.year ? Number(details.year) : null,
      customer_name: details.customerName.trim() || null,
      customer_phone: details.customerPhone.trim() || null,
      intake_notes: details.notes.trim() || null,
      status: "incoming",
      intake_date: new Date().toISOString(),
      created_by: user?.id ?? null,
    })
    .select()
    .single();

  if (carError || !car) {
    return { error: carError?.message ?? "Could not register this car." };
  }

  const { error: stampError } = await supabase.from("car_stamps").insert({
    car_id: car.id,
    status: "incoming",
    note: "Car registered",
    created_by: user?.id ?? null,
  });
  if (stampError) return { error: stampError.message };

  if (details.photos.length > 0) {
    const { error: photoError } = await supabase.from("car_photos").insert(
      details.photos.map((photo) => ({
        car_id: car.id,
        angle: photo.angle,
        storage_path: photo.storagePath,
      })),
    );
    if (photoError) return { error: photoError.message };
  }

  return { carId: car.id as string };
}
