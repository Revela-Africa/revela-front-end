import { Check, Clock } from "lucide-react"

const STATUSES = [
  { key: "SUBMITTED", label: "Registered" },
  { key: "RANGE_PROVIDED", label: "TAV Generated" },
  { key: "INSPECTION_SCHEDULED", label: "Pickup Scheduled" },
  { key: "UNDER_ASSESSMENT", label: "Mechanic Verified" },
  { key: "OFFER_SENT", label: "Offer Sent" },
  { key: "ACCEPTED", label: "Collected" },
  { key: "PAID", label: "Payment Issued" },
]

const ORDER = STATUSES.map((s) => s.key)

export function StatusFlow({ currentStatus }: { currentStatus: string }) {
  const currentIndex = ORDER.indexOf(currentStatus)

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