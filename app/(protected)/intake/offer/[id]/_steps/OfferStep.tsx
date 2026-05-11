"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useMutation } from "@apollo/client/react"
import { useOfferStore } from "@/features/offer/store/useOfferStore"
import {
  AcceptOfferDocument,
  RejectOfferDocument,
} from "@/graphql/generated/graphql"
import { appToast } from "@/lib/toast"
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  Zap,
  LayoutDashboard,
} from "lucide-react"

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`
}

type ConfirmAction = "accept" | "reject" | null

export default function OfferStep() {
  const { offer, reset } = useOfferStore()
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null)

  const cashOffer = offer ?? 0

  const [acceptOffer, { loading: accepting }] = useMutation(
    AcceptOfferDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Offer accepted",
          description: "Payment will be processed within 24 hours",
        })
        reset()
        router.push("/home")
      },
      onError: (err) => {
        appToast.error({
          title: "Failed to accept offer",
          description: err.message,
        })
      },
    }
  )

  const [rejectOffer, { loading: rejecting }] = useMutation(
    RejectOfferDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Offer rejected",
          description: "We've noted your decision",
        })
        reset()
        router.push("/home")
      },
      onError: (err) => {
        appToast.error({
          title: "Failed to reject offer",
          description: err.message,
        })
      },
    }
  )

  async function handleConfirm() {
    if (!confirmAction) return

    if (confirmAction === "accept") {
      await acceptOffer({ variables: { id } })
    } else {
      await rejectOffer({ variables: { id } })
    }

    setConfirmAction(null)
  }

  const isLoading = accepting || rejecting

  return (
    <>
      <div className="mx-auto w-full space-y-6 py-6 font-cabinet">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
            Final Offer
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#171D17]">
            Your Cash Offer
          </h1>
          <p className="mt-2 text-sm text-[#6A6A6A]">
            This offer is valid for 72 hours
          </p>
        </div>

        {/* Offer amount — big and bold */}
        <div className="rounded-3xl border border-[#E7E1D8] bg-white p-8 text-center">
          <p className="text-sm font-medium text-[#6A6A6A]">Cash Offer</p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#E8A020]">
            {formatNaira(cashOffer)}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E8A020]/30 bg-[#FFF7E4] px-4 py-2">
            <Zap fill="#E8A020" size={12} className="text-[#E8A020]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[#E8A020]">
              Valid for 72 hours
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => setConfirmAction("accept")}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#E8A020] text-sm font-bold text-white transition-all hover:bg-[#d4900a] active:scale-[0.98]"
          >
            Accept Cash Offer
          </button>

          <button
            onClick={() => setConfirmAction("reject")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#E7E1D8] text-sm font-semibold text-[#171D17] transition-colors hover:bg-[#F7F2EB]"
          >
            Decline Offer
          </button>

          <button
            onClick={() => router.push("/home")}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl text-sm text-[#6A6A6A] transition-colors hover:text-[#171D17]"
          >
            <LayoutDashboard size={14} />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#171D17]/50 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-sm rounded-3xl border border-[#E7E1D8] bg-white p-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  confirmAction === "accept" ? "bg-[#FFF7E4]" : "bg-red-50"
                }`}
              >
                {confirmAction === "accept" ? (
                  <CheckCircle2 size={32} className="text-[#E8A020]" />
                ) : (
                  <XCircle size={32} className="text-red-500" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mt-5 text-center">
              <h2 className="text-xl font-extrabold text-[#171D17]">
                {confirmAction === "accept"
                  ? "Accept this offer?"
                  : "Decline this offer?"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6A6A6A]">
                {confirmAction === "accept"
                  ? `You're about to accept ${formatNaira(cashOffer)}. Payment will be processed within 24 hours of vehicle collection.`
                  : "You're about to decline this offer. This action is permanent and cannot be withdrawn."}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#FFF7E4] px-3 py-1.5">
                <AlertTriangle size={12} className="text-[#E8A020]" />
                <p className="text-xs font-bold text-[#E8A020]">
                  This action is permanent
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                disabled={isLoading}
                className="flex-1 rounded-2xl border border-[#E7E1D8] py-3 text-sm font-bold text-[#171D17] transition-colors hover:bg-[#F7F2EB] disabled:opacity-40"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-40 ${
                  confirmAction === "accept"
                    ? "bg-[#E8A020] hover:bg-[#d4900a]"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isLoading && <Loader2 size={14} className="animate-spin" />}
                {isLoading
                  ? "Processing..."
                  : confirmAction === "accept"
                  ? "Yes, Accept"
                  : "Yes, Decline"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}