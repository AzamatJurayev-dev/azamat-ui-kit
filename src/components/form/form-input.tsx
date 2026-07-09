/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form"

import {
  DateRangeInput,
  type DateRangeInputProps,
  type DateRangeValue,
} from "@/components/inputs/date-range-input"
import { DateInput, type DateInputProps } from "@/components/inputs/date-input"
import { Input, type InputClearableProps, type InputSearchProps, type InputTextProps } from "@/components/ui/input"
import { MaskedInput, type MaskedInputProps } from "@/components/inputs/masked-input"
import { MoneyInput, type MoneyInputProps } from "@/components/inputs/money-input"
import { NumberInput, type NumberInputProps } from "@/components/inputs/number-input"
import {
  PhoneInput,
  formatPhoneDigits,
  type PhoneInputProps,
} from "@/components/inputs/phone-input"
import { QuantityInput, type QuantityInputProps } from "@/components/inputs/quantity-input"
import {
  FormFieldShell,
  type FormFieldShellControlProps,
  resolveFormFieldIds,
} from "@/components/form/form-field-shell"

export type FormInputKind =
  | "text"
  | "search"
  | "password"
  | "number"
  | "phone"
  | "date"
  | "date-range"
  | "clearable"
  | "masked"
  | "money"
  | "quantity"

export type FormInputPhoneInputValueMode = "raw" | "masked"
type TextInputElementChangeEvent = React.ChangeEvent<HTMLInputElement>

type FormTextInputControlProps = Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "defaultValue"
> & {
  onChange?: (event: TextInputElementChangeEvent) => void
}

type FormControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FormFieldShellControlProps & {
  control: Control<TFieldValues>
  name: TName
  rules?: RegisterOptions<TFieldValues, TName>
  fieldClassName?: string
  id?: string
}

export type FormTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormTextInputControlProps, "inputMode" | "autoComplete" | "autoCorrect" | "autoCapitalize" | "className" | "size"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind?: "text"
    transformIn?: (value: unknown) => string | number | readonly string[] | undefined
    transformOut?: (event: TextInputElementChangeEvent) => unknown
  }

export type FormInputSearchVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<InputSearchProps, "name" | "value" | "defaultValue" | "onValueChange" | "kind"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "search"
    onValueChange?: (value: string) => void
  }

export type FormInputPasswordVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<"input">, "name" | "value" | "defaultValue"> & {
  kind: "password"
  onValueChange?: (value: string) => void
  min?: never
  max?: never
} & FormControlledFieldProps<TFieldValues, TName>

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

export type FormInputDateRangeVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DateRangeInputProps, "name" | "value" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "date-range"
    onValueChange?: (value: DateRangeValue) => void
  }

export type FormInputClearableVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<InputClearableProps, "name" | "value" | "defaultValue" | "onValueChange" | "kind"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "clearable"
    emptyValue?: unknown
    onValueChange?: (value: string) => void
  }

export type FormInputMaskedVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<MaskedInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "masked"
    valueMode?: "masked" | "raw"
    onValueChange?: (maskedValue: string, rawValue: string) => void
  }

export type FormInputMoneyVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<MoneyInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "money"
    emptyValue?: unknown
    onValueChange?: (value: number | null, rawValue: string) => void
  }

