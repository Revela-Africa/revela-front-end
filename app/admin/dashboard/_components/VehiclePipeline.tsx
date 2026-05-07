"use client"

import { useRouter } from "next/navigation"
import { useAdminVehicles } from "@/features/admin/hooks/useAdminVehicles"

export function VehiclePipeline() {
  const router = useRouter()
  const { stats, loading } = useAdminVehicles()

  const PIPELINE = [
    {
      label: "Submitted",
      value: stats.submitted,
      color: "text-orange-500 bg-orange-50 border-orange-200",
      status: "SUBMITTED",
    },
    {
      label: "Range Provided",
      value: stats.rangeProvided,
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      status: "RANGE_PROVIDED",
    },
    {
      label: "Scheduled",
      value: stats.inspectionScheduled,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      status: "INSPECTION_SCHEDULED",
    },
    {
      label: "Paid",
      value: stats.paid,
      color: "text-green-600 bg-green-50 border-green-200",
      status: "PAID",
    },
  ]

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-foreground">
            Vehicle Pipeline
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs text-muted-foreground">
              Live · {stats.total} active
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/vehicles")}
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          View all →
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {PIPELINE.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(`/vehicles?status=${item.status}`)}
            className={`rounded-xl border p-4 text-left hover:opacity-80 transition-opacity ${item.color}`}
          >
            <p className="text-3xl font-bold">
              {loading ? "—" : item.value}
            </p>
            <p className="text-xs font-medium mt-1">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}