import {motion} from 'framer-motion'

type props = {
  label: string;
  value: string;
  sub: string;
  className?: string;
};

const GridStatCard = ({
  label,
  value,
  sub,
  className = "",
}: props) => {
  return (
    <motion.div
      className={`
        relative overflow-hidden
        flex flex-col justify-end
        p-10 h-56.25
        rounded-[18px]
        cursor-none
        ${className}
        md:col-span-2
        backdrop-blur-xl
        bg-[#FFF8DC99]
        border border-[#F0A8004D]
        shadow-[0_8px_32px_rgba(180,120,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset]
      `}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 50px rgba(180,100,0,.12)",
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-[-35%] right-[3%] w-[30%] aspect-square  rounded-full border border-[rgba(224,152,0,0.12)]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-[-30%] right-[5%] w-[23%] aspect-square  rounded-full border border-[rgba(224,152,0,0.08)]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 32,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      <div className="relative z-1 text-[0.6rem] font-medium font-cabinet tracking-[0.18em] uppercase text-(--gold) mb-2">
        {label}
      </div>

      <div className="relative z-1  font-clash font-medium text-[72px] leading-[0.9] tracking-[-0.02em] text-(--gold)">
        {value}
      </div>

      <div className="relative z-1 text-[14px] font-normal font-cabinet text-(--ink) leading-normal max-w-87.5 mt-1">
        {sub}
      </div>
    </motion.div>
  );
};

export default GridStatCard;