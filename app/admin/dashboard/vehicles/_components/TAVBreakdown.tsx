interface Props {
  tav: number
  min: number
  max: number
}

export function TAVBreakdown({ tav, min, max }: Props) {
  const breakdown = [
    { label: "Drivetrain & Engine", sublabel: "22/F6 · Good condition", value: Math.round(tav * 0.45) },
    { label: "Electrical Systems", sublabel: "CO2, Alternator, Wiring", value: Math.round(tav * 0.16) },
    { label: "Cooling System", sublabel: "Radiator, Compressor", value: Math.round(tav * 0.07) },
    { label: "Body & Lighting", sublabel: "Headlights, trim pieces", value: Math.round(tav * 0.03) },
    { label: "Steel Scrap (850 kg)", sublabel: "J2N-F6 · Good condition", value: Math.round(tav * 0.18) },
  ]

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-1">
        Total Asset Valuation
      </h3>
      <div className="mb-4">
        <p className="text-xs text-muted-foreground">Revela Offer</p>
        <p className="text-3xl font-bold text-[#E8A020]">
          ₦{tav.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Range: ₦{min.toLocaleString()} — ₦{max.toLocaleString()}
        </p>
      </div>

      <div className="space-y-2">
        {breakdown.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-2 border-b border-border last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
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