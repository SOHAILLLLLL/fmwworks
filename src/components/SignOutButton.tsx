import { signOut } from "@/app/login/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="border border-border-strong px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
      >
        Sign out
      </button>
    </form>
  );
}
