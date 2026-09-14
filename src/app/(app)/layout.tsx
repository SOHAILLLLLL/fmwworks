import { createClient } from "@/lib/supabase/server";
import { TopNav } from "@/components/TopNav";
import { PunchButton } from "@/components/PunchButton";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-dvh bg-ground">
      <TopNav userEmail={user?.email ?? null} />
      <main className="mx-auto max-w-5xl px-4 py-6 pb-28 sm:px-6">{children}</main>
      <PunchButton />
    </div>
  );
}
