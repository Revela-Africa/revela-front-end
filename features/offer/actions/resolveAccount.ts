"use server";

import { BANK_CODES } from "@/shared/constants/bank-codes";

export async function resolveAccount(
  accountNumber: string,
  bankName: string,
): Promise<{ accountName: string } | { error: string }> {
  const bankCode = BANK_CODES[bankName];

  if (!bankCode) {
    return { error: "Bank not supported" };
  }

  try {
    const res = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();
    

    if (!data.status) {
      return { error: "Account not found. Check your details." };
    }

    return { accountName: data.data.account_name };
  } catch {
    return { error: "Could not verify account. Try again." };
  }
}
