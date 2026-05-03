"use client";

import { Button } from "@/components/ui/button";
import { useOfferStore } from "@/features/offer/store/useOfferStore";
import { Shield, Verified, Info } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useRouter } from "next/navigation";

export default function ResultsStep() {
  const [seconds, setSeconds] = useState(14);
  const { tav, make, model, year, mileage, setStep } = useOfferStore();
  const router = useRouter();

  useEffect(() => {
    if (seconds === 0) {
      setStep(2);
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, setStep]);

  return (
    <div className="font-cabinet space-y-6 py-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-[#FFF7E4] border border-[#E8A020]/30 px-3 py-1.5 rounded-full">
          <Verified size={15} color="#E8A020" />
          <span className="text-xs font-bold text-[#E8A020]">
            REVELA VALUATION
          </span>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          Estimated Revela Valuation
        </p>
        <p className="text-[48px] font-medium text-[#D4900A] mt-1">
          ₦{tav ? <CountUp duration={1} end={tav} /> : "—"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {year} {make} {model} · {Number(mileage).toLocaleString()} km
        </p>
      </div>

      {/* Estimate Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FFF7E4]/60 border border-[#E8A020]/20">
        <Info size={18} className="text-[#D4900A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#8B6914]">
            Estimated price — not final
          </p>
          <p className="text-xs leading-relaxed text-[#A67C00]/90">
            This valuation is an estimate based on market data and visual analysis. 
            The final offer will be adjusted following a physical inspection of your vehicle.
          </p>
        </div>
      </div>

      {/* Trust Reinforcement */}
      <div className="p-4 rounded-xl flex gap-x-4 bg-[#FFF7E4] border border-[#E8A020]/25">
        <Shield size={30} color="#D4900A" className="shrink-0" />

        <div className="max-w-65">
          <p className="text-sm font-bold mb-1 text-[#404944]">
            Trust Reinforcement
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Verified by 4 market sources and visual analysis. This valuation is
            valid for only 72 hours from the date of submission.
          </p>
        </div>
      </div>

      <Button
        className="w-full bg-[#E8A020] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
      >
        Continue in {seconds}
      </Button>
    </div>
  );
}