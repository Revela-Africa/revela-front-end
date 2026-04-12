"use client";

import ProgressBar from "@/app/components/ui/ProgressBar";

export default function HeroMainCard() {
  return (
    <div
      className="
    relative z-[5]
    w-[412px] h-[337px] py-8 px-5
    rounded-[24px]
    hero-card-main
    transition-transform duration-500 ease-in-out
    transform-[perspective(800px)_rotateY(-5deg)]
    hover:transform-[perspective(800px)_rotateY(0deg)]
  "
    >
      <div
        className="
          absolute inset-0 rounded-[24px]
          bg-white/75 border border-white/90
          backdrop-blur-[40px] saturate-[220%]
          shadow-[0_20px_60px_rgba(180,120,0,0.12),inset_0_1px_0_rgba(255,255,255,1)]
        "
      />

      <div className="relative z-10 flex flex-col">
        <div className="flex items-center font-cabinet text-[#8C826C] gap-2 text-[9px] font-bold tracking-[0.18em] uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] hcm-ld" />
          Live Valuation · 2025
        </div>

        <div className="text-[22px] font-clash font-bold text-[var(--ink)] mb-1">
          2018 Toyota Camry
        </div>

        <div className="text-[10px] font-inter uppercase font-medium text-[var(--ink4)] mb-6">
          Lagos, Lekki · Fair Condition · 92k km
        </div>

        <div className="text-[64px] leading-none font-clash text-[var(--gold)] tracking-[-0.02em] mb-2 font-normal">
          ₦5,200,000
        </div>

        <div className="text-[10px] uppercase font-inter text-[#8C826C] font-bold tracking-[1px]  mb-5">
          Revela Offer — Verified
        </div>
        <ProgressBar value={75} />

        <div className="flex justify-between text-[#8C826C] font-inter tracking-[1px] uppercase text-[8px]">
          <span>Market low ₦3.2M</span>
          <span>Revela offer</span>
        </div>

        <div className="inline-flex items-center gap-2 mt-5 mx-auto px-6 py-2.5 font-inter rounded-full bg-[#E3A0170D] border border-[rgba(224,152,0,0.25)] text-[8px] font-bold tracking-widest uppercase text-(--gold-d)">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Ownership Verified
        </div>
      </div>
    </div>
  );
}
