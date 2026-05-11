"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Share2, Loader2 } from "lucide-react";
import { useAdminVehicleDetail } from "@/features/admin/hooks/useAdminVehicleDetail";
import { VehicleSpecs } from "./_components/VehicleSpecs";
import { PhotoStrip } from "./_components/PhotoStrip";
import { TAVBreakdown } from "./_components/TAVBreakdown";
import { AgentAssignment } from "./_components/AgentAssignment";

import { useMutation } from "@apollo/client/react";
import { appToast } from "@/lib/toast";
import { StatusFlow } from "../_components/StatusFlow";
import { ActivityLog } from "../_components/ActivityLog";
import { STATUS_STYLES } from "@/shared/constants/status-styles";
import { PendingReviewPanel } from "./_components/PendingReviewPanel";
import {
  MarkAsPaidDocument,
  SendOfferDocument,
} from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [offerAmount, setOfferAmount] = useState("");
  const [isSettingOffer, setIsSettingOffer] = useState(false);

  const {
    vehicle,
    vehicleLoading,
    vehicleError,
    inspectors,
    allInspectors,
    inspectorsLoading,
    showAllInspectors,
    setShowAllInspectors,
    handleAssign,
    assigning,
    refetch,
  } = useAdminVehicleDetail(id);

  // console.log(vehicle);

  // Send offer mutation
  const [sendOffer, { loading: sendingOffer }] = useMutation(
    SendOfferDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Offer sent",
          description: "User has been notified",
        });
        setIsSettingOffer(false);
        setOfferAmount("");
        refetch();
      },
      onError: (err) => {
        appToast.error({
          title: "Failed to send offer",
          description: err.message,
        });
      },
    },
  );

  // Mark as paid mutation
  const [markAsPaid, { loading: markingPaid }] = useMutation(
    MarkAsPaidDocument,
    {
      onCompleted: () => {
        appToast.success({
          title: "Marked as paid",
          description: "Transaction logged",
        });
        refetch();
      },
      onError: (err) => {
        appToast.error({
          title: "Failed",
          description: err.message,
        });
      },
    },
  );

  async function handleSendOffer() {
    if (!offerAmount || !vehicle) return;
    await sendOffer({
      variables: {
        id: vehicle.id,
        offer: Number(offerAmount),
      },
    });
  }

  async function handleMarkAsPaid() {
    if (!vehicle) return;
    await markAsPaid({ variables: { id: vehicle.id } });
  }

  // Loading state
  if (vehicleLoading && !vehicle) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-[#E8A020]" />
      </div>
    );
  }

  // Error state
  if (vehicleError || !vehicle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-sm text-destructive">Failed to load vehicle</p>
        <button
          onClick={() => router.back()}
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const statusStyle =
    STATUS_STYLES[vehicle.status] ??
    "bg-gray-100 text-gray-600 border-gray-200";
  const primaryImage = vehicle.imageUrls?.[0]?.imageUrl;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          All Vehicles
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* ── Left — main content ─────────────────────────── */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-xl bg-[#FFF7E4] flex items-center justify-center shrink-0 overflow-hidden">
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt={`${vehicle.year} ${vehicle.make}`}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <span className="text-4xl">🚗</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-xl font-bold text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h1>
                    <p className="text-sm text-muted-foreground font-courier-prime">
                      {vehicle.bookingReference}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${statusStyle}`}
                  >
                    {vehicle.status.replace(/_/g, " ")}
                  </span>
                </div>
                <VehicleSpecs vehicle={vehicle} />
              </div>
            </div>
          </div>
          {/* Photos */}
          <PhotoStrip images={vehicle.imageUrls} />
          {/* TAV breakdown */}

          {vehicle.tav && (
            <TAVBreakdown
              tav={vehicle.tav}
              min={vehicle.min}
              max={vehicle.max}
              condition={vehicle.condition}
              mileage={vehicle.mileage}
              structuralDamage={vehicle.structuralDamage}
              mechanicalOverhaul={vehicle.mechanicalOverhaul}
              serviceHistory={vehicle.serviceHistory}
              drivetrain={vehicle.drivetrain}
              engineType={vehicle.engineType}
              transmission={vehicle.transmission}
              reevaluationTav={vehicle.reevaluationTav}
              reevaluationGrade={vehicle.reevaluationGrade}
              inspectionReport={vehicle.inspectionReport}
            />
          )}
        </div>

        {/* ── Right — actions panel ───────────────────────── */}
        <div className="space-y-4">
          {vehicle.status === "PENDING_REVIEW" && (
            <PendingReviewPanel vehicleId={vehicle.id} onSuccess={refetch} />
          )}
          <StatusFlow currentStatus={vehicle.status} />

          <AgentAssignment
            vehicleId={vehicle.id}
            vehicleRegion={vehicle.region ?? null}
            vehicleStatus={vehicle.status}
            currentInspectorId={vehicle.inspectorId ?? null}
            inspectors={inspectors}
            allInspectors={allInspectors}
            inspectorsLoading={inspectorsLoading}
            showAllInspectors={showAllInspectors}
            onShowAll={setShowAllInspectors}
            onAssign={handleAssign}
            assigning={assigning}
          />

          {/* Final offer panel */}
          {/* Final offer panel */}
          <div className="bg-white rounded-2xl border border-border p-4 space-y-3">
            <h3 className="text-sm font-bold text-foreground">Final Offer</h3>

            {/* Offer already sent */}
            {vehicle.offer ? (
              <div className="space-y-2">
                <p className="text-2xl font-bold text-[#E8A020]">
                  ₦{vehicle.offer.toLocaleString()}
                </p>
                {vehicle.status === "OFFER_SENT" && (
                  <p className="text-xs text-muted-foreground">
                    Awaiting user response
                  </p>
                )}
                {vehicle.status === "ACCEPTED" && (
                  <p className="text-xs text-green-600 font-bold">
                    ✅ Accepted by user
                  </p>
                )}
                {vehicle.status === "OFFER_REJECTED" && (
                  <p className="text-xs text-red-500 font-bold">
                    ❌ Rejected by user
                  </p>
                )}
              </div>
            ) : isSettingOffer ? (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Reevaluated TAV:{" "}
                    <span className="font-bold text-[#E8A020]">
                      {vehicle.reevaluationTav
                        ? `₦${vehicle.reevaluationTav.toLocaleString()}`
                        : "—"}
                    </span>
                  </p>
                  <input
                    type="number"
                    placeholder="Enter offer amount"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E8A020]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSendOffer}
                    disabled={!offerAmount || sendingOffer}
                    className="flex-1 bg-[#E8A020] text-white  normal-case text-sm font-bold py-2 rounded-lg disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    Send Offer
                  </Button>
                  <Button
                    onClick={() => {
                      setIsSettingOffer(false);
                      setOfferAmount("");
                    }}
                    className="flex-1 border border-border normal-case text-sm py-2 rounded-lg hover:bg-muted/30"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => setIsSettingOffer(true)}
                  disabled={
                    !vehicle.inspectionReport || !vehicle.reevaluationTav
                  }
                  className="w-full bg-[#E8A020] text-white font-bold py-3 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Set & Send Offer →
                </button>

                {/* Clear reason why it's disabled */}
                {!vehicle.inspectionReport && (
                  <p className="text-xs text-muted-foreground text-center">
                    Waiting for inspector to submit report
                  </p>
                )}
                {vehicle.inspectionReport && !vehicle.reevaluationTav && (
                  <p className="text-xs text-muted-foreground text-center">
                    Waiting for AI reevaluation to complete
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Mark as paid */}
          {vehicle.status === "ACCEPTED" && (
            <button
              onClick={handleMarkAsPaid}
              disabled={markingPaid}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40"
            >
              {markingPaid && <Loader2 size={14} className="animate-spin" />}
              {markingPaid ? "Processing..." : "Advance to Payment →"}
            </button>
          )}

          {/* Activity log */}
          <ActivityLog inspectorId={vehicle.inspectorId ?? ""} />
        </div>
      </div>
    </div>
  );
}
