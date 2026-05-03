"use client"

import { useRouter, useParams } from "next/navigation"
import { useOfferStore } from "@/features/offer/store/useOfferStore"
import { useQuery } from "@apollo/client/react"
import { GetSingleUserVehicleDocument } from "@/graphql/generated/graphql"
import { Calendar, CheckCircle2, Info, MapPin, Clock } from "lucide-react"
import Link from "next/link"

function formatDate(dateStr: string): string {
  if (!dateStr) return "—"
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatNaira(amount: number | null): string {
  if (!amount) return "—"
  return `₦${amount.toLocaleString()}`
}

// Maps vehicle status to which timeline steps are complete
function getTimelineState(status: string): {
  bookingConfirmed: "done" | "current" | "pending"
  agentAssigned: "done" | "current" | "pending"
  collected: "done" | "current" | "pending"
  paymentReleased: "done" | "current" | "pending"
} {
  switch (status) {
    case "INSPECTION_SCHEDULED":
      return {
        bookingConfirmed: "current",
        agentAssigned: "pending",
        collected: "pending",
        paymentReleased: "pending",
      }
    case "UNDER_ASSESSMENT":
      return {
        bookingConfirmed: "done",
        agentAssigned: "current",
        collected: "pending",
        paymentReleased: "pending",
      }
    case "OFFER_SENT":
    case "ACCEPTED":
      return {
        bookingConfirmed: "done",
        agentAssigned: "done",
        collected: "current",
        paymentReleased: "pending",
      }
    case "PAID":
      return {
        bookingConfirmed: "done",
        agentAssigned: "done",
        collected: "done",
        paymentReleased: "done",
      }
    default:
      return {
        bookingConfirmed: "current",
        agentAssigned: "pending",
        collected: "pending",
        paymentReleased: "pending",
      }
  }
}

function TimelineItem({
  label,
  description,
  tag,
  tagColor,
  state,
  isLast,
}: {
  label: string
  description: string
  tag: string
  tagColor: string
  state: "done" | "current" | "pending"
  isLast: boolean
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            state === "done"
              ? "bg-green-500"
              : state === "current"
              ? "bg-[#E8A020]"
              : "bg-muted border-2 border-border"
          }`}
        >
          {state === "done" ? (
            <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
              <path
                d="M1 3.5L3 5.5L7 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : state === "current" ? (
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          ) : null}
        </div>
        {!isLast && (
          <div
            className={`w-px flex-1 mt-1 ${
              state === "done" ? "bg-green-200" : "bg-border"
            }`}
          />
        )}
      </div>
      <div className={`pb-4 ${state === "pending" ? "opacity-40" : ""}`}>
        <p
          className={`text-sm font-bold ${
            state === "current" ? "text-[#E8A020]" : "text-foreground"
          }`}
        >
          {label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        <span
          className={`inline-block text-[10px] border border-[#E8A020] bg-[#E8A02040] text-[#D4900A] font-bold px-2 py-0.5 rounded-full mt-1.5 ${tagColor}`}
        >
          {tag}
        </span>
      </div>
    </div>
  )
}










export default function FinalStep() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const {
    offer,
    collectionDate,
    timeSlot,
    collectionAddress,
    bookingReference,
    bankName,
    reset,
  } = useOfferStore()

  const { data, loading } = useQuery(GetSingleUserVehicleDocument, {
    variables: { vehicleId: id },
    skip: !id,
    fetchPolicy: "network-only",
    pollInterval: 60000, // poll every 60s to update timeline
  })

  const vehicle = data?.getSingleUserVehicle

// final step component isnt complete, the setSchedule mutation does not set the vehicle booking reference,
//  it also does not set the schedule date and time for pickup, 
// no email sent to user lol
  // console.log(vehicle);
  

  // Resolve data — backend is source of truth, store is fallback
  const resolvedStatus = vehicle?.status ?? "INSPECTION_SCHEDULED"
  const resolvedCollectionDate = vehicle?.scheduledAt
    ? vehicle.scheduledAt.split("T")[0]
    : collectionDate
  const resolvedOffer = vehicle?.offer ?? offer
  const resolvedBookingRef =
    bookingReference ?? `RVL-${new Date().getFullYear()}-PENDING`

  // Get timeline state from vehicle status
  const timeline = getTimelineState(resolvedStatus)

  const TIMELINE_ITEMS = [
    {
      key: "bookingConfirmed" as const,
      label: "Booking confirmed",
      description: `Reference ${resolvedBookingRef}. Confirmation SMS sent to your registered number.`,
      tag: "Now",
      tagColor: "",
    },
    {
      key: "agentAssigned" as const,
      label: "Agent assigned + notified",
      description:
        "You'll receive their name, photo, and live tracking link the morning before pickup",
      tag: formatDate(resolvedCollectionDate),
      tagColor: "",
    },
    {
      key: "collected" as const,
      label: "Collection at your address",
      description:
        "Agent inspects and signs off. You sign a one-page digital transfer document on their tablet.",
      tag: `${formatDate(resolvedCollectionDate)}, ${timeSlot}`,
      tagColor: "",
    },
    {
      key: "paymentReleased" as const,
      label: "Payment released",
      description: `${formatNaira(resolvedOffer)} sent to ${
        bankName || "your bank"
      } after collection confirmation`,
      tag: `${formatDate(resolvedCollectionDate)}, 2 hrs after`,
      tagColor: "",
    },
  ]
  function handleDone() {
    router.push("/home")
    reset()
  }

  if (loading && !vehicle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="font-cabinet space-y-6 py-4">
      {/* Success icon */}
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-24 h-24 rounded-2xl bg-[#E8A020] flex items-center justify-center">
          <CheckCircle2 size={40} color="#fff" />
        </div>
        <div className="text-[#E8A020] text-2xl font-extrabold">
          <h1>Your Pickup is</h1>
          <h1>Scheduled</h1>
        </div>
      </div>

      {/* Date pill */}
      <div className="flex items-center gap-2 bg-[#FFF7E4] border border-[#E8A020]/30 px-4 py-3 rounded-full">
        <Calendar color="#F59E0B" size={20} />
        <span className="text-xs font-bold text-[#E8A020]">
          {formatDate(resolvedCollectionDate)} · {timeSlot}
        </span>
      </div>

      {/* Booking card */}
      <div className="rounded-[24px] border border-border bg-white overflow-hidden">
        <div className="p-4 bg-[#D4900A] flex items-center justify-between">
          <p className="text-xs font-bold uppercase text-white">
            Booking Reference
          </p>
          <p className="text-xs font-semibold text-white">{resolvedBookingRef}</p>
        </div>
        <div className="py-3">
          {[
            { label: "Collection date", value: formatDate(resolvedCollectionDate) },
            { label: "Time window", value: timeSlot || "—" },
            { label: "Cash payout", value: formatNaira(resolvedOffer) },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-4 py-3"
            >
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p
                className={`text-sm font-bold tracking-[-0.35px] ${
                  item.label === "Cash payout"
                    ? "text-[#D4900A]"
                    : "text-foreground"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pickup address */}
      <div className="flex items-start gap-3 bg-white border rounded-[12px] border-[#E8A02040] p-6">
        <span className="bg-[#E8A0201A] p-2.5 rounded-sm">
          <MapPin color="#D4900A" />
        </span>
        <div>
          <p className="font-bold text-[#707974]">Pickup Address</p>
          <p className="text-sm font-bold">
            {collectionAddress || "—"}
          </p>
        </div>
      </div>

      {/* Timeline — driven by vehicle status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-foreground">What happens next?</p>
          {/* Live indicator — shows we're polling */}
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] text-muted-foreground">Live updates</p>
          </div>
        </div>

        <div className="space-y-0">
          {TIMELINE_ITEMS.map((item, index) => (
            <TimelineItem
              key={item.key}
              label={item.label}
              description={item.description}
              tag={item.tag}
              tagColor={item.tagColor}
              state={timeline[item.key]}
              isLast={index === TIMELINE_ITEMS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Legal */}
      <div className="p-4 rounded-xl flex gap-x-4 bg-[#FFF7E4] border border-[#E8A02040]">
        <Info size={20} color="#D4900A" className="shrink-0" />
        <p className="text-sm text-muted-foreground">
          By proceeding, you agreed to Revela's Terms of Sale. This offer is
          legally binding once both parties sign at pickup. Questions?{" "}
          <Link className="font-bold text-[#D4900A]" href="mailto:support@revelaafrica.com">
            support@revelaafrica.com
          </Link>
        </p>
      </div>

      <button
        onClick={handleDone}
        className="w-full bg-[#E8A020] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        Back to Home
      </button>
    </div>
  )
}