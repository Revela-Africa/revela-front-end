"use client";

import { useState } from "react";
import {
  FileText,
  Loader2,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { appToast } from "@/lib/toast";
import { PhotoCapture } from "./PhotoCapture";
import { VehicleFields, VehicleFieldsForm } from "./VehicleFieldsForm";
import type { AssessmentPayload } from "@/features/inspector/hooks/useInspectionDetail";

const PHOTO_COUNT = 5;

interface Props {
  vehicleId: string;
  originalMileage?: number;
  originalCondition?: string;
  onSubmit: (payload: AssessmentPayload) => Promise<void>;
  submitting: boolean;
}

export function AssessmentForm({
  originalMileage,
  originalCondition,
  onSubmit,
  submitting,
}: Props) {
  const [photos, setPhotos] = useState<(File | null)[]>(
    Array(PHOTO_COUNT).fill(null),
  );
  const [previews, setPreviews] = useState<(string | null)[]>(
    Array(PHOTO_COUNT).fill(null),
  );

  const [fields, setFields] = useState<VehicleFields>({
    mileage: originalMileage ? String(originalMileage) : "",
    condition: originalCondition ?? "",
    structuralDamage: false,
    mechanicalOverhaul: false,
    serviceHistory: "",
    drivetrain: "",
    engineType: "",
    transmission: "",
  });

  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);

  const completedPhotos = photos.filter(Boolean).length;
  const allPhotosAdded = completedPhotos === PHOTO_COUNT;

  const canSubmit =
    allPhotosAdded &&
    notes.trim().length > 10 &&
    fields.mileage !== "" &&
    fields.condition !== "" &&
    fields.serviceHistory !== "" &&
    fields.drivetrain !== "" &&
    fields.engineType !== "" &&
    fields.transmission !== "";

  function handleCapture(index: number, file: File) {
    const newPhotos = [...photos];
    newPhotos[index] = file;
    setPhotos(newPhotos);

    const url = URL.createObjectURL(file);
    const newPreviews = [...previews];
    newPreviews[index] = url;
    setPreviews(newPreviews);
  }

  function handleRemove(index: number) {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);

    const newPreviews = [...previews];
    if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]!);
    newPreviews[index] = null;
    setPreviews(newPreviews);
  }

  async function handleSubmit() {
    if (!canSubmit) return;

    try {
      setUploading(true);

      const uploadResults = await Promise.all(
        photos
          .filter(Boolean)
          .map((file) => uploadImage(file!, "revela/inspections")),
      );
      const photoUrls = uploadResults.map((r) => r.url);
      await onSubmit({
        notes,
        photoUrls,
        mileage: Number(fields.mileage),
        condition: fields.condition,
        structuralDamage: fields.structuralDamage,
        mechanicalOverhaul: fields.mechanicalOverhaul,
        serviceHistory: fields.serviceHistory,
        drivetrain: fields.drivetrain,
        engineType: fields.engineType,
        transmission: fields.transmission,
      });
    } catch {
      appToast.error({
        title: "Upload failed",
        description: "Could not upload photos. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  }

  const isLoading = uploading || submitting;

  return (
    <div className="mx-auto w-full  space-y-6 pb-10">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
          Inspection
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#171D17]">
          Vehicle Assessment
        </h1>
        <p className="mt-0.5 text-sm text-[#6A6A6A]">
          Confirm details and document condition
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${allPhotosAdded ? "bg-green-50" : "bg-[#FFF7E4]"}`}
            >
              {allPhotosAdded ? (
                <CheckCircle2 size={20} className="text-green-600" />
              ) : (
                <Camera size={18} className="text-[#E8A020]" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-[#171D17]">
                Photo Checklist
              </p>
              <p className="text-xs text-[#6A6A6A]">
                {completedPhotos} of {PHOTO_COUNT} completed
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#6A6A6A]">
            {Math.round((completedPhotos / PHOTO_COUNT) * 100)}%
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F7F2EB]">
            <div
              className="h-full rounded-full bg-[#E8A020] transition-all duration-500 ease-out"
              style={{ width: `${(completedPhotos / PHOTO_COUNT) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Vehicle Fields */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7E4]">
            <ClipboardList size={16} className="text-[#E8A020]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#171D17]">Vehicle Fields</h2>
            <p className="text-[10px] text-[#6A6A6A]">
              Confirm or correct based on inspection
            </p>
          </div>
        </div>
        <VehicleFieldsForm
          fields={fields}
          onChange={(partial) => setFields((prev) => ({ ...prev, ...partial }))}
        />
      </div>

      {/* Photos */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7E4]">
            <Camera size={16} className="text-[#E8A020]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#171D17]">Photo Evidence</h2>
            <p className="text-[10px] text-[#6A6A6A]">
              Capture all required angles
            </p>
          </div>
        </div>
        <PhotoCapture
          photos={photos}
          previews={previews}
          onCapture={handleCapture}
          onRemove={handleRemove}
        />
      </div>

      {/* Notes */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7E4]">
            <FileText size={16} className="text-[#E8A020]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#171D17]">
              Inspector Notes
            </h2>
            <p className="text-[10px] text-[#6A6A6A]">
              Required before submission
            </p>
          </div>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe the overall vehicle condition, any discrepancies with submitted details, concerns observed during collection..."
          rows={5}
          className="w-full resize-none rounded-2xl border border-[#E7E1D8] bg-[#FAF8F5] px-4 py-3 text-sm text-[#171D17] outline-none transition-colors placeholder:text-[#BFC9C3] focus:border-[#E8A020] focus:ring-2 focus:ring-[#E8A020]/20"
        />
        <div className="mt-2 flex items-center justify-between">
          <p
            className={`text-xs ${notes.trim().length > 10 ? "text-green-600" : "text-[#BFC9C3]"}`}
          >
            {notes.trim().length > 10 ? "Notes valid" : "Minimum 10 characters"}
          </p>
          <p className="text-xs text-[#BFC9C3]">{notes.length} chars</p>
        </div>
      </div>

      {/* Validation summary */}
      {!canSubmit && (
        <div className="rounded-2xl bg-[#FFF7E4] px-4 py-3">
          <div className="flex items-start gap-2">
            <AlertTriangle
              size={14}
              className="mt-0.5 shrink-0 text-[#E8A020]"
            />
            <p className="text-xs font-medium text-[#E8A020]">
              {!allPhotosAdded
                ? `Add ${PHOTO_COUNT - completedPhotos} more photo${PHOTO_COUNT - completedPhotos !== 1 ? "s" : ""}`
                : !fields.mileage
                  ? "Enter confirmed mileage"
                  : !fields.condition
                    ? "Select vehicle condition"
                    : !fields.serviceHistory
                      ? "Select service history"
                      : "Add inspection notes (minimum 10 characters)"}
            </p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || isLoading}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#171D17] text-sm font-bold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {uploading
          ? "Uploading photos..."
          : submitting
            ? "Submitting..."
            : "Submit Inspection Report"}
      </button>
    </div>
  );
}
