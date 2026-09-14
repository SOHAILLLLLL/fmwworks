"use client";

import { useRef, useTransition } from "react";

export function AddPartForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={(formData) =>
        startTransition(async () => {
          await action(formData);
          formRef.current?.reset();
        })
      }
      className="flex flex-col gap-3 border border-border bg-surface p-4 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
          Part
        </span>
        <input
          type="text"
          name="part_name"
          required
          placeholder="e.g. Front brake pads"
          className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
      </label>
      <label className="flex w-full flex-col gap-1.5 sm:w-32">
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
          Cost
        </span>
        <input
          type="number"
          name="cost"
          min="0"
          step="0.01"
          placeholder="0.00"
          className="stamp-numerals border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-surface disabled:opacity-50"
      >
        {pending ? "Adding…" : "Add part"}
      </button>
    </form>
  );
}
