"use client"

import { useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useOfferStore } from "@/features/offer/store/useOfferStore"
import { useQuery } from "@apollo/client/react"
import { GetSingleUserVehicleDocument } from "@/graphql/generated/graphql"
import { generateFakeTAV } from "@/features/offer/utils/generateFakeTAV"
import VehicleScanner from "../../_components/VehicleScanner"
import ProcessingSteps from "../../_components/ProcessingSteps"
import { ChartCandlestick, RefreshCcw, Verified, TriangleAlert } from "lucide-react"

const PROCESSING_STEPS = [
  {
    label: "Analyzing body integrity...",
    delay: 0,
    icon: <Verified size={17} color="#3A3A3A" />,
  },
  {
    label: "Checking market price...",
    delay: 2500,
    icon: <RefreshCcw size={17} color="#3A3A3A" />,
  },
  {
    label: "Evaluating parts value...",
    delay: 5000,
    icon: <ChartCandlestick size={17} color="#3A3A3A" />,
  },
]

export default function ProcessingPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { setVehicleData, setImageUrls, setStep } = useOfferStore()

  const hasNavigated = useRef(false)
  const fakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data, error: vehicleError } = useQuery(GetSingleUserVehicleDocument, {
    variables: { vehicleId: id },
    skip: !id,
    pollInterval: 5000, // poll every 5s waiting for RANGE_PROVIDED
  })

  const vehicle = data?.getSingleUserVehicle

  // ── Helper — populate store and navigate ───────────────
  function populateAndNavigate(
    tav: number,
    min: number,
    max: number,
  ) {
    if (hasNavigated.current) return
    hasNavigated.current = true

    // Clear fake timer if it's still running
    if (fakeTimerRef.current) {
      clearTimeout(fakeTimerRef.current)
      fakeTimerRef.current = null
    }

    setImageUrls(
      (vehicle?.imageUrls ?? []).map((img) => ({
        imageUrl: img.imageUrl,
        angle: img.angle,
      }))
    )

    setVehicleData({
      vehicleId: id,
      make: vehicle?.make ?? "",
      model: vehicle?.model ?? null,
      year: String(vehicle?.year ?? ""),
      mileage: String(vehicle?.mileage ?? 0),
      condition: vehicle?.condition ?? "FAIR",
      tav,
      min,
      max,
    })

    setStep(1)
    router.push(`/intake/offer/${id}`)
  }

  // ── Effect 1 — Real flow: poll for RANGE_PROVIDED ─────
  useEffect(() => {
    if (!vehicle || hasNavigated.current) return


    if (
      vehicle.status === "RANGE_PROVIDED" &&
      vehicle.tav &&
      vehicle.min &&
      vehicle.max
    ) {
      populateAndNavigate(vehicle.tav, vehicle.min, vehicle.max)
    }
  }, [vehicle])



  // ── Error state ────────────────────────────────────────
  if (vehicleError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <TriangleAlert className="text-destructive" size={24} />
        </div>
        <div>
          <p className="font-bold text-foreground">Failed to load vehicle</p>
          <p className="text-sm text-muted-foreground mt-1">
            {vehicleError.message}
          </p>
        </div>
        <button
          onClick={() => router.push("/inventory")}
          className="bg-[#E8A020] text-white font-bold px-6 py-3 rounded-xl"
        >
          Back to Inventory
        </button>
      </div>
    )
  }

  // ── Main UI ────────────────────────────────────────────
  return (
    <div className="font-cabinet min-h-[80vh] flex gap-y-7 flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center gap-6">
        <VehicleScanner />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-(--ink-secondary) max-w-85.5 font-clash tracking-[-0.75px]">
            Calculating your{" "}
            <span className="text-[#E8A020]">
              True Automotive Value (TAV)
            </span>
          </h1>
          <p className="text-sm text-[#6A6A6A] mt-2">
            This usually takes about 30 seconds.
          </p>
        </div>
      </div>

      <ProcessingSteps steps={PROCESSING_STEPS} />

      <div className="w-full space-y-4">
        <div className="flex rounded-xl overflow-hidden">
          <div className="flex-1 p-4 text-center border-black border-r">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Data Sources
            </p>
            <p className="text-lg font-extrabold text-foreground">1.2M+</p>
          </div>
          <div className="flex-1 p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Latency
            </p>
            <p className="text-lg font-extrabold text-foreground">142ms</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          No black-box estimates. Every number you'll see is backed by real
          data from Ladipo & Apapa markets.
        </p>
      </div>
    </div>
  )
}