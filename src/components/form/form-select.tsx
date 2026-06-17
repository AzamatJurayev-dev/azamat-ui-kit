import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellControlProps } from "@/components/form/form-field-shell"
import { SimpleSelect, type SimpleSelectProps } from "@/components/inputs/simple-select"

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SimpleSelectProps, "value" | "onValueChange" | "disabled"> &
  FormFieldShellControlProps & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    emptyValue?: unknown
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
  layout,
  descriptionPosition,
  labelAction,
  requiredIndicator,
  errorIcon,
  showErrorIcon,
  disabled,
  readOnly,
  labelClassName,
  labelRowClassName,
  descriptionClassName,
  errorClassName,
  contentClassName,
  fieldClassName,
  emptyValue,
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
          layout={layout}
          descriptionPosition={descriptionPosition}
          labelAction={labelAction}
          requiredIndicator={requiredIndicator}
          errorIcon={errorIcon}
          showErrorIcon={showErrorIcon}
          disabled={disabled}
          readOnly={readOnly}
          labelClassName={labelClassName}
          labelRowClassName={labelRowClassName}
          descriptionClassName={descriptionClassName}
          errorClassName={errorClassName}
          contentClassName={contentClassName}
        >
          <SimpleSelect
            value={field.value ? String(field.value) : undefined}
            disabled={disabled || readOnly}
            onValueChange={(nextValue) => {
              field.onChange(nextValue || emptyValue)
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
