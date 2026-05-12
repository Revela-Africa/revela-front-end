"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  GetUserDashboardDocument,
  GetVehiclesByUserDocument,
} from "@/graphql/generated/graphql";
import Link from "next/link";
import EmptyState from "./components/EmptyState";
import { VehicleList } from "./components/VehicleList";
import { Plus, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioCard } from "../home/_components/PortfolioCard";

export default function page() {
  const [search, setSearch] = useState("");

  const { data, loading } = useQuery(GetVehiclesByUserDocument, {
    fetchPolicy: "cache-and-network",
  });
  const { data: userDashboardData } = useQuery(GetUserDashboardDocument);
  const dashBoardData = userDashboardData?.getUserDashboard;

  const vehicles = useMemo(() => {
    const list = data?.getVehiclesByUser ?? [];
    const reversed = [...list].reverse();

    if (!search.trim()) return reversed;

    const query = search.trim().toLowerCase();
    return reversed.filter((v) => {
      const make = v.make?.toLowerCase() ?? "";
      const model = v.model?.toLowerCase() ?? "";
      return make.includes(query) || model.includes(query);
    });
  }, [data, search]);

  if (loading && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E8A020] border-t-transparent" />
      </div>
    );
  }

  const hasSearch = search.trim().length > 0;

  return (
    <div className="space-y-5 py-4 font-cabinet">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[#171D17]">My Inventory</h1>
        <Link
          href="/intake"
          className="flex items-center gap-1.5 rounded-xl bg-[#E8A020] px-3 py-2 text-xs font-bold text-white"
        >
          <Plus size={14} />
          Add Vehicle
        </Link>
      </div>

      <AnimatePresence mode="popLayout">
        {(dashBoardData?.totalVehicles ?? 0) > 1 && (
          <motion.div
            key="portfolio-card"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            layout
          >
            <PortfolioCard dashBoardData={dashBoardData} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BFC9C3]"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by make or model..."
          className="h-11 w-full rounded-2xl border border-[#E7E1D8] bg-white pl-10 pr-10 text-sm text-[#171D17] outline-none transition-colors placeholder:text-[#BFC9C3] focus:border-[#E8A020] focus:ring-2 focus:ring-[#E8A020]/20"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#BFC9C3] transition-colors hover:bg-[#F7F2EB] hover:text-[#171D17]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Empty states */}
      {vehicles.length === 0 && !hasSearch && <EmptyState />}

      {vehicles.length === 0 && hasSearch && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E1D8] bg-white py-16 text-center">
          <Search size={24} className="text-[#BFC9C3]" />
          <p className="mt-3 text-sm font-semibold text-[#171D17]">
            No vehicles found
          </p>
          <p className="mt-1 text-xs text-[#6A6A6A]">
            No matches for "{search.trim()}"
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-3 text-xs font-bold text-[#E8A020] hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* List */}
      {vehicles.length > 0 && (
        <div className="space-y-3">
          <VehicleList vehicles={vehicles} />
        </div>
      )}
    </div>
  );
}
