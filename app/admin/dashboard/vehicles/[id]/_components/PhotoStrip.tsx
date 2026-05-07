"use client"

import { useState } from "react"

interface Props {
  imageUrls: string[]
}

const ANGLE_LABELS = [
  "Front",
  "Rear",
  "Driver",
  "Passenger",
  "Engine",
  "Interior",
  "Chassis",
  "Extra",
]

export function PhotoStrip({ imageUrls }: Props) {
  const [enlarged, setEnlarged] = useState<string | null>(null)

  if (!imageUrls.length) {
    return (
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-sm text-muted-foreground text-center py-4">
          No photos uploaded
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-border p-4">
        <p className="text-sm font-bold text-foreground mb-3">
          {imageUrls.length} Photos
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imageUrls.map((url, index) => (
            <div key={index} className="shrink-0">
              <button
                onClick={() => setEnlarged(url)}
                className="w-20 h-16 rounded-lg overflow-hidden bg-muted block hover:opacity-80 transition-opacity"
              >
                <img
                  src={url}
                  alt={ANGLE_LABELS[index] ?? `Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
              <p className="text-[10px] text-muted-foreground text-center mt-1">
                {ANGLE_LABELS[index] ?? `Photo ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {enlarged && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlarged(null)}
        >
          <img
            src={enlarged}
            alt="Enlarged"
            className="max-w-full max-h-full rounded-xl object-contain"
          />
        </div>
      )}
    </>
  )
}