import * as React from "react"
import { Controller, type FieldPath, type FieldValues } from "react-hook-form"

import {
  AppInput,
  type AppClearableInputProps,
  type AppDateInputProps,
  type AppInputKind,
  type AppInputProps,
  type AppNumberInputProps,
  type AppPasswordInputProps,
  type AppPhoneInputProps,
  type AppSearchInputProps,
  type AppTextInputProps,
} from "@/components/inputs/app-input"
import { FormFieldShell } from "@/components/form/form-field-shell"
import {
  pickFormFieldShellProps,
  splitFormControlledProps,
  type FormControlledFieldProps,
} from "@/components/form/form-field-utils"

type DistributiveOmit<TValue, TKeys extends keyof never | string | number | symbol> = TValue extends unknown
  ? Omit<TValue, TKeys>
  : never

export type FormAppInputPhoneValueMode = "raw" | "masked"

export type FormAppInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = FormControlledFieldProps<TFieldValues, TName> &
  DistributiveOmit<AppInputProps, "name" | "value" | "defaultValue" | "onChange" | "onValueChange" | "onNumberChange"> & {
    kind?: AppInputKind
    emptyValue?: unknown
    phoneValueMode?: FormAppInputPhoneValueMode
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onValueChange?: (...values: string[]) => void
    onNumberChange?: (value: number | null) => void
  }

function stripFormOnlyProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormAppInputProps<TFieldValues, TName>) {
  const { inputProps } = splitFormControlledProps(props as FormControlledFieldProps<FieldValues, FieldPath<FieldValues>>)
  delete inputProps.emptyValue
  delete inputProps.phoneValueMode
  delete inputProps.onNumberChange
  delete inputProps.onValueChange
  delete inputProps.onChange
  return inputProps
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
  } = props
  const inputId = id ?? name
  const shellProps = pickFormFieldShellProps(props)
  const externalInputProps = stripFormOnlyProps(props)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const inputProps = {
          ...externalInputProps,
          id: inputId,
          name: field.name,
          ref: field.ref,
          className: fieldClassName ?? (externalInputProps as { className?: string }).className,
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
                {...(inputProps as Omit<AppNumberInputProps, "kind">)}
                kind="number"
                onNumberChange={(value) => {
                  field.onChange(value ?? emptyValue ?? null)
                  onNumberChange?.(value)
                }}
              />
            ) : kind === "phone" ? (
              <AppInput
                {...(inputProps as Omit<AppPhoneInputProps, "kind">)}
                kind="phone"
                onValueChange={(maskedValue, rawValue) => {
                  const nextValue = phoneValueMode === "raw" ? rawValue : maskedValue
                  field.onChange(nextValue)
                  onValueChange?.(nextValue, rawValue, maskedValue)
                }}
              />
            ) : kind === "date" ? (
              <AppInput
                {...(inputProps as Omit<AppDateInputProps, "kind">)}
                kind="date"
                onValueChange={(value) => {
                  field.onChange(value || emptyValue || "")
                  onValueChange?.(value)
                }}
              />
            ) : kind === "search" ? (
              <AppInput
                {...(inputProps as Omit<AppSearchInputProps, "kind">)}
                kind="search"
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            ) : kind === "password" ? (
              <AppInput
                {...(inputProps as Omit<AppPasswordInputProps, "kind">)}
                kind="password"
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            ) : kind === "clearable" ? (
              <AppInput
                {...(inputProps as Omit<AppClearableInputProps, "kind">)}
                kind="clearable"
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            ) : (
              <AppInput
                {...(inputProps as Omit<AppTextInputProps, "kind">)}
                kind="text"
                onChange={(event) => {
                  field.onChange(event.target.value)
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
