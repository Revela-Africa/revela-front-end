import { z } from "zod"

export const NIGERIAN_BANKS = [
  "Test Bank",
  "Access Bank",
  "Citibank",
  "Ecobank",
  "Fidelity Bank",
  "First Bank",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered",
  "Sterling Bank",
  "Union Bank",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  "Opay",
  "Kuda Bank",
  "Moniepoint",
  "PalmPay",
] as const

export type NigerianBank = typeof NIGERIAN_BANKS[number]

export const bankDetailsSchema = z.object({
  bankName: z
    .string()
    .min(1, "Please select a bank"),
  accountNumber: z
    .string()
    .min(10, "Account number must be 10 digits")
    .max(10, "Account number must be 10 digits")
    .regex(/^\d{10}$/, "Enter a valid account number"),
})

export type BankDetailsValues = z.infer<typeof bankDetailsSchema>




export const pickupSchema = z.object({
  region: z.string().min(1, "Select a region"),
  collectionAddress: z
    .string()
    .min(5, "Enter a valid address"),
});

export type PickupValues = z.infer<typeof pickupSchema>;