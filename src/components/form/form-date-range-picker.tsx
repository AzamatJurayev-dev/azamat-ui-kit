import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { DateRangePicker, type DateRangePickerProps } from "@/components/calendar/date-range-picker"
import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"

export type FormDateRangePickerProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  DateRangePickerProps,
  "value" | "onValueChange"
> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    fromName: FieldPath<TFieldValues>
    toName: FieldPath<TFieldValues>
    emptyValue?: unknown
    onValueChange?: (value: { from?: string; to?: string }) => void
  }

function FormDateRangePicker<TFieldValues extends FieldValues = FieldValues>({
  control,
  fromName,
  toName,
  label,
  description,
  required,
  className,
  emptyValue = "",
  onValueChange,
  ...props
}: FormDateRangePickerProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={fromName}
      render={({ field: fromField, fieldState: fromState }) => (
        <Controller
          control={control}
          name={toName}
          render={({ field: toField, fieldState: toState }) => (
            <FormFieldShell label={label} description={description} required={required} error={fromState.error?.message ?? toState.error?.message} className={className}>
              <DateRangePicker
                value={{ from: fromField.value ?? "", to: toField.value ?? "" }}
                onValueChange={(value) => {
                  fromField.onChange(value.from || emptyValue)
                  toField.onChange(value.to || emptyValue)
                  onValueChange?.(value)
                }}
                {...props}
              />
            </FormFieldShell>
          )}
        />
      )}
    />
  )
}

export { FormDateRangePicker }
