"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useInspectorInspections } from "@/features/inspector/hooks/useInspectorInspections";
import {
  Loader2,
  Car,
  CheckCircle2,
  Clock,
  LogOut,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_STYLES: Record<string, string> = {
  INSPECTOR_ASSIGNED: "bg-[#FFF7E4] text-[#E8A020]",
  UNDER_ASSESSMENT: "bg-blue-50 text-blue-600",
  OFFER_SENT: "bg-purple-50 text-purple-600",
  ACCEPTED: "bg-green-50 text-green-600",
  PAID: "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<string, string> = {
  INSPECTOR_ASSIGNED: "Assigned",
  UNDER_ASSESSMENT: "In Progress",
  OFFER_SENT: "Completed",
  ACCEPTED: "Accepted",
  PAID: "Paid",
};

export default function InspectorDashboard() {
  const router = useRouter();
  const { user } = useAuthGuard();
  const { logout, isLoading } = useLogout();
  const [tab, setTab] = useState<"active" | "completed">("active");



  
  // Fetch all inspections once — no filter argument
const { active, completed, loading } = useInspectorInspections()

  const displayed = tab === "active" ? active : completed;
  const firstName = user?.fullName

  return (
    <div className=" h-screen ">
      <div className="mx-auto w-full py-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6A6A6A]">
              Inspector
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#171D17]">
              Hi, {firstName}
            </h1>
            <p className="mt-0.5 text-sm text-[#6A6A6A]">
              Here's your schedule
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            disabled={isLoading}
            className="h-9 shrink-0 gap-1.5 rounded-xl text-[#6A6A6A] hover:bg-[#F7F2EB] hover:text-[#171D17]"
          >
            <LogOut size={14} />
            <span className="text-xs font-medium">
              {isLoading ? "..." : "Out"}
            </span>
          </Button>
        </div>



        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#E7E1D8] bg-white p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF7E4]">
                <Clock size={16} className="text-[#E8A020]" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6A6A6A]">
                Active
              </p>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-[#171D17]">
              {loading ? "—" : active.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#E7E1D8] bg-white p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 size={16} className="text-green-600" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6A6A6A]">
                Completed
              </p>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-[#171D17]">
              {loading ? "—" : completed.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-1 rounded-xl border border-[#E7E1D8] bg-white p-1">
          {(["active", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wide transition-all ${
                tab === t
                  ? "bg-[#E8A020] text-white"
                  : "text-[#6A6A6A] hover:text-[#171D17]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-[#E8A020]" />
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7E4]">
              <Car size={24} className="text-[#E8A020]" />
            </div>
            <p className="text-sm font-medium text-[#6A6A6A]">
              No {tab} inspections
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((vehicle) => {
              const image = vehicle.imageUrls?.[0]?.imageUrl;
              const isActive = tab === "active";

              return (
                <div
                  key={vehicle.id}
                  className="rounded-xl border border-[#E7E1D8] bg-white p-4 transition-all"
                >
                  <div
                  onClick={()=> router.push( `/dashboard/inspection/${vehicle.id}`)}
                    className="flex cursor-pointer items-start gap-3"
                  >
                    {/* Image */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#FFF7E4]">
                      {image ? (
                        <img
                          src={image}
                          alt={`${vehicle.year} ${vehicle.make}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-2xl">🚗</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#171D17]">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </p>
                          <p className="text-xs text-[#6A6A6A]">
                            {vehicle.mileage?.toLocaleString()} km ·{" "}
                            {vehicle.condition}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            STATUS_STYLES[vehicle.status] ??
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {STATUS_LABELS[vehicle.status] ?? vehicle.status}
                        </span>
                      </div>

                      {/* Meta row */}
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {vehicle.scheduledAt && (
                          <span className="flex items-center gap-1 text-[11px] text-[#6A6A6A]">
                            <Calendar size={11} className="text-[#E8A020]" />
                            {new Date(vehicle.scheduledAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                              }
                            )}
                          </span>
                        )}
                        {vehicle.collectionAddress && (
                          <span className="flex items-center gap-1 text-[11px] text-[#6A6A6A]">
                            <MapPin size={11} className="text-[#E8A020]" />
                            <span className="truncate max-w-35">
                              {vehicle.collectionAddress}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      className="mt-1 shrink-0 text-[#BFC9C3]"
                    />
                  </div>

                  {/* CTA */}
                  {isActive && vehicle.status === "INSPECTOR_ASSIGNED" && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/dashboard/inspection/${vehicle.id}`
                        );
                      }}
                      className="mt-3 h-11 w-full  bg-[#E8A020] text-xs font-bold text-white hover:bg-[#E8A020]/90"
                    >
                      Start Inspection →
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}