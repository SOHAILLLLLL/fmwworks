import Link from "next/link";
import type { Car } from "@/lib/types";
import { StampMark } from "@/components/StampMark";

export function CarCard({ car }: { car: Car }) {
  const subtitle = [car.year, car.make, car.model].filter(Boolean).join(" ");

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group flex items-center justify-between gap-4 border border-border bg-surface px-5 py-4 shadow-[0_1px_0_var(--border)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-4px_rgba(32,29,23,0.18)] focus-visible:-translate-y-0.5"
    >
      <div className="min-w-0">
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
