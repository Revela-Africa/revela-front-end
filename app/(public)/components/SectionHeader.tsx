"use client";
import { motion } from "framer-motion";

type props = {
  eyebrow?: string;
  titlePart1?: React.ReactNode;
  titlePart2?: React.ReactNode;
  description?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  titlePart1,
  titlePart2,
  description,
  className,
}: props) {
  return (
    <section className={`${className}  w-full  py-12 sm:py-16 lg:py-20 `}>
      <div className="mx-auto flex flex-col gap-16 lg:gap-24">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-(--gold)"
          >
            — {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            className="mt-8  text-[48px] font-bold font-clash  tracking-[-1.2px] text-(--ink) sm:text-[56px]   "
          >
            <span>{titlePart1} </span> <br />
            <span className="text-(--gold)">{titlePart2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className="mt-10 max-w-md text-[16px] font-normal font-cabinet leading-6.5 tracking-[0px] text-(--ink)"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
