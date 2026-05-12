"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import {
  ProvideRangeDocument,
  RetriggerValuationDocument,
  ManualReevaluationDocument,
} from "@/graphql/generated/graphql"
import { appToast } from "@/lib/toast"
import { AlertTriangle, RefreshCcw, Calculator, Loader2 } from "lucide-react"

const GRADE_OPTIONS = ["A", "B", "C", "D"]

// initial → first TAV generation failed (before inspection)
// reevaluation → AI reevaluation failed (after inspector report)
type PanelMode = "initial" | "reevaluation"

interface Props {
  vehicleId: string
  mode: PanelMode
  onSuccess: () => void
}

export function PendingReviewPanel({ vehicleId, mode, onSuccess }: Props) {
  const [view, setView] = useState<"idle" | "manual" | "retrigger">("idle")
  const [tav, setTav] = useState("")
  const [grade, setGrade] = useState("B")

  const isReevaluation = mode === "reevaluation"

  // ── Initial TAV manual entry ───────────────────────────
  const [provideRange, { loading: providing }] = useMutation(
    ProvideRangeDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "TAV set successfully",
          description: "Vehicle moved to RANGE_PROVIDED",
        })
        setView("idle")
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

  // ── Reevaluation manual entry ──────────────────────────
  const [manualReevaluation, { loading: reevaluating }] = useMutation(
    ManualReevaluationDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Reevaluation TAV set",
          description: "Admin can now set a final offer",
        })
        setView("idle")
        setTav("")
        onSuccess()
      },
      onError: (err) => {
        appToast.error({
          title: "Failed to set reevaluation TAV",
          description: err.message,
        })
      },
    }
  )

  // ── Retrigger (works for both modes) ──────────────────
  const [retriggerValuation, { loading: retriggering }] = useMutation(
    RetriggerValuationDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Valuation retriggered",
          description: "AI is reprocessing this vehicle",
        })
        setView("idle")
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

  const manualLoading = isReevaluation ? reevaluating : providing

  async function handleManualSubmit() {
    if (!tav || !grade) return

    if (isReevaluation) {
      await manualReevaluation({
        variables: { vehicleId, tav: Number(tav), grade },
      })
    } else {
      await provideRange({
        variables: { vehicleId, tav: Number(tav), grade },
      })
    }
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
            {isReevaluation
              ? "AI Reevaluation Failed"
              : "AI Valuation Failed"}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isReevaluation
              ? "The AI could not reevaluate the inspector's findings. Retrigger or enter the reevaluation TAV manually."
              : "The AI model could not generate a TAV. Retrigger or enter it manually."}
          </p>
        </div>
      </div>

      {/* Idle — action buttons */}
      {view === "idle" && (
        <div className="flex gap-2">
          <button
            onClick={() => setView("retrigger")}
            className="flex-1 flex items-center justify-center gap-2 border border-border text-sm font-bold py-2.5 rounded-xl hover:bg-muted/30 transition-colors"
          >
            <RefreshCcw size={14} />
            Retrigger AI
          </button>
          <button
            onClick={() => setView("manual")}
            className="flex-1 flex items-center justify-center gap-2 bg-[#E8A020] text-white text-sm font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Calculator size={14} />
            Enter Manually
          </button>
        </div>
      )}

      {/* Retrigger confirmation */}
      {view === "retrigger" && (
        <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/20">
          <p className="text-sm text-foreground">
            {isReevaluation
              ? "This will resubmit the inspector's report to the AI for reevaluation."
              : "This will resubmit the vehicle to the AI model for reanalysis."}
            {" "}The vehicle will remain in its current state until the AI completes processing.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleRetrigger}
              disabled={retriggering}
              className="flex-1 bg-[#E8A020] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {retriggering && <Loader2 size={14} className="animate-spin" />}
              {retriggering ? "Retriggering..." : "Confirm Retrigger"}
            </button>
            <button
              onClick={() => setView("idle")}
              className="flex-1 border border-border text-sm py-2 rounded-lg hover:bg-muted/30"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Manual TAV entry */}
      {view === "manual" && (
        <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/20">
          <p className="text-xs text-muted-foreground">
            {isReevaluation
              ? "Enter the reevaluated TAV based on the inspector's findings. This will unlock the final offer panel."
              : "Enter the TAV manually. Min and max will be calculated automatically."}
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {isReevaluation ? "Reevaluated TAV (₦)" : "Total Asset Value (₦)"}
            </label>
            <input
              type="number"
              placeholder="e.g. 4500000"
              value={tav}
              onChange={(e) => setTav(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E8A020]"
            />
            {tav && !isReevaluation && (
              <p className="text-xs text-muted-foreground">
                Range: ₦{Math.round(Number(tav) * 0.7).toLocaleString()} —{" "}
                ₦{Math.round(Number(tav) * 1.05).toLocaleString()}
              </p>
            )}
          </div>

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
              onClick={handleManualSubmit}
              disabled={!tav || manualLoading}
              className="flex-1 bg-[#E8A020] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {manualLoading && <Loader2 size={14} className="animate-spin" />}
              {manualLoading ? "Setting..." : "Confirm TAV"}
            </button>
            <button
              onClick={() => { setView("idle"); setTav(""); setGrade("B") }}
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