// STUBBED: replace with real GraphQL query when admin queries are ready
const STATS = [
  {
    label: "Active Vehicles",
    value: "47",
    change: "↑ 12% from last week",
    changeColor: "text-green-600",
    dotColor: "bg-green-500",
  },
  {
    label: "Revenue MTD",
    value: "₦48.2M",
    change: "↑ 12% from last week",
    changeColor: "text-green-600",
    dotColor: "bg-[#E8A020]",
  },
  {
    label: "Avg. Payout",
    value: "₦1.02M",
    change: "↓ 2.1% vs target",
    changeColor: "text-red-500",
    dotColor: "bg-blue-500",
  },
  {
    label: "Cycle Time",
    value: "4.2d",
    change: "↑ 18% faster than Q1",
    changeColor: "text-green-600",
    dotColor: "bg-purple-500",
  },
]

export function StatsRow() {
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
          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          <p className={`text-xs mt-1 ${stat.changeColor}`}>{stat.change}</p>
        </div>
      ))}
    </div>
  )
}