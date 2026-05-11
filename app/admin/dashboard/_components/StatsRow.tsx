import { AdminDashboardType } from "@/graphql/generated/graphql";
import CountUp from "react-countup";

interface Props {
  dashBoardData: AdminDashboardType | undefined;
}

export function StatsRow({ dashBoardData }: Props) {
  console.log(dashBoardData);

  const STATS = [
    {
      label: "Active Vehicles",
      value: dashBoardData?.activeVehicles || 0,
      change: "↑ 12% from last week",
      changeColor: "text-green-600",
      dotColor: "bg-green-500",
    },
    {
      label: "Revenue MTD",
      value: `₦${dashBoardData?.revenueMTD || 0}`,
      change: "↑ 12% from last week",
      changeColor: "text-green-600",
      dotColor: "bg-[#E8A020]",
    },
    {
      label: "Avg. Payout This Month",
      value: `₦${dashBoardData?.avgPayoutThisMonth || 0}`,
      change: "↓ 2.1% vs target",
      changeColor: "text-red-500",
      dotColor: "bg-blue-500",
    },
    {
      label: "Cycle Time",
      value: `${dashBoardData?.avgCycleTimeDays}d`,
      change: "↑ 18% faster than Q1",
      changeColor: "text-green-600",
      dotColor: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${stat.dotColor}`} />
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {" "}
            <CountUp duration={1} end={typeof stat.value === 'number' ? stat.value : parseInt(stat.value)} />
          </p>
          <p className={`text-xs mt-1 ${stat.changeColor}`}>{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
