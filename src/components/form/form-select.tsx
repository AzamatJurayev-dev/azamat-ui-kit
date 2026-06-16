import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { SimpleSelect, type SimpleSelectProps } from "@/components/inputs/simple-select"

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SimpleSelectProps, "value" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    onValueChange?: (value: string) => void
  }

function FormSelect<
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
}: FormSelectProps<TFieldValues, TName>) {
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
          <SimpleSelect
            value={field.value ? String(field.value) : undefined}
            onValueChange={(nextValue) => {
              field.onChange(nextValue)
              onValueChange?.(nextValue)
            }}
            triggerClassName={fieldClassName}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormSelect }
