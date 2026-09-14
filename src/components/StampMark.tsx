import { CAR_STATUS_LABEL, type CarStatus } from "@/lib/types";
import { statusStyle } from "@/lib/status-style";
import { formatStampDate } from "@/lib/format";

export function StampMark({
  status,
  date,
  rotate = true,
}: {
  status: CarStatus;
  date: string;
  rotate?: boolean;
}) {
  const style = statusStyle(status);
  return (
    <span
      className="inline-flex shrink-0 flex-col items-start gap-0.5 border-2 px-2.5 py-1 font-mono"
      style={{
        borderColor: style.dot,
        color: style.ink,
        transform: rotate ? "rotate(-1.5deg)" : undefined,
      }}
    >
      <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em]">
        {CAR_STATUS_LABEL[status]}
      </span>
      <span className="stamp-numerals text-[0.65rem] opacity-80">{formatStampDate(date)}</span>
    </span>
  );
}
