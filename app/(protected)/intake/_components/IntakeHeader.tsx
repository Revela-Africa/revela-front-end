interface Props {
  title: string;
  percent: number;
  exitText :string;
  onExit?: () => void;
}

export function IntakeHeader({ title, percent, onExit, exitText  }: Props) {
  return (
    <div className="mb-6">
      {/* Title row */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-extrabold text-(--gold-secondary) font-cabinet">
          {title}
        </h2>
        <span className="text-sm font-bold text-(--ink-secondary)">
          {percent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-[#E8A020] rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Exit */}
      {onExit && (
        <button
          onClick={onExit}
          className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
           {exitText}
        </button>
      )}
    </div>
  );
}
