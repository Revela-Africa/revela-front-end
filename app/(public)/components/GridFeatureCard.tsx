import { ReactNode } from "react";
import {motion} from 'framer-motion'


type props = {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
};


const  GridFeatureCard = ({
  title,
  description,
  icon,
  className = "",
}: props) => {
  return (
    <motion.div
      className={`
        relative overflow-hidden
        flex flex-col justify-end
        p-8
        ${className}
        h-50
        md:h-77
        rounded-[20px]
        backdrop-blur-xl
        bg-[#FFFFFF94]
        border border-[#FFFFFFBF]
        shadow-[0_8px_32px_rgba(180,120,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset]
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 24px 60px rgba(180,100,0,.12), 0 1px 0 rgba(255,255,255,1) inset",
      }}
    >
      <div className=" w-10.5 h-10.5 rounded-xl bg-[rgba(224,152,0,0.12)] border border-[rgba(224,152,0,0.2)] flex items-center justify-center text-(--gold) mb-4">
        {icon}
      </div>

      <div>
        <div className=" text-[16px] text-base font-medium font-clash text-(--ink) mb-[0.3rem]">
          {title}
        </div>

        <div className="text-[0.75rem] max-w-75 font-cabinet font-normal text-(--ink) leading-[1.6]">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

export default GridFeatureCard;