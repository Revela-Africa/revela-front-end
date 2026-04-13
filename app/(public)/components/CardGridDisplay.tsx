"use client";

import { motion } from "framer-motion";

import { CreditCard, Repeat } from "lucide-react";
import GridFeatureCard from "./GridFeatureCard";
import GridStatCard from "./GridStatCard";
import BarFeatureCard from "./BarFeatureCard";

const CardGridDisplay = () => {
  return (
    <section className="grid gap-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full ">
        <GridFeatureCard
          title="End-of-Life Vehicles"
          description="Old cars past their prime. Sitting unused, not worth repairing, gathering rust year after year. We buy them exactly as they are — still valuable to us."
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
          }
        />

        <GridFeatureCard
          title="Accelerated & High Mileage"
          description="High mileage, hard driven, with engine wear? Specialist buyers for every condition."
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          }
        />

        <GridFeatureCard
          title="Damaged & Non-Perfect"
          description="Scratched, dented, flood-damaged, or non-functional. We have the right buyer for every situation."
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full ">
        <GridStatCard
          label="Average Circular Value"
          value="₦4.85M"
          sub="Median payout across all vehicle types and conditions, calculated from real transactions."
        />

        <motion.div
          className=" relative overflow-hidden h-56.25 flex flex-col justify-between p-8 rounded-[18px] cursor-none bg-(--gold) "
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className=" pointer-events-none absolute -bottom-12 -right-4  font-clash text-[11rem] font-normal leading-none  text-white/10 select-none">
            ₦
          </div>

          <div className=" relative z-1  font-clash font-normal text-[24px] leading-[1.1]  text-white ">
            Start Your <br /> Valuation Now
          </div>

          <motion.div
            className=" relative z-1 self-end w-10 h-10 rounded-full  bg-white/20 flex items-center justify-center  text-white "
            whileHover={{ x: 3, y: -3 }}
            transition={{ duration: 0.25 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 w-full">
        <BarFeatureCard
          title="Circular Economy"
          className="minh-h-38"
          description="Parts, metal, and components re-enter the supply chain through our certified network of recyclers and rebuilders."
          icon={<Repeat />}
        />

        <BarFeatureCard
          title="Direct Bank Transfer · Always"
          className="min-h-38"
          description="No cash exchanges, no agent intermediaries. Every naira paid directly to your verified bank account within 48 hours of acceptance."
          icon={<CreditCard />}
        />
      </div>
    </section>
  );
};

export default CardGridDisplay;
