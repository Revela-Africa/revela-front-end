"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  `
  flex w-full text-[16px] min-w-0 items-center self-stretch
  rounded-[12px] border border-[#E8A02040]
  bg-[#FFFFFF]
  px-5 py-[18px]
  outline-none transition-colors
  placeholder:text-[#6A6A6A]
  focus-visible:border-[#E8A020]
  disabled:pointer-events-none disabled:cursor-not-allowed
  disabled:bg-input/50 disabled:opacity-50
  aria-invalid:border-destructive
  `,
  {
    variants: {
      size: {
        xs: "h-6 px-2 py-0.5 text-xs",
        sm: "h-7 px-2 py-1 text-sm",
        default: "text-base md:text-sm",
        lg: "h-9 px-3 py-1.5 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    rightIcon?: React.ReactNode
    onRightIconClick?: () => void
  }

function Input({
  className,
  type,
  size,
  rightIcon,
  onRightIconClick,
  ...props
}: InputProps) {
  const isClickable = !!onRightIconClick

  return (
    <div className="relative w-full">
      <InputPrimitive
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ size }),
          rightIcon && "pr-12",
          className
        )}
        {...props}
      />

      {rightIcon && (
        <div
          onClick={onRightIconClick}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2",
            isClickable && "cursor-pointer"
          )}
        >
          {rightIcon}
        </div>
      )}
    </div>
  )
}

export { Input, inputVariants }