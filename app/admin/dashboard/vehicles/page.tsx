"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { Search } from "lucide-react"
import { useAdminVehicles } from "@/features/admin/hooks/useAdminVehicles"
import { useAdminStore } from "@/features/admin/store/useAdminStore"

const STATUS_FILTERS = [
  { label: "All Statuses", value: "ALL" },
  { label: "Submitted", value: "SUBMITTED" },
  { label: "Range Provided", value: "RANGE_PROVIDED" },
  { label: "Scheduled", value: "INSPECTION_SCHEDULED" },
  { label: "Under Assessment", value: "UNDER_ASSESSMENT" },
  { label: "Offer Sent", value: "OFFER_SENT" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Paid", value: "PAID" },
]

const STATUS_STYLES: Record<string, string> = {
  SUBMITTED: "text-orange-600 bg-orange-50",
  RANGE_PROVIDED: "text-yellow-700 bg-yellow-50",
  INSPECTION_SCHEDULED: "text-blue-600 bg-blue-50",
  UNDER_ASSESSMENT: "text-purple-600 bg-purple-50",
  OFFER_SENT: "text-yellow-700 bg-yellow-50",
  ACCEPTED: "text-green-700 bg-green-50",
  PAID: "text-green-800 bg-green-100",
}

function VehiclesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { statusFilter, searchQuery, setStatusFilter, setSearchQuery } =
    useAdminStore()
  const { vehicles, stats, loading } = useAdminVehicles()

  // Read status from URL query param (from pipeline click)
  useEffect(() => {
    const status = searchParams.get("status")
    if (status) setStatusFilter(status)
  }, [searchParams])

  return (
    <div className="space-y-5">
      {/* Stats strip */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Vehicles", value: stats.total },
          { label: "Submitted", value: stats.submitted, color: "text-orange-500" },
          { label: "Under Assessment", value: stats.underAssessment, color: "text-purple-600" },
          { label: "Paid", value: stats.paid, color: "text-green-600" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-border p-4"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color ?? "text-foreground"}`}>
              {loading ? "—" : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search by make, model, year, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-border rounded-lg px-3 py-2 text-sm outline-none"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && !vehicles.length && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && vehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-muted-foreground text-sm">No vehicles found</p>
          <button
            onClick={() => { setStatusFilter("ALL"); setSearchQuery("") }}
            className="text-xs text-[#E8A020] font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {vehicles.map((vehicle) => {
          const image = vehicle.imageUrls?.[0]?.imageUrl

          return (
            <div
              key={vehicle.id}
              onClick={() => router.push(`/dashboard/vehicles/${vehicle.id}`)}
              className="bg-white rounded-xl border border-border p-4 cursor-pointer hover:border-[#E8A020]/40 hover:shadow-sm transition-all"
            >
              {/* Image */}
              <div className="w-full h-32 rounded-lg bg-[#FFF7E4] flex items-center justify-center mb-3 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={`${vehicle.year} ${vehicle.make}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">🚗</span>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      STATUS_STYLES[vehicle.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {vehicle.status.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#E8A020]">
                    {vehicle.tav ? `₦${vehicle.tav.toLocaleString()}` : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {vehicle.mileage?.toLocaleString()} km
                  </p>
                </div>

                {vehicle.agentName && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Agent: {vehicle.agentName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  )
}