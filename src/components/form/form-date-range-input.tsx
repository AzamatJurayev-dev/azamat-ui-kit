import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import {
  DateRangeInput,
  type DateRangeInputProps,
  type DateRangeValue,
} from "@/components/inputs/date-range-input"

export type FormDateRangeInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFromName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TToName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DateRangeInputProps, "value" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    fromName: TFromName
    toName: TToName
    emptyValue?: unknown
    onValueChange?: (value: DateRangeValue) => void
  }

function FormDateRangeInput<
  TFieldValues extends FieldValues = FieldValues,
  TFromName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TToName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
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
}: FormDateRangeInputProps<TFieldValues, TFromName, TToName>) {
  return (
    <Controller
      control={control}
      name={fromName}
      render={({ field: fromField, fieldState: fromState }) => (
        <Controller
          control={control}
          name={toName}
          render={({ field: toField, fieldState: toState }) => {
            const error = fromState.error?.message ?? toState.error?.message

            return (
              <FormFieldShell
                label={label}
                description={description}
                required={required}
                error={error}
                className={className}
              >
                <DateRangeInput
                  value={{
                    from: fromField.value ?? "",
                    to: toField.value ?? "",
                  }}
                  onValueChange={(value) => {
                    fromField.onChange(value.from || emptyValue)
                    toField.onChange(value.to || emptyValue)
                    onValueChange?.(value)
                  }}
                  {...props}
                />
              </FormFieldShell>
            )
          }}
        />
      )}
    />
  )
}

export { FormDateRangeInput }
