"use client";

import { useRouter } from "next/navigation";
import { useSignupStore } from "@/features/auth/store/useSignupStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SelectUserTypePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<"CAR_OWNER" | "AGENT">("CAR_OWNER");
  const { setSellerType } = useSignupStore();

  const handleSelect = (type: "CAR_OWNER" | "AGENT") => {
    setSellerType(type);
    if (type === "CAR_OWNER") {
      router.push("/signup/car-owner");
    } else {
      router.push("/signup/agent");
    }
  };

  return (
    <div className="pt-7 h-full font-cabinet">
      <div className=" mb-10">
        <h1 className="text-2xl font-bold text-[#D4900A]">
          How are you using Revela?
        </h1>
        <p className="text-base font-normal leading-7 text-[#3A3A3A] mt-5 max-w-85.5">
          Select your primary role to customize your dashboard and unlock the
          tools relevant to your automotive operations.
        </p>
      </div>


      <div className=" h-41 flex gap-x-5">
        <span
          onClick={() => setSelected("CAR_OWNER")}
          className={`w-full  p-5 border  rounded-xl transition-all hover:shadow-sm group bg-[#FFF7E4] ${selected === "CAR_OWNER" && "border-[#E8A020] bg-white"}`}
        >
          <div className="flex flex-col  gap-4">
            <div>
              <img
                src="/icons/car-owner.svg"
                className="w-6 h-6 "
                alt="agent_avg"
              />
            </div>

            <div>
              <h3 className="font-bold  text-[#141B2B]">
                Car Owner/ Individual
              </h3>
              <p className="text-sm text-[#6A6A6A] mt-1">
                Sell or value your personal vehicle
              </p>
            </div>
          </div>
        </span>

        <span
          onClick={() => setSelected("AGENT")}
          className={`w-full  p-5 border  rounded-xl transition-all hover:shadow-sm group bg-[#FFF7E4] ${selected === "AGENT" && "border-[#E8A020] bg-white"}`}
        >
          <div className="flex flex-col  gap-4">
            <div>
              <img
                src="/icons/agent-icon.svg"
                className="w-6 h-6 "
                alt="agent_avg"
              />
            </div>

            <div>
              <h3 className="font-bold  text-[#141B2B]">Agent</h3>
              <p className="text-sm text-[#6A6A6A] mt-1">
                Manage vehicles for people
              </p>
            </div>
          </div>
        </span>
      </div>
      <Button
        onClick={() => handleSelect(selected)}
        className="text-white w-full normal-case mt-20 "
      >
        Continue <span>→</span>
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Already have an account?{" "}
        <a href="/login" className="text-[#E8A020] font-bold hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}
