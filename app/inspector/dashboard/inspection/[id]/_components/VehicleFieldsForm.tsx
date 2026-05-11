"use client"

import { cn } from "@/lib/utils"
import { Gauge, Wrench, AlertTriangle, ClipboardCheck } from "lucide-react"

const CONDITION_OPTIONS = [
  { value: "EXCELLENT", label: "Excellent" },
  { value: "GOOD", label: "Good" },
  { value: "FAIR", label: "Fair" },
  { value: "POOR", label: "Poor" },
] as const

const SERVICE_HISTORY_OPTIONS = [
  { value: "FULL_RECORDS", label: "Full Records" },
  { value: "PARTIAL_RECORDS", label: "Partial Records" },
  { value: "NO_RECORDS", label: "No Records" },
] as const

const DRIVETRAIN_OPTIONS = [
  { value: "FWD", label: "FWD" },
  { value: "RWD", label: "RWD" },
  { value: "AWD_4WD", label: "AWD / 4WD" },
] as const

const ENGINE_TYPE_OPTIONS = [
  { value: "INTERNAL_COMBUSTION", label: "Petrol / Diesel" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ELECTRIC", label: "Electric" },
] as const

const TRANSMISSION_OPTIONS = [
  { value: "AUTOMATIC", label: "Automatic" },
  { value: "MANUAL", label: "Manual" },
  { value: "CVT", label: "CVT" },
] as const

export interface VehicleFields {
  mileage: string
  condition: string
  structuralDamage: boolean
  mechanicalOverhaul: boolean
  serviceHistory: string
  drivetrain: string
  engineType: string
  transmission: string
}

interface Props {
  fields: VehicleFields
  onChange: (fields: Partial<VehicleFields>) => void
  originalMileage?: number
  originalCondition?: string
  originalDrivetrain?: string | null
  originalEngineType?: string | null
  originalTransmission?: string | null
}

function OptionGrid({
  options,
  value,
  onSelect,
  cols = 2,
}: {
  options: readonly { value: string; label: string }[]
  value: string
  onSelect: (val: string) => void
  cols?: number
}) {
  return (
    <div className={cn("grid gap-2", cols === 3 ? "grid-cols-3" : "grid-cols-2")}>
      {options.map((opt) => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "rounded-xl border py-2.5 text-sm font-bold transition-all active:scale-[0.98]",
              isSelected
                ? "border-[#E8A020] bg-[#FFF7E4] text-[#E8A020]"
                : "border-[#E7E1D8] text-[#6A6A6A] hover:border-[#E8A020]/40"
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6A6A6A]">
      {children}
    </p>
  )
}

export function VehicleFieldsForm({
  fields,
  onChange,
  originalMileage,
  originalCondition,
  originalDrivetrain,
  originalEngineType,
  originalTransmission,
}: Props) {
 
// console.log("fields:", fields)

  return (
    <div className="space-y-5">
      {/* Mileage */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SectionLabel>Confirmed Mileage (km)</SectionLabel>
          {originalMileage !== undefined && (
            <span className="text-[10px] text-[#BFC9C3]">
              Stated: {originalMileage.toLocaleString()} km
            </span>
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            inputMode="numeric"
            value={fields.mileage}
            onChange={(e) => onChange({ mileage: e.target.value })}
            placeholder="Enter odometer reading"
            className="h-11 w-full rounded-2xl border border-[#E7E1D8] bg-[#FAF8F5] px-4 pr-10 text-sm text-[#171D17] outline-none transition-colors placeholder:text-[#BFC9C3] focus:border-[#E8A020] focus:ring-2 focus:ring-[#E8A020]/20"
          />
          <Gauge size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BFC9C3]" />
        </div>
   
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SectionLabel>Confirmed Condition</SectionLabel>
          {originalCondition && (
            <span className="text-[10px] text-[#BFC9C3]">
              Stated: {originalCondition}
            </span>
          )}
        </div>
        <OptionGrid
          options={CONDITION_OPTIONS}
          value={fields.condition}
          onSelect={(val) => onChange({ condition: val })}
        />
      </div>

      {/* Drivetrain */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SectionLabel>Drivetrain</SectionLabel>
          {originalDrivetrain && (
            <span className="text-[10px] text-[#BFC9C3]">
              Stated: {originalDrivetrain}
            </span>
          )}
        </div>
        <OptionGrid
          options={DRIVETRAIN_OPTIONS}
          value={fields.drivetrain}
          onSelect={(val) => onChange({ drivetrain: val })}
          cols={3}
        />
      </div>

      {/* Engine Type */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SectionLabel>Engine Type</SectionLabel>
          {originalEngineType && (
            <span className="text-[10px] text-[#BFC9C3]">
              Stated: {originalEngineType.replace(/_/g, " ")}
            </span>
          )}
        </div>
        <OptionGrid
          options={ENGINE_TYPE_OPTIONS}
          value={fields.engineType}
          onSelect={(val) => onChange({ engineType: val })}
          cols={3}
        />
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <SectionLabel>Transmission</SectionLabel>
          {originalTransmission && (
            <span className="text-[10px] text-[#BFC9C3]">
              Stated: {originalTransmission}
            </span>
          )}
        </div>
        <OptionGrid
          options={TRANSMISSION_OPTIONS}
          value={fields.transmission}
          onSelect={(val) => onChange({ transmission: val })}
          cols={3}
        />
      </div>

      {/* Service History */}
      <div className="space-y-2">
        <SectionLabel>Service History</SectionLabel>
        <div className="space-y-2">
          {SERVICE_HISTORY_OPTIONS.map((opt) => {
            const isSelected = fields.serviceHistory === opt.value

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ serviceHistory: opt.value })}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all active:scale-[0.98]",
                  isSelected
                    ? "border-[#E8A020] bg-[#FFF7E4] font-bold text-[#E8A020]"
                    : "border-[#E7E1D8] bg-white text-[#171D17] hover:border-[#E8A020]/40"
                )}
              >
                <span className="flex items-center gap-2">
                  {isSelected && <ClipboardCheck size={16} />}
                  {opt.label}
                </span>
                {isSelected && (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8A020]">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Boolean Toggles */}
     <div className="overflow-hidden rounded-2xl border border-[#E7E1D8] bg-white">
  {[
    {
      key: "structuralDamage" as const,
      label: "Structural Damage Present",
      sublabel: "Frame damage, bent chassis, flood damage",
      icon: AlertTriangle,
    },
    {
      key: "mechanicalOverhaul" as const,
      label: "Major Mechanical Overhaul",
      sublabel: "Engine rebuild, transmission replacement",
      icon: Wrench,
    },
  ].map((item, index) => {
    const isActive = fields[item.key]

    return (
      <div
        key={item.key}
        className={cn(
          "flex items-center justify-between px-4 py-4",
          index === 0 && "border-b border-[#F7F2EB]"
        )}
      >
        <div className="min-w-0 flex-1 pr-4">
          <div className="flex items-center gap-2">
            <item.icon
              size={14}
              className={isActive ? "text-[#E8A020]" : "text-[#BFC9C3]"}
            />
            <p className="text-sm font-bold text-[#171D17]">{item.label}</p>
          </div>
          <p className="mt-0.5 text-xs text-[#6A6A6A]">{item.sublabel}</p>
        </div>

        {/* Toggle — exact format */}
        <button
          type="button"
          onClick={() => onChange({ [item.key]: !isActive })}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-all",
            isActive ? "bg-[#E8A020]" : "bg-[#E8A0204A]"
          )}
          aria-pressed={isActive}
        >
          <span
            className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
              isActive ? "left-5.5" : "left-0.5"
            )}
          />
        </button>
      </div>
    )
  })}
</div>
    </div>
  )
}