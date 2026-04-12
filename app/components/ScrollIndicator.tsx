"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      {/* Mask container */}
      <div className="h-[40px] w-[1px] overflow-hidden relative">
        {/* Animated line */}
        <motion.div
          className="w-full h-full bg-gradient-to-b from-(--gold) to-transparent origin-top"
          animate={{
            scaleY: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.35, 0.65, 1],
          }}
          style={{
            transformOrigin: "top",
          }}
        />
      </div>

      <span className="text-[10px] tracking-[3px] font-bold  uppercase text-[#8C826C] font-cabinet">
        Scroll
      </span>
    </motion.div>
  );
}
