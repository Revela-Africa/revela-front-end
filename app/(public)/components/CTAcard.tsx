"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Repeat } from "lucide-react";
import { useRef } from "react";

export default function CTACard() {
  const ref = useRef<HTMLDivElement>(null);

  // motion values for tilt
  const rotateX = useMotionValue(2);
  const rotateY = useMotionValue(-5);

  // smooth it (important)
  const smoothX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const smoothY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(x * 14);
    rotateX.set(-y * 9);
  };

  const handleMouseLeave = () => {
    rotateX.set(2);
    rotateY.set(-5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <motion.div
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          transformPerspective: 900,
        }}
        className="relative max-w-137.5 overflow-hidden rounded-[28px] p-10 bg-[#FFFFFFBF]"
      >
        
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-transparent via-(--gold) to-transparent" />

        <div className="pointer-events-none absolute -bottom-12 -right-4 text-[16rem] text-[rgba(224,152,0,0.06)] font-clash leading-none">
          ₦
        </div>

        <div className="flex font-cabinet justify-between items-start mb-8 pb-6 border-b border-black/5">
          <div className="text-[18px] text-(--ink) font-cabinet">
            <span className="text-(--gold)">Revela</span> Offer
          </div>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[rgba(224,152,0,0.1)] border border-[rgba(224,152,0,0.25)] text-[10px] tracking-[0.14em] uppercase text-(--gold-d)">
            <motion.span
              className="w-1.25 h-1.25 bg-(--gold) rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            Live Estimate
          </div>
        </div>

        <div className="relative h-41.25 mb-8 rounded-xl border border-[#E0980033] bg-linear-to-br from-[#E3A01733] to-[#E3A017CC]/60 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(224,152,0,0.1)_1px,transparent_0)] bg-size-[20px_20px]" />

          {[8, 14, 22].map((d, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i === 0
                  ? "w-20 h-20 border"
                  : i === 1
                    ? "w-30 h-30 border border-dashed"
                    : "w-40 h-40 border"
              } border-[#E8A02040]`}
              animate={{ rotate: 360 }}
              transition={{
                duration: d,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          <motion.div
            className="z-10 w-12.5 h-12.5 rounded-full bg-white/90 border border-[rgba(224,152,0,0.4)] flex items-center justify-center text-[#E8A020] shadow"
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Repeat />
          </motion.div>

          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] text-[#1A12088A] font-cabinet font-normal uppercase">
            Parts
          </span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-[#1A12088A] font-cabinet font-normal uppercase">
            Circular
          </span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] text-[#1A12088A] font-cabinet font-normal uppercase">
            Value
          </span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-[#1A12088A] font-cabinet font-normal uppercase">
            Metal
          </span>
        </div>

        <div className="mb-6">
          {[
            ["Vehicle", "2018 Toyota Camry"],
            ["Condition", "Fair · Lagos"],
            ["Parts Value", "₦3,400,000"],
            ["Scrap & Metal", "₦1,960,000"],
          ].map(([l, v], i) => (
            <div
              key={i}
              className="flex justify-between py-2 border-b font-clash  border-black/5 last:border-none"
            >
              <span className=" text-(--ink) text-[14px] font-normal">{l}</span>
              <span className=" text-(--ink) font-medium text-base">{v}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-end bg-(--gold) rounded-xl p-6 shadow-lg">
          <div>
            <span className="block text-[12px] whitespace-nowrap uppercase font-cabinet tracking-[0.12em] text-white/70">
              Total Offer
            </span>
            <span className="text-[12px] font-cabinet font-normal text-white">
              Direct to your bank · 48hrs
            </span>
          </div>

          <div className="  md:text-5xl text-white font-clash font-medium leading-none">
            ₦5.2M
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex max-w-137.5 items-center gap-6 p-4 rounded-xl bg-[#FFFFFFBF] backdrop-blur border border-white/70">
        <div className="flex">
          {["TF", "AO", "KC", "MN"].map((t, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full flex font-cabinet font-normal items-center justify-center text-[10px] text-white  -mr-2"
              style={{
                background: ["#634141", "#E8A020", "#171D17", "#1A9A4A"][i],
              }}
            >
              {t}
            </div>
          ))}
        </div>

        <div className="text-xs font-clash font-normal text-(--ink)">
          <strong className="text-(--ink2)">1,300+ Nigerians</strong> have
          already unlocked their circular vehicle value this year.
        </div>
      </div>
    </div>
  );
}
