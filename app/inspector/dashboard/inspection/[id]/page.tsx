"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useInspectionDetail } from "@/features/inspector/hooks/useInspectionDetail";
import { AssessmentForm } from "./_components/AssessmentForm";
import { InspectionHeader } from "./_components/InspectionHeader";
import { Loader2, TriangleAlert, CheckCircle2, Clock } from "lucide-react";

export default function InspectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { vehicle, loading, error, submitting, handleSubmit } =
    useInspectionDetail(id);

  if (loading && !vehicle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <Loader2 size={24} className="animate-spin text-[#E8A020]" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FAF8F5] p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E4]">
          <TriangleAlert size={24} className="text-[#E8A020]" />
        </div>
        <p className="font-bold text-[#171D17]">Failed to load inspection</p>
        <button
          onClick={() => router.back()}
          className="text-xs font-bold text-[#E8A020] hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const canAssess = vehicle.status === "INSPECTOR_ASSIGNED";
  const isUnderAssessment = vehicle.status === "UNDER_ASSESSMENT";

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-10">
      <InspectionHeader
        vehicle={{ ...vehicle, model: vehicle.model ?? null }}
      />

      <div className="mx-auto w-full max-w-md space-y-5 px-5 pt-5">
        {canAssess ? (
          <AssessmentForm
            vehicleId={id}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        ) : isUnderAssessment ? (
          <div className="rounded-3xl border border-[#E7E1D8] bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF7E4]">
              <Clock size={20} className="text-[#E8A020]" />
            </div>
            <p className="mt-3 text-sm font-bold text-[#171D17]">
              Assessment Submitted
            </p>
            <p className="mt-1 text-xs text-[#6A6A6A]">
              This vehicle is currently under assessment
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-green-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <p className="mt-3 text-sm font-bold text-green-700">
              Inspection Completed
            </p>
            <p className="mt-1 text-xs text-[#6A6A6A]">
              This inspection has already been submitted
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
