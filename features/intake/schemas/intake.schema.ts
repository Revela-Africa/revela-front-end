import { z } from "zod";
import {
  VEHICLE_MAKES,
  VEHICLE_MODELS,
} from "@/shared/constants/vehicle-makes";

export const engineTypes = [
  "INTERNAL_COMBUSTION",
  "ELECTRIC",
  "HYBRID_PHEV",
  "OTHER",
] as const;

export const transmissionTypes = ["AUTOMATIC", "MANUAL"] as const;

export const drivetrainTypes = ["FWD", "RWD", "AWD_4WD"] as const;

export const conditionTypes = ["GOOD", "FAIR", "POOR"] as const;

export const serviceHistoryTypes = [
  "FULL_RECORDS",
  "PARTIAL_RECORDS",
  "NO_RECORDS",
  "DIGITAL_ONLY",
] as const;

export type EngineType = (typeof engineTypes)[number];
export type TransmissionType = (typeof transmissionTypes)[number];
export type DrivetrainType = (typeof drivetrainTypes)[number];
export type ConditionType = (typeof conditionTypes)[number];
export type ServiceHistoryType = (typeof serviceHistoryTypes)[number];

// ── Step 1 ─────────────────────────────────────────────────

export const intakeStep1Schema = z
  .object({
    vin: z.string().max(17).optional().nullable(),

    make: z
      .string()
      .min(1, "Please select a make")
      .refine(
        (val) => (VEHICLE_MAKES as readonly string[]).includes(val),
        "Please select a valid make",
      ),

    model: z.string().optional().nullable(),

    year: z.string().min(1, "Please select a year"),

    mileage: z
      .string().optional().nullable(),

    condition: z
      .string()
      .min(1, "Please select a condition")
      .refine(
        (val) => (conditionTypes as readonly string[]).includes(val),
        "Please select a valid condition",
      ),
  })
  .superRefine((data, ctx) => {
    const hasModels = (VEHICLE_MODELS[data.make] ?? []).length > 0;
    if (hasModels && !data.model?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a model",
        path: ["model"],
      });
    }
  });

// ── Step 2 ─────────────────────────────────────────────────

export const intakeStep2Schema = z.object({
  engineType: z
    .string()
    .min(1, "Please select an engine type")
    .refine(
      (val) => (engineTypes as readonly string[]).includes(val),
      "Please select a valid engine type",
    ),

  transmission: z
    .string()
    .min(1, "Please select a transmission type")
    .refine(
      (val) => (transmissionTypes as readonly string[]).includes(val),
      "Please select a valid transmission type",
    ),

  drivetrain: z
    .string()
    .min(1, "Please select a drivetrain")
    .refine(
      (val) => (drivetrainTypes as readonly string[]).includes(val),
      "Please select a valid drivetrain",
    ),
});

// ── Step 3 ─────────────────────────────────────────────────

export const intakeStep3Schema = z.object({
  structuralDamage: z.boolean(),
  mechanicalOverhaul: z.boolean(),

  serviceHistory: z
    .string()
    .min(1, "Please select a service history option")
    .refine(
      (val) => (serviceHistoryTypes as readonly string[]).includes(val),
      "Please select a valid option",
    ),
});

// ── Step 4 ─────────────────────────────────────────────────

export const intakeStep4Schema = z.object({
  photos: z.array(z.instanceof(File)).min(5, "All photo angles are mandatory"),
});

// ── Types ──────────────────────────────────────────────────

export type IntakeStep1Values = z.infer<typeof intakeStep1Schema>;
export type IntakeStep2Values = z.infer<typeof intakeStep2Schema>;
export type IntakeStep3Values = z.infer<typeof intakeStep3Schema>;
export type IntakeStep4Values = z.infer<typeof intakeStep4Schema>;

export type IntakeFormValues = IntakeStep1Values &
  IntakeStep2Values &
  IntakeStep3Values &
  IntakeStep4Values;
