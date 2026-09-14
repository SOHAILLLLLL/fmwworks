"use client";

import { useActionState } from "react";
import { signIn } from "@/app/login/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signIn, { error: null });

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          placeholder="you@garage.com"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="border border-border-strong bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-ink"
          placeholder="••••••••"
        />
      </label>
      {state.error && (
        <p role="alert" className="border border-stamp-red bg-stamp-red-tint px-3 py-2 text-sm text-stamp-red-ink">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 bg-ink px-4 py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
