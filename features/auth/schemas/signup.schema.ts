import { z } from "zod";
import { NIGERIA_STATES } from "@/shared/constants/nigeria-states";

export const sellerTypes = ["CAR_OWNER", "AGENT"] as const;
export type SellerType = (typeof sellerTypes)[number];

// ── Car Owner ──────────────────────────────────────────────

export const carOwnerBaseSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(?:\+234|234|0)[789][01]\d{8}$/,
      "Enter a valid Nigerian phone number",
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  state: z
    .string()
    .min(1, "Please select your state")
    .refine(
      (val) => (NIGERIA_STATES as readonly string[]).includes(val),
      "Please select a valid Nigerian state",
    ),
  address: z
    .string()
    .min(5, "Enter a valid address")
    .max(200, "Address is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

// Full schema with refinements — used only for final submission
export const carOwnerSchema = carOwnerBaseSchema.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

export type CarOwnerValues = z.infer<typeof carOwnerSchema>;

// ── Agent ──────────────────────────────────────────────────

export const agentBaseSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^0[789][01]\d{8}$/, "Enter a valid Nigerian phone number"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  agencyName: z
    .string()
    .max(100, "Agency name is too long")
    .nullable()
    .optional(),
  license: z.instanceof(File, { message: "Driver's license is required" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

export const agentSchema = agentBaseSchema.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }

  if (data.license) {
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(data.license.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only PDF, JPG, or PNG files are accepted",
        path: ["license"],
      });
    }
    const maxSize = 10 * 1024 * 1024;
    if (data.license.size > maxSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File must be under 10MB",
        path: ["license"],
      });
    }
  }
});

export type AgentValues = z.infer<typeof agentSchema>;
