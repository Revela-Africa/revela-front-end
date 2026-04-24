import Link from "next/link";
import { MoreVertical } from "lucide-react";

// STUBBED: replace with GraphQL myVehicles(status: IN_PROGRESS) query
const STUB_VEHICLES = [
  {
    id: "v001",
    make: "Toyota",
    model: "Corolla",
    year: 2009,
    subtitle: "Long Range Dual Motor",
    status: "VALUATION ACTIVE",
    progress: 65,
    agentAssigned: true,
    image: "/images/revelta-test.png",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "VALUATION ACTIVE": "text-[#E8A020] ",
  SUBMITTED: "text-blue-600 ",
  "OFFER SENT": "text-green-600 ",
  ACCEPTED: "text-green-700 ",
};

export function InProgress() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-bold text-foreground">In Progress</h2>
        <Link
          href="/inventory"
          className="text-xs text-[#E8A020] font-bold hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      {STUB_VEHICLES.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No vehicles in progress
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {STUB_VEHICLES.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: (typeof STUB_VEHICLES)[0] }) {
  const statusStyle =
    STATUS_COLORS[vehicle.status] ?? "text-gray-600 bg-gray-100";

  return (
    <div className="rounded-xl border border-[#E8A02040] bg-card p-5">
      <div className="flex items-start gap-3">
        {/* Car image placeholder */}
        <div className="w-16 h-16 rounded-lg bg-[#FFF7E4] shrink-0 flex items-center justify-center overflow-hidden">
          {vehicle.image ? (
            <img
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">🚗</span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex  items-start justify-between gap-2">
            <div>
              <span
                className={`text-[10px] font-bold tracking-[0.6px] py-0.5 rounded-full ${statusStyle}`}
              >
                {vehicle.status}
              </span>
              <p className="text-base font-bold text-[#171D17] mt-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
              <p className="text-xs text-muted-foreground">
                {vehicle.subtitle}
              </p>
            </div>
            <button className="text-muted-foreground hover:text-foreground shrink-0">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Progress */}
      <div className="mt-3 flex gap-x-3">
        {vehicle.agentAssigned && (
          <p className="text-[10px] text-[#6A6A6A] whitespace-nowrap mb-1">
            Agent assigned •
          </p>
        )}
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E8A020] rounded-full transition-all"
              style={{ width: `${vehicle.progress}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-[#E8A020]">
            {vehicle.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
