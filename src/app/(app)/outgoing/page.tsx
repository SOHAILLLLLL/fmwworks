import { getCarsByStatus, getOutgoingStats } from "@/lib/queries";
import { Rack } from "@/components/Rack";
import { IncomeLedger } from "@/components/IncomeLedger";

export default async function OutgoingPage() {
  const [cars, stats] = await Promise.all([
    getCarsByStatus(["outgoing"]),
    getOutgoingStats(),
  ]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-ink">Outgoing</h1>
        <p className="text-sm text-ink-muted">Delivered cars and what they brought in.</p>
      </div>
      <IncomeLedger {...stats} />
      <Rack cars={cars} emptyLabel="No cars have gone out yet." />
    </div>
  );
}
