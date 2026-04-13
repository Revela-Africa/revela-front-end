"use client";

import { motion, number } from "framer-motion";

const ribbonTexts = [
  "DON'T DUMP IT •",
  "CASH IT •",
  "FAST. SIMPLE. TRANSPARENT. •",
  "LAGOS & ILORIN •",
  "DATED • ACCIDENTED • DAMAGED •",
  "NO REPAIRS NEEDED •",
];

const statValues = [
  { title: "1,300+", subTitle: "Vehicles Processed" },
  { title: "₦2B+", subTitle: "Paid Out to Sellers" },
  { title: "48hrs", subTitle: "Avg. Time to Payment" },
  { title: "2", subTitle: "Cities • More Coming" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function StatsRibbon() {
  return (
    <section className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden bg-(--gold) h-14 flex items-center">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-linear-to-r from-(--gold) to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-linear-to-l from-(--gold) to-transparent" />

        <motion.div
          className="flex w-max items-center font-cabinet whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div className="flex items-center gap-12 px-10">
            {ribbonTexts.map((text, i) => (
              <span
                key={`a-${i}`}
                className=" text-white text-xs font-semibold tracking-[0.28em] uppercase"
              >
                {text}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-12 px-10">
            {ribbonTexts.map((text, i) => (
              <span
                key={`b-${i}`}
                className="text-white text-xs font-semibold tracking-[0.28em] uppercase"
              >
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full bg-[#FCF9F3]  border-y border-[#E5E7EB] md:h-38.75  flex items-center ">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="container mx-auto px-6 py-10 md:py-14"
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8  text-center 
        "
          >
            {statValues.map((itemData, index) => (
              <motion.div
                key={index}
                variants={item}
                className="flex flex-col items-center"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className=" text-(--gold) font-clash  font-semibold  text-[26px]  md:text-[30px] tracking-tight "
                >
                  {itemData.title}
                </motion.span>

                <span className=" text-(--ink)  font-cabinet  text-[11px] whitespace-nowrap  md:text-[13px]  uppercase  tracking-[0.12em] mt-1 opacity-80 ">
                  {itemData.subTitle}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
