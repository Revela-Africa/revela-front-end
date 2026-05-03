"use client"

import * as React from "react"
import {
  DayPicker,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  locale?: Partial<Locale>
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn(
        "w-full rounded-2xl border border-[#E8A02040] p-3",
        className
      )}
      classNames={{
        root: "w-full ",
        months: "w-full flex flex-col",
        month: "w-full space-y-3",

        // ── Header ─────────────────────
        nav: "flex items-center justify-between",
        caption_label: "text-sm font-bold text-[#171D17] w-full text-center",

        button_previous:
          "p-2 rounded-lg text-[#D4900A] hover:bg-[#E8A0201A]",
        button_next:
          "p-2 rounded-lg text-[#D4900A] hover:bg-[#E8A0201A]",

        // ── Weekdays ───────────────────
        weekdays: "grid grid-cols-7 w-[300px]  mt-2",
        weekday:
          "text-[10px] text-[#6A6A6A] font-medium text-center",

        // ── Calendar grid ──────────────
        table: "w-full",
        week: "grid grid-cols-7 w-full",

        day: "w-full",

        // ── States ─────────────────────
        day_selected:
          "bg-[#E8A020] text-white font-bold",
        today:
          "border border-[#E8A020] text-[#E8A020]",
        outside:
          "text-[#CFCFCF]",
        disabled:
          "text-[#BDBDBD] opacity-40",

        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),

        DayButton: (props) => <CalendarDayButton {...props} />,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  modifiers,
  day,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  return (
    <button
      data-selected={modifiers.selected}
      data-disabled={modifiers.disabled}
      disabled={modifiers.disabled} // ← add this
      className={cn(
        "aspect-square w-full flex items-center justify-center rounded-xl text-sm transition",
        "hover:bg-[#E8A0201A]",
        "data-[selected=true]:bg-[#E8A020]",
        "data-[selected=true]:text-white",
        "data-[selected=true]:font-bold",
        // ← add disabled styles
        "data-[disabled=true]:opacity-40",
        "data-[disabled=true]:cursor-not-allowed",
        "data-[disabled=true]:hover:bg-transparent",
        className
      )}
      {...props}
    >
      {day.date.getDate()}
    </button>
  )
}

export { Calendar }