"use client";

import { useState, useTransition } from "react";

export function DeletePartButton({ action }: { action: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(() => action())}
          className="border border-stamp-red px-2 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-stamp-red-ink transition-colors hover:bg-stamp-red-tint disabled:opacity-50"
        >
          {pending ? "Removing…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs text-ink-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label="Delete this part"
      className="shrink-0 px-2 py-1 text-xs uppercase tracking-[0.06em] text-ink-muted transition-colors hover:text-stamp-red-ink"
    >
      Remove
    </button>
  );
}
