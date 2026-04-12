"use client";
import { motion } from "framer-motion";

type FieldObject = {
  eyeBrow: string;
  title: string;
};

interface Props {
  header: string;
  buttonText: string;
  className?:string;
  fields: FieldObject[];
}

const PhoneCard = ({ header, buttonText,className, fields  }: Props) => {
  return (
    <div className={`w-75  text-(--ink) font-cabinet pt-5 pb-8 px-7 shadow-[0_18px_45px_rgba(0,0,0,0.06)] rounded-3xl ring-1 ring-black/5 backdrop-blur-sm border border-[#E8A02040] bg-white/75 ${className}`}>
      <div className="font-bold text-base mb-10 w-full flex justify-between">
        {header}{" "}
        <span className="size-2.5 bg-(--gold) block rounded-full"></span>
      </div>
      {fields.map((item, index) => (
        <div
          key={index}
          className="w-full bg-[#F7F2EB] mb-3 p-3 rounded-xl font-bold flex flex-col gap-1"
        >
          <span className="text-[10px] uppercase">{item.eyeBrow}</span>
          <span className="text-[14px]">{item.title}</span>
        </div>
      ))}
      <button className="font-medium py-3 w-full rounded-md text-[14px] flex items-center justify-center bg-[#E8A020] shadow-[0px_8px_10px_-6px_rgba(227,160,23,0.3),0px_20px_25px_-5px_rgba(227,160,23,0.3)]">
        {buttonText}
      </button>
    </div>
  );
};

const StackedPhoneCards = () => {
  return (
    <div className={`relative  flex w-full items-end  h-full justify-center `}>
    
      <div className=" -mr-20 -mb-3 -rotate-5   hidden md:block">
        <PhoneCard
          fields={[
            {
              eyeBrow: "Active CASES",
              title: "3 vehicles",
            },
            {
              eyeBrow: "Initial Estimate",
              title: "₦8.4M ",
            },
          ]}
          buttonText="View All →"
          header="My Vehicles"
        />
      </div>


      <div className="relative z-10">

        <PhoneCard
          fields={[
            {
              eyeBrow: "Make",
              title: "Toyota Camry",
            },
            {
              eyeBrow: "Year",
              title: "2014",
            },
            {
              eyeBrow: "Condition",
              title: "Accidented",
            },
            {
              eyeBrow: "Initial Estimate",
              title: "₦3.8M - ₦5.1M",
            },
          ]}
          buttonText="Get Full Offer →"
          header="Sell a Car"
          className="h-112.5"
        />
      </div>
    </div>
  );
};

export default StackedPhoneCards;
