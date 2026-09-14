"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/SignOutButton";

const LINKS = [
  { href: "/", label: "All cars" },
  { href: "/incoming", label: "Incoming" },
  { href: "/outgoing", label: "Outgoing" },
];

export function TopNav({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-ground/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-mono text-sm font-bold uppercase tracking-[0.16em] text-ink"
        >
          fmwworks
        </Link>
        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border border-border-strong bg-surface text-ink"
                    : "border border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          {userEmail && (
            <span className="hidden text-xs text-ink-muted sm:inline">{userEmail}</span>
          )}
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
