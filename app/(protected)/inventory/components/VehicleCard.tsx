"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string | null;
  mileage: number;
  condition: string;
  status: string;
  tav?: number | null;
  offer?: number | null;
  imageUrls?: { imageUrl: string }[];
};

const STATUS_MAP: Record<string, { label: string; style: string }> = {
  SUBMITTED: {
    label: "Processing",
    style: "text-[#D4900A]",
  },
  RANGE_PROVIDED: {
    label: "Valuation Ready",
    style: "text-[#D4900A]",
  },
  INSPECTION_SCHEDULED: {
    label: "Pickup Scheduled",
    style: "text-[#D4900A] ",
  },
  INSPECTOR_ASSIGNED: {
    label: "Inspector Assigned",
    style: "text-[#D4900A]",
  },
  UNDER_ASSESSMENT: {
    label: "Being Inspected",
    style: "text-[#D4900A]",
  },
  OFFER_SENT: {
    label: "Offer Ready",
    style: "text-[#D4900A]",
  },
  OFFER_REJECTED: {
    label: "Offer Rejected",
    style: "text-red-600",
  },
  ACCEPTED: {
    label: "Accepted",
    style: "text-green-700",
  },
  PAID: {
    label: "Paid ✅",
    style: "text-green-800",
  },
}

const STATUS_PROGRESS: Record<string, number> = {
  SUBMITTED: 10,
  RANGE_PROVIDED: 25,
  INSPECTION_SCHEDULED: 40,
  INSPECTOR_ASSIGNED: 55,
  UNDER_ASSESSMENT: 65,
  OFFER_SENT: 80,
  OFFER_REJECTED: 80,
  ACCEPTED: 90,
  PAID: 100,
}

interface CTA {
  label: string
  action: () => void
}

function getCTA(vehicle: Vehicle, router: ReturnType<typeof useRouter>): CTA | null {
  switch (vehicle.status) {
    case "SUBMITTED":
      return {
        label: "View Processing →",
        action: () => router.push(`/intake/processing/${vehicle.id}`),
      }
    case "RANGE_PROVIDED":
      return {
        label: "View Valuation →",
        action: () => router.push(`/intake/offer/${vehicle.id}`),
      }
    case "INSPECTION_SCHEDULED":
    case "INSPECTOR_ASSIGNED":
    case "UNDER_ASSESSMENT":
      return {
        label: "View Booking →",
        action: () => router.push(`/intake/offer/${vehicle.id}`),
      }
    case "OFFER_SENT":
    case "OFFER_REJECTED":
      return {
        label: "View Final Offer →",
        action: () => router.push(`/intake/offer/${vehicle.id}`),
      }
    case "ACCEPTED":
    case "PAID":
      return null
    default:
      return null
  }
}






export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter()

  const status = STATUS_MAP[vehicle.status] ?? {
    label: vehicle.status,
    style: "text-gray-600",
  }

  const progress = STATUS_PROGRESS[vehicle.status] ?? 0
  const image = vehicle.imageUrls?.[0]?.imageUrl
  const cta = getCTA(vehicle, router)

  return (
    <div
      onClick={cta ? cta.action : undefined}
      className={`rounded-xl border border-[#E8A02040] bg-card p-5 space-y-3 
        ${cta ? "cursor-pointer hover:border-[#E8A020]/60 transition-all active:scale-[0.99]" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Image */}
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
              <span className={`text-[10px] font-bold uppercase tracking-[0.6px] ${status.style}`}>
                {status.label}
              </span>
              <p className="text-base font-bold text-[#171D17] mt-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
              <p className="text-xs text-muted-foreground">
                {Number(vehicle.mileage).toLocaleString()} KM · {vehicle.condition}
              </p>
            </div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E8A020] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] font-bold text-[#E8A020]">
          {progress}%
        </span>
      </div>

      {/* CTA button */}
      {cta && (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            cta.action()
          }}
          className="w-full bg-[#E8A020] text-white text-xs normal-case font-normal px-4 py-2"
        >
          {cta.label}
        </Button>
      )}

      {/* TAV */}
      {vehicle.tav && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF7E4]">
          <p className="text-xs text-muted-foreground">Estimated Value</p>
          <p className="text-sm font-extrabold text-[#E8A020]">
            ₦{vehicle.tav.toLocaleString()}
          </p>
        </div>
      )}

      {/* Final offer — shown when OFFER_SENT */}
      {vehicle.offer && vehicle.status === "OFFER_SENT" && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200">
          <p className="text-xs text-green-700">Final Cash Offer</p>
          <p className="text-sm font-extrabold text-green-700">
            ₦{vehicle.offer.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}