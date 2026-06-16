import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { DatePicker, type DatePickerProps } from "@/components/calendar/date-picker"
import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"

export type FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DatePickerProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    emptyValue?: unknown
    onValueChange?: (value: string) => void
  }

function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, description, required, className, fieldClassName, emptyValue = "", onValueChange, ...props }: FormDatePickerProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldShell label={label} description={description} required={required} error={fieldState.error?.message} className={className}>
          <DatePicker
            name={field.name}
            value={field.value ?? ""}
            className={fieldClassName}
            aria-invalid={fieldState.invalid || undefined}
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

export { FormDatePicker }
