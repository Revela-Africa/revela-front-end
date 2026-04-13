import React from "react";
import SectionHeader from "../components/SectionHeader";
import BarFeatureCard from "../components/BarFeatureCard";
import { Activity, Clock4, Layers } from "lucide-react";
import ModelCard from "../components/ModelCard";

const ModelSection = () => {
  const barFeatures = [
    {
      title: "Parts Valuation",
      icon: Clock4,
      description:
        "Specialist buyers evaluate each component at current Nigerian market rates — not guesswork or averages.",
    },
    {
      title: "Scrap Metal Weight",
      icon: Layers,
      description:
        "Metallic body calculated at ₦40–₦42k per tonne. Internationally benchmarked, locally applied.",
    },
    {
      title: "Condition Grade Split",
      icon: Activity,
      description:
        "Vehicle condition graded fairly. Better-condition parts attract proportionally higher offers.",
    },
  ];

  return (
    <section id="model" className=" py-24 px-5 w-full  bg-[#FFF9F099]">
      <div className="w-full container mx-auto flex flex-col md:flex-row gap-10 justify-between items-center">
        <div className="flex flex-col md:w-1/2 ">
          <SectionHeader
            eyebrow="OUR MODEL"
            titlePart1={
              <span>
                Transparent <br />
                <span className="">pricing</span>{" "}
              </span>
            }
            titlePart2={<span>No lowballing.</span>}
            description="A structured assessment calculates your car's true residual value. Every factor disclosed upfront — no surprise deductions at the door."
          />

          <div className=" flex flex-col gap-y-5 md:-mt-10">
            {barFeatures.map((item, i) => {
              const Icon = item.icon;

              return (
                <BarFeatureCard
                  key={i}
                  title={item.title}
                  className="max-w-140 pr-20"
                  description={item.description}
                  icon={<Icon />}
                />
              );
            })}
          </div>
        </div>

        <div className=" md:w-1/2 h-full flex items-center justify-center">
          <ModelCard />
        </div>
      </div>
    </section>
  );
};

export default ModelSection;
