"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { CarStatus } from "@/lib/types";

export async function addStamp(carId: string, formData: FormData) {
  const status = String(formData.get("status")) as CarStatus;
  const note = String(formData.get("note") ?? "").trim() || null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error: stampError } = await supabase.from("car_stamps").insert({
    car_id: carId,
    status,
    note,
    created_by: user?.id ?? null,
  });
  if (stampError) throw stampError;

  const { error: carError } = await supabase.from("cars").update({ status }).eq("id", carId);
  if (carError) throw carError;

  revalidatePath(`/cars/${carId}`);
  revalidatePath("/");
  revalidatePath("/incoming");
  revalidatePath("/outgoing");
}

export async function addPart(carId: string, formData: FormData) {
  const partName = String(formData.get("part_name") ?? "").trim();
  const costRaw = String(formData.get("cost") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!partName) return;

  const supabase = await createClient();
  const { error } = await supabase.from("car_parts").insert({
    car_id: carId,
    part_name: partName,
    cost: costRaw ? Number(costRaw) : null,
    notes,
    installed_at: new Date().toISOString(),
  });
  if (error) throw error;

  revalidatePath(`/cars/${carId}`);
}

export async function markOutgoing(carId: string, formData: FormData) {
  const priceRaw = String(formData.get("price") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim() || null;
  const price = priceRaw ? Number(priceRaw) : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const now = new Date().toISOString();

  const { error: carError } = await supabase
    .from("cars")
    .update({ status: "outgoing", price, outgoing_date: now })
    .eq("id", carId);
  if (carError) throw carError;

  const { error: stampError } = await supabase.from("car_stamps").insert({
    car_id: carId,
    status: "outgoing",
    note: note ?? (price ? `Delivered for ${price}` : "Delivered"),
    created_by: user?.id ?? null,
  });
  if (stampError) throw stampError;

  revalidatePath(`/cars/${carId}`);
  revalidatePath("/");
  revalidatePath("/incoming");
  revalidatePath("/outgoing");
}

export async function deletePart(carId: string, partId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("car_parts").delete().eq("id", partId);
  if (error) throw error;

  revalidatePath(`/cars/${carId}`);
}

export async function deleteCar(
  carId: string,
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  const confirmText = String(formData.get("confirm") ?? "").trim().toUpperCase();

  const supabase = await createClient();
  const { data: car, error: fetchError } = await supabase
    .from("cars")
    .select("registration_number")
    .eq("id", carId)
    .single();

  if (fetchError || !car) {
    return { error: "Could not find this car — it may already be deleted." };
  }

  if (confirmText !== car.registration_number.toUpperCase()) {
    return { error: "That registration number doesn't match. Nothing was deleted." };
  }

  const { data: photos } = await supabase
    .from("car_photos")
    .select("storage_path")
    .eq("car_id", carId);

  const { error: deleteError } = await supabase.from("cars").delete().eq("id", carId);
  if (deleteError) {
    return { error: deleteError.message };
  }

  if (photos && photos.length > 0) {
    await supabase.storage.from("car-photos").remove(photos.map((photo) => photo.storage_path));
  }

  revalidatePath("/");
  revalidatePath("/incoming");
  revalidatePath("/outgoing");

  return { success: true };
}
