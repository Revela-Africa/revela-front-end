"use client";

import { useState, useRef } from "react";
import { Camera, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntakeHeader } from "../_components/IntakeHeader";

import { cn } from "@/lib/utils";
import { useIntakeStep4 } from "@/features/intake/hooks/useIntakeStep4";
import { CameraCapture } from "../../components/camera/CameraCapture";

export default function IntakeStep4() {
  const {
    form,
    onSubmit,
    isLoading,
    photos,
    addPhoto,
    removePhoto,
    goBack,
    requiredAngles,
    completedCount,
    allComplete,
    getNextFreeIndex,
  } = useIntakeStep4();

  const {
    formState: { errors },
  } = form;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Which angle is the camera currently targeting
  const [activeCameraIndex, setActiveCameraIndex] = useState<number | null>(
    null,
  );

  const currentAngle =
    activeCameraIndex !== null ? requiredAngles[activeCameraIndex] : null;

  function handleCapture(file: File) {
    addPhoto(file, activeCameraIndex!); // ← pass index
    setTimeout(() => setActiveCameraIndex(null), 800);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    files.forEach((file) => {
      const index = getNextFreeIndex();
      if (index === -1) return; // all slots full
      addPhoto(file, index);
    });

    e.target.value = "";
  }

  return (
    <div className="font-cabinet">
      <IntakeHeader
        title="Photo Upload"
        percent={100}
        onExit={goBack}
        exitText="←  Back"
      />

      <div className="mb-6">
        <h1 className="text-xl font-bold text-(--gold-secondary)">
          Capture the Details.
        </h1>
        <p className="text-base text-(--ink-secondary) mt-1">
          Revela AI needs 5 specific angles to verify your car's condition.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        noValidate
        className="space-y-6"
      >
        {/* Camera viewfinder — shows when active */}
        {activeCameraIndex !== null && currentAngle && (
          <CameraCapture
            angleLabel={currentAngle.label}
            onCapture={handleCapture}
            onClose={() => setActiveCameraIndex(null)}
            onGallerySelect={(file) => {
              addPhoto(file, activeCameraIndex);
              setActiveCameraIndex(null);
            }}
          />
        )}

        {/* Required angles tracker */}
        {activeCameraIndex === null && (
          <>
            <div className=" ">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-(--gold-secondary) uppercase tracking-widest">
                  Required Angles
                </p>
                <p className="text-xs font-bold ">
                  {completedCount} of {requiredAngles.length} Complete
                </p>
              </div>

              <div className="w-full inline-flex gap-x-3  overflow-x-auto no-scrollbar   ">
                {requiredAngles.map((angle, index) => {
                  const photo = photos[index];
                  const isComplete = !!photo;

                  return (
                    <div
                      key={angle.id}
                      className=" shrink-0   inline-flex items-center  gap-1"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveCameraIndex(index)}
                        className={cn(
                          " h-27.5 w-37.5 rounded-lg border-2 flex items-center justify-center overflow-hidden transition-all",
                          isComplete
                            ? "border-[#E8A020]"
                            : "border-[#BFC9C3] border bg-white hover:border-[#E8A020]/40",
                        )}
                      >
                        {isComplete ? (
                          <div className="relative w-full h-full group">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={angle.label}
                              className="w-full h-full object-cover"
                            />
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                removePhoto(index);
                              }}
                              className="absolute top-1 z-30 text-white  right-1 "
                            >
                              <XIcon
                                className="hover:scale-[1.2] transition-transform duration-200"
                                size={20}
                              />
                            </span>
                            {/* Retake overlay */}
                            <div
                              onClick={() => {
                                removePhoto(index);
                                setActiveCameraIndex(index);
                              }}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            ></div>
                          </div>
                        ) : (
                          <div className="text-xs tracking-[-0.55px] uppercase flex flex-col items-center font-bold text-[#6A6A6A] text-center">
                            <Camera size={20} />
                            {angle.label}
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upload from gallery fallback */}
            {/* <Button
              type="button"
              disabled={allComplete}
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex normal-case hidden  hover:bg-transparent hover:shadow-none shadow-none items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-border bg-[#FFF9F099] hover:border-[#E8A020]/40 transition-colors font-cabinet"
            >
              <Upload size={16} className="text-[#E8A020]" />
              <span className="text-sm font-medium text-foreground">
                Upload from Gallery instead
              </span>
            </Button> */}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />

            {errors.photos && (
              <p className="text-xs text-destructive">
                {errors.photos.message}
              </p>
            )}

            <Button
              type="button"
              onClick={onSubmit}
              disabled={isLoading || !allComplete}
              className="w-full text-white"
              loading={isLoading}
            >
              Done: Start Analysis
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
