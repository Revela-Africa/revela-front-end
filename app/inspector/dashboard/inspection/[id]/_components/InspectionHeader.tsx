"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Calendar, Car } from "lucide-react"

interface Props {
  vehicle: {
    year: number
    make: string
    model: string | null
    mileage?: number | null
    condition: string
    scheduledAt?: string | null
    collectionAddress?: string | null
    imageUrls?: { imageUrl: string; angle: string }[] | null
  }
}

export function InspectionHeader({ vehicle }: Props) {
  const router = useRouter()
  const image = vehicle.imageUrls?.[0]?.imageUrl

  const formattedDate = vehicle.scheduledAt
    ? new Date(vehicle.scheduledAt).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : null

  return (
    <div className="border-b border-[#E7E1D8] bg-white">
      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-[448px] items-center justify-between px-5 py-4">
        <button
          onClick={() => router.back()}
          className="flex h-9 items-center gap-1.5 rounded-xl px-2 text-sm font-medium text-[#6A6A6A] transition-colors hover:bg-[#F7F2EB] active:scale-[0.98]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="flex h-8 items-center gap-1.5 rounded-full bg-[#FFF7E4] px-3">
          <Car size={14} className="text-[#E8A020]" />
          <span className="text-[10px] font-bold text-[#E8A020] uppercase tracking-wide">
            {vehicle.condition}
          </span>
        </div>
      </div>

      {/* Vehicle info */}
      <div className="mx-auto w-full max-w-[448px] px-5 pb-6">
        <div className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#FFF7E4]">
            {image ? (
              <img
                src={image}
                alt={`${vehicle.year} ${vehicle.make}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-3xl">🚗</span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-extrabold tracking-tight text-[#171D17]">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="mt-0.5 text-sm text-[#6A6A6A]">
              {vehicle.mileage?.toLocaleString() ?? "—"} km
            </p>

            {/* Location + Date inline */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {vehicle.collectionAddress && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#F7F2EB] px-2 py-1 text-[11px] font-medium text-[#6A6A6A]">
                  <MapPin size={11} className="text-[#E8A020]" />
                  <span className="max-w-[120px] truncate">
                    {vehicle.collectionAddress}
                  </span>
                </span>
              )}

              {formattedDate && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#FFF7E4] px-2 py-1 text-[11px] font-medium text-[#E8A020]">
                  <Calendar size={11} />
                  {formattedDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}