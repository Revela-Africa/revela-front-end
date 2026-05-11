"use client"

import { useState } from "react"
import { Camera, X } from "lucide-react"
import { CameraCapture } from "@/app/(protected)/components/camera/CameraCapture"
import { appToast } from "@/lib/toast"

const REQUIRED_ANGLES = [
  { id: "front", label: "Front" },
  { id: "rear", label: "Rear" },
  { id: "driver_side", label: "Driver Side" },
  { id: "passenger_side", label: "Passenger Side" },
  { id: "engine", label: "Engine Bay" },
]

interface Props {
  photos: (File | null)[]
  previews: (string | null)[]
  onCapture: (index: number, file: File) => void
  onRemove: (index: number) => void
}

export function PhotoCapture({ photos, previews, onCapture, onRemove }: Props) {
  const [activeCamera, setActiveCamera] = useState<number | null>(null)

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Vehicle Photos</h2>
          <span className="text-xs text-muted-foreground">
            {photos.filter(Boolean).length}/{REQUIRED_ANGLES.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {REQUIRED_ANGLES.map((angle, index) => {
            const hasPhoto = !!previews[index]
            return (
              <div key={angle.id} className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {angle.label}
                </p>
                {hasPhoto ? (
                  <div className="relative">
                    <img
                      src={previews[index]!}
                      alt={angle.label}
                      className="w-full h-28 rounded-xl object-cover border border-border"
                    />
                    <button
                      onClick={() => onRemove(index)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center"
                    >
                      <X size={12} color="white" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveCamera(index)}
                    className="w-full h-28 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1.5 hover:border-[#E8A020]/40 hover:bg-[#FFF7E4]/30 transition-all"
                  >
                    <Camera size={18} className="text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Tap to capture</p>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E8A020] rounded-full transition-all"
            style={{
              width: `${(photos.filter(Boolean).length / REQUIRED_ANGLES.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {activeCamera !== null && (
        <div className="fixed inset-0 z-50 bg-black">
          <CameraCapture
            angleLabel={REQUIRED_ANGLES[activeCamera].label}
            onCapture={(file) => {
              onCapture(activeCamera, file)
              setActiveCamera(null)
            }}
            onClose={() => setActiveCamera(null)}
            onGallerySelect={() =>
              appToast.info({
                title: "Image Selection NOT allowed",
                description:
                  "Revela requires live images on site, make use of the camera interface.",
              })
            }
          />
        </div>
      )}
    </>
  )
}