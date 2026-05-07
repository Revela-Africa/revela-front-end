"use client"

import { useState } from "react"
import { MapPin, Loader2, UserCheck } from "lucide-react"

interface Inspector {
  id: string
  fullName: string
  phone?: string | null      // ← nullable
  email: string
  region?: string | null     // ← nullable
  isAvailable?: boolean | null
  isOutOfRegion: boolean
}

interface Props {
  vehicleId: string
  vehicleRegion: string | null
  currentAgentName: string | null
  currentAgentPhone: string | null
  inspectors: Inspector[]
  inspectorsLoading: boolean
  showAllInspectors: boolean
  onShowAll: (val: boolean) => void
  onAssign: (inspectorId: string) => Promise<void>
  assigning: boolean
}

export function AgentAssignment({
  vehicleId,
  vehicleRegion,
  currentAgentName,
  currentAgentPhone,
  inspectors,
  inspectorsLoading,
  showAllInspectors,
  onShowAll,
  onAssign,
  assigning,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  async function handleConfirm() {
    if (!selectedId) return
    await onAssign(selectedId)
    setIsOpen(false)
    setSelectedId(null)
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">
          Assigned Inspector
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          {currentAgentName ? "Reassign" : "Assign"}
        </button>
      </div>

      {/* Current agent */}
      {currentAgentName && !isOpen && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF7E4] border border-[#E8A020]/20">
          <div className="w-9 h-9 rounded-full bg-[#E8A020] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">
              {currentAgentName.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              {currentAgentName}
            </p>
            {currentAgentPhone && (
              <p className="text-xs text-muted-foreground">
                {currentAgentPhone}
              </p>
            )}
          </div>
          <UserCheck size={16} className="text-green-500 ml-auto" />
        </div>
      )}

      {/* Assignment panel */}
      {isOpen && (
        <div className="space-y-3">
          {/* Region info + toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#E8A020]" />
              <p className="text-xs text-muted-foreground">
                {showAllInspectors
                  ? "All inspectors"
                  : `${vehicleRegion ?? "Regional"} inspectors`}
              </p>
            </div>
            <button
              onClick={() => onShowAll(!showAllInspectors)}
              className="text-xs text-[#E8A020] font-bold hover:underline"
            >
              {showAllInspectors ? "Regional only" : "Show all"}
            </button>
          </div>

          {/* Inspector list */}
          {inspectorsLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 size={20} className="animate-spin text-[#E8A020]" />
            </div>
          ) : inspectors.length === 0 ? (
            <div className="py-4 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                No inspectors in this region
              </p>
              {!showAllInspectors && (
                <button
                  onClick={() => onShowAll(true)}
                  className="text-xs text-[#E8A020] font-bold hover:underline"
                >
                  Show all inspectors
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {inspectors.map((inspector) => {
                const isUnavailable = inspector.isAvailable === false
                const isSelected = selectedId === inspector.id

                return (
                  <button
                    key={inspector.id}
                    onClick={() => {
                      if (isUnavailable) return
                      setSelectedId(inspector.id)
                    }}
                    disabled={isUnavailable}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-[#E8A020] bg-[#FFF7E4]"
                        : isUnavailable
                        ? "border-border opacity-40 cursor-not-allowed"
                        : "border-border hover:bg-muted/30 cursor-pointer"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-[#E8A020]/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#E8A020]">
                        {inspector.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-foreground truncate">
                          {inspector.fullName}
                        </p>

                        {/* Out of region badge */}
                        {inspector.isOutOfRegion && inspector.region && (
                          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full shrink-0">
                            {inspector.region}
                          </span>
                        )}

                        {/* Unavailable badge */}
                        {isUnavailable && (
                          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full shrink-0">
                            Unavailable
                          </span>
                        )}

                        {/* Available badge */}
                        {inspector.isAvailable && !isUnavailable && (
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full shrink-0">
                            Available
                          </span>
                        )}
                      </div>

                      {inspector.phone && (
                        <p className="text-xs text-muted-foreground">
                          {inspector.phone}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleConfirm}
              disabled={!selectedId || assigning}
              className="flex-1 bg-[#E8A020] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {assigning && (
                <Loader2 size={14} className="animate-spin" />
              )}
              {assigning ? "Assigning..." : "Confirm"}
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                setSelectedId(null)
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