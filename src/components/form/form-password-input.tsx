import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { PasswordInput, type PasswordInputProps } from "@/components/inputs/password-input"

export type FormPasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<PasswordInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    onValueChange?: (value: string) => void
  }

function FormPasswordInput<
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
  onValueChange,
  ...props
}: FormPasswordInputProps<TFieldValues, TName>) {
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
          <PasswordInput
            name={field.name}
            ref={field.ref}
            value={field.value ?? ""}
            inputClassName={fieldClassName}
            aria-invalid={fieldState.invalid || undefined}
            onBlur={field.onBlur}
            onValueChange={(value) => {
              field.onChange(value)
              onValueChange?.(value)
            }}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormPasswordInput }
