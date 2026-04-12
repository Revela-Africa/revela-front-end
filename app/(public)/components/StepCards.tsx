"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StepCardProps = {
  number: string;
  ghost: string;
  title: string;
  body: string;
  icon: ReactNode;
  delay?: number;
};

function StepCard({
  number,
  ghost,
  title,
  body,
  icon,
  delay = 0,
}: StepCardProps) {
  return (
    <motion.div
      className="
        relative z-[1]
        cursor-none
        rounded-[20px]
        px-[1.8rem] pt-14 pb-8
        bg-[#FFFFFF94]
        border border-[#E8A02040]
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(180,120,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset]
      "
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        boxShadow:
          "0 8px 32px rgba(180,120,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 24px 60px rgba(180,100,0,.12), 0 1px 0 rgba(255,255,255,1) inset",
      }}
    >
      <motion.div
        className="
          relative mb-8 flex h-6 w-6 items-center justify-center
          rounded-full bg-[var(--gold)] text-white
          text-[0.72rem] font-bold
          shadow-[0_4px_16px_rgba(224,152,0,0.45)]
          font-[var(--fd)]
        "
      >
        {number}
        <motion.span
          className="absolute inset-[-5px] rounded-full border border-[rgba(224,152,0,0.3)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>

      <span className="pointer-events-none font-clash font-normal absolute right-[1.2rem] top-[-1.5rem] font-[var(--fd)] text-[48px] leading-none text-[#E0980033]">
        {ghost}
      </span>

      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[rgba(224,152,0,0.2)] bg-[rgba(224,152,0,0.1)] text-[var(--gold)]">
        {icon}
      </div>

      <div className="mb-2 font-medium font-clash text-[16px] text-(--ink)">
        {title}
      </div>

      <div className="text-[14px] font-normal leading-[1.65] font-cabinet text-(--ink) ">
        {body}
      </div>
    </motion.div>
  );
}

export default function StepCards() {
  return (
    <section className="w-full">
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="pointer-events-none absolute left-10 right-10 top-[2.6rem] z-0 hidden h-[1.5px] rounded-[2px] bg-gradient-to-r from-[var(--gold)] to-[rgba(224,152,0,0.15)] md:block" />

        <StepCard
          number="01"
          ghost="01"
          title="Register"
          body="Basic details only. No account required. Done in under 2 minutes."
          delay={0}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        <StepCard
          number="02"
          ghost="02"
          title="Submit Car Details"
          body="Upload details and photos. Receive your itemised valuation instantly."
          delay={0.08}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          }
        />

        <StepCard
          number="03"
          ghost="03"
          title="Arrange Pickup/Dropoff"
          body="A Revela agent visits, verifies, and processes paperwork. Zero hassle."
          delay={0.16}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          }
        />

        <StepCard
          number="04"
          ghost="04"
          title="Get Paid"
          body="Direct NEFT to your verified account. No cash, no delay — within 48 hours."
          delay={0.24}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          }
        />
      </div>
    </section>
  );
}
