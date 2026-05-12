"use client"

import { useRouter } from "next/navigation"
import { useOfferStore } from "@/features/offer/store/useOfferStore"
import { Banknote, LayoutDashboard, CheckCircle2 } from "lucide-react"

function formatNaira(amount: number | null) {
  if (!amount) return "—"
  return `₦${amount.toLocaleString()}`
}

export default function PaidStep() {
  const router = useRouter()
  const { offer, make, model, year, bankName, accountNumber, reset } =
    useOfferStore()

  function handleDone() {
    reset()
    router.push("/home")
  }

  // Mask account number — show last 4 digits only
  const maskedAccount = accountNumber
    ? `****${accountNumber.slice(-4)}`
    : "****"

  return (
    <div className="font-cabinet space-y-6 py-4">

      {/* Icon */}
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <div className="w-24 h-24 rounded-3xl bg-green-500 flex items-center justify-center">
          <Banknote size={44} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-green-600">
            Payment Sent
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-xs mx-auto">
            Your funds have been disbursed. Please check your bank account for confirmation.
          </p>
        </div>
      </div>

      {/* Payment details */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="bg-green-50 border-b border-green-100 px-4 py-3 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-green-600" />
          <p className="text-xs font-bold text-green-700 uppercase tracking-widest">
            Payment Confirmed
          </p>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-muted-foreground">Vehicle</p>
            <p className="text-sm font-bold text-foreground">
              {year} {make} {model}
            </p>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-muted-foreground">Amount Paid</p>
            <p className="text-sm font-bold text-green-600">
              {formatNaira(offer)}
            </p>
          </div>
          {bankName && (
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm text-muted-foreground">Paid To</p>
              <p className="text-sm font-bold text-foreground">
                {bankName} · {maskedAccount}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#FFF7E4] border border-[#E8A020]/30 rounded-2xl p-4 space-y-2">
        <p className="text-sm font-bold text-[#E8A020]">
          Don't see it yet?
        </p>
        <p className="text-xs text-muted-foreground">
          Bank transfers can take up to 2 hours to reflect depending on your bank.
          If you haven't received payment within 24 hours, please contact us at{" "}
          <span className="font-bold text-foreground">
            support@revelaafrica.com
          </span>
        </p>
      </div>

      <button
        onClick={handleDone}
        className="w-full flex items-center justify-center gap-2 bg-[#171D17] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        <LayoutDashboard size={16} />
        Back to Dashboard
      </button>
    </div>
  )
}