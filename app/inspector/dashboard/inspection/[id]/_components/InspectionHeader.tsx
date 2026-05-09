"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Clock } from "lucide-react"

interface Props {
  vehicle: {
    year: number
    make: string
    model: string | null
    mileage: number
    condition: string
    scheduledAt?: string | null
    collectionAddress?: string | null
    imageUrls?: { imageUrl: string; angle: string }[] | null
  }
}

export function InspectionHeader({ vehicle }: Props) {
  const router = useRouter()
  const image = vehicle.imageUrls?.[0]?.imageUrl

  return (
    <div className="border-b border-[#E7E1D8] bg-white">
      {/* Top bar */}
      <div className="mx-auto flex w-full items-center justify-between px-5 py-4">
        <button
          onClick={() => router.back()}
          className="flex h-9 items-center gap-1.5 rounded-xl px-2 text-sm font-medium text-[#6A6A6A] transition-colors hover:bg-[#F7F2EB] active:scale-[0.98]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
          Inspection
        </p>

        <div className="w-12" />
      </div>

      {/* Vehicle info */}
      <div className="mx-auto w-full  px-5 pb-6">
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#FFF7E4]">
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

          <div className="min-w-0 flex-1 pt-0.5">
            <h1 className="truncate text-lg font-extrabold tracking-tight text-[#171D17]">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className="mt-1 text-sm text-[#6A6A6A]">
              {vehicle.mileage?.toLocaleString()} km · {vehicle.condition}
            </p>
          </div>
        </div>

        {/* Pickup info */}
        <div className="mt-5 space-y-2.5">
          {vehicle.scheduledAt && (
            <div className="flex items-center gap-3 rounded-2xl border border-[#E7E1D8] bg-[#FFF7E4] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <Clock size={16} className="text-[#E8A020]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6A6A6A]">
                  Scheduled
                </p>
                <p className="truncate text-sm font-bold text-[#171D17]">
                  {new Date(vehicle.scheduledAt).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}

          {vehicle.collectionAddress && (
            <div className="flex items-center gap-3 rounded-2xl border border-[#E7E1D8] bg-[#F7F2EB] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <MapPin size={16} className="text-[#E8A020]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6A6A6A]">
                  Collection Address
                </p>
                <p className="truncate text-sm font-bold text-[#171D17]">
                  {vehicle.collectionAddress}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}