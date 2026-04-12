import { ReactNode } from "react";
import { motion } from "framer-motion";

type BarFeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
};

const BarFeatureCard = ({
  title,
  description,
  icon,
  className = "",
}: BarFeatureCardProps) => {
  return (
    <motion.div
      className={` relative flex items-center gap-6 px-7 py-6 rounded-[18px] cursor-none ${className} backdrop-blur-xl  bg-white/60 border border-white/70 shadow-[0_8px_32px_rgba(180,120,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset]
      `}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 50px rgba(180,100,0,.12)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className=" w-11 h-11 shrink-0 rounded-full bg-[rgba(224,152,0,0.1)] border border-[rgba(224,152,0,0.2)] flex items-center justify-center text-(--gold)
      "
      >
        {icon}
      </div>

      <div>
        <div className=" font-clash font-medium text-base text-(--ink) mb-[0.2rem]">
          {title}
        </div>

        <div className="text-[14px] font-cabinet font-normal text-var(--ink) leading-normal">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

export default BarFeatureCard;
