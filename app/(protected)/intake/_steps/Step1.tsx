"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/textfield";
import { IntakeHeader } from "../_components/IntakeHeader";
import { useIntakeStep1 } from "@/features/intake/hooks/useIntakeStep1";
import { useIntakeStore } from "@/features/intake/store/useIntakeStore";
import {
  VEHICLE_MAKES,
  VEHICLE_MODELS,
} from "@/shared/constants/vehicle-makes";
import FormSelect from "@/components/ui/form-select";

const CONDITION_OPTIONS = [
  { label: "Good", value: "GOOD" },
  { label: "Fair", value: "FAIR" },
  { label: "Poor", value: "POOR" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1979 }, (_, i) => {
  const year = CURRENT_YEAR - i;
  return { label: String(year), value: String(year) };
});

export default function IntakeStep1() {
  const router = useRouter();
  const { reset } = useIntakeStore();
  const { form, onNext, onMakeChange, selectedMake } = useIntakeStep1();

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const modelOptions = selectedMake
    ? (VEHICLE_MODELS[selectedMake] ?? []).map((m) => ({
        label: m,
        value: m,
      }))
    : [];

  function handleExit() {
    reset();
    router.push("/home");
  }

  return (
    <div className="font-cabinet ">
      <IntakeHeader title="Vehicle Details" percent={33} onExit={handleExit} exitText="✕  Exit Process" />

      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-(--gold-secondary)">
          Tell us about your car
        
        </h1>
        <p className="text-base text-(--ink-secondary) mt-1">
          We use this to pull exact parts prices from the Nigerian aftermarket.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        noValidate
        className="space-y-5"
      >
        
        <TextField
          id="vin"
          label="VIN (Optional — Improves Accuracy)"
          placeholder="4T1BF3EK6AU"
          className=" placeholder:text-[#D4900A] font-courier-prime"
          error={errors.vin?.message}
          {...register("vin")}
        />

        <FormSelect
          name="make"
          id="make"
          control={control}
          label="MAKE"
          placeholder="Select Manufacturer"
          options={VEHICLE_MAKES.map((m) => ({ label: m, value: m }))}
          error={errors.make?.message}
          onValueChange={onMakeChange} // ← clears model on change
        />

        
        <FormSelect
          name="model"
          id="model"
          control={control}
          label="MODEL"
          placeholder={
            !selectedMake
              ? "Select a make first"
              : modelOptions.length === 0
                ? "No models available"
                : "Select Model"
          }
          options={modelOptions}
          disabled={!selectedMake || modelOptions.length === 0}
          error={errors.model?.message}
        />

        
        <FormSelect
          name="year"
          id="year"
          control={control}
          label="YEAR"
          placeholder="Production Year"
          options={YEAR_OPTIONS}
          error={errors.year?.message}
        />

        
        <TextField
          id="milage"
          label="MILEAGE (KM)"
          placeholder="0"
          type="number"
          inputMode="numeric"
          rightIcon={
            <span className="px-3 pr-2 py-2.5 text-sm text-muted-foreground border-l border-border">
              KM
            </span>
          }
          error={errors.mileage?.message}
          {...register("mileage")}
        />

        
        <FormSelect
          name="condition"
          id="condition"
          control={control}
          label="OVERALL CONDITION"
          placeholder="Select Condition"
          options={CONDITION_OPTIONS}
          error={errors.condition?.message}
        />

        <div className="pt-4">
          <Button type="submit" className="w-full py-4 normal-case text-white">
          Performance Details <span>→</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
