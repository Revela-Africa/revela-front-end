export default function TimelineItem({
  label,
  description,
  tag,
  tagColor,
  state,
  isLast,
}: {
  label: string;
  description: string;
  tag: string;
  tagColor: string;
  state: "done" | "current" | "pending";
  isLast: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
            state === "done"
              ? "bg-green-500"
              : state === "current"
                ? "bg-[#E8A020]"
                : "bg-muted border-2 border-border"
          }`}
        >
          {state === "done" ? (
            <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
              <path
                d="M1 3.5L3 5.5L7 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : state === "current" ? (
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          ) : null}
        </div>
        {!isLast && (
          <div
            className={`w-px flex-1 mt-1 ${
              state === "done" ? "bg-green-200" : "bg-border"
            }`}
          />
        )}
      </div>
      <div className={`pb-4 ${state === "pending" ? "opacity-40" : ""}`}>
        <p
          className={`text-sm font-bold ${
            state === "current" ? "text-[#E8A020]" : "text-foreground"
          }`}
        >
          {label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        <span
          className={`inline-block text-[10px] border border-[#E8A020] bg-[#E8A02040] text-[#D4900A] font-bold px-2 py-0.5 rounded-full mt-1.5 ${tagColor}`}
        >
          {tag}
        </span>
      </div>
    </div>
  );
}