type Props = {
  step: number;
  total: number;
};

export default function SignupProgress({ step, total }: Props) {
  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Step {step}</span>
        <span>{total} steps</span>
      </div>

      <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
        <div
          className="h-full bg-[#D4900A] rounded-full transition-all duration-300"
          style={{
            width: `${(step / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}