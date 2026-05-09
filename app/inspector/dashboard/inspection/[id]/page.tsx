"use client";

import { useParams } from "next/navigation";
import { useInspectionDetail } from "@/features/inspector/hooks/useInspectionDetail";
import { AssessmentForm } from "./_components/AssessmentForm";
import { InspectionHeader } from "./_components/InspectionHeader";
import { Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InspectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { vehicle, loading, error, submitting, handleSubmit } =
    useInspectionDetail(id);

  if (loading && !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[#E8A020]" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <TriangleAlert size={24} className="text-destructive" />
        </div>
        <p className="font-bold text-foreground">Failed to load inspection</p>
        <button
          onClick={() => router.back()}
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const isCompleted = !["INSPECTOR_ASSIGNED", "UNDER_ASSESSMENT"].includes(
    vehicle.status,
  );

  return (
    <div className="min-h-screen bg-[#F7F2EB] font-cabinet pb-10">
      <InspectionHeader
        vehicle={{ ...vehicle, model: vehicle.model ?? null }}
      />

      <div className=" space-y-5">
        {isCompleted ? (
          <div className="bg-white rounded-2xl border border-green-200 p-5 text-center space-y-2">
            <p className="text-sm font-bold text-green-700">
              ✅ Inspection Completed
            </p>
            <p className="text-xs text-muted-foreground">
              This inspection has already been submitted
            </p>
          </div>
        ) : (
  
          <AssessmentForm
            vehicleId={id}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
