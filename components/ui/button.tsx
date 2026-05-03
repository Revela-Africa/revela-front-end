"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--gold)] text-black
    shadow-[0_4px_20px_rgba(224,152,0,0.35)]
    hover:bg-[var(--gold-b)]
    hover:shadow-[0_8px_28px_rgba(224,152,0,0.45)]
  `,
  secondary: `
    bg-white text-black border border-black/10
    hover:bg-black/5
  `,
  ghost: `
    bg-transparent text-black
    hover:bg-black/5
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        `
        inline-flex items-center justify-center
        rounded-md whitespace-nowrap gap-x-3
        font-clash font-semibold uppercase tracking-widest
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        `,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          {/* Spinner */}
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

          {/* Text */}
          <span>Working on it...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}