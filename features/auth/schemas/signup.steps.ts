import { carOwnerBaseSchema, agentBaseSchema } from "./signup.schema";

// ── CAR OWNER ───────────────────────────
export const carOwnerStep1Schema = carOwnerBaseSchema.pick({
  name: true,
  phone: true,
  email: true,
});

export const carOwnerStep2Schema = carOwnerBaseSchema.pick({
  state: true,
  address: true,
});

export const carOwnerStep3Schema = carOwnerBaseSchema
  .pick({ password: true, confirmPassword: true })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// ── AGENT ───────────────────────────────
export const agentStep1Schema = agentBaseSchema.pick({
  name: true,
  phone: true,
  email: true,
});

export const agentStep2Schema = agentBaseSchema
  .pick({ agencyName: true, license: true })
  .superRefine((data, ctx) => {
    if (data.license) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(data.license.type)) {
        ctx.addIssue({
          code: "custom",
          message: "Only PDF, JPG, or PNG files are accepted",
          path: ["license"],
        });
      }
      const maxSize = 10 * 1024 * 1024;
      if (data.license.size > maxSize) {
        ctx.addIssue({
          code: "custom",
          message: "File must be under 10MB",
          path: ["license"],
        });
      }
    }
  });

export const agentStep3Schema = agentBaseSchema
  .pick({ password: true, confirmPassword: true })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });