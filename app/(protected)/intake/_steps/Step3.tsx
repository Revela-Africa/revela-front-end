"use client";

import { Controller } from "react-hook-form";
import { Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntakeHeader } from "../_components/IntakeHeader";
import { useIntakeStep3 } from "@/features/intake/hooks/useIntakeStep3";
import { cn } from "@/lib/utils";

const SERVICE_HISTORY_OPTIONS = [
  {
    value: "FULL_RECORDS",
    label: "Full Records",
    subtitle: "VERIFIED RECORDS",
  },
  {
    value: "PARTIAL_RECORDS",
    label: "Partial Records",
    subtitle: "PHYSICAL COPIES",
  },
  {
    value: "NO_RECORDS",
    label: "No Records",
    subtitle: "SELF-CERTIFIED",
  },
  {
    value: "DIGITAL_ONLY",
    label: "Digital Only",
    subtitle: "APP LOGGED",
  },
];

export default function IntakeStep3() {
  const { form, onNext, goBack } = useIntakeStep3();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="font-cabinet">
      <IntakeHeader
        title="Final Details"
        percent={100}
        onExit={goBack}
        exitText="←  Back"
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        noValidate
        className="space-y-8"
      >
        {/* Major Repairs */}
        <div className="space-y-3">
          <label className="text-sm tracking-[1.4px] font-bold  mb-4 block  text-(--ink-secondary) uppercase">
            Major Repairs
          </label>

          <Controller
            name="structuralDamage"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between p-5 rounded-xl  bg-white">
                <div>
                  <p className="text-base font-bold text-(--ink-secondary)">
                    Structural Integrity
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Any frame or chassis damage?
                  </p>
                </div>
                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative shrink-0",
                    field.value ? "bg-[#E8A020]" : "bg-[#E8A0204A]",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all",
                      field.value ? "left-5.5" : "left-0.5",
                    )}
                  />
                </button>
              </div>
            )}
          />

          <Controller
            name="mechanicalOverhaul"
            control={control}
            render={({ field }) => (
             <div className="flex items-center justify-between p-5 rounded-xl  bg-white">
                <div>
                  <p className="text-base font-bold text-(--ink-secondary)">
                    Mechanical Overhaul
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Engine or transmission replacement?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={cn(
                    "w-11 h-6 rounded-full transition-all relative shrink-0",
                    field.value ? "bg-[#E8A020]" : "bg-[#E8A0204A]",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all",
                      field.value ? "left-5.5" : "left-0.5",
                    )}
                  />
                </button>
              </div>
            )}
          />
        </div>

        {/* Service History */}
        <div className="space-y-3">
                  <label className="text-sm tracking-[1.4px] font-bold  mb-4 block  text-(--ink-secondary) uppercase">

            Service History
          </label>
          <Controller
            name="serviceHistory"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                {SERVICE_HISTORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => field.onChange(opt.value)}
                    className={cn(
                      "w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all",
                      field.value === opt.value
                        ? "border-[#E8A02040] bg-[#FFF7E6]"
                        : "border-white bg-white hover:border-[#E8A020]/40",
                    )}
                  >
                    {/* Radio circle */}
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                        field.value === opt.value
                          ? "border-[#E8A020] bg-[#E8A020]"
                          : "border-border",
                      )}
                    >
                      {field.value === opt.value && (
                        <Check
                          size={10}
                          className="text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-base font-bold text-(--ink-secondary)">
                        {opt.label}
                      </p>
                      <p className="text-xs text-(--ink-secondary)">
                        {opt.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          />
          {errors.serviceHistory && (
            <p className="text-xs text-destructive">
              {errors.serviceHistory.message}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <Button  type="submit" className="w-full text-white normal-case">
            Done: Prepare for Photos <Camera />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          FINAL VALIDATION REQUIRED IN NEXT STEP
        </p>
      </form>
    </div>
  );
}
