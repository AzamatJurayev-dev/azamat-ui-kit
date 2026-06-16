import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { Input } from "@/components/ui/input"

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<typeof Input>, "name" | "value" | "defaultValue"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    transformIn?: (value: unknown) => string | number | readonly string[] | undefined
    transformOut?: (event: React.ChangeEvent<HTMLInputElement>) => unknown
  }

function FormInput<
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
  transformIn,
  transformOut,
  id,
  onChange,
  onBlur,
  ...props
}: FormInputProps<TFieldValues, TName>) {
  const inputId = id ?? name

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
          htmlFor={inputId}
          className={className}
        >
          <Input
            id={inputId}
            ref={field.ref}
            name={field.name}
            value={transformIn ? transformIn(field.value) : field.value ?? ""}
            onBlur={(event) => {
              field.onBlur()
              onBlur?.(event)
            }}
            onChange={(event) => {
              field.onChange(transformOut ? transformOut(event) : event)
              onChange?.(event)
            }}
            aria-invalid={fieldState.invalid || undefined}
            className={fieldClassName}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormInput }
