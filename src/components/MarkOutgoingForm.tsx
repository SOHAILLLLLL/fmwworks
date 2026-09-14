"use client";

import { useState, useTransition } from "react";

export function MarkOutgoingForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-2 border-green px-4 py-2.5 text-sm font-semibold text-green-ink transition-colors hover:bg-green-tint"
      >
        Stamp as outgoing
      </button>
    );
  }

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
      className="flex flex-col gap-3 border-2 border-green bg-green-tint p-4"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-green-ink">
        Close out this car
      </p>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Final price</span>
        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          required
          placeholder="0.00"
          className="stamp-numerals w-full border border-border-strong bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-ink sm:w-48"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Note (optional)</span>
        <input
          type="text"
          name="note"
          placeholder="e.g. picked up by customer"
          className="w-full border border-border-strong bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-green px-4 py-2 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Stamping…" : "Confirm outgoing"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
