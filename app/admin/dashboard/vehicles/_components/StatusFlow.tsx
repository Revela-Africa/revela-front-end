

import { Check, XCircle } from "lucide-react";

const BASE_STATUSES = [
  { key: "SUBMITTED", label: "Registered" },
  { key: "RANGE_PROVIDED", label: "TAV Generated" },
  { key: "INSPECTION_SCHEDULED", label: "Pickup Scheduled" },
  { key: "INSPECTOR_ASSIGNED", label: "Inspector Assigned" },
  { key: "UNDER_ASSESSMENT", label: "Under Assessment" },
  { key: "OFFER_SENT", label: "Offer Sent" },
  { key: "ACCEPTED", label: "Offer Accepted" },
  { key: "PAID", label: "Payment Issued" },
] as const;

const FAILURE_STATUS = {
  key: "PENDING_REVIEW",
  label: "Valuation Failed ⚠️",
} as const;

const REJECTED_STATUS = {
  key: "OFFER_REJECTED",
  label: "Offer Rejected ✕",
} as const;

type BaseStatusKey = (typeof BASE_STATUSES)[number]["key"];
type FailureStatusKey = typeof FAILURE_STATUS.key;
type RejectedStatusKey = typeof REJECTED_STATUS.key;
export type VehicleStatus =
  | BaseStatusKey
  | FailureStatusKey
  | RejectedStatusKey;

function getStatuses(currentStatus: string) {
  if (currentStatus === "PENDING_REVIEW") {
    return [BASE_STATUSES[0], FAILURE_STATUS, ...BASE_STATUSES.slice(1)];
  }

  if (currentStatus === "OFFER_REJECTED") {
    return [
      BASE_STATUSES[0],
      BASE_STATUSES[1],
      BASE_STATUSES[2],
      BASE_STATUSES[3],
      BASE_STATUSES[4],
      BASE_STATUSES[5],
      REJECTED_STATUS,
    ];
  }

  return [...BASE_STATUSES];
}

export function StatusFlow({ currentStatus }: { currentStatus: string }) {
  const STATUSES = getStatuses(currentStatus);
  const ORDER = STATUSES.map((s) => s.key);
  const currentIndex = ORDER.indexOf(currentStatus as VehicleStatus);

  const isRejected = currentStatus === "OFFER_REJECTED";
  const isComplete = currentStatus === "PAID";

  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <h3 className="mb-4 text-sm font-bold text-foreground">Status Flow</h3>
      <div className="space-y-3">
        {STATUSES.map((status, index) => {
          const isDone = isComplete || index < currentIndex;
          const isCurrent = !isComplete && index === currentIndex;
          const isTerminal = isRejected && index === currentIndex;

          return (
            <div key={status.key} className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isTerminal
                    ? "bg-red-500"
                    : isDone
                      ? "bg-green-500"
                      : isCurrent
                        ? "bg-[#E8A020]"
                        : "bg-muted"
                }`}
              >
                {isTerminal ? (
                  <XCircle size={10} color="white" />
                ) : isDone ? (
                  <Check size={10} color="white" />
                ) : isCurrent ? (
                  <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                ) : null}
              </div>
              <p
                className={`flex-1 text-sm ${
                  isTerminal
                    ? "font-bold text-red-600"
                    : isDone
                      ? "text-muted-foreground line-through"
                      : isCurrent
                        ? "font-bold text-foreground"
                        : "text-muted-foreground"
                }`}
              >
                {status.label}
              </p>
              {isCurrent && (
                <span className="rounded-full bg-[#FFF7E4] px-2 py-0.5 text-[10px] font-bold text-[#E8A020]">
                  Now
                </span>
              )}
              {isComplete && index === currentIndex && (
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">
                  Complete
                </span>
              )}
              {isTerminal && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                  Rejected
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
