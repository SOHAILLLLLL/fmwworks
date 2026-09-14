import { LoginForm } from "@/app/login/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ground px-4">
      <div className="w-full max-w-sm border border-border bg-surface p-8 shadow-[0_1px_0_var(--border)]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
          fmwworks
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">Staff sign in</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Accounts are set up by your garage admin. Use the email and password they gave you.
        </p>
        <LoginForm next={next ?? "/"} />
      </div>
    </main>
  );
}
