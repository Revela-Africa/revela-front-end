import Link from "next/link";

type AppNavigationCtaProps = {
  href?: string;
  label?: string;
  className?: string;
};

const CustomCta = ({
  href = "/",
  label = "Get Valuation",
  className,
}: AppNavigationCtaProps) => {
  return (
    <Link
      href={href}
      className={`
        ${className}
        inline-flex items-center justify-center
        rounded-md whitespace-nowrap
        bg-(--gold) font-clash
        px-6 py-3
        text-[0.78rem] font-bold uppercase tracking-widest
        shadow-[0_4px_20px_rgba(224,152,0,0.35)]
        transition-all duration-200
        hover:-translate-y-0.5 hover:bg-(--gold-b)
        hover:shadow-[0_8px_28px_rgba(224,152,0,0.45)]
      `}
    >
      {label}
    </Link>
  );
};

export default CustomCta;
