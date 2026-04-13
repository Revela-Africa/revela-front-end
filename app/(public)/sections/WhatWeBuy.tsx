import { motion } from "framer-motion";
import CardGridDisplay from "../components/CardGridDisplay";

const WhatWeBuy = () => {
  return (
    <section className=" py-24 px-5 w-full  bg-[#F5F2EC]">
      <div className="w-full container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-x-10">

          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-[12px] font-bold uppercase leading-4 tracking-[1.2px] text-(--gold)"
            >
              — WHAT WE BUY
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              className="mt-8  text-[48px] font-bold font-clash  tracking-[-1.2px] text-(--ink) sm:text-[56px]   "
            >
              <span>Every car </span> <br />
              <span className="text-(--gold)">has value.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
            className=" py-12 sm:py-16 lg:py-20 max-w-md text-[16px] font-normal font-cabinet leading-6.5 tracking-[0px] text-(--ink)"
          >
            Whether old, damaged, dented, flooded, or simply done — Revela
            calculates and offers the best rate for any vehicle within our
            active markets.
          </motion.p>
        </div>
        <CardGridDisplay/>
      </div>
    </section>
  );
};

export default WhatWeBuy;
