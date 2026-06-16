import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import {
  PhoneInput,
  formatPhoneDigits,
  type PhoneInputProps,
} from "@/components/inputs/phone-input"

export type FormPhoneInputValueMode = "raw" | "masked"

export type FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<PhoneInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    valueMode?: FormPhoneInputValueMode
    onValueChange?: (value: string, rawValue: string, maskedValue: string) => void
  }

function FormPhoneInput<
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
  valueMode = "raw",
  countryCode = "+998",
  maxDigits = 12,
  onValueChange,
  ...props
}: FormPhoneInputProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const fieldValue = field.value == null ? "" : String(field.value)
        const displayValue =
          valueMode === "raw" ? formatPhoneDigits(fieldValue, countryCode, maxDigits) : fieldValue

        return (
          <FormFieldShell
            label={label}
            description={description}
            required={required}
            error={fieldState.error?.message}
            className={className}
          >
            <PhoneInput
              name={field.name}
              ref={field.ref}
              value={displayValue}
              countryCode={countryCode}
              maxDigits={maxDigits}
              className={fieldClassName}
              aria-invalid={fieldState.invalid || undefined}
              onBlur={field.onBlur}
              onValueChange={(maskedValue, rawValue) => {
                const nextValue = valueMode === "raw" ? rawValue : maskedValue
                field.onChange(nextValue)
                onValueChange?.(nextValue, rawValue, maskedValue)
              }}
              {...props}
            />
          </FormFieldShell>
        )
      }}
    />
  )
}

export { FormPhoneInput }
