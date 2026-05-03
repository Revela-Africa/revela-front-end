"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type ProcessingStep = {
  label: string;
  delay: number;
  icon: ReactNode;
};

type ProcessingStepsProps = {
  steps: ProcessingStep[];
  className?: string;
  onComplete?: () => void;
};

export default function ProcessingSteps({
  steps,
  className = "",
  onComplete,
}: ProcessingStepsProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [done, setDone] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    setActiveStep(0);
    setDone(false);

    steps.forEach((step, index) => {
      const timer = window.setTimeout(() => {
        setActiveStep(index);

        if (index === steps.length - 1) {
          const finishTimer = window.setTimeout(() => {
            setDone(true);
            onComplete?.();
          }, 1800);

          timersRef.current.push(finishTimer);
        }
      }, step.delay);

      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [steps, onComplete]);

  return (
    <div className={`w-full space-y-3 px-2 ${className}`}>
      {steps.map((step, index) => {
        const isActive = index === activeStep && !done;
        const isDone = index < activeStep || done;
        const isPending = index > activeStep && !done;

        const rowClasses = isActive
          ? "border-[#E8A020] bg-[#EFE9E0]"
          : isDone
            ? "border-[#E8A02026] bg-[#FFF7E4]"
            : "border-border bg-[#F5F2EC1A] opacity-60";

        const textClasses = isDone
          ? "text-[#D4900A]"
          : isActive
            ? "text-foreground"
            : "text-muted-foreground";

        const iconBg = isDone || isActive ? "bg-[#E8A020]" : "bg-[#3A3A3A0D]";

        const iconColor = isDone || isActive ? "text-white" : "text-[#6A6A6A]";

        return (
          <div
            key={`${step.label}-${index}`}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${rowClasses}`}
          >
            <div className="flex w-full items-center gap-3 min-w-0">
              {/* ICON */}
              <div
                className={` p-2 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}
              >
                <div
                  className={`${iconColor} ${
                    isPending ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {step.icon}
                </div>
              </div>

              <p
                className={`text-sm flex items-center justify-between w-full font-bold truncate  ${textClasses} ${
                  isPending ? "opacity-70" : ""
                }`}
              >
                {step.label}{" "}
                {index === 1 && (
                  <span className="text-[10px] font-bold text-[#E8A020] bg-[#E8A0201A] px-2 py-0.5 rounded-full">
                    REAL-TIME
                  </span>
                )}
              </p>
            </div>

            {isActive && (
              <div className="flex gap-1 shrink-0">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#E8A020] animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
