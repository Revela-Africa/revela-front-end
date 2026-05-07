"use client";

import { useQuery } from "@apollo/client/react";
import { GetVehiclesByUserDocument } from "@/graphql/generated/graphql";
import Link from "next/link";
import EmptyState from "./components/EmptyState";

import { VehicleList } from "./components/VehicleList";
import { Plus } from "lucide-react";


export default function page() {
  const { data, loading } = useQuery(GetVehiclesByUserDocument, {
    fetchPolicy: "cache-and-network",
  });

  const vehicles = data?.getVehiclesByUser ?? [];


  
  if (loading && !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="font-cabinet space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-foreground">My Inventory</h1>
        <Link
          href="/intake"
          className="flex items-center gap-1.5 bg-[#E8A020] text-white text-xs font-bold px-3 py-2 rounded-lg"
        >
          <Plus size={14} />
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 && <EmptyState />}

      <div className="space-y-3">
        <VehicleList vehicles={vehicles} />
      </div>
    </div>
  );
}
