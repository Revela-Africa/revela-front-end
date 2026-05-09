"use client"

import { useState } from "react"
import { uploadImage } from "@/lib/cloudinary/uploadImage"
import { appToast } from "@/lib/toast"
import { Camera, Loader2, X, FileText, CheckCircle2 } from "lucide-react"
import { CameraCapture } from "@/app/(protected)/components/camera/CameraCapture"
import { Button } from "@/components/ui/button"

const REQUIRED_ANGLES = [
  { id: "front", label: "Front" },
  { id: "rear", label: "Rear" },
  { id: "driver_side", label: "Driver Side" },
  { id: "passenger_side", label: "Passenger Side" },
  { id: "engine", label: "Engine Bay" },
] as const

interface Props {
  vehicleId: string
  onSubmit: (notes: string, photoUrls: string[]) => Promise<void>
  submitting: boolean
}

export function AssessmentForm({ vehicleId, onSubmit, submitting }: Props) {
  const [notes, setNotes] = useState("")
  const [photos, setPhotos] = useState<(File | null)[]>(
    Array(REQUIRED_ANGLES.length).fill(null)
  )
  const [previews, setPreviews] = useState<(string | null)[]>(
    Array(REQUIRED_ANGLES.length).fill(null)
  )
  const [activeCamera, setActiveCamera] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)

  const completedCount = photos.filter(Boolean).length
  const allPhotosAdded = completedCount === REQUIRED_ANGLES.length
  const canSubmit = allPhotosAdded && notes.trim().length > 0

  function handlePhotoCapture(index: number, file: File) {
    const newPhotos = [...photos]
    newPhotos[index] = file
    setPhotos(newPhotos)

    const url = URL.createObjectURL(file)
    const newPreviews = [...previews]
    newPreviews[index] = url
    setPreviews(newPreviews)

    setActiveCamera(null)
  }

  function removePhoto(index: number) {
    const newPhotos = [...photos]
    newPhotos[index] = null
    setPhotos(newPhotos)

    const newPreviews = [...previews]
    if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]!)
    newPreviews[index] = null
    setPreviews(newPreviews)
  }

  async function handleSubmit() {
    if (!canSubmit) return

    try {
      setUploading(true)
      const uploadResults = await Promise.all(
        photos
          .filter(Boolean)
          .map((file) => uploadImage(file!, "revela/inspections"))
      )

      const photoUrls = uploadResults.map((r) => r.url)
      await onSubmit(notes, photoUrls)
    } catch {
      appToast.error({
        title: "Upload failed",
        description: "Could not upload photos. Please try again.",
      })
    } finally {
      setUploading(false)
    }
  }

  const isLoading = uploading || submitting

  return (
    <div className=" w-full space-y-5 py-6">


      {/* Photo Capture Card */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#171D17]">Photo Checklist</h2>
            <p className="text-xs text-[#6A6A6A]">
              {completedCount} of {REQUIRED_ANGLES.length} completed
            </p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              allPhotosAdded ? "bg-green-50" : "bg-[#FFF7E4]"
            }`}
          >
            {allPhotosAdded ? (
              <CheckCircle2 size={20} className="text-green-500" />
            ) : (
              <Camera size={18} className="text-[#E8A020]" />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F7F2EB]">
            <div
              className="h-full rounded-full bg-[#E8A020] transition-all duration-500 ease-out"
              style={{
                width: `${(completedCount / REQUIRED_ANGLES.length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs font-bold text-[#6A6A6A]">
            {Math.round((completedCount / REQUIRED_ANGLES.length) * 100)}%
          </span>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-3">
          {REQUIRED_ANGLES.map((angle, index) => {
            const hasPhoto = !!previews[index]

            return (
              <div key={angle.id} className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6A6A6A]">
                  {angle.label}
                </p>

                {hasPhoto ? (
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={previews[index]!}
                      alt={angle.label}
                      className="h-28 w-full object-cover"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#171D17]/70 text-white backdrop-blur-sm transition-colors hover:bg-[#171D17]"
                    >
                      <X size={14} />
                    </button>
                    <div className="absolute bottom-2 left-2 flex h-5 items-center rounded-full bg-green-500 px-2">
                      <CheckCircle2 size={10} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveCamera(index)}
                    className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#E7E1D8] bg-[#FAF8F5] transition-all active:scale-[0.98] hover:border-[#E8A020]/40 hover:bg-[#FFF7E4]/30"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF7E4]">
                      <Camera size={16} className="text-[#E8A020]" />
                    </div>
                    <span className="text-[10px] font-medium text-[#6A6A6A]">
                      Tap to capture
                    </span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Notes Card */}
      <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5 ">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7E4]">
            <FileText size={16} className="text-[#E8A020]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#171D17]">
              Inspection Notes
            </h2>
            <p className="text-[10px] text-[#6A6A6A]">
              Required before submission
            </p>
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe vehicle condition, visible damage, mechanical issues, interior state..."
          rows={5}
          className="w-full resize-none rounded-2xl border border-[#E7E1D8] bg-[#FAF8F5] px-4 py-3 text-sm text-[#171D17] outline-none transition-colors placeholder:text-[#BFC9C3] focus:border-[#E8A020] focus:ring-2 focus:ring-[#E8A020]/20"
        />

        <div className="mt-2 flex items-center justify-between">
          <p
            className={`text-xs ${
              notes.trim().length > 0 ? "text-green-600" : "text-[#BFC9C3]"
            }`}
          >
            {notes.trim().length > 0 ? "Notes added" : "Add notes to continue"}
          </p>
          <p className="text-xs text-[#BFC9C3]">{notes.length} chars</p>
        </div>
      </div>

      {/* Submit */}
      <div className="space-y-3">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          loading={isLoading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl  text-sm font-bold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {uploading
            ? "Uploading photos..."
            : submitting
            ? "Submitting..."
            : "Submit Inspection Report"}
        </Button>

        {!canSubmit && (
          <div className="rounded-2xl bg-[#FFF7E4] px-4 py-3 text-center">
            <p className="text-xs font-medium text-[#E8A020]">
              {!allPhotosAdded
                ? `Add ${REQUIRED_ANGLES.length - completedCount} more photo${REQUIRED_ANGLES.length - completedCount !== 1 ? "s" : ""} to continue`
                : "Add inspection notes to continue"}
            </p>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {activeCamera !== null && (
        <div className="fixed inset-0 z-50 bg-black">
          <CameraCapture
            angleLabel={REQUIRED_ANGLES[activeCamera].label}
            onCapture={(file) => handlePhotoCapture(activeCamera, file)}
            onClose={() => setActiveCamera(null)}
            onGallerySelect={() => appToast.info({
              title: "Image Selection NOT allowed",
              description:"Revela requires live images on site, make use of the camera interface."
            })}
          />
        </div>
      )}
    </div>
  )
}