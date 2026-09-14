"use client";

import { useRef, useTransition } from "react";
import { CAR_STATUS_LABEL, type CarStatus } from "@/lib/types";

const STATUS_OPTIONS: CarStatus[] = ["incoming", "in_progress", "ready", "outgoing"];

export function AddStampForm({
  currentStatus,
  action,
}: {
  currentStatus: CarStatus;
  action: (formData: FormData) => Promise<void>;
}) {
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
      className="flex flex-col gap-3 border border-border bg-surface p-4"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
        Add a stamp
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          name="status"
          defaultValue={currentStatus}
          className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink sm:w-48"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {CAR_STATUS_LABEL[status]}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="note"
          placeholder="Note (optional) — e.g. waiting on brake pads"
          className="flex-1 border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="self-start bg-ink px-4 py-2 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Stamping…" : "Stamp it"}
      </button>
    </form>
  );
}
