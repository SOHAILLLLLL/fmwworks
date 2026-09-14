import Image from "next/image";
import type { CarPhoto } from "@/lib/types";
import { PHOTO_ANGLES } from "@/lib/types";

export function PhotoStrip({ photos, publicUrl }: { photos: CarPhoto[]; publicUrl: (path: string) => string }) {
  if (photos.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {PHOTO_ANGLES.map(({ key, label }) => {
        const photo = photos.find((p) => p.angle === key);
        if (!photo) return null;
        return (
          <div key={key} className="flex flex-col gap-1">
            <div className="relative aspect-square overflow-hidden border border-border bg-surface-sunken">
              <Image
                src={publicUrl(photo.storage_path)}
                alt={`${label} photo`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
            <span className="text-center text-[0.65rem] uppercase tracking-[0.06em] text-ink-muted">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
