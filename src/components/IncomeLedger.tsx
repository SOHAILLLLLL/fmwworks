import { formatMoney } from "@/lib/format";

export function IncomeLedger({
  totalIncome,
  count,
  average,
}: {
  totalIncome: number;
  count: number;
  average: number;
}) {
  const entries = [
    { label: "Cars delivered", value: String(count) },
    { label: "Total income", value: formatMoney(totalIncome) },
    { label: "Average per car", value: formatMoney(average) },
  ];

  return (
    <div className="flex divide-x divide-border border border-border bg-surface">
      {entries.map((entry) => (
        <div key={entry.label} className="flex-1 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
            {entry.label}
          </p>
          <p className="stamp-numerals mt-1 font-mono text-lg font-semibold text-ink sm:text-xl">
            {entry.value}
          </p>
        </div>
      ))}
    </div>
  );
}
