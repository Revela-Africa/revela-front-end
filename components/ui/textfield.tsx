import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type * as React from "react"

type TextFieldProps = Omit<React.ComponentProps<typeof Input>, "id"> & {
  id: string
  label: string
  error?: string
}

function TextField({ id, label, required, error, ref, ...inputProps }: TextFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id} className="text-[#3A3A3A] tracking-[1.2px] uppercase font-normal -mb-1">
        {label}
      </FieldLabel>
      <FieldContent>
        <Input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />
      </FieldContent>
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </Field>
  )
}

export { TextField }