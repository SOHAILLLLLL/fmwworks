"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PHOTO_ANGLES, type PhotoAngleKey } from "@/lib/types";
import { CameraCapture } from "@/components/CameraCapture";
import { createClient } from "@/lib/supabase/client";
import { createCar, type UploadedPhoto } from "@/app/(app)/register/actions";

type CapturedPhoto = { blob: Blob; previewUrl: string };

const TOTAL_STEPS = PHOTO_ANGLES.length + 1;

function slugify(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "CAR";
}

export function PhotoWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<Partial<Record<PhotoAngleKey, CapturedPhoto>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState({
    registrationNumber: "",
    make: "",
    model: "",
    year: "",
    customerName: "",
    customerPhone: "",
    notes: "",
  });

  const isPhotoStep = step < PHOTO_ANGLES.length;
  const angle = isPhotoStep ? PHOTO_ANGLES[step] : null;
  const capturedCount = Object.keys(photos).length;

  const handleCapture = useCallback(
    (key: PhotoAngleKey, blob: Blob, previewUrl: string) => {
      setPhotos((prev) => ({ ...prev, [key]: { blob, previewUrl } }));
    },
    [],
  );

  const handleRetake = useCallback((key: PhotoAngleKey) => {
    setPhotos((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const canSubmit = useMemo(
    () => details.registrationNumber.trim().length > 0 && !submitting,
    [details.registrationNumber, submitting],
  );

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const supabase = createClient();
      const slug = slugify(details.registrationNumber);
      const uploaded: UploadedPhoto[] = [];

      for (const { key } of PHOTO_ANGLES) {
        const captured = photos[key];
        if (!captured) continue;
        const path = `${slug}/${key}-${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("car-photos")
          .upload(path, captured.blob, { contentType: "image/jpeg" });
        if (uploadError) throw new Error(uploadError.message);
        uploaded.push({ angle: key, storagePath: path });
      }

      const result = await createCar({ ...details, photos: uploaded });
      if ("error" in result) {
        setError(result.error);
        setSubmitting(false);
        return;
      }
      router.push(`/cars/${result.carId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-xs text-ink-muted">{capturedCount} of {PHOTO_ANGLES.length} photos</p>
      </div>

      {isPhotoStep && angle && (
        <>
          <div>
            <h1 className="text-xl font-semibold text-ink">{angle.label}</h1>
            <p className="mt-1 text-sm text-ink-muted">{angle.instruction}</p>
          </div>
          <CameraCapture
            key={angle.key}
            angle={angle.key}
            captured={photos[angle.key]?.previewUrl ?? null}
            onCapture={(blob, previewUrl) => handleCapture(angle.key, blob, previewUrl)}
            onRetake={() => handleRetake(angle.key)}
          />
          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-4">
              {!photos[angle.key] && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="text-sm text-ink-muted underline decoration-border-strong underline-offset-4 hover:text-ink"
                >
                  Skip this angle
                </button>
              )}
              <button
                type="button"
                disabled={!photos[angle.key]}
                onClick={() => setStep((s) => s + 1)}
                className="bg-ink px-5 py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {!isPhotoStep && (
        <>
          <div>
            <h1 className="text-xl font-semibold text-ink">Car details</h1>
            <p className="mt-1 text-sm text-ink-muted">Last step — enter the registration and any details you have.</p>
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Registration number *</span>
              <input
                type="text"
                required
                value={details.registrationNumber}
                onChange={(e) => setDetails((d) => ({ ...d, registrationNumber: e.target.value }))}
                placeholder="e.g. AB12 CDE"
                className="stamp-numerals border border-border-strong bg-ground px-3 py-2 font-mono text-sm uppercase text-ink outline-none focus:border-ink"
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Make</span>
                <input
                  type="text"
                  value={details.make}
                  onChange={(e) => setDetails((d) => ({ ...d, make: e.target.value }))}
                  className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Model</span>
                <input
                  type="text"
                  value={details.model}
                  onChange={(e) => setDetails((d) => ({ ...d, model: e.target.value }))}
                  className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Year</span>
              <input
                type="number"
                value={details.year}
                onChange={(e) => setDetails((d) => ({ ...d, year: e.target.value }))}
                className="stamp-numerals w-28 border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Customer name</span>
                <input
                  type="text"
                  value={details.customerName}
                  onChange={(e) => setDetails((d) => ({ ...d, customerName: e.target.value }))}
                  className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Customer phone</span>
                <input
                  type="tel"
                  value={details.customerPhone}
                  onChange={(e) => setDetails((d) => ({ ...d, customerPhone: e.target.value }))}
                  className="stamp-numerals border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Notes</span>
              <textarea
                value={details.notes}
                onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                rows={3}
                className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
            </label>
          </div>

          {error && (
            <p role="alert" className="border border-stamp-red bg-stamp-red-tint px-3 py-2 text-sm text-stamp-red-ink">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="bg-stamp-red px-5 py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              {submitting ? "Registering…" : "Register car"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
