"use client";
import { useEffect, useRef } from "react";
import { useIntakeStore } from "@/features/intake/store/useIntakeStore";
import IntakeStep1 from "./_steps/Step1";
import IntakeStep2 from "./_steps/Step2";
import IntakeStep3 from "./_steps/Step3";
import IntakeStep4 from "./_steps/Step4";

export default function IntakePage() {
  const { step } = useIntakeStore();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);
  return (
    <div ref={containerRef} className="pb-7 pt-5 h-full overflow-y-auto">
      {step === 1 && <IntakeStep1 />}
      {step === 2 && <IntakeStep2 />}
      {step === 3 && <IntakeStep3 />}
      {step === 4 && <IntakeStep4 />}
    </div>
  );
}
