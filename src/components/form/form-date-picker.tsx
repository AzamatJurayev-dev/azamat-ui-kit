import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { DatePicker, type DatePickerProps } from "@/components/calendar/date-picker"
import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"

export type FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DatePickerProps, "value" | "onValueChange"> &
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
}: FormDatePickerProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldShell label={label} description={description} required={required} error={fieldState.error?.message} className={className}>
          <DatePicker
            value={field.value ?? ""}
            triggerClassName={fieldClassName}
            onValueChange={(nextValue) => {
              field.onChange(nextValue || emptyValue)
              onValueChange?.(nextValue)
            }}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormDatePicker }
