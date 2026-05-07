"use client";

import { StatsRow } from "./_components/StatsRow";
import { VehiclePipeline } from "./_components/VehiclePipeline";
import { RevenueChart } from "./_components/RevenueChart";
import { RecentPipelineTable } from "./_components/RecentPipelineTable";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <div className="space-y-4 w-full">
        <StatsRow />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 h-full">
            <VehiclePipeline />
          </div>
          <RevenueChart />
        </div>
 
        <RecentPipelineTable />
      </div>
    </div>
  );
}
