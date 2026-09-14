import { notFound } from "next/navigation";
import { getCarDetail } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { StampMark } from "@/components/StampMark";
import { StampTimeline } from "@/components/StampTimeline";
import { AddStampForm } from "@/components/AddStampForm";
import { AddPartForm } from "@/components/AddPartForm";
import { MarkOutgoingForm } from "@/components/MarkOutgoingForm";
import { PhotoStrip } from "@/components/PhotoStrip";
import { formatMoney, formatStampDate } from "@/lib/format";
import { addStamp, addPart, markOutgoing } from "./actions";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let detail;
  try {
    detail = await getCarDetail(id);
  } catch {
    notFound();
  }
  const { car, stamps, parts, photos } = detail;

  const supabase = await createClient();
  const publicUrl = (path: string) =>
    supabase.storage.from("car-photos").getPublicUrl(path).data.publicUrl;

  const boundAddStamp = addStamp.bind(null, car.id);
  const boundAddPart = addPart.bind(null, car.id);
  const boundMarkOutgoing = markOutgoing.bind(null, car.id);

  const subtitle = [car.year, car.make, car.model].filter(Boolean).join(" ");
  const partsCost = parts.reduce((sum, part) => sum + (part.cost ?? 0), 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="stamp-numerals font-mono text-3xl font-bold tracking-wide text-ink sm:text-4xl">
            {car.registration_number}
          </p>
          <p className="mt-1 text-sm text-ink-muted">{subtitle || "Details pending"}</p>
          {(car.customer_name || car.customer_phone) && (
            <p className="mt-1 text-sm text-ink-muted">
              {[car.customer_name, car.customer_phone].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <StampMark status={car.status} date={car.outgoing_date ?? car.intake_date} rotate={false} />
      </div>

      {photos.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-muted">
            Intake photos
          </h2>
          <PhotoStrip photos={photos} publicUrl={publicUrl} />
        </section>
      )}

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-muted">
            Stamp history
          </h2>
          {car.status !== "outgoing" && <MarkOutgoingForm action={boundMarkOutgoing} />}
        </div>
        {car.status === "outgoing" && car.price !== null && (
          <p className="text-sm text-green-ink">
            Delivered {car.outgoing_date && formatStampDate(car.outgoing_date)} for{" "}
            <span className="stamp-numerals font-mono font-semibold">{formatMoney(car.price)}</span>
          </p>
        )}
        <div className="border border-border bg-surface p-4">
          <StampTimeline stamps={stamps} />
        </div>
        <AddStampForm currentStatus={car.status} action={boundAddStamp} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-muted">
            Parts installed
          </h2>
          {parts.length > 0 && (
            <span className="stamp-numerals font-mono text-sm text-ink-muted">
              {formatMoney(partsCost)} total
            </span>
          )}
        </div>
        {parts.length === 0 ? (
          <p className="text-sm text-ink-muted">No parts logged yet.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border border border-border bg-surface">
            {parts.map((part) => (
              <li key={part.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{part.part_name}</p>
                  {part.notes && <p className="text-xs text-ink-muted">{part.notes}</p>}
                </div>
                <span className="stamp-numerals shrink-0 font-mono text-sm text-ink">
                  {formatMoney(part.cost)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <AddPartForm action={boundAddPart} />
      </section>

      {car.intake_notes && (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-muted">
            Intake notes
          </h2>
          <p className="border border-border bg-surface p-4 text-sm text-ink">{car.intake_notes}</p>
        </section>
      )}
    </div>
  );
}
