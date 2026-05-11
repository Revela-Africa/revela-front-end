interface Props {
  vehicle: {
    year: number
    mileage: number
    fuel: string
    transmission: string
    color: string
    location: string
    intakeDate: string
    agent: string
  }
}

export function VehicleSpecs({ vehicle }: Props) {
  const specs = [
    { label: "Year", value: vehicle.year },
    { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} km` },
    { label: "Fuel", value: vehicle.fuel },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Colour", value: vehicle.color },
    { label: "Location", value: vehicle.location },
    { label: "Intake Date", value: vehicle.intakeDate },
    { label: "Agent", value: vehicle.agent },
  ]

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-2 mt-3">
      {specs.map((spec) => (
        <div key={spec.label}>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {spec.label}
          </p>
          <p className="text-xs font-bold text-foreground mt-0.5">{spec.value}</p>
        </div>
      ))}
    </div>
  )
}