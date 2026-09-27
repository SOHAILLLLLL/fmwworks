import Image from "next/image";
import Link from "next/link";
import type { CarWithThumbnail } from "@/lib/types";
import { CAR_STATUS_LABEL } from "@/lib/types";
import { statusStyle } from "@/lib/status-style";
import { formatMoney, formatStampDate } from "@/lib/format";

export function CarCard({ car }: { car: CarWithThumbnail }) {
  const subtitle = [car.year, car.make, car.model].filter(Boolean).join(" ");
  const style = statusStyle(car.status);
  const isOutgoing = car.status === "outgoing" && car.price !== null;

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group flex flex-col overflow-hidden border border-border bg-surface shadow-[0_1px_0_var(--border)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(32,29,23,0.22)] focus-visible:-translate-y-0.5"
    >
      <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-surface-sunken">
        {car.thumbnailUrl ? (
          <Image
            src={car.thumbnailUrl}
            alt={`${car.registration_number} photo`}
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-12 w-12 text-ink-muted opacity-40"
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
          </div>
        )}
        <span
          className="stamp-numerals absolute right-2.5 top-2.5 border px-2 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.1em] backdrop-blur-sm"
          style={{ borderColor: style.dot, color: style.ink, background: "color-mix(in srgb, var(--surface) 82%, transparent)" }}
        >
          {CAR_STATUS_LABEL[car.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="stamp-numerals truncate font-mono text-lg font-bold tracking-wide text-ink">
            {car.registration_number}
          </p>
          {isOutgoing ? (
            <p className="stamp-numerals mt-0.5 truncate font-mono text-sm font-semibold text-green-ink">
              {formatMoney(car.price)}
              <span className="ml-1.5 font-sans text-xs font-normal text-ink-muted">
                · delivered {formatStampDate(car.outgoing_date!)}
              </span>
            </p>
          ) : (
            <p className="mt-0.5 truncate text-sm text-ink-muted">{subtitle || "Details pending"}</p>
          )}
        </div>

        <span className="mt-auto inline-flex items-center justify-center border-2 border-stamp-red px-4 py-2 text-center text-sm font-semibold uppercase tracking-[0.04em] text-stamp-red-ink transition-colors group-hover:bg-stamp-red-tint">
          View details
        </span>
      </div>
    </Link>
  );
}
