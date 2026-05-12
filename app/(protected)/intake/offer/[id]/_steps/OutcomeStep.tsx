"use client"

import { useRouter } from "next/navigation"
import { useOfferStore } from "@/features/offer/store/useOfferStore"
import { CheckCircle2, XCircle, LayoutDashboard, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function formatNaira(amount: number | null) {
  if (!amount) return "—"
  return `₦${amount.toLocaleString()}`
}

export default function OutcomeStep() {
  const router = useRouter()
  const { offer, make, model, year, vehicleStatus, reset } = useOfferStore()

  const isAccepted = vehicleStatus === "ACCEPTED"

  function handleDone() {
    reset()
    router.push("/home")
  }

  return (
    <div className="font-cabinet space-y-6 py-4">

      {/* Icon */}
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center ${
          isAccepted ? "bg-green-500" : "bg-red-500"
        }`}>
          {isAccepted ? (
            <CheckCircle2 size={44} color="green" />
          ) : (
            <XCircle size={44} color="black" />
          )}
        </div>
        <div>
          <h1 className={`text-2xl font-extrabold ${
            isAccepted ? "text-green-600" : "text-red-500"
          }`}>
            {isAccepted ? "Offer Accepted" : "Offer Declined"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-xs mx-auto">
            {isAccepted
              ? "Your decision has been recorded. Payment is being processed."
              : "Your decision has been recorded. We're sorry to see you go."}
          </p>
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className={`px-4 py-3 ${
          isAccepted ? "bg-green-50 border-b border-green-100" : "bg-red-50 border-b border-red-100"
        }`}>
          <p className={`text-xs font-bold uppercase tracking-widest ${
            isAccepted ? "text-green-700" : "text-red-600"
          }`}>
            {isAccepted ? "Accepted Offer" : "Declined Offer"}
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
            <p className="text-sm text-muted-foreground">Offer Amount</p>
            <p className={`text-sm font-bold ${
              isAccepted ? "text-green-600" : "text-muted-foreground line-through"
            }`}>
              {formatNaira(offer)}
            </p>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-muted-foreground">Decision</p>
            <p className={`text-xs font-bold px-3 py-1 rounded-full ${
              isAccepted
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}>
              {isAccepted ? "Accepted" : "Declined"}
            </p>
          </div>
        </div>
      </div>

      {/* Accepted — next steps */}
      {isAccepted && (
        <div className="bg-[#FFF7E4] border border-[#E8A020]/30 rounded-2xl p-4 space-y-3">
          <p className="text-sm font-bold text-[#E8A020]">What happens next?</p>
          <div className="space-y-2.5">
            {[
              {
                step: "1",
                text: "Payment is being processed to your registered bank account",
              },
              {
                step: "2",
                text: "Funds typically clear within 2 hours of confirmation",
              },
              {
                step: "3",
                text: "You'll receive an SMS confirmation once payment is sent",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E8A020] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Declined — what now */}
      {!isAccepted && (
        <div className="bg-muted/40 border border-border rounded-2xl p-4 space-y-2">
          <p className="text-sm font-bold text-foreground">
            Changed your mind?
          </p>
          <p className="text-xs text-muted-foreground">
            If you'd like to reconsider or have questions about our valuation,
            please contact our support team at{" "}
            <Link
                       className="font-bold text-[#D4900A]"
                       href="mailto:support@revelaafrica.com"
                     >
                       support@revelaafrica.com
                     </Link>
          </p>
        </div>
      )}

      {/* Actions */}
      <Button
        onClick={handleDone}
        className="w-full flex items-center justify-center gap-2 normal-case  text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        <LayoutDashboard size={16} />
        Back to Dashboard
      </Button>

     
    </div>
  )
}