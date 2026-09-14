import { getCarsByStatus } from "@/lib/queries";
import { Rack } from "@/components/Rack";

export default async function IncomingPage() {
  const cars = await getCarsByStatus(["incoming", "in_progress", "ready"]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-ink">Incoming</h1>
        <p className="text-sm text-ink-muted">Cars in the shop, not yet delivered back out.</p>
      </div>
      <Rack cars={cars} emptyLabel="Nothing incoming right now." />
    </div>
  );
}
