import type { CarWithThumbnail } from "@/lib/types";
import { CarCard } from "@/components/CarCard";
import { EmptyState } from "@/components/EmptyState";

export function Rack({ cars, emptyLabel }: { cars: CarWithThumbnail[]; emptyLabel: string }) {
  if (cars.length === 0) {
    return <EmptyState label={emptyLabel} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
