import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { NumberInput, type NumberInputProps } from "@/components/inputs/number-input"

export type FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<NumberInputProps, "name" | "value" | "defaultValue" | "onNumberChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    emptyValue?: unknown
    onNumberChange?: (value: number | null) => void
  }

function FormNumberInput<
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
  emptyValue = null,
  onNumberChange,
  ...props
}: FormNumberInputProps<TFieldValues, TName>) {
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
          <NumberInput
            name={field.name}
            ref={field.ref}
            value={field.value ?? ""}
            className={fieldClassName}
            aria-invalid={fieldState.invalid || undefined}
            onBlur={field.onBlur}
            onNumberChange={(value) => {
              field.onChange(value ?? emptyValue)
              onNumberChange?.(value)
            }}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormNumberInput }
