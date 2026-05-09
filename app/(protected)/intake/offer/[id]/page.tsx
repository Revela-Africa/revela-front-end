"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@apollo/client/react"
import { GetSingleUserVehicleDocument } from "@/graphql/generated/graphql"
import { useOfferStore } from "@/features/offer/store/useOfferStore"


import ResultsStep from "./_steps/ResultsStep"
import BankStep from "./_steps/BankStep"
import ConfirmStep from "./_steps/ConfirmStep"
import ScheduleStep from "./_steps/ScheduleStep"
import FinalStep from "./_steps/FinalStep"
import OfferStep from "./_steps/OfferStep"

// Status → step mapping
function getStepFromStatus(status: string): number {
  switch (status) {
    case "RANGE_PROVIDED":
      return 1  // ResultsStep

    case "INSPECTION_SCHEDULED":
    case "INSPECTOR_ASSIGNED":
    case "UNDER_ASSESSMENT":
      return 5  // FinalStep — user watches timeline progress

    case "OFFER_SENT":
    case "OFFER_REJECTED":
    case "ACCEPTED":
    case "PAID":
      return 6  // OfferStep — final offer interaction

    default:
      return 1
  }
}

export default function OfferPage() {
  const { id } = useParams<{ id: string }>()
  const {
    step,
    tav,
    setVehicleData,
    setImageUrls,
    setStep,
    setOffer,
  } = useOfferStore()

  // Always fetch when coming from inventory (store might be empty)
  // Skip only if store already has data AND we came from processing page
  const storeHasData = !!tav

  const { data, loading, error } = useQuery(GetSingleUserVehicleDocument, {
    variables: { vehicleId: id },
    skip: !id || storeHasData,
  })

useEffect(() => {
  const vehicle = data?.getSingleUserVehicle
  if (!vehicle) return

  // ── Always set step from status ──────────────────────
  // Keeps UI in sync regardless of navigation entry point
  const correctStep = getStepFromStatus(vehicle.status)
  setStep(correctStep)

  // ── Enforce real TAV from backend ─────────────────────
  // We no longer support fake/generated values.
  // If this ever fails, it's a backend contract issue.
  if (vehicle.tav == null) {
    console.error("TAV missing from backend:", vehicle)

    // Option 1 (strict): stop execution entirely
    return

    // Option 2 (if you want UI fallback instead of breaking flow):
    // throw new Error("TAV is required but missing")
  }

  const tav = vehicle.tav

  
  setImageUrls(
    (vehicle.imageUrls ?? []).map((img) => ({
      imageUrl: img.imageUrl,
      angle: img.angle,
    }))
  )

  setVehicleData({
    vehicleId: vehicle.id,
    make: vehicle.make,
    model: vehicle.model ?? null,
    year: String(vehicle.year),
    mileage: String(vehicle.mileage),
    condition: vehicle.condition,
    tav,
    min: vehicle.min ?? Math.round(tav * 0.7),
    max: vehicle.max ?? Math.round(tav * 1.05),
  })

  // ── Set real offer if admin has provided one ──────────
  if (vehicle.offer) {
    setOffer(vehicle.offer)
  }
}, [data])



  if (!storeHasData && loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!storeHasData && error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-destructive text-center">
          Failed to load vehicle. Please try again.
        </p>
      </div>
    )
  }

  return (
    <>
      {step === 1 && <ResultsStep />}
      {step === 2 && <BankStep />}
      {step === 3 && <ConfirmStep />}
      {step === 4 && <ScheduleStep />}
      {step === 5 && <FinalStep />}
      {step === 6 && <OfferStep />}
    </>
  )
}