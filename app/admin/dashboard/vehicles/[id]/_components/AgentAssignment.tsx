"use client";

import { useState } from "react";
import { MapPin, Loader2, UserCheck, AlertTriangle } from "lucide-react";

interface Inspector {
  id: string;
  fullName: string;
  phone?: string | null;
  email: string;
  region?: string | null;
  isAvailable?: boolean | null;
  isOutOfRegion: boolean;
}

interface Props {
  vehicleId: string;
  vehicleRegion: string | null;
  vehicleStatus: string; // ← new
  currentAgentName: string | null;
  currentAgentPhone: string | null;
  inspectors: Inspector[];
  inspectorsLoading: boolean;
  showAllInspectors: boolean;
  onShowAll: (val: boolean) => void;
  onAssign: (inspectorId: string) => Promise<void>;
  assigning: boolean;
}

// Statuses where assignment should be disabled
const ASSIGNMENT_LOCKED_STATUSES = [
  "SUBMITTED",
  "PENDING_REVIEW",
  "RANGE_PROVIDED",
  "UNDER_ASSESSMENT",
  "OFFER_SENT",
  "ACCEPTED",
  "PAID",
];

export function AgentAssignment({
  vehicleId,
  vehicleRegion,
  vehicleStatus,
  currentAgentName,
  currentAgentPhone,
  inspectors,
  inspectorsLoading,
  showAllInspectors,
  onShowAll,
  onAssign,
  assigning,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showReassignConfirm, setShowReassignConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingInspector, setPendingInspector] = useState<Inspector | null>(
    null,
  );

  const isLocked = ASSIGNMENT_LOCKED_STATUSES.includes(vehicleStatus);
  const isReassignment = !!currentAgentName;

  function handleSelectInspector(inspector: Inspector) {
    if (isReassignment) {
      // Show confirmation modal before reassigning
      setPendingInspector(inspector);
      setShowReassignConfirm(true);
    } else {
      setSelectedId(inspector.id);
    }
  }

  async function handleConfirmReassign() {
    if (!pendingInspector) return;
    await onAssign(pendingInspector.id);
    setShowReassignConfirm(false);
    setPendingInspector(null);
    setIsOpen(false);
  }

  async function handleConfirmAssign() {
    if (!selectedId) return;
    await onAssign(selectedId);
    setIsOpen(false);
    setSelectedId(null);
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">
            Assigned Inspector
          </h3>

          {isLocked ? (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
              Locked
            </span>
          ) : (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs text-[#E8A020] font-bold hover:underline"
            >
              {isReassignment ? "Reassign" : "Assign"}
            </button>
          )}
        </div>

        {/* Locked reason */}
        {isLocked && (
          <p className="text-xs text-muted-foreground">
            Inspector assignment is locked untill pickup is scheduled.
          </p>
        )}

        {/* Current agent */}
        {currentAgentName && !isOpen && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF7E4] border border-[#E8A020]/20">
            <div className="w-9 h-9 rounded-full bg-[#E8A020] flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">
                {currentAgentName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
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
        {isOpen && !isLocked && (
          <div className="space-y-3">
            {/* Region toggle */}
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

            {/* Reassignment notice */}
            {isReassignment && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-200">
                <AlertTriangle size={12} className="text-orange-600 shrink-0" />
                <p className="text-xs text-orange-700">
                  Selecting an inspector will prompt reassignment confirmation
                </p>
              </div>
            )}

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
                  // Explicitly check for true — null and false both = unavailable
                  const isAvailable = inspector.isAvailable === true;
                  const isSelected = selectedId === inspector.id;

                  return (
                    <button
                      key={inspector.id}
                      onClick={() => {
                        if (!isAvailable) return; // ← block click entirely
                        handleSelectInspector(inspector);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-[#E8A020] bg-[#FFF7E4]"
                          : !isAvailable
                            ? "border-border opacity-40 cursor-not-allowed pointer-events-none"
                            : "border-border hover:bg-muted/30 cursor-pointer"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#E8A020]/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#E8A020]">
                          {inspector.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-foreground truncate">
                            {inspector.fullName}
                          </p>
                          {inspector.isOutOfRegion && inspector.region && (
                            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full shrink-0">
                              {inspector.region}
                            </span>
                          )}
                          {/* Always show availability status clearly */}
                          {isAvailable ? (
                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full shrink-0">
                              Available
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full shrink-0">
                              Unavailable
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
                  );
                })}
              </div>
            )}

            {/* Confirm assign (first time only) */}
            {!isReassignment && (
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleConfirmAssign}
                  disabled={!selectedId || assigning}
                  className="flex-1 bg-[#E8A020] text-white text-sm font-bold py-2 rounded-lg disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {assigning && <Loader2 size={14} className="animate-spin" />}
                  {assigning ? "Assigning..." : "Confirm"}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedId(null);
                  }}
                  className="flex-1 border border-border text-sm py-2 rounded-lg hover:bg-muted/30"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Close button for reassignment flow */}
            {isReassignment && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedId(null);
                }}
                className="w-full border border-border text-sm py-2 rounded-lg hover:bg-muted/30"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Reassign confirmation modal ──────────────────── */}
      {showReassignConfirm && pendingInspector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border p-6 w-full max-w-sm space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Reassign Inspection?
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  You're about to transfer this inspection from{" "}
                  <span className="font-bold text-foreground">
                    {currentAgentName}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-foreground">
                    {pendingInspector.fullName}
                  </span>
                  . The new inspector will be notified immediately.
                </p>
              </div>
            </div>

            {/* Inspector preview */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
              <div className="w-8 h-8 rounded-full bg-[#E8A020] flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">
                  {pendingInspector.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {pendingInspector.fullName}
                </p>
                {pendingInspector.phone && (
                  <p className="text-xs text-muted-foreground">
                    {pendingInspector.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleConfirmReassign}
                disabled={assigning}
                className="flex-1 bg-[#E8A020] text-white text-sm font-bold py-2.5 rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {assigning && <Loader2 size={14} className="animate-spin" />}
                {assigning ? "Reassigning..." : "Confirm Reassignment"}
              </button>
              <button
                onClick={() => {
                  setShowReassignConfirm(false);
                  setPendingInspector(null);
                }}
                className="flex-1 border border-border text-sm py-2.5 rounded-xl hover:bg-muted/30"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
