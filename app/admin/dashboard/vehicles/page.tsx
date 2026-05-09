"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import { useAdminVehicles } from "@/features/admin/hooks/useAdminVehicles";
import { useAdminStore } from "@/features/admin/store/useAdminStore";
import Loader from "@/app/(protected)/components/ui/Loader";
import { STATUS_STYLES } from "@/shared/constants/status-styles";

const STATUS_FILTERS = [
  { label: "All Statuses", value: "ALL" },
  { label: "Submitted", value: "SUBMITTED" },
  { label: "Range Provided", value: "RANGE_PROVIDED" },
  { label: "Scheduled", value: "INSPECTION_SCHEDULED" },
  { label: "Inspector Assigned", value: "INSPECTOR_ASSIGNED" },
  { label: "Under Assessment", value: "UNDER_ASSESSMENT" },
  { label: "Offer Sent", value: "OFFER_SENT" },
  { label: "Offer Rejected", value: "OFFER_REJECTED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Paid", value: "PAID" },
]



function VehiclesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { statusFilter, searchQuery, setStatusFilter, setSearchQuery } =
    useAdminStore();
  const { vehicles, stats, loading } = useAdminVehicles();

  // Read status from URL query param (from pipeline click)
  useEffect(() => {
    const status = searchParams.get("status");
    if (status) setStatusFilter(status);
  }, [searchParams]);

  return (
    <div className="space-y-5">
      {/* Stats strip */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Vehicles", value: stats.total },
          {
            label: "Submitted",
            value: stats.submitted,
            color: "text-orange-500",
          },
          {
            label: "Under Assessment",
            value: stats.underAssessment,
            color: "text-purple-600",
          },
          { label: "Paid", value: stats.paid, color: "text-green-600" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-border p-4"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p
              className={`text-2xl font-bold mt-1 ${stat.color ?? "text-foreground"}`}
            >
              {loading ? "—" : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 flex-1 min-w-50">
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

 
      {loading && !vehicles.length && <Loader />}

      {/* Empty */}
      {!loading && vehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-muted-foreground text-sm">No vehicles found</p>
          <button
            onClick={() => {
              setStatusFilter("ALL");
              setSearchQuery("");
            }}
            className="text-xs text-[#E8A020] font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {vehicles.map((vehicle) => {
          const image = vehicle.imageUrls?.[0]?.imageUrl;

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
                    <p className="text-sm text-muted-foreground font-courier-prime whitespace-nowrap">
                      {vehicle.bookingReference}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      STATUS_STYLES[vehicle.status] ??
                      "bg-gray-100 text-gray-600"
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
          );
        })}
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <VehiclesContent />
    </Suspense>
  );
}
