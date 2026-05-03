import React from "react";
import SectionHeader from "../components/SectionHeader";
import CustomCta from "@/app/components/CustomCta";
import CTACard from "../components/CTAcard";
import OrbitCanvas from "../components/OrbitCanvas";

const BottomCTAsection = () => {
  return (
    <section className="w-full py-24 px-5 bg-[#FDF5E4]">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full container mx-auto items-center justify-between ">
        <OrbitCanvas />
        <div className="flex flex-col">
          <SectionHeader
            eyebrow="ready?"
            titlePart1={
              <span>
                Your car is <br /> worth <br /> more.
              </span>
            }
            titlePart2={<span>Cash it today.</span>}
            description="Create an account, submit your car in minutes, and get a real offer — fast, transparent, straight to your bank."
          />

          <CustomCta
            label="Sell your car    →"
            className="py-5 w-fit mb-6 text-white"
          />
          <span className="font-dm-sans text-[14px] font-normal text-[#6A6A6A]">
            Need help? Call or SMS:
            <a
              href="tel:08138422274"
              className="hover:text-[#D08B25] font-black transition-colors duration-200 underline-offset-4 hover:underline"
            >
              08138422274
            </a>
          </span>
        </div>

        <div className="relative z-10">
          <CTACard />
        </div>
      </div>
    </section>
  );
};

export default BottomCTAsection;