export type FormInputQuantityVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<QuantityInputProps, "name" | "value" | "defaultValue" | "onValueChange"> &
  FormControlledFieldProps<TFieldValues, TName> & {
    kind: "quantity"
    emptyValue?: unknown
    onValueChange?: (value: number | null) => void
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
  | FormInputDateRangeVariantProps<TFieldValues, TName>
  | FormInputClearableVariantProps<TFieldValues, TName>
  | FormInputMaskedVariantProps<TFieldValues, TName>
  | FormInputMoneyVariantProps<TFieldValues, TName>
  | FormInputQuantityVariantProps<TFieldValues, TName>

type FormPasswordInputElement = React.ChangeEvent<HTMLInputElement>

type InputTextInputProps = Omit<InputTextProps, "kind">
function buildShellProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormInputProps<TFieldValues, TName>) {
  return {
    label: props.label,
    description: props.description,
    required: props.required,
    className: props.className,
    htmlFor: props.id ?? props.name,
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
      rules={props.rules}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const resolvedIds = resolveFormFieldIds(inputId, {
          description: props.description,
          error,
        })

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
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
              <Input
                {...(searchProps as Omit<InputSearchProps, "kind">)}
                type="search"
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                disabled={disabled}
                readOnly={props.readOnly}
                inputClassName={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(value: string) => {
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
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
              <Input
                {...(passwordProps as Omit<InputTextInputProps, "kind">)}
                type="password"
                id={id ?? inputId}
                ref={field.ref}
                name={field.name}
                value={field.value ?? ""}
                disabled={disabled}
                readOnly={props.readOnly}
                inputClassName={fieldClassName ?? resolvedFieldClassName}
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onChange={(event: FormPasswordInputElement) => {
                  const nextValue = event.currentTarget.value
                  field.onChange(nextValue)
                  onValueChange?.(nextValue)
                }}
                aria-invalid={fieldState.invalid || undefined}
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
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
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
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onNumberChange={(value: number | null) => {
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
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
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
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(maskedValue: string, rawValue: string) => {
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
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
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
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(value: string) => {
                  field.onChange(value || emptyValue)
                  onValueChange?.(value)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "clearable") {
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
            ...clearableProps
          } = props as FormInputClearableVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
              <Input
                {...(clearableProps as Omit<InputClearableProps, "kind">)}
                clearable
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                disabled={disabled}
                readOnly={props.readOnly}
                className={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(nextValue: string) => {
                  field.onChange(nextValue || emptyValue)
                  onValueChange?.(nextValue)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "masked") {
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
            onValueChange,
            onBlur,
            ...maskedProps
          } = props as FormInputMaskedVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
              <MaskedInput
                {...maskedProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={String(field.value ?? "")}
                disabled={disabled}
                readOnly={props.readOnly}
                className={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(maskedValue: string, rawValue: string) => {
                  const nextValue = valueMode === "raw" ? rawValue : maskedValue
                  field.onChange(nextValue)
                  onValueChange?.(maskedValue, rawValue)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "money") {
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
            onValueChange,
            onBlur,
            ...moneyProps
          } = props as FormInputMoneyVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
              <MoneyInput
                {...moneyProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value ?? null}
                disabled={disabled}
                readOnly={props.readOnly}
                className={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(nextValue: number | null, rawValue: string) => {
                  field.onChange(nextValue ?? emptyValue)
                  onValueChange?.(nextValue, rawValue)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "quantity") {
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
            onValueChange,
            onBlur,
            ...quantityProps
          } = props as FormInputQuantityVariantProps<TFieldValues, TName>

          return (
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
              <QuantityInput
                {...quantityProps}
                id={id ?? inputId}
                name={field.name}
                ref={field.ref}
                value={field.value}
                disabled={disabled}
                readOnly={props.readOnly}
                className={fieldClassName ?? resolvedFieldClassName}
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={resolvedIds.describedBy}
                aria-errormessage={error ? resolvedIds.errorId : undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
                }}
                onValueChange={(nextValue: number | null) => {
                  field.onChange(nextValue ?? emptyValue)
                  onValueChange?.(nextValue)
                }}
              />
            </FormFieldShell>
          )
        }

        if (kind === "date-range") {
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
            ...rangeProps
          } = props as FormInputDateRangeVariantProps<TFieldValues, TName>

          const currentValue = field.value as DateRangeValue | undefined

          return (
            <FormFieldShell
              {...shellProps}
              labelId={resolvedIds.labelId}
              descriptionId={resolvedIds.descriptionId}
              errorId={resolvedIds.errorId}
              error={error}
              htmlFor={id ?? inputId}
            >
              <DateRangeInput
                {...rangeProps}
                id={id ?? inputId}
                value={
                  currentValue && typeof currentValue === "object"
                    ? { from: currentValue.from, to: currentValue.to }
                    : { from: "", to: "" }
                }
                fromInputProps={{
                  ...(rangeProps.fromInputProps ?? {}),
                  disabled,
                  readOnly: props.readOnly,
                  "aria-describedby": resolvedIds.describedBy,
                  "aria-errormessage": error ? resolvedIds.errorId : undefined,
                }}
                toInputProps={{
                  ...(rangeProps.toInputProps ?? {}),
                  disabled,
                  readOnly: props.readOnly,
                  "aria-describedby": resolvedIds.describedBy,
                  "aria-errormessage": error ? resolvedIds.errorId : undefined,
                }}
                onValueChange={(value) => {
                  field.onChange(value)
                  onValueChange?.(value)
                }}
                aria-invalid={fieldState.invalid || undefined}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                  field.onBlur()
                  onBlur?.(event)
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
          <FormFieldShell
            {...shellProps}
            labelId={resolvedIds.labelId}
            descriptionId={resolvedIds.descriptionId}
            errorId={resolvedIds.errorId}
            error={error}
            htmlFor={id ?? inputId}
          >
            <Input
              {...(inputProps as Omit<InputTextInputProps, "kind">)}
              id={id ?? inputId}
              ref={field.ref}
              name={field.name}
              value={
                (transformIn ? transformIn(field.value) : field.value ?? "") as unknown as
                  InputTextInputProps["value"]
              }
              disabled={disabled}
              readOnly={readOnly}
              onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                field.onBlur()
                onBlur?.(event)
              }}
              onChange={(event: TextInputElementChangeEvent) => {
                field.onChange(transformOut ? transformOut(event) : event.target.value)
                onChange?.(event)
              }}
              aria-invalid={fieldState.invalid || undefined}
              aria-describedby={resolvedIds.describedBy}
              aria-errormessage={error ? resolvedIds.errorId : undefined}
              className={fieldClassName ?? resolvedFieldClassName}
            />
          </FormFieldShell>
        )
      }}
    />
  )
}

export { FormInput }
