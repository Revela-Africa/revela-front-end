"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useOfferStore } from "@/features/offer/store/useOfferStore"
import { useQuery } from "@apollo/client/react"
import { GetSingleUserVehicleDocument } from "@/graphql/generated/graphql"
import VehicleScanner from "../../_components/VehicleScanner"
import ProcessingSteps from "../../_components/ProcessingSteps"
import {
  ChartCandlestick,
  RefreshCcw,
  Verified,
  TriangleAlert,
  Mail,
  Clock,
} from "lucide-react"
import { useIntakeStore } from "@/features/intake/store/useIntakeStore"

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

const TIMEOUT_MS = 20000 // 20 seconds

export default function ProcessingPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { setVehicleData, setImageUrls, setStep } = useOfferStore()

  const hasNavigated = useRef(false)
  const fakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timeoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [showTimeoutModal, setShowTimeoutModal] = useState(false)

  const { data, error: vehicleError } = useQuery(GetSingleUserVehicleDocument, {
    variables: { vehicleId: id },
    skip: !id,
    pollInterval: 5000,
  })

  const vehicle = data?.getSingleUserVehicle

  useEffect(() => {
    useIntakeStore.getState().reset()
  }, [])

  // ── Timeout timer — show modal if TAV takes too long ───
  useEffect(() => {
    timeoutTimerRef.current = setTimeout(() => {
      if (!hasNavigated.current) {
        setShowTimeoutModal(true)
      }
    }, TIMEOUT_MS)

    return () => {
      if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current)
    }
  }, [])

  // ── Helper — populate store and navigate ───────────────
  function populateAndNavigate(tav: number, min: number, max: number) {
    if (hasNavigated.current) return
    hasNavigated.current = true

    if (fakeTimerRef.current) {
      clearTimeout(fakeTimerRef.current)
      fakeTimerRef.current = null
    }
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current)
      timeoutTimerRef.current = null
    }

    setShowTimeoutModal(false)

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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7E4]">
          <TriangleAlert size={24} className="text-[#E8A020]" />
        </div>
        <div>
          <p className="font-bold text-[#171D17]">Failed to load vehicle</p>
          <p className="mt-1 text-sm text-[#6A6A6A]">
            {vehicleError.message}
          </p>
        </div>
        <button
          onClick={() => router.push("/inventory")}
          className="rounded-xl bg-[#E8A020] px-6 py-3 font-bold text-white"
        >
          Back to Inventory
        </button>
      </div>
    )
  }

  // ── Main UI ────────────────────────────────────────────
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-between gap-y-7 font-cabinet">
      <div className="flex w-full flex-col items-center gap-6">
        <VehicleScanner />
        <div className="text-center">
          <h1 className="max-w-85.5 font-clash text-2xl font-bold tracking-[-0.75px] text-(--ink-secondary)">
            Calculating your{" "}
            <span className="text-[#E8A020]">
              True Automotive Value (TAV)
            </span>
          </h1>
          <p className="mt-2 text-sm text-[#6A6A6A]">
            This usually takes about 20 seconds.
          </p>
        </div>
      </div>

      <ProcessingSteps steps={PROCESSING_STEPS} />

      <div className="w-full space-y-4">
        <div className="flex overflow-hidden rounded-xl">
          <div className="flex-1 border-r border-black p-4 text-center">
            <p className="mb-1 text-xs uppercase tracking-widest text-[#6A6A6A]">
              Data Sources
            </p>
            <p className="text-lg font-extrabold text-[#171D17]">1.2M+</p>
          </div>
          <div className="flex-1 p-4 text-center">
            <p className="mb-1 text-xs uppercase tracking-widest text-[#6A6A6A]">
              Latency
            </p>
            <p className="text-lg font-extrabold text-[#171D17]">142ms</p>
          </div>
        </div>
        <p className="text-center text-xs text-[#6A6A6A]">
          No black-box estimates. Every number you'll see is backed by real
          data from Ladipo & Apapa markets.
        </p>
      </div>

      {/* ── Timeout Modal ───────────────────────────────── */}
      {showTimeoutModal && (
        <div className="fixed  inset-0  z-50 flex  justify-center bg-[#171D17]/40 p-4 backdrop-blur-sm items-center">
          <div className="w-full  max-w-sm rounded-3xl border border-[#E7E1D8] bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7E4]">
              <Mail size={24} className="text-[#E8A020]" />
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-[#171D17]">
              Taking longer than expected
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[#6A6A6A]">
              Don't worry — we'll email you as soon as your TAV is ready. You
              can safely leave this page.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => setShowTimeoutModal(false)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#E8A020] text-sm font-bold text-white transition-colors hover:bg-[#171D17]/90 active:scale-[0.98]"
              >
                <Clock size={16} />
                Keep Waiting
              </button>

              <button
                onClick={() => router.push("/inventory")}
                className="flex h-12 w-full items-center justify-center rounded-2xl border border-[#E7E1D8] text-sm font-bold text-[#171D17] transition-colors hover:bg-[#F7F2EB] active:scale-[0.98]"
              >
                Go to Inventory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}