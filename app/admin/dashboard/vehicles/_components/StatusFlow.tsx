import { Check } from "lucide-react"

const BASE_STATUSES = [
  { key: "SUBMITTED", label: "Registered" },
  { key: "RANGE_PROVIDED", label: "TAV Generated" },
  { key: "INSPECTION_SCHEDULED", label: "Pickup Scheduled" },
  { key: "INSPECTOR_ASSIGNED", label: "Inspector Assigned" },
  { key: "UNDER_ASSESSMENT", label: "Under Assessment" },
  { key: "OFFER_SENT", label: "Offer Sent" },
  { key: "ACCEPTED", label: "Collected" },
  { key: "PAID", label: "Payment Issued" },
] as const

const FAILURE_STATUS = {
  key: "PENDING_REVIEW",
  label: "Valuation Failed ⚠️",
} as const

type BaseStatusKey = (typeof BASE_STATUSES)[number]["key"]
type FailureStatusKey = typeof FAILURE_STATUS.key
export type VehicleStatus = BaseStatusKey | FailureStatusKey

function getStatuses(currentStatus: string) {
  if (currentStatus === "PENDING_REVIEW") {
    return [
      BASE_STATUSES[0], // SUBMITTED
      FAILURE_STATUS,
      ...BASE_STATUSES.slice(1),
    ]
  }
  return [...BASE_STATUSES]
}

export function StatusFlow({ currentStatus }: { currentStatus: string }) {
  const STATUSES = getStatuses(currentStatus)
  const ORDER = STATUSES.map((s) => s.key)
  const currentIndex = ORDER.indexOf(currentStatus as VehicleStatus)

  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-4">Status Flow</h3>
      <div className="space-y-3">
        {STATUSES.map((status, index) => {
          const isDone = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={status.key} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isDone
                    ? "bg-green-500"
                    : isCurrent
                    ? "bg-[#E8A020]"
                    : "bg-muted"
                }`}
              >
                {isDone ? (
                  <Check size={10} color="white" />
                ) : isCurrent ? (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                ) : null}
              </div>
              <p
                className={`text-sm flex-1 ${
                  isDone
                    ? "text-muted-foreground line-through"
                    : isCurrent
                    ? "font-bold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {status.label}
              </p>
              {isCurrent && (
                <span className="text-[10px] font-bold text-[#E8A020] bg-[#FFF7E4] px-2 py-0.5 rounded-full">
                  Now
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}