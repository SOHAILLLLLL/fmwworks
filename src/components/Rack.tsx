import type { Car } from "@/lib/types";
import { CarCard } from "@/components/CarCard";
import { EmptyState } from "@/components/EmptyState";

export function Rack({ cars, emptyLabel }: { cars: Car[]; emptyLabel: string }) {
  if (cars.length === 0) {
    return <EmptyState label={emptyLabel} />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
