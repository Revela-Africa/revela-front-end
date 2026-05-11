"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface ImageUrlType {
  imageUrl: string
  angle?: string | null
}

interface Props {
  images: ImageUrlType[] | string[]
}

function normalizeImages(images: ImageUrlType[] | string[]): ImageUrlType[] {
  return images.map((img) =>
    typeof img === "string" ? { imageUrl: img } : img
  )
}

export function PhotoStrip({ images }: Props) {
  const [enlarged, setEnlarged] = useState<string | null>(null)
  const normalized = normalizeImages(images)

  if (!normalized.length) {
    return (
      <div className="rounded-2xl border border-[#E7E1D8] bg-white p-4">
        <p className="py-4 text-center text-sm text-[#6A6A6A]">
          No photos uploaded
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-[#E7E1D8] bg-white p-4">
        <p className="mb-3 text-sm font-bold text-[#171D17]">
          {normalized.length} Photo{normalized.length !== 1 ? "s" : ""}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {normalized.map((image, index) => (
            <div key={index} className="shrink-0">
              <button
                onClick={() => setEnlarged(image.imageUrl)}
                className="block h-16 w-20 overflow-hidden rounded-xl bg-[#F7F2EB] transition-opacity hover:opacity-80"
              >
                <img
                  src={image.imageUrl}
                  alt={`Vehicle photo ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
              {image.angle && (
                <p className="mt-1 text-center text-[10px] font-medium text-[#6A6A6A]">
                  {image.angle.replace(/_/g, " ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {enlarged && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#171D17]/90 p-4 backdrop-blur-sm"
          onClick={() => setEnlarged(null)}
        >
          <button
            onClick={() => setEnlarged(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <img
            src={enlarged}
            alt="Enlarged view"
               className=" h-75 rounded-sm object-contain"
          />
        </div>
      )}
    </>
  )
}