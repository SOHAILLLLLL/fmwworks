"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function PunchButton() {
  const pathname = usePathname();
  if (pathname === "/register") return null;

  return (
    <Link
      href="/register"
      aria-label="Register a new car"
      className="fixed bottom-6 right-6 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-stamp-red text-surface shadow-[0_10px_24px_-6px_rgba(122,31,22,0.55)] transition-transform duration-150 hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </Link>
  );
}
