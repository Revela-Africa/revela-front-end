"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "@apollo/client/react"
import { GetVehiclesByUserDocument } from "@/graphql/generated/graphql"
import { MoreVertical, Loader2 } from "lucide-react"

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: "text-blue-600",
  PENDING_REVIEW: "text-red-600",
  RANGE_PROVIDED: "text-[#E8A020]",
  INSPECTION_SCHEDULED: "text-[#E8A020]",
  INSPECTOR_ASSIGNED: "text-[#E8A020]",
  UNDER_ASSESSMENT: "text-[#E8A020]",
  OFFER_SENT: "text-green-600",
  OFFER_REJECTED: "text-red-600",
  ACCEPTED: "text-green-700",
  PAID: "text-green-700",
}

const STATUS_LABELS: Record<string, string> = {
  SUBMITTED: "Registered",
  PENDING_REVIEW: "Valuation Failed",
  RANGE_PROVIDED: "TAV Generated",
  INSPECTION_SCHEDULED: "Pickup Scheduled",
  INSPECTOR_ASSIGNED: "Inspector Assigned",
  UNDER_ASSESSMENT: "Under Assessment",
  OFFER_SENT: "Offer Sent",
  OFFER_REJECTED: "Offer Rejected",
  ACCEPTED: "Offer Accepted",
  PAID: "Payment Issued",
}

export function InProgress() {
  const { data, loading } = useQuery(GetVehiclesByUserDocument, {
    fetchPolicy: "cache-and-network",
  })

  const mostRecent = useMemo(() => {
    const list = data?.getVehiclesByUser ?? []
    return [...list].reverse()[0] ?? null
  }, [data])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={20} className="animate-spin text-[#E8A020]" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-foreground">In Progress</h2>
        <Link
          href="/inventory"
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      {!mostRecent ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No vehicles in progress
          </p>
        </div>
      ) : (
        <VehicleCard vehicle={mostRecent} />
      )}
    </div>
  )
}

function VehicleCard({
  vehicle,
}: {
  vehicle: {
    id: string
    make: string
    model?: string | null
    year?: number | null
    mileage?: number | null
    condition?: string | null
    status: string
    imageUrls?: { imageUrl: string }[] | null
    inspectorId?: string | null
  }
}) {
  const statusStyle = STATUS_COLORS[vehicle.status] ?? "text-gray-600"
  const statusLabel = STATUS_LABELS[vehicle.status] ?? vehicle.status
  const image = vehicle.imageUrls?.[0]?.imageUrl

  return (
    <div className="rounded-xl border border-[#E8A02040] bg-card p-5">
      <div className="flex items-start gap-3">
        {/* Car image */}
        <div className="w-16 h-16 rounded-lg bg-[#FFF7E4] shrink-0 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={`${vehicle.year} ${vehicle.make}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">🚗</span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span
                className={`text-[10px] font-bold tracking-[0.6px] py-0.5 rounded-full ${statusStyle}`}
              >
                {statusLabel}
              </span>
              <p className="text-base font-bold text-[#171D17] mt-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
              <p className="text-xs text-muted-foreground">
                {vehicle.mileage?.toLocaleString() ?? "—"} km · {vehicle.condition ?? "—"}
              </p>
            </div>
            <button className="text-muted-foreground hover:text-foreground shrink-0">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-3 flex gap-x-3">
        {vehicle.inspectorId && (
          <p className="text-[10px] text-[#6A6A6A] whitespace-nowrap mb-1">
            Agent assigned •
          </p>
        )}
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E8A020] rounded-full transition-all"
              style={{ width: `${getProgress(vehicle.status)}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-[#E8A020]">
            {getProgress(vehicle.status)}%
          </span>
        </div>
      </div>
    </div>
  )
}

function getProgress(status: string): number {
  const map: Record<string, number> = {
    SUBMITTED: 15,
    PENDING_REVIEW: 20,
    RANGE_PROVIDED: 35,
    INSPECTION_SCHEDULED: 50,
    INSPECTOR_ASSIGNED: 60,
    UNDER_ASSESSMENT: 75,
    OFFER_SENT: 85,
    OFFER_REJECTED: 85,
    ACCEPTED: 90,
    PAID: 100,
  }
  return map[status] ?? 0
}