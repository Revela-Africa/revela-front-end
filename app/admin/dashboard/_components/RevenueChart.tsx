"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DataPoint {
  month: string
  value: number
  revenue: number
}

const DATA: DataPoint[] = [
  { month: "Oct", value: 65, revenue: 31.3 },
  { month: "Nov", value: 72, revenue: 34.7 },
  { month: "Dec", value: 68, revenue: 32.8 },
  { month: "Jan", value: 75, revenue: 36.1 },
  { month: "Feb", value: 80, revenue: 38.5 },
  { month: "Mar", value: 95, revenue: 48.2 },
]

export function RevenueChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const current = DATA[DATA.length - 1]
  const previous = DATA[DATA.length - 2]
  const growth = ((current.revenue - previous.revenue) / previous.revenue) * 100

  return (
    <div className="rounded-3xl border border-[#E7E1D8] bg-white p-5">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#171D17]">Revenue (6 Months)</h2>
        <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600">
          +{growth.toFixed(0)}% MoM
        </span>
      </div>

      <p className="text-3xl font-extrabold tracking-tight text-[#171D17]">
        ₦{current.revenue.toFixed(1)}M
      </p>
      <p className="mb-6 text-xs text-[#6A6A6A]">
        {current.month} 2026 · Month to date
      </p>

      {/* Chart */}
      <div className="flex h-32 items-end gap-3">
        {DATA.map((point, i) => {
          const isCurrent = i === DATA.length - 1
          const isHovered = hoveredIndex === i

          return (
            <div
              key={point.month}
              className="relative flex h-full flex-1 flex-col items-center justify-end gap-2"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute -top-10 z-10 whitespace-nowrap rounded-lg bg-[#171D17] px-2 py-1 text-[10px] font-bold text-white"
                  >
                    ₦{point.revenue}M
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#171D17]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bar */}
              <motion.div
                initial={{ height: "0%" }}
                animate={{ height: `${point.value}%` }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className={`w-full rounded-t-xl ${
                  isCurrent
                    ? "bg-[#E8A020]"
                    : isHovered
                    ? "bg-[#E8A020]/50"
                    : "bg-[#E8A020]/20"
                }`}
              />

              {/* Label */}
              <span
                className={`text-[10px] font-semibold ${
                  isCurrent ? "text-[#E8A020]" : "text-[#6A6A6A]"
                }`}
              >
                {point.month}
              </span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 border-t border-[#F7F2EB] pt-3">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#E8A020]" />
          <span className="text-[10px] text-[#6A6A6A]">Current month</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#E8A020]/20" />
          <span className="text-[10px] text-[#6A6A6A]">Previous months</span>
        </div>
      </div>
    </div>
  )
}