/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { DateInput, type DateInputProps } from "@/components/inputs/date-input"
import { NumberInput, type NumberInputProps } from "@/components/inputs/number-input"
import {
  PhoneInput,
  formatPhoneDigits,
  type PhoneInputProps,
} from "@/components/inputs/phone-input"
import { PasswordInput, type PasswordInputProps } from "@/components/inputs/password-input"
import { SearchInput, type SearchInputProps } from "@/components/inputs/search-input"
import {
  FormFieldShell,
  type FormFieldShellControlProps,
} from "@/components/form/form-field-shell"
import { Input } from "@/components/ui/input"

export type FormInputKind = "text" | "search" | "password" | "number" | "phone" | "date"
export type FormInputPhoneInputValueMode = "raw" | "masked"

type FormControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FormFieldShellControlProps & {
  control: Control<TFieldValues>
  name: TName
  fieldClassName?: string
  id?: string
}

export type FormTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<typeof Input>, "name" | "value" | "defaultValue"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind?: "text"
    transformIn?: (value: unknown) => string | number | readonly string[] | undefined
    transformOut?: (event: React.ChangeEvent<HTMLInputElement>) => unknown
  }

export type FormInputSearchVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SearchInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "search"
    onValueChange?: (value: string) => void
  }

export type FormInputPasswordVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<PasswordInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "password"
    onValueChange?: (value: string) => void
  }

export type FormInputNumberVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<NumberInputProps, "name" | "value" | "defaultValue" | "onNumberChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "number"
    emptyValue?: unknown
    onNumberChange?: (value: number | null) => void
  }

export type FormInputPhoneVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<PhoneInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "phone"
    valueMode?: FormInputPhoneInputValueMode
    onValueChange?: (value: string, rawValue: string, maskedValue: string) => void
  }

export type FormInputDateVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DateInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "date"
    emptyValue?: unknown
    onValueChange?: (value: string) => void
  }

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | FormTextInputProps<TFieldValues, TName>
  | FormInputSearchVariantProps<TFieldValues, TName>
  | FormInputPasswordVariantProps<TFieldValues, TName>
  | FormInputNumberVariantProps<TFieldValues, TName>
  | FormInputPhoneVariantProps<TFieldValues, TName>
  | FormInputDateVariantProps<TFieldValues, TName>

function buildShellProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormInputProps<TFieldValues, TName>) {
  return {
    label: props.label,
    description: props.description,
    required: props.required,
    className: props.className,
    layout: props.layout,
    descriptionPosition: props.descriptionPosition,
    labelAction: props.labelAction,
    requiredIndicator: props.requiredIndicator,
    errorIcon: props.errorIcon,
    showErrorIcon: props.showErrorIcon,
    disabled: props.disabled,
    readOnly: props.readOnly,
    labelClassName: props.labelClassName,
    labelRowClassName: props.labelRowClassName,
    descriptionClassName: props.descriptionClassName,
    errorClassName: props.errorClassName,
    contentClassName: props.contentClassName,
  } satisfies FormFieldShellControlProps
}

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormInputProps<TFieldValues, TName>) {
  const inputId = props.id ?? props.name
  const shellProps = buildShellProps(props)
  const kind = props.kind ?? "text"
  const resolvedFieldClassName = props.fieldClassName ?? "w-full"

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message

        if (kind === "search") {
          const {
            control: _control,
            name: _name,
            label: _label,
            description: _description,
            required: _required,
            className: _className,
            layout: _layout,
            descriptionPosition: _descriptionPosition,
            labelAction: _labelAction,
            requiredIndicator: _requiredIndicator,
            errorIcon: _errorIcon,
            showErrorIcon: _showErrorIcon,
            disabled,
            readOnly: _readOnly,
            labelClassName: _labelClassName,
            labelRowClassName: _labelRowClassName,
            descriptionClassName: _descriptionClassName,
            errorClassName: _errorClassName,
            contentClassName: _contentClassName,
            fieldClassName,
            id,
            kind: _kind,
            onValueChange,
            onBlur,
            ...searchProps
          } = props as FormInputSearchVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell {...shellProps} error={error} htmlFor={id ?? inputId}>
              <SearchInput
                {...searchProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                disabled={disabled}
                inputClassName={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                onBlur={(event) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "password") {
          const {
            control: _control,
            name: _name,
            label: _label,
            description: _description,
            required: _required,
            className: _className,
            layout: _layout,
            descriptionPosition: _descriptionPosition,
            labelAction: _labelAction,
            requiredIndicator: _requiredIndicator,
            errorIcon: _errorIcon,
            showErrorIcon: _showErrorIcon,
            disabled,
            readOnly: _readOnly,
            labelClassName: _labelClassName,
            labelRowClassName: _labelRowClassName,
            descriptionClassName: _descriptionClassName,
            errorClassName: _errorClassName,
            contentClassName: _contentClassName,
            fieldClassName,
            id,
            kind: _kind,
            onValueChange,
            onBlur,
            ...passwordProps
          } = props as FormInputPasswordVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell {...shellProps} error={error} htmlFor={id ?? inputId}>
              <PasswordInput
                {...passwordProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                disabled={disabled}
                inputClassName={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                onBlur={(event) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "number") {
          const {
            control: _control,
            name: _name,
            label: _label,
            description: _description,
            required: _required,
            className: _className,
            layout: _layout,
            descriptionPosition: _descriptionPosition,
            labelAction: _labelAction,
            requiredIndicator: _requiredIndicator,
            errorIcon: _errorIcon,
            showErrorIcon: _showErrorIcon,
            disabled,
            readOnly: _readOnly,
            labelClassName: _labelClassName,
            labelRowClassName: _labelRowClassName,
            descriptionClassName: _descriptionClassName,
            errorClassName: _errorClassName,
            contentClassName: _contentClassName,
            fieldClassName,
            id,
            kind: _kind,
            emptyValue = null,
            onNumberChange,
            onBlur,
            ...numberProps
          } = props as FormInputNumberVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell {...shellProps} error={error} htmlFor={id ?? inputId}>
              <NumberInput
                {...numberProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                disabled={disabled}
                readOnly={props.readOnly}
                className={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                onBlur={(event) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onNumberChange={(value) => {
                  field.onChange(value ?? emptyValue)
                  onNumberChange?.(value)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "phone") {
          const {
            control: _control,
            name: _name,
            label: _label,
            description: _description,
            required: _required,
            className: _className,
            layout: _layout,
            descriptionPosition: _descriptionPosition,
            labelAction: _labelAction,
            requiredIndicator: _requiredIndicator,
            errorIcon: _errorIcon,
            showErrorIcon: _showErrorIcon,
            disabled,
            readOnly: _readOnly,
            labelClassName: _labelClassName,
            labelRowClassName: _labelRowClassName,
            descriptionClassName: _descriptionClassName,
            errorClassName: _errorClassName,
            contentClassName: _contentClassName,
            fieldClassName,
            id,
            kind: _kind,
            valueMode = "raw",
            countryCode = "+998",
            maxDigits = 12,
            onValueChange,
            onBlur,
            ...phoneProps
          } = props as FormInputPhoneVariantProps<TFieldValues, TName>

          const fieldValue = field.value == null ? "" : String(field.value)
          const displayValue =
            valueMode === "raw" ? formatPhoneDigits(fieldValue, countryCode, maxDigits) : fieldValue

          return (
            <FormFieldShell {...shellProps} error={error} htmlFor={id ?? inputId}>
              <PhoneInput
                {...phoneProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={displayValue}
                disabled={disabled}
                readOnly={props.readOnly}
                countryCode={countryCode}
                maxDigits={maxDigits}
                className={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                onBlur={(event) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(maskedValue, rawValue) => {
                  const nextValue = valueMode === "raw" ? rawValue : maskedValue
                  field.onChange(nextValue)
                  onValueChange?.(nextValue, rawValue, maskedValue)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "date") {
          const {
            control: _control,
            name: _name,
            label: _label,
            description: _description,
            required: _required,
            className: _className,
            layout: _layout,
            descriptionPosition: _descriptionPosition,
            labelAction: _labelAction,
            requiredIndicator: _requiredIndicator,
            errorIcon: _errorIcon,
            showErrorIcon: _showErrorIcon,
            disabled,
            readOnly: _readOnly,
            labelClassName: _labelClassName,
            labelRowClassName: _labelRowClassName,
            descriptionClassName: _descriptionClassName,
            errorClassName: _errorClassName,
            contentClassName: _contentClassName,
            fieldClassName,
            id,
            kind: _kind,
            emptyValue = "",
            onValueChange,
            onBlur,
            ...dateProps
          } = props as FormInputDateVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell {...shellProps} error={error} htmlFor={id ?? inputId}>
              <DateInput
                {...dateProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                disabled={disabled}
                readOnly={props.readOnly}
                className={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                onBlur={(event) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(value) => {
                  field.onChange(value || emptyValue)
                  onValueChange?.(value)
                }}
              />
            </FormFieldShell>
          )
        }

        const {
          control: _control,
          name: _name,
          label: _label,
          description: _description,
          required: _required,
          className: _className,
          layout: _layout,
          descriptionPosition: _descriptionPosition,
          labelAction: _labelAction,
          requiredIndicator: _requiredIndicator,
          errorIcon: _errorIcon,
          showErrorIcon: _showErrorIcon,
          disabled,
          readOnly,
          labelClassName: _labelClassName,
          labelRowClassName: _labelRowClassName,
          descriptionClassName: _descriptionClassName,
          errorClassName: _errorClassName,
          contentClassName: _contentClassName,
          fieldClassName,
          transformIn,
          transformOut,
          id,
          kind: _kind,
          onChange,
          onBlur,
          ...inputProps
        } = props as FormTextInputProps<TFieldValues, TName>

        return (
          <FormFieldShell {...shellProps} error={error} htmlFor={id ?? inputId}>
            <Input
              {...inputProps}
              id={id ?? inputId}
              ref={field.ref}
              name={field.name}
              value={transformIn ? transformIn(field.value) : field.value ?? ""}
              disabled={disabled}
              readOnly={readOnly}
              onBlur={(event) => {
                field.onBlur()
                onBlur?.(event)
              }}
              onChange={(event) => {
                field.onChange(transformOut ? transformOut(event) : event)
                onChange?.(event)
              }}
              aria-invalid={fieldState.invalid || undefined}
              className={fieldClassName ?? resolvedFieldClassName}
            />
          </FormFieldShell>
        )
      }}
    />
  )
}

export { FormInput }
