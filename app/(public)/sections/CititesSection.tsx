import React from "react";
import SectionHeader from "../components/SectionHeader";

type Props = {
  city: string;
  location: string;
  unavailable: boolean;
};

const availableInCities: Props[] = [
  {
    city: "Lagos",
    location: "Lagos State",
    unavailable: false,
  },
  {
    city: "Ilorin",
    location: "Kwara State",
    unavailable: false,
  },
  {
    city: "Abuja",
    location: "FCT",
    unavailable: true,
  },
];

const CititesSection = () => {
  const CityBox = ({ city, location, unavailable }: Props) => {
    return (
      <div
        className={`w-full max-w-44 h-27.5 bg-[#E098001A] rounded-[10px]  ${unavailable ? "border-dashed opacity-[0.4]  border border-[#E5E7EB]" : " border border-[#E0980033]"} flex flex-col items-center  justify-center font-cabinet `}
      >
        <span
          className={`${unavailable ? "text-[#1E293B]" : "text-[#E8A020]"} font-bold text-base mt-3`}
        >
          {city}
        </span>
        <span className={`text-[14px] font-normal "text-(--ink) mb-3 `}>
          {location}
        </span>

        <span
          className={` rounded-full whitespace-nowrap font-normal tracking-[1px] text-[10px] px-3 py-[3.5px] ${unavailable ? "bg-[#E5E7EB] text-[#6A6A6A]" : "bg-[#FFF7E6] border-[#E8A02040] border text-[#E8A020]"}`}
        >
          {unavailable ? "• COMING SOON" : "• LIVE NOW"}
        </span>
      </div>
    );
  };

  return (
    <section className="w-full py-24 px-5 bg-[#FFF9F0]">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full container mx-auto items-end justify-between ">
        <SectionHeader
          eyebrow="Currently Serving"
          titlePart1={<span>Currently serving</span>}
          titlePart2={<span>two cities.</span>}
          description="We're live in Lagos and Ilorin. More Nigerian cities are on the roadmap as we scale up operations."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5 ">
          {availableInCities.map((city, index) => (
            <CityBox
              city={city.city}
              location={city.location}
              unavailable={city.unavailable}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CititesSection;
