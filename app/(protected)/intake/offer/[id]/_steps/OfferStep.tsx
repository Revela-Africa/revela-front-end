"use client";

import { Button } from "@/components/ui/button";
import { useOfferStore } from "@/features/offer/store/useOfferStore";
import { Info, Landmark, LayoutDashboard, TrendingDown, Zap } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

export default function OfferStep() {
  const { tav, min, max, setStep, setOffer } = useOfferStore();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // Stub — admin would set this, for now 82% of TAV
  const cashOffer = tav ? Math.round(tav * 0.82) : 0;
  const liquidityAdjustment = tav ? tav - cashOffer : 0;

  function handleAccept() {
    // --- STUBBED: acceptOffer(id) mutation goes here ---
    console.log("Accepting offer:", { id, cashOffer });
    // ---------------------------------------------------
    setOffer(cashOffer);
    setStep(3);
  }






  return (
    <div className="font-cabinet space-y-6 py-4">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wide">
          Available Offer
        </p>
        <h1 className="text-3xl font-extrabold text-foreground mt-1">
          Your Cash Offer
        </h1>
         <p className="text-xs text-muted-foreground mt-1">
          This is your final offer based on physical inspection.
        </p>
      </div>


      <div className=" rounded-2xl  space-y-4">
        <div className="bg-white border-[#E8A02040] border p-7 flex flex-col items-center justify-center rounded-[12px]">
          <p className="text-sm text-muted-foreground text-center">
            Liquid Balance Payable
          </p>
          <p className="text-[48px] text-center   font-medium text-[#D4900A] mt-1">
            {formatNaira(cashOffer)}
          </p>

 
          <div className="flex items-center justify-center gap-2 bg-[#FFF7E4] border border-[#E8A020]/30 px-4 py-2 rounded-full">
            <span className="text-[#F59E0B]">
              <Zap fill="#F59E0B" size={10} />
            </span>
            <span className="text-xs font-bold text-[#E8A020]">
              VALID FOR 72 HOURS · EXPIRES FRI 28 MAR, 9:54 AM
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2 ">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Valuation Breakdown
          </p>

          <div className="border border-[#BFC9C31A] rounded-lg overflow-hidden flex flex-col h-50">
            <div className="flex flex-1 items-center justify-between p-5   border-[#BFC9C31A] border">
              <div className="flex items-center justify-center gap-2">
                <span className="bg-white p-3 rounded-[8px]">
                  <Landmark color="#D4900A" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Total Asset Value <br />
                    (TAV)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Verified AI valuation
                  </p>
                </div>
              </div>
              <p className=" font-bold text-[#E8A020]">
                {tav ? formatNaira(tav) : "—"}
              </p>
            </div>
            <div className="flex flex-1 items-center justify-between p-5   bg-[#FFFFFF80]">
              <div className="flex items-center gap-2">
                <span className="bg-white p-3 rounded-[8px]">
                  <TrendingDown color="#BA1A1A" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Cash Liquidity <br /> Adjustment
                  </p>
                  <p className="text-xs text-[#BA1A1A]">18% FLAT RATE</p>
                </div>
              </div>
              <p className=" font-bold text-[#BA1A1A]">
                -{formatNaira(liquidityAdjustment)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl flex gap-x-4 bg-[#FFF7E4] border border-[#E8A02040]  space-y-2">
          <Info size={20} color="#D4900A" />

          <div className="max-w-65 ">
            <p className="text-sm text-muted-foreground">
              Our cash offers are calculated at <span className="text-[#D4900A] font-bold">82%</span> of your Total Asset Value
              (TAV) to provide immediate liquidity within <span className="text-[#D4900A] font-bold">24 hours</span>.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleAccept}
        className="w-full bg-[#E8A020] text-white font-bold py-4 normal-case rounded-xl mb-4"
      >
        Accept Cash Offer
      </Button>

      <Button
        onClick={() => router.push("/home")}
        className="w-full flex items-center justify-center gap-2 py-4 text-black shadow-none bg-[#E8A02040] hover:bg-[#E8A02040] hover:shadow-none normal-case rounded-xl border border-border text-sm font-semibold "
      >
       <LayoutDashboard size={15}/> Back to Dashboard
      </Button>
    </div>
  );
}
