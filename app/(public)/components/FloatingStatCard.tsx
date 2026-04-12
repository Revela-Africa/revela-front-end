"use client";

import { motion } from "framer-motion";

type FloatingCardProps = {
  title: string;
  value: string;
  suffix?: string;
  sub: string;
  className?: string;
  width?: string;
  duration?: number;
  delay?: number;
};

export default function FloatingStatCard({
  title,
  value,
  suffix,
  sub,
  className = "",
  width = "w-[176px]",
  duration = 4,
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      className={`
        absolute ${width}
        rounded-2xl px-5 py-4
        backdrop-blur-xl bg-white/50 border border-white/60 shadow-lg
        ${className}
      `}
      initial={{ y: 0, rotate: -1 }}
      animate={{ y: -10, rotate: 1 }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <div className="text-[9px] font-bold tracking-[1.8px] font-cabinet uppercase text-[#8C826C] mb-1">
        {title}
      </div>

      <div className="text-[30px] font-clash leading-none text-(--ink) font-medium">
        {value}
        {suffix && (
          <span className={` ${suffix === "hrs"? "text-(--ink) text-sm ":"text-(--gold) "} ml-1`}>{suffix}</span>
        )}
      </div>

      <div className="text-[9px] uppercase text-(--gold)  tracking-[0.9px] font-inter mt-1">{sub}</div>
    </motion.div>
  );
}
