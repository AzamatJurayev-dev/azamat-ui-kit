import * as React from "react"
import { Controller, type FieldPath, type FieldValues } from "react-hook-form"

import { AppInput, type AppInputKind, type AppInputProps } from "@/components/inputs/app-input"
import { FormFieldShell } from "@/components/form/form-field-shell"
import {
  pickFormFieldShellProps,
  type FormControlledFieldProps,
} from "@/components/form/form-field-utils"

export type FormAppInputPhoneValueMode = "raw" | "masked"

export type FormAppInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = FormControlledFieldProps<TFieldValues, TName> &
  Omit<AppInputProps, "name" | "value" | "defaultValue" | "onChange" | "onValueChange" | "onNumberChange"> & {
    kind?: AppInputKind
    emptyValue?: unknown
    phoneValueMode?: FormAppInputPhoneValueMode
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onValueChange?: (...values: string[]) => void
    onNumberChange?: (value: number | null) => void
  }

function FormAppInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormAppInputProps<TFieldValues, TName>) {
  const {
    control,
    name,
    fieldClassName,
    id,
    emptyValue,
    phoneValueMode = "raw",
    kind = "text",
    onChange,
    onValueChange,
    onNumberChange,
    onBlur,
    ...restProps
  } = props
  const inputId = id ?? name
  const shellProps = pickFormFieldShellProps(props)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const inputProps = {
          ...(restProps as Omit<AppInputProps, "kind">),
          id: inputId,
          name: field.name,
          ref: field.ref,
          className: fieldClassName ?? (restProps as { className?: string }).className,
          value: field.value ?? "",
          disabled: shellProps.disabled,
          readOnly: shellProps.readOnly,
          "aria-invalid": fieldState.invalid || undefined,
          onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
            field.onBlur()
            onBlur?.(event)
          },
        }

        return (
          <FormFieldShell {...shellProps} error={error} htmlFor={inputId}>
            {kind === "number" ? (
              <AppInput
                {...inputProps}
                kind="number"
                onNumberChange={(value) => {
                  field.onChange(value ?? emptyValue ?? null)
                  onNumberChange?.(value)
                }}
              />
            ) : kind === "phone" ? (
              <AppInput
                {...inputProps}
                kind="phone"
                onValueChange={(maskedValue, rawValue) => {
                  const nextValue = phoneValueMode === "raw" ? rawValue : maskedValue
                  field.onChange(nextValue)
                  onValueChange?.(nextValue, rawValue, maskedValue)
                }}
              />
            ) : kind === "date" ? (
              <AppInput
                {...inputProps}
                kind="date"
                onValueChange={(value) => {
                  field.onChange(value || emptyValue || "")
                  onValueChange?.(value)
                }}
              />
            ) : kind === "search" ? (
              <AppInput
                {...inputProps}
                kind="search"
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            ) : kind === "password" ? (
              <AppInput
                {...inputProps}
                kind="password"
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            ) : kind === "clearable" ? (
              <AppInput
                {...inputProps}
                kind="clearable"
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            ) : (
              <AppInput
                {...inputProps}
                kind="text"
                onChange={(event) => {
                  field.onChange(event)
                  onChange?.(event)
                }}
              />
            )}
          </FormFieldShell>
        )
      }}
    />
  )
}

export { FormAppInput }
