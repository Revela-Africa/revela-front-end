import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  id?: string;
  control?: Control<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  options: Option[];
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

function FormSelect<T extends FieldValues>({
  name,
  id,
  control,
  label,
  placeholder,
  error,
  options,
  onValueChange,
  disabled,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          {label && (
            <label
              htmlFor={id}
              className="flex gap-x-2 text-[#3A3A3A] tracking-[1.2px] text-xs mb-0.5"
            >
              {label}
            </label>
          )}

          <Select
            id={id}
            value={field.value || ""}
            onValueChange={(val) => {
              field.onChange(val);
              onValueChange?.(val || ""); // ← call it if provided
            }}
            disabled={disabled}
          >
            <SelectTrigger error={!!error}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error && <span className="text-destructive text-sm">{error}</span>}
        </div>
      )}
    />
  );
}

export default FormSelect;
