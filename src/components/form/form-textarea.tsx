import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { Textarea } from "@/components/ui/textarea"

export type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<typeof Textarea>, "name" | "value" | "defaultValue"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
  }

function FormTextarea<
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
  id,
  onChange,
  onBlur,
  ...props
}: FormTextareaProps<TFieldValues, TName>) {
  const textareaId = id ?? name

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
          htmlFor={textareaId}
          className={className}
        >
          <Textarea
            id={textareaId}
            ref={field.ref}
            name={field.name}
            value={field.value ?? ""}
            onBlur={(event) => {
              field.onBlur()
              onBlur?.(event)
            }}
            onChange={(event) => {
              field.onChange(event)
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

export { FormTextarea }
