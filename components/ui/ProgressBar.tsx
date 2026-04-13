"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  value: number; // 0–100
  delay?: number;
  duration?: number;
};

export default function ProgressBar({
  value,
  delay = 0.5,
  duration = 1.2,
}: ProgressBarProps) {
  return (
    <div className="h-1.25 bg-black/5 rounded mb-2 overflow-hidden">
      <motion.div
        className="h-full origin-left rounded bg-linear-to-r from-(--gold) to-(--gold-c)"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{
          duration,
          delay,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
