import type { CarStatus } from "@/lib/types";

interface StatusStyle {
  tint: string;
  ink: string;
  dot: string;
}

export function statusStyle(status: CarStatus): StatusStyle {
  switch (status) {
    case "incoming":
      return { tint: "var(--stamp-red-tint)", ink: "var(--stamp-red-ink)", dot: "var(--stamp-red)" };
    case "in_progress":
    case "ready":
      return { tint: "var(--amber-tint)", ink: "var(--amber-ink)", dot: "var(--amber)" };
    case "outgoing":
      return { tint: "var(--green-tint)", ink: "var(--green-ink)", dot: "var(--green)" };
  }
}
