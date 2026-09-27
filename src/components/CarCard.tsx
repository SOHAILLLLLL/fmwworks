import Image from "next/image";
import Link from "next/link";
import type { CarWithThumbnail } from "@/lib/types";
import { StampMark } from "@/components/StampMark";

export function CarCard({ car }: { car: CarWithThumbnail }) {
  const subtitle = [car.year, car.make, car.model].filter(Boolean).join(" ");

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group flex items-center gap-4 border border-border bg-surface px-4 py-4 shadow-[0_1px_0_var(--border)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-4px_rgba(32,29,23,0.18)] focus-visible:-translate-y-0.5 sm:px-5"
    >
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-border bg-surface-sunken sm:h-20 sm:w-20">
        {car.thumbnailUrl ? (
          <Image
            src={car.thumbnailUrl}
            alt={`${car.registration_number} photo`}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-7 w-7 text-ink-muted opacity-50"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.5 4.8 8.6a2 2 0 0 1 1.88-1.3h10.64a2 2 0 0 1 1.88 1.3L21 13.5M3 13.5v4.25a1 1 0 0 0 1 1h1.25a1 1 0 0 0 1-1V16.5h9.5v1.25a1 1 0 0 0 1 1H18a1 1 0 0 0 1-1V13.5M3 13.5h18M6.75 16.5h.01M17.25 16.5h.01"
            />
          </svg>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="stamp-numerals truncate font-mono text-xl font-semibold tracking-wide text-ink sm:text-2xl">
          {car.registration_number}
        </p>
        <p className="mt-1 truncate text-sm text-ink-muted">
          {subtitle || "Details pending"}
        </p>
      </div>
      <StampMark status={car.status} date={car.outgoing_date ?? car.intake_date} />
    </Link>
  );
}
