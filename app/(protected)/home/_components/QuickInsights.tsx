import Link from "next/link";

const INSIGHTS = [
  {
    label: "Quick Valuation",
    icon: "/icons/quick-valuation.svg",
    href: "/intake",
  },
  {
    label: "Market Trends",
    icon: "/icons/trend-up.svg",
    href: "/market",
  },
  {
    label: "Live Support",
    icon: "/icons/live-support.svg",
    href: "/support",
  },
];

export function QuickInsights() {
  return (
    <div>
      <h2 className="text-sm text-[18px] font-bold text-foreground mb-3">
        Quick Insights
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {INSIGHTS.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col h-32.5  items-center justify-center gap-2 p-4 rounded-xl bg-[#FFF7E4] border border-[#E8A02040] hover:border-[#E8A020]/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8A02040] flex items-center justify-center">
              <img src={Icon} className="text-[#3A3A3A]" />
            </div>
            <span className="text-[10px] font-medium text-center text-foreground leading-tight">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
