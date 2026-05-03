"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/features/auth/store/useSignupStore";
import SignupProgress from "@/features/auth/components/SignupProgress";
import CarOwnerStep1 from "@/features/auth/components/car-owner/Step1";
import CarOwnerStep2 from "@/features/auth/components/car-owner/Step2";
import CarOwnerStep3 from "@/features/auth/components/car-owner/Step3";





export default function CarOwnerSignupPage() {
  const router = useRouter();
  const { sellerType, step } = useSignupStore();

  // 🔒 Guard
  useEffect(() => {
    if (!sellerType) {
      router.replace("/signup");
    }
    if (sellerType && sellerType !== "CAR_OWNER") {
      router.replace("/signup");
    }
  }, [sellerType, router]);

  if (!sellerType) return null;

  return (
    <div>
      <SignupProgress step={step} total={3} />

      {step === 1 && <CarOwnerStep1 />}
      {step === 2 && <CarOwnerStep2 />}
      {step === 3 && <CarOwnerStep3 />}
            <p className="text-center text-[14px] text-muted-foreground mt-6">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-[#E8A020] ml-2 font-bold hover:underline"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}