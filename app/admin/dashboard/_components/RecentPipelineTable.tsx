"use client";

import { useRouter } from "next/navigation";
import { useAdminVehicles } from "@/features/admin/hooks/useAdminVehicles";
import { STATUS_STYLES } from "@/shared/constants/status-styles";

export function RecentPipelineTable() {
  const router = useRouter();
  const { vehicles, loading } = useAdminVehicles();

  // Show only last 10 on dashboard
  const recent = vehicles.slice(0, 10);

  if (loading && !vehicles.length) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">Recent Pipeline</h2>
        <button
          onClick={() => router.push("/vehicles")}
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          View all →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No vehicles yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Vehicle", "Status", "TAV", "Agent", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="text-left text-xs font-bold text-muted-foreground uppercase tracking-widest px-5 py-3"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  onClick={() =>
                    router.push(`/dashboard/vehicles/${vehicle.id}`)
                  }
                  className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-foreground">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-muted-foreground font-courier-prime">
                      {vehicle.bookingReference}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full border ${
                        STATUS_STYLES[vehicle.status] ??
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {vehicle.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-foreground">
                      {vehicle.tav ? `₦${vehicle.tav.toLocaleString()}` : "—"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {vehicle.assignedToInspector ? (
                      <p className="text-sm text-muted-foreground">Assigned</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Unassigned
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vehicles/${vehicle.id}`);
                      }}
                      className="text-xs font-bold text-[#E8A020] hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
