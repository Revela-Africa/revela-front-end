"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import {
  ProvideRangeDocument,
  RetriggerValuationDocument,
} from "@/graphql/generated/graphql"
import { appToast } from "@/lib/toast"
import { AlertTriangle, RefreshCcw, Calculator, Loader2 } from "lucide-react"

const GRADE_OPTIONS = ["A", "B", "C", "D"]

interface Props {
  vehicleId: string
  onSuccess: () => void // refetch vehicle after action
}

export function PendingReviewPanel({ vehicleId, onSuccess }: Props) {
  const [mode, setMode] = useState<"idle" | "manual" | "retrigger">("idle")
  const [tav, setTav] = useState("")
  const [grade, setGrade] = useState("B")

  // ── Provide range manually ─────────────────────────────
  const [provideRange, { loading: providing }] = useMutation(
    ProvideRangeDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "TAV set successfully",
          description: "Vehicle has been moved to RANGE_PROVIDED",
        })
        setMode("idle")
        setTav("")
        onSuccess()
      },
      onError: (err) => {
        appToast.error({
          title: "Failed to set TAV",
          description: err.message,
        })
      },
    }
  )

  // ── Retrigger AI valuation ─────────────────────────────
  const [retriggerValuation, { loading: retriggering }] = useMutation(
    RetriggerValuationDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Valuation retriggered",
          description: "AI is reprocessing this vehicle",
        })
        setMode("idle")
        onSuccess()
      },
      onError: (err) => {
        appToast.error({
          title: "Failed to retrigger",
          description: err.message,
        })
      },
    }
  )

  async function handleProvideRange() {
    if (!tav || !grade) return
    await provideRange({
      variables: {
        vehicleId,
        tav: Number(tav),
        grade,
      },
    })
  }

  async function handleRetrigger() {
    await retriggerValuation({ variables: { vehicleId } })
  }

  return (
    <div className="bg-white rounded-2xl border border-orange-200 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
          <AlertTriangle size={16} className="text-orange-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">
            AI Valuation Failed
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            The AI model could not generate a TAV for this vehicle.
            You can retrigger the valuation or enter it manually.
          </p>
        </div>
      </div>

      {/* Action buttons — idle state */}
      {mode === "idle" && (
        <div className="flex gap-2">
          <button
            onClick={() => setMode("retrigger")}
            className="flex-1 flex items-center justify-center gap-2 border border-border text-sm font-bold py-2.5 rounded-xl hover:bg-muted/30 transition-colors"
          >
            <RefreshCcw size={14} />
            Retrigger AI
          </button>
          <button
            onClick={() => setMode("manual")}
            className="flex-1 flex items-center justify-center gap-2 bg-[#E8A020] text-white text-sm font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Calculator size={14} />
            Enter Manually
          </button>
        </div>
      )}

      {/* Retrigger confirmation */}
      {mode === "retrigger" && (
        <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/20">
          <p className="text-sm text-foreground">
            This will resubmit the vehicle to the AI model for reanalysis.
            The vehicle will remain in{" "}
            <span className="font-bold">PENDING_REVIEW</span> until the
            AI completes processing.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleRetrigger}
              disabled={retriggering}
              className="flex-1 bg-[#E8A020] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {retriggering && (
                <Loader2 size={14} className="animate-spin" />
              )}
              {retriggering ? "Retriggering..." : "Confirm Retrigger"}
            </button>
            <button
              onClick={() => setMode("idle")}
              className="flex-1 border border-border text-sm py-2 rounded-lg hover:bg-muted/30"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Manual TAV entry */}
      {mode === "manual" && (
        <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Enter the TAV manually. Min and max will be calculated
            automatically (70% and 105% of TAV).
          </p>

          {/* TAV input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Total Asset Value (₦)
            </label>
            <input
              type="number"
              placeholder="e.g. 4500000"
              value={tav}
              onChange={(e) => setTav(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E8A020]"
            />
            {tav && (
              <p className="text-xs text-muted-foreground">
                Range: ₦{Math.round(Number(tav) * 0.7).toLocaleString()} —{" "}
                ₦{Math.round(Number(tav) * 1.05).toLocaleString()}
              </p>
            )}
          </div>

          {/* Grade selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Vehicle Grade
            </label>
            <div className="flex gap-2">
              {GRADE_OPTIONS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${
                    grade === g
                      ? "bg-[#E8A020] text-white border-[#E8A020]"
                      : "border-border text-muted-foreground hover:border-[#E8A020]/40"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleProvideRange}
              disabled={!tav || providing}
              className="flex-1 bg-[#E8A020] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {providing && (
                <Loader2 size={14} className="animate-spin" />
              )}
              {providing ? "Setting TAV..." : "Confirm TAV"}
            </button>
            <button
              onClick={() => {
                setMode("idle")
                setTav("")
                setGrade("B")
              }}
              className="flex-1 border border-border text-sm py-2 rounded-lg hover:bg-muted/30"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}