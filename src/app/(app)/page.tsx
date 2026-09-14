import { getAllCars } from "@/lib/queries";
import { Rack } from "@/components/Rack";

export default async function HomePage() {
  const cars = await getAllCars();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-ink">All cars</h1>
        <p className="text-sm text-ink-muted">
          {cars.length} {cars.length === 1 ? "car" : "cars"} on the rack right now.
        </p>
      </div>
      <Rack cars={cars} emptyLabel="No cars have been registered yet. Tap + to log the first one." />
    </div>
  );
}
