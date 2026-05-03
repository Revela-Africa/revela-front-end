"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

type DateSelectorProps = {
  value?: string
  onChange?: (date: string) => void
}

export default function DateSelector({
  value,
  onChange,
}: DateSelectorProps) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  )

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) return

    setDate(selected)

    // format: YYYY-MM-DD (backend safe)
    const formatted = selected.toISOString().split("T")[0]

    onChange?.(formatted)
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        className="w-full"
      />
    </div>
  )
}