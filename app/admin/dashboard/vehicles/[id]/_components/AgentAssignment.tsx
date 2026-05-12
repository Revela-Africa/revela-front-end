"use client";

import { useState, useMemo } from "react";
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
  vehicleStatus: string;
  currentInspectorId: string | null;
  inspectors: Inspector[];
  allInspectors?: Inspector[];
  inspectorsLoading: boolean;
  showAllInspectors: boolean;
  onShowAll: (val: boolean) => void;
  onAssign: (inspectorId: string) => Promise<void>;
  assigning: boolean;
}

const ASSIGNMENT_LOCKED_STATUSES = [
  "SUBMITTED",
  "PENDING_REVIEW",
  "RANGE_PROVIDED",
  "UNDER_ASSESSMENT",
  "OFFER_SENT",
  "ACCEPTED",
  "OFFER_REJECTED",
  "PAID",
];

export function AgentAssignment({
  vehicleRegion,
  vehicleStatus,
  currentInspectorId,
  inspectors,
  allInspectors,
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

  // Derive current inspector from the array using the ID
  const currentInspector = useMemo(() => {
    if (!currentInspectorId) return null;
    return allInspectors?.find((i) => i.id === currentInspectorId) ?? null;
  }, [currentInspectorId, allInspectors]);

  const isReassignment = !!currentInspector;

  function handleSelectInspector(inspector: Inspector) {
    if (isReassignment) {
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
      <div className="rounded-2xl border border-border bg-white p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">
            Assign Inspector
          </h3>
          {isLocked ? (
            <span className="rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground">
              Locked
            </span>
          ) : (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-bold text-[#E8A020] hover:underline"
            >
              {isReassignment ? "Reassign" : "Assign"}
            </button>
          )}
        </div>

        {isLocked && (
          <p className="text-xs text-muted-foreground">
            Inspector {isReassignment ? "re-assignment" : "assignment"} is not available at the moment.
          </p>
        )}

        {/* Current inspector — only show when panel is closed */}
        {isReassignment && !isOpen && currentInspector && (
          <div className="flex items-center gap-3 rounded-xl border border-[#E8A020]/20 bg-[#FFF7E4] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8A020]">
              <span className="text-xs font-bold text-white">
                {currentInspector.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">
                {currentInspector.fullName}
              </p>
              {currentInspector.phone && (
                <p className="text-xs text-muted-foreground">
                  {currentInspector.phone}
                </p>
              )}
            </div>
            <UserCheck size={16} className="ml-auto text-green-500" />
          </div>
        )}

        {/* No inspector assigned yet */}
        {!isReassignment && !isOpen && !isLocked && (
          <p className="text-xs text-muted-foreground">
            No inspector assigned yet.
          </p>
        )}

        {/* Assignment panel */}
        {isOpen && !isLocked && (
          <div className="space-y-3">
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
                className="text-xs font-bold text-[#E8A020] hover:underline"
              >
                {showAllInspectors ? "Regional only" : "Show all"}
              </button>
            </div>

            {isReassignment && currentInspector && (
              <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 p-2">
                <AlertTriangle size={12} className="shrink-0 text-orange-600" />
                <p className="text-xs text-orange-700">
                  Currently assigned to{" "}
                  <span className="font-bold">{currentInspector.fullName}</span>
                  . Selecting another inspector will prompt reassignment
                  confirmation.
                </p>
              </div>
            )}

            {inspectorsLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 size={20} className="animate-spin text-[#E8A020]" />
              </div>
            ) : inspectors.length === 0 ? (
              <div className="space-y-2 py-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No inspectors found
                </p>
                {!showAllInspectors && (
                  <button
                    onClick={() => onShowAll(true)}
                    className="text-xs font-bold text-[#E8A020] hover:underline"
                  >
                    Show all inspectors
                  </button>
                )}
              </div>
            ) : (
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {inspectors.map((inspector) => {
                  const isSelected = selectedId === inspector.id;
                  const isAvailable = inspector.isAvailable === true;
                  const isCurrent = currentInspector?.id === inspector.id;

                  return (
                    <button
                      key={inspector.id}
                      onClick={() => handleSelectInspector(inspector)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? "border-[#E8A020] bg-[#FFF7E4]"
                          : "border-border hover:bg-muted/30"
                      } ${isCurrent ? "ring-1 ring-[#E8A020]/30" : ""}`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8A020]/20">
                        <span className="text-xs font-bold text-[#E8A020]">
                          {inspector.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-bold text-foreground">
                            {inspector.fullName}
                          </p>
                          {isCurrent && (
                            <span className="shrink-0 rounded-full bg-[#E8A020] px-1.5 py-0.5 text-[10px] font-bold text-white">
                              Current
                            </span>
                          )}
                          {inspector.isOutOfRegion && inspector.region && (
                            <span className="shrink-0 rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold text-orange-600">
                              {inspector.region}
                            </span>
                          )}
                          <span
                            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                              isAvailable
                                ? "bg-green-50 text-green-600"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isAvailable ? "Available" : "Busy"}
                          </span>
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

            {/* Confirm button — first assignment only */}
            {!isReassignment && (
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleConfirmAssign}
                  disabled={!selectedId || assigning}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#E8A020] py-2 text-sm font-bold text-white disabled:opacity-40"
                >
                  {assigning && <Loader2 size={14} className="animate-spin" />}
                  {assigning ? "Assigning..." : "Confirm"}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedId(null);
                  }}
                  className="flex-1 rounded-lg border border-border py-2 text-sm hover:bg-muted/30"
                >
                  Cancel
                </button>
              </div>
            )}

            {isReassignment && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedId(null);
                }}
                className="w-full rounded-lg border border-border py-2 text-sm hover:bg-muted/30"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

      {/* Reassign modal */}
      {showReassignConfirm && pendingInspector && currentInspector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-white p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                <AlertTriangle size={20} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Reassign Inspection?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  You're about to transfer this inspection from{" "}
                  <span className="font-bold text-foreground">
                    {currentInspector.fullName}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold text-foreground">
                    {pendingInspector.fullName}
                  </span>
                  . The new inspector will be notified immediately.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8A020]">
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
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E8A020] py-2.5 text-sm font-bold text-white disabled:opacity-40"
              >
                {assigning && <Loader2 size={14} className="animate-spin" />}
                {assigning ? "Reassigning..." : "Confirm Reassignment"}
              </button>
              <button
                onClick={() => {
                  setShowReassignConfirm(false);
                  setPendingInspector(null);
                }}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm hover:bg-muted/30"
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
