"use client";
import { useBankDetails } from "@/features/offer/hooks/useBankDetails";
import { NIGERIAN_BANKS } from "@/features/offer/schemas/offer.schema";
import FormSelect from "@/components/ui/form-select";
import { TextField } from "@/components/ui/textfield";
import { CheckCircle2, Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BankStep() {
  const {
    form,
    onNext,
    accountName,
    isResolving,
    handleAccountNumberChange,
    handleBankChange,
  } = useBankDetails();
  
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="font-cabinet space-y-6 py-4">
      <div>
        <h1 className="text-xl font-extrabold text-[#E8A020]">
          Payment Details
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your bank account to receive immediate settlement upon pickup
          confirmation.
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
        <FormSelect
          name="bankName"
          id="bankName"
          control={control}
          label="BANK NAME"
          placeholder="Select your bank"
          options={NIGERIAN_BANKS.map((b) => ({ label: b, value: b }))}
          error={errors.bankName?.message}
          onValueChange={handleBankChange}
        />

        <TextField
          id="accountNumber"
          label="ACCOUNT NUMBER"
          placeholder="0123456789"
          inputMode="numeric"
          maxLength={10}
          error={errors.accountNumber?.message}
          {...register("accountNumber")}
          onChange={(e) => {
            register("accountNumber").onChange(e);
            handleAccountNumberChange(e.target.value);
          }}
        />
        {accountName && !isResolving && (
          <div className="flex items-center gap-3 p-5 min-h-24 rounded-xl bg-white border border-[#E8A02040]">
            <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
              <CheckCircle2 color="#E8A020" />
            </div>
            <div>
              <p className="text-base font-extrabold  text-[#D4900A]">
                {" "}
            
                 {accountName}
                
              </p>
              <p className="text-sm text-muted-foreground uppercase">
                Account Verified
              </p>
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl flex gap-x-4 bg-[#FFF7E4] border border-[#E8A02040]  space-y-2">
          <Info size={20} color="#D4900A" />

          <div className="max-w-65 ">
            <p className="text-sm text-muted-foreground">
              Funds are typically disbursed{" "}
              <span className="text-[#D4900A] font-bold">within 2 hours </span>
              of pickup confirmation. Revela ensures secure transit and
              bank-grade encryption for all financial transactions.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          loading={isResolving}
          className="w-full bg-[#E8A020] text-white normal-case font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Verify & Complete →
        </Button>

        <div className="flex items-center justify-center gap-1.5">
          <Lock size={12} className="text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Secure encrypted processing by Revela Finance
          </p>
        </div>
      </form>
    </div>
  );
}
