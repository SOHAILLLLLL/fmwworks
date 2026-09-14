export function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-border-strong px-6 py-16 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.14em] text-ink-muted">
        Rack empty
      </p>
      <p className="max-w-xs text-sm text-ink-muted">{label}</p>
    </div>
  );
}
