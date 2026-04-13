import { CreditCard, File, Shield, Toolbox } from "lucide-react";
import type { ReactNode } from "react";

type TrustPoint = {
  num: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const trustPoints: TrustPoint[] = [
  {
    num: "01",
    title: "Identity & Ownership Verified",
    description:
      "We verify ownership before anything moves. Every vehicle is checked against police and FRSC records. We do not handle stolen vehicles.",
    icon: <Shield className="h-4 w-4" strokeWidth={2.2} />,
  },
  {
    num: "02",
    title: "Fully Documented",
    description:
      "Every step — from intake to payment — is recorded. You receive documentation of the transaction. Clean, formal, and auditable.",
    icon: <File className="h-4 w-4" strokeWidth={2.2} />,
  },
  {
    num: "03",
    title: "Direct Bank Transfer",
    description:
      "No cash middlemen, no delays. Your payout goes straight to your bank account once the deal is agreed and the handover is done.",
    icon: <CreditCard className="h-4 w-4" strokeWidth={2.2} />,
  },
  {
    num: "04",
    title: "Professionally Dismantled",
    description:
      "Vehicles are dismantled in a structured, environmentally conscious process. Parts are resold, metals recycled. Nothing dumped illegally.",
    icon: <Toolbox className="h-4 w-4" strokeWidth={2.2} />,
  },
];

export default function TrustPoints() {
  return (
    <div className="flex flex-col">
      {trustPoints.map((point, index) => (
        <div
          key={point.num}
          className={`
            flex items-start gap-[1.2rem]
            border-b border-[#E0980033]
            py-[1.6rem]
            cursor-none
            max-w-142
            transition-[padding-left] duration-200
            hover:pl-2
          `}
        >
          <div className="w-5.5 shrink-0 pt-0.5 font-normal text-base font-clash text-[#E8A020] ">
            {point.num}
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#E0980033] bg-[#E098001A] text-[#E09800]">
            {point.icon}
          </div>

          <div>
            <div className="mb-1 text-[1rem] font-clash font-medium text-(--ink)">
              {point.title}
            </div>
            <div className=" text-[14px] font-cabinet font-normal leading-[1.55] text-(--ink)">
              {point.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
