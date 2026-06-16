import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { DateInput, type DateInputProps } from "@/components/inputs/date-input"

export type FormDateInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DateInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    emptyValue?: unknown
    onValueChange?: (value: string) => void
  }

function FormDateInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  required,
  className,
  fieldClassName,
  emptyValue = "",
  onValueChange,
  ...props
}: FormDateInputProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldShell
          label={label}
          description={description}
          required={required}
          error={fieldState.error?.message}
          className={className}
        >
          <DateInput
            name={field.name}
            ref={field.ref}
            value={field.value ?? ""}
            className={fieldClassName}
            aria-invalid={fieldState.invalid || undefined}
            onBlur={field.onBlur}
            onValueChange={(value) => {
              field.onChange(value || emptyValue)
              onValueChange?.(value)
            }}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormDateInput }
