"use client";

import { easeOut, motion } from "framer-motion";
import CustomCta from "@/app/components/CustomCta";
import FloatingStatCard from "../components/FloatingStatCard";
import HeroMainCard from "../components/HeroMainCard";
import OrbitCanvas from "../components/OrbitCanvas";
import ScrollIndicator from "@/app/components/ScrollIndicator";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, easeOut },
  },
};

export default function HeroSection() {
  return (
    <section className="relative py-24 min-h-screen flex items-center justify-center overflow-x-hidden px-5">
      <OrbitCanvas />

      <div className="absolute w-175 h-175 rounded-full bg-[radial-gradient(circle,rgba(255,190,0,0.18),transparent_65%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 w-full container"
      >
        <div className="flex flex-col justify-center">
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 w-fit text-[10px] tracking-[0.22em] uppercase font-semibold text-(--gold-d)"
          >
            <motion.span
              className="w-2 h-2 bg-(--gold) rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Nigeria's Circular Vehicle Economy
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[50px] md:text-[65px] leading-[0.9] font-bold font-clash text-(--ink) mb-10"
          >
            Unlock Your <br />
            <span className="text-(--gold)">Vehicle’s</span> <br />
            <span className="text-(--gold)">Circular</span> <br />
            Value.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-(--ink3) font-cabinet font-light max-w-lg mb-10 text-[18px]"
          >
            Got a{" "}
            <span className="font-medium text-(--ink)">
              dated, accidented or damaged car?
            </span>{" "}
            Sell it through the Revela platform — fast, transparent, and
            straight to your bank account.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center mr-auto gap-5"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <CustomCta
                label="Sell your car →"
                className="py-5 px-10 text-white"
              />
            </motion.div>

            <CustomCta
              label="See how it works →"
              className="bg-transparent pl-0 md:pl-6 font-cabinet font-medium normal-case shadow-none text-[#71717A] hover:bg-transparent"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center mt-0 lg:mt-10"
        >
          <HeroMainCard />
          <FloatingStatCard
            title="Cars Purchased"
            value="1,300"
            suffix="+"
            sub="Nationwide"
            width="w-[170px]"
            duration={4}
            delay={0}
            className="top-[5%] right-[-10%]"
          />

          <FloatingStatCard
            title="Paid Out"
            value="₦2B"
            suffix="+"
            sub="Direct transfers"
            width="w-[155px]"
            duration={5}
            delay={-2}
            className="bottom-[12%] right-[-8%]"
          />

          <FloatingStatCard
            title="Avg. Payout"
            value="48"
            suffix="hrs"
            sub="Bank to bank"
            duration={4.5}
            delay={-1}
            className="top-[30%] left-[-10%]"
          />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
