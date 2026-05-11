import { VehicleCard } from "./VehicleCard"


type Vehicle = any // reuse your type properly

export function VehicleList({
  vehicles,
}: {
  vehicles: Vehicle[] | Vehicle | null | undefined
}) {
  if (!vehicles) return null


  const list = Array.isArray(vehicles) ? vehicles : [vehicles]

  return (
    <div className="space-y-4">
      {list.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  )
}