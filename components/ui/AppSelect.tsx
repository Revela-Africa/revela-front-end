"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
};

type AppSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export function AppSelect({
  value,
  onValueChange,
  placeholder,
  options,
  className,
  triggerClassName,
  contentClassName,
}: AppSelectProps) {
  return (
    <SelectPrimitive.Root
      value={value || null}
      onValueChange={(nextValue) => {
        if (nextValue !== null) onValueChange(nextValue);
      }}
    >
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className={cn(
          "flex w-full items-center justify-between font-cabinet text-base gap-1.5 rounded-md border border-[#E098001A] bg-[#FFF9F099] px-3 py-2 font-normal text-gray-700 s outline-none transition focus-visible:border-[#D08B25] focus-visible:ring-2 focus-visible:ring-[#D08B25]/30 disabled:cursor-not-allowed disabled:opacity-50",
          triggerClassName,
          className,
        )}
      >
        <SelectPrimitive.Value
          data-slot="select-value"
          className="flex flex-1 text-left"
          placeholder={placeholder}
        />
        <SelectPrimitive.Icon
          render={<ChevronDownIcon className="size-4 text-muted-foreground" />}
        />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={4} className="z-50">
          <SelectPrimitive.Popup
            data-slot="select-content"
            className={cn(
              "z-50 max-h-(--available-height) font-dm-sans min-w-36 overflow-hidden rounded-md border border-[#E098001A] bg-white text-base shadow-lg",
              contentClassName,
            )}
          >
            <SelectPrimitive.List>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex w-full cursor-default items-center gap-2 px-3 py-2 outline-none data-[highlighted]:bg-gray-100"
                >
                  <SelectPrimitive.ItemText className="flex flex-1">
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator
                    render={
                      <span className="absolute right-2 flex size-4 items-center justify-center" />
                    }
                  >
                    <CheckIcon className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}