"use client";

import { Suspense } from "react";

import Loader from "@/app/(protected)/components/ui/Loader";
import { useInspectorOnboard } from "@/features/inspector/hooks/useInspectorOnboard";
import { VerifyStep } from "./_components/VerifyStep";
import { SetPasswordStep } from "./_components/SetPasswordStep";
import { SuccessStep } from "./_components/SuccessStep";
import { ErrorStep } from "./_components/ErrorStep";

function OnboardContent() {
  const { step, inspectorName, form, onSubmit, isSubmitting } =
    useInspectorOnboard();

  return (
    <>
      {step === "verifying" && <VerifyStep />}
      {step === "set-password" && (
        <SetPasswordStep
          inspectorName={inspectorName}
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {step === "done" && <SuccessStep />}
      {step === "error" && <ErrorStep />}
    </>
  );
}

export default function OnboardPage() {
  return (
    <Suspense fallback={<Loader />}>
      <OnboardContent />
    </Suspense>
  );
}
