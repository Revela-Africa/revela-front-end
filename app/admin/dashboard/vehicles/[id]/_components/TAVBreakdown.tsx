interface Props {
  tav: number | null
  min: number | null
  max: number | null
}

export function TAVBreakdown({ tav, min, max }: Props) {
  if (!tav) {
    return (
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-sm font-bold text-foreground mb-2">
          Total Asset Valuation
        </p>
        <p className="text-sm text-muted-foreground">
          TAV not yet generated
        </p>
      </div>
    )
  }

  const breakdown = [
    {
      label: "Drivetrain & Engine",
      sublabel: "Good condition",
      value: Math.round(tav * 0.45),
    },
    {
      label: "Electrical Systems",
      sublabel: "Alternator, Wiring",
      value: Math.round(tav * 0.16),
    },
    {
      label: "Cooling System",
      sublabel: "Radiator, Compressor",
      value: Math.round(tav * 0.07),
    },
    {
      label: "Body & Lighting",
      sublabel: "Headlights, trim",
      value: Math.round(tav * 0.14),
    },
    {
      label: "Steel Scrap",
      sublabel: "Good condition",
      value: Math.round(tav * 0.18),
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="mb-4">
        <p className="text-sm font-bold text-foreground">
          Total Asset Valuation
        </p>
        <p className="text-3xl font-bold text-[#E8A020] mt-1">
          ₦{tav.toLocaleString()}
        </p>
        {min && max && (
          <p className="text-xs text-muted-foreground mt-1">
            Range: ₦{min.toLocaleString()} — ₦{max.toLocaleString()}
          </p>
        )}
      </div>

      <div className="space-y-0 border-t border-border">
        {breakdown.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-foreground">
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground">{item.sublabel}</p>
            </div>
            <p className="text-sm font-bold text-foreground">
              ₦{item.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}