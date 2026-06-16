import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import {
  AsyncSelect,
  type AsyncSelectOption,
  type AsyncSelectProps,
} from "@/components/inputs/async-select"

export type FormAsyncSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = Omit<AsyncSelectProps<TValue, TData, TOption>, "value" | "onValueChange"> &
  Pick<FormFieldShellProps, "label" | "description" | "required" | "className"> & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    emptyValue?: unknown
    onValueChange?: (value: TValue | undefined, option?: TOption) => void
  }

function FormAsyncSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
>({
  control,
  name,
  label,
  description,
  required,
  className,
  fieldClassName,
  emptyValue,
  onValueChange,
  ...props
}: FormAsyncSelectProps<TFieldValues, TName, TValue, TData, TOption>) {
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
          <AsyncSelect<TValue, TData, TOption>
            value={field.value ? (String(field.value) as TValue) : undefined}
            onValueChange={(nextValue, option) => {
              field.onChange(nextValue ?? emptyValue)
              onValueChange?.(nextValue, option)
            }}
            triggerClassName={fieldClassName}
            {...props}
          />
        </FormFieldShell>
      )}
    />
  )
}

export { FormAsyncSelect }
