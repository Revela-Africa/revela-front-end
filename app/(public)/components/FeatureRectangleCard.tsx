"use client";
import * as React from "react";
import { motion } from "framer-motion";

type props = {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
};

export function FeatureRectangleCard({
  eyebrow,
  title,
  description,
  icon,
  className,
}: props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`rounded-[14px] bg-[#FFFFFFBF] border border-[#FFFFFFBF] pt-5 pb-8 px-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)] ring-1 ring-black/5 backdrop-blur-sm ${className}`}
    >
      <div className="flex  flex-col gap-5 sm:flex-row  sm:gap-8 items-start">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex h-15 w-15 items-center justify-center rounded-2xl border-[1.5px] border-[#E0980033] bg-[color:rgba(224,152,0,0.06)] text-[#E09800]"
        >
          {icon}
        </motion.div>

        <div className="min-w-0 font-cabinet">
          <p className="text-[12px] font-normal uppercase  tracking-[1px] text-(--ink) ">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-[20px] font-bold   text-(--gold) sm:text-[28px] ">
            {title}
          </h3>
          <p className="mt-2 text-[14px] font-normal text-(--ink)">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
