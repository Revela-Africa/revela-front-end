interface Props {
  vehicle: {
    year: number
    mileage: number
    engineType?: string | null
    transmission?: string | null
    condition?: string | null
    region?: string | null
    scheduledAt?: string | null
    agentName?: string | null
  }
}

export function VehicleSpecs({ vehicle }: Props) {
  const specs = [
    { label: "Year", value: vehicle.year },
    {
      label: "Mileage",
      value: `${vehicle.mileage?.toLocaleString()} km`,
    },
    { label: "Engine", value: vehicle.engineType?.replace(/_/g, " ") ?? "—" },
    { label: "Transmission", value: vehicle.transmission ?? "—" },
    { label: "Condition", value: vehicle.condition ?? "—" },
    { label: "Region", value: vehicle.region ?? "—" },
    {
      label: "Scheduled",
      value: vehicle.scheduledAt
        ? new Date(vehicle.scheduledAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "—",
    },
    { label: "Inspector", value: vehicle.agentName ?? "Unassigned" },
  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-3 mt-4">
      {specs.map((spec) => (
        <div key={spec.label}>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {spec.label}
          </p>
          <p className="text-xs font-bold text-foreground mt-0.5">
            {String(spec.value)}
          </p>
        </div>
      ))}
    </div>
  )
}