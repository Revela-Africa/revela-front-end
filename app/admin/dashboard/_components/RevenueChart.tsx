"use client"

const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
const VALUES = [65, 72, 68, 75, 80, 95] // percentage heights for bars

export function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-foreground">Revenue (6 Months)</h2>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          +14% YoY
        </span>
      </div>

      <p className="text-3xl font-bold text-foreground mb-0.5">₦48.2M</p>
      <p className="text-xs text-muted-foreground mb-6">
        March 2026 · Month to date
      </p>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-20">
        {MONTHS.map((month, i) => (
          <div key={month} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-md transition-all ${
                i === MONTHS.length - 1
                  ? "bg-[#E8A020]"
                  : "bg-[#E8A020]/20"
              }`}
              style={{ height: `${VALUES[i]}%` }}
            />
            <p className="text-[10px] text-muted-foreground">{month}</p>
          </div>
        ))}
      </div>
    </div>
  )
}