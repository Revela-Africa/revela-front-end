"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/features/auth/store/useSignupStore";
import SignupProgress from "@/features/auth/components/SignupProgress";
import AgentStep1 from "@/features/auth/components/agent/Step1";
import AgentStep2 from "@/features/auth/components/agent/Step2";
import AgentStep3 from "@/features/auth/components/agent/Step3";

export default function AgentSignupPage() {
  const router = useRouter();
  const { sellerType, step } = useSignupStore();

  // 🔒 Guard
  useEffect(() => {
    if (!sellerType) {
      router.replace("/signup");
    }
    if (sellerType && sellerType !== "AGENT") {
      router.replace("/signup");
    }
  }, [sellerType, router]);

  if (!sellerType) return null;

  return (
    <div>
      <SignupProgress step={step} total={3} />

      {step === 1 && <AgentStep1 />}
      {step === 2 && <AgentStep2 />}
      {step === 3 && <AgentStep3 />}
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
