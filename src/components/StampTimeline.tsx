import type { CarStamp } from "@/lib/types";
import { CAR_STATUS_LABEL } from "@/lib/types";
import { statusStyle } from "@/lib/status-style";
import { formatStampDateTime } from "@/lib/format";

export function StampTimeline({ stamps }: { stamps: CarStamp[] }) {
  if (stamps.length === 0) {
    return <p className="text-sm text-ink-muted">No stamps yet.</p>;
  }

  return (
    <ol className="flex flex-col">
      {stamps.map((stamp, index) => {
        const style = statusStyle(stamp.status);
        const isLast = index === stamps.length - 1;
        return (
          <li key={stamp.id} className="relative flex gap-3 pb-5 pl-1 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-4 h-full w-px bg-border-strong"
              />
            )}
            <span
              aria-hidden="true"
              className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
              style={{ borderColor: style.dot, background: "var(--surface)" }}
            />
            <div className="flex-1 pb-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-semibold" style={{ color: style.ink }}>
                  {CAR_STATUS_LABEL[stamp.status]}
                </span>
                <span className="stamp-numerals font-mono text-xs text-ink-muted">
                  {formatStampDateTime(stamp.created_at)}
                </span>
              </div>
              {stamp.note && <p className="mt-1 text-sm text-ink">{stamp.note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
