import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  bankDetailsSchema,
  type BankDetailsValues,
} from "../schemas/offer.schema";
import { useOfferStore } from "../store/useOfferStore";
import { resolveAccount } from "../actions/resolveAccount";
import { appToast } from "@/lib/toast";

export function useBankDetails() {
  const { bankName, accountNumber, setBankDetails, setStep } = useOfferStore();
  const [accountName, setAccountName] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const form = useForm<BankDetailsValues>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      bankName: bankName ?? "",
      accountNumber: accountNumber ?? "",
    },
  });

  // Called when account number hits 10 digits
  async function handleAccountNumberChange(value: string) {
    setAccountName(null);
    const selectedBank = form.getValues("bankName");
    if (value.length !== 10 || !selectedBank) return;
    setIsResolving(true);

    const result = await resolveAccount(value, selectedBank);

    if ("error" in result) {
      appToast.error({
        title: "Verification failed",
        description: result.error,
      });
      
    } else {
      setAccountName(result.accountName);
      appToast.success({
        title: "Account verified",
        description: result.accountName,
      });
    }

    setIsResolving(false);
  }

  async function handleBankChange(bank: string) {
    setAccountName(null);
    const currentAccountNumber = form.getValues("accountNumber");
    if (currentAccountNumber.length !== 10) return;

    setIsResolving(true);

    const result = await resolveAccount(currentAccountNumber, bank);
    if ("error" in result) {
      appToast.error({
        title: "Verification failed",
        description: result.error,
      });
    } else {
      setAccountName(result.accountName);
    }

    setIsResolving(false);
  }

  function onNext(values: BankDetailsValues) {
    if (!accountName) {
      appToast.error({
        title: "Verify your account",
        description: "Please wait for account verification to complete",
      });
      return;
    }

    setBankDetails(values.bankName, values.accountNumber);
    setStep(3);
  }

  return {
    form,
    onNext: form.handleSubmit(onNext),
    accountName,
    isResolving,
    handleAccountNumberChange,
    handleBankChange,
  };
}
