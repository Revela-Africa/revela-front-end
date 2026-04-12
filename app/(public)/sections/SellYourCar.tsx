import { FeatureRectangleCard } from "../components/FeatureRectangleCard";
import SectionHeader from "../components/SectionHeader";
import { Clock3 } from "lucide-react";
import StackedPhoneCards from "../components/StackedPhoneCards";


const SellYourCar = () => {
  return (
    <section className=" py-24 w-full bg-[#F5F2EC]">
      <div className="relative z-10 grid grid-cols-2 gap-16 w-full container mx-auto ">
        <div>
          <SectionHeader
            eyebrow="AVAILABLE NOW"
            titlePart1={<span>Sell your car from</span>}
            titlePart2={<span>your phone.</span>}
            description="No long forms, no waiting rooms, no stress. Use the platform  — submit your car, track your offer, and get paid without leaving your house."
          />
          <FeatureRectangleCard
            eyebrow="NO DOWNLOAD NEEDED"
            title="Use the Web Platform"
            description="Works in any browser · No install required"
            icon={<Clock3 className="h-6 w-6" strokeWidth={2.2} />}
          />
        </div>

        <div className="w-full">
          <StackedPhoneCards/>
        </div>
      </div>
    </section>
  );
};

export default SellYourCar;
