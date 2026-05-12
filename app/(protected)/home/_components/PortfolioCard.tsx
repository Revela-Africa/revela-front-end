import { UserDashboardType } from "@/graphql/generated/graphql";

import CountUp from "react-countup";

interface Props {
  dashBoardData: UserDashboardType | undefined;
}

export function PortfolioCard({ dashBoardData }: Props) {
  return (
    <div className="rounded-[12px]  p-6 bg-[#FFFFFF] border border-[#E8A02040] font-cabinet">
      <p className="text-xs text-[#6A6A6A] uppercase  font-bold tracking-[0.6px] mb-1.5">
        Portfolio Value
      </p>
      <p className="text-3xl text-[#3A3A3A] border-b border-b-[#E8A02040] truncate font-clash font-extrabold pb-2 mb-4">
        ₦<CountUp duration={1} end={dashBoardData?.totalPayout || 0} />
      </p>

      <div className="flex gap-6">
        <div className="border-r border-[#E8A02040] pr-6">
          <p className="text-xs text-[#6A6A6A]">Active Assets</p>
          <p className="text-sm font-bold text-[#E8A020]">
            {dashBoardData?.activeVehicles || "-"} Vehicles
          </p>
        </div>
       
      </div>
    </div>
  );
}
