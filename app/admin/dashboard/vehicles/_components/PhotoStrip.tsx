interface Props {
  imageUrls: string[]
}

const ANGLE_LABELS = ["Front", "Rear", "Driver", "Passenger", "Engine", "Interior", "Chassis", "Extra"]

export function PhotoStrip({ imageUrls }: Props) {
  if (!imageUrls.length) return null

console.log(imageUrls);

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-foreground">
          {imageUrls.length} Photos
        </h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {imageUrls.map((url, index) => (
          <div key={index} className="shrink-0">
            <div className="w-20 h-16 rounded-lg overflow-hidden bg-muted">
              <img
                src={url}
                alt={ANGLE_LABELS[index] ?? `Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1">
              {ANGLE_LABELS[index] ?? `Photo ${index + 1}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}