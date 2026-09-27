"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function DeleteCarPanel({
  registrationNumber,
  action,
}: {
  registrationNumber: string;
  action: (formData: FormData) => Promise<{ error: string } | { success: true }>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const matches = confirmText.trim().toUpperCase() === registrationNumber.toUpperCase();

  if (!open) {
    return (
      <section className="flex flex-col gap-3 border border-stamp-red/40 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-stamp-red-ink">
          Danger zone
        </h2>
        <p className="text-sm text-ink-muted">
          Permanently delete this car and every stamp, part, and photo attached to it. This
          cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="self-start border-2 border-stamp-red px-4 py-2.5 text-sm font-semibold text-stamp-red-ink transition-colors hover:bg-stamp-red-tint"
        >
          Delete this car
        </button>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3 border-2 border-stamp-red bg-stamp-red-tint p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-stamp-red-ink">
        Confirm permanent deletion
      </p>
      <p className="text-sm text-ink">
        This removes <span className="stamp-numerals font-mono font-semibold">{registrationNumber}</span>,
        its full stamp history, installed parts, and photos — for everyone, forever.
      </p>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">
          Type the registration number to confirm
        </span>
        <input
          type="text"
          value={confirmText}
          onChange={(event) => {
            setConfirmText(event.target.value);
            setError(null);
          }}
          placeholder={registrationNumber}
          autoComplete="off"
          className="stamp-numerals w-full border border-border-strong bg-surface px-3 py-2 font-mono text-sm text-ink outline-none focus:border-stamp-red sm:w-64"
        />
      </label>
      {error && <p className="text-sm text-stamp-red-ink">{error}</p>}
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!matches || pending}
          onClick={() =>
            startTransition(async () => {
              const formData = new FormData();
              formData.set("confirm", confirmText);
              const result = await action(formData);
              if ("error" in result) {
                setError(result.error);
                return;
              }
              router.push("/");
            })
          }
          className="bg-stamp-red px-4 py-2 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Deleting…" : "Delete permanently"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setConfirmText("");
            setError(null);
          }}
          className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
