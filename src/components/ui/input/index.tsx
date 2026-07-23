"use client"

import * as React from "react"

import { InputPrimitive, type InputPrimitiveProps } from "./primitive"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./group"
import { ClearableInput, type ClearableInputProps } from "./clearable"
import { DateInput, type DateInputProps } from "./date"
import { DateRangeInput, type DateRangeInputProps } from "./date-range"
import { InputDecorator } from "./decorator"
import { MaskedInput, type MaskedInputProps } from "./masked"
import { MoneyInput, type MoneyInputProps } from "./money"
import { PasswordInput, type PasswordInputProps } from "./password"
import { PhoneInput, type PhoneInputProps } from "./phone"
import { QuantityInput, type QuantityInputProps } from "./quantity"
import { SearchInput, type SearchInputProps } from "./search"
import { cn } from "@/lib/utils"

export type InputKind =
  | "text"
  | "clearable"
  | "search"
  | "password"
  | "phone"
  | "money"
  | "quantity"
  | "masked"
  | "date"
  | "date-range"

export type InputTextProps = Omit<InputPrimitiveProps, "value"> & {
  kind?: "text"
  value?: string | number | readonly string[] | null
  onValueChange?: (value: string) => void
  onDebouncedValueChange?: (value: string) => void
  leading?: React.ReactNode
  trailing?: React.ReactNode
  trailingAction?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  clearLabel?: string
  clearOnEscape?: boolean
  focusAfterClear?: boolean
  replaceTrailingWhenClear?: boolean
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  showCharacterCount?: boolean
  countFormatter?: (currentLength: number, maxLength?: number) => React.ReactNode
  wrapperClassName?: string
  inputClassName?: string
  helperClassName?: string
  leadingPointerEvents?: boolean
  trailingPointerEvents?: boolean
  searchIcon?: React.ReactNode
  loading?: boolean
  loadingLabel?: string
  resultCount?: number
  shortcut?: React.ReactNode
  debounceMs?: number
  showMetaOnClear?: boolean
}

export type InputClearableProps = Omit<ClearableInputProps, "kind"> & {
  kind: "clearable"
}

export type InputSearchProps = Omit<SearchInputProps, "kind"> & {
  kind: "search"
}

export type InputPasswordProps = Omit<PasswordInputProps, "kind"> & {
  kind: "password"
}

export type InputPhoneProps = Omit<PhoneInputProps, "kind"> & {
  kind: "phone"
}

export type InputMoneyProps = Omit<MoneyInputProps, "kind"> & {
  kind: "money"
}

export type InputQuantityProps = Omit<QuantityInputProps, "kind"> & {
  kind: "quantity"
}

export type InputMaskedProps = Omit<MaskedInputProps, "kind"> & {
  kind: "masked"
}

export type InputDateProps = Omit<DateInputProps, "kind"> & {
  kind: "date"
}

export type InputDateRangeProps = Omit<DateRangeInputProps, "onChange" | "onValueChange" | "value"> & {
  kind: "date-range"
  onValueChange?: (value: { from?: string; to?: string }) => void
  value?: DateRangeInputProps["value"]
}

export type InputProps =
  | InputTextProps
  | InputClearableProps
  | InputSearchProps
  | InputPasswordProps
  | InputPhoneProps
  | InputMoneyProps
  | InputQuantityProps
  | InputMaskedProps
  | InputDateProps
  | InputDateRangeProps

function getInputTextLength(value: InputTextProps["value"] | InputTextProps["defaultValue"]) {
  if (typeof value === "string") return value.length
  if (typeof value === "number") return String(value).length
  if (Array.isArray(value)) return value.join("").length
  return 0
}

function shouldRenderSearchInput(props: InputTextProps) {
  return (
    props.type === "search" ||
    props.searchIcon !== undefined ||
    props.loading !== undefined ||
    props.loadingLabel !== undefined ||
    props.resultCount !== undefined ||
    props.shortcut !== undefined ||
    props.debounceMs !== undefined ||
    props.showMetaOnClear !== undefined ||
    props.onDebouncedValueChange !== undefined
  )
}

const Input = React.forwardRef<HTMLInputElement | HTMLDivElement, InputProps>((props, ref) => {
  const kind = props.kind ?? "text"
  const textDefaultValue = (props as InputTextProps).defaultValue
  const [uncontrolledLength, setUncontrolledLength] = React.useState(() => getInputTextLength(textDefaultValue))

  if (kind === "search") {
    return (
      <SearchInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<SearchInputProps, "kind">)}
      />
    )
  }

  if (kind === "password") {
    return (
      <PasswordInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<PasswordInputProps, "kind">)}
      />
    )
  }

  if (kind === "phone") {
    return (
      <PhoneInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<PhoneInputProps, "kind">)}
      />
    )
  }

  if (kind === "money") {
    return (
      <MoneyInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<MoneyInputProps, "kind">)}
      />
    )
  }

  if (kind === "quantity") {
    return (
      <QuantityInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<QuantityInputProps, "kind">)}
      />
    )
  }

  if (kind === "masked") {
    return (
      <MaskedInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<MaskedInputProps, "kind">)}
      />
    )
  }

  if (kind === "date") {
    return (
      <DateInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<DateInputProps, "kind">)}
      />
    )
  }

  if (kind === "date-range") {
    return <DateRangeInput {...(props as Omit<InputDateRangeProps, "kind">)} />
  }

  if (kind === "clearable") {
    return (
      <ClearableInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<ClearableInputProps, "kind">)}
      />
    )
  }

  const inputProps = props as Omit<InputTextProps, "kind">

  if (shouldRenderSearchInput(inputProps)) {
    const {
      leading,
      searchIcon,
      helperText,
      errorText,
      showCharacterCount,
      countFormatter,
      helperClassName,
      inputClassName,
      ...searchInputProps
    } = inputProps
    const searchValue: SearchInputProps["value"] = Array.isArray(inputProps.value)
      ? inputProps.value.join(" ")
      : inputProps.value == null || typeof inputProps.value === "string" || typeof inputProps.value === "number"
        ? inputProps.value
        : String(inputProps.value)
    const searchDefaultValue: SearchInputProps["defaultValue"] = Array.isArray(inputProps.defaultValue)
      ? inputProps.defaultValue.join(" ")
      : inputProps.defaultValue == null ||
          typeof inputProps.defaultValue === "string" ||
          typeof inputProps.defaultValue === "number"
        ? inputProps.defaultValue
        : String(inputProps.defaultValue)

    const searchInput = (
      <SearchInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        searchIcon={searchIcon ?? leading}
        inputClassName={inputClassName}
        {...searchInputProps}
        value={searchValue}
        defaultValue={searchDefaultValue}
      />
    )

    if (!helperText && !errorText && !showCharacterCount) {
      return searchInput
    }

    const currentLength = getInputTextLength(inputProps.value ?? inputProps.defaultValue)

    return (
      <div data-slot="input-field" className="grid gap-1.5">
        {searchInput}
        <div data-slot="input-meta" className="flex items-start justify-between gap-3 px-1">
          <div
            data-slot="input-helper"
            data-invalid={Boolean(errorText) || undefined}
            className={cn(
              "min-w-0",
              helperClassName
            )}
          >
            {errorText ?? helperText}
          </div>
          {showCharacterCount ? (
            <div
              data-slot="input-count"
              data-invalid={Boolean(errorText) || undefined}
              className="shrink-0 tabular-nums"
            >
              {countFormatter?.(currentLength, inputProps.maxLength) ??
                (typeof inputProps.maxLength === "number"
                  ? `${currentLength}/${inputProps.maxLength}`
                  : currentLength)}
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  const {
    value,
    defaultValue,
    leading,
    trailing,
    trailingAction,
    clearable = false,
    onValueChange,
    onClear,
    clearLabel,
    clearOnEscape,
    focusAfterClear,
    replaceTrailingWhenClear,
    helperText,
    errorText,
    showCharacterCount = false,
    countFormatter,
    wrapperClassName,
    inputClassName,
    helperClassName,
    leadingPointerEvents = false,
    trailingPointerEvents = true,
    onChange,
    maxLength,
    className,
    ...restInputProps
  } = inputProps
  const isControlled = value !== undefined
  const currentLength = isControlled ? getInputTextLength(value) : uncontrolledLength
  const helperMessage = errorText ?? helperText

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isControlled) {
      setUncontrolledLength(event.target.value.length)
    }
    onChange?.(event)
  }

  const handleTextValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handleChange(event)
    onValueChange?.(event.target.value)
  }

  const textInput = clearable ? (
    <ClearableInput
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      value={value as string | number | null | undefined}
      defaultValue={value === undefined ? (defaultValue as string | number | undefined) : undefined}
      type={restInputProps.type ?? "text"}
      leadingIcon={leading}
      trailing={trailing}
      trailingAction={trailingAction}
      clearable={clearable}
      onChange={handleChange}
      onValueChange={onValueChange}
      onClear={onClear}
      clearLabel={clearLabel}
      clearOnEscape={clearOnEscape}
      focusAfterClear={focusAfterClear}
      replaceTrailingWhenClear={replaceTrailingWhenClear}
      wrapperClassName={wrapperClassName}
      inputClassName={inputClassName}
      className={className}
      maxLength={maxLength}
      {...(restInputProps as Omit<ClearableInputProps, "value" | "defaultValue" | "type" | "onChange" | "onValueChange">)}
    />
  ) : leading || trailing || trailingAction ? (
    <InputDecorator
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      value={value ?? undefined}
      defaultValue={value === undefined ? defaultValue : undefined}
      type={restInputProps.type ?? "text"}
      leading={leading}
      trailing={trailing}
      trailingAction={trailingAction}
      leadingPointerEvents={leadingPointerEvents}
      trailingPointerEvents={trailingPointerEvents}
      wrapperClassName={wrapperClassName}
      inputClassName={inputClassName}
      className={className}
      onChange={handleTextValueChange}
      maxLength={maxLength}
      {...(restInputProps as React.ComponentProps<typeof InputDecorator>)}
    />
  ) : (
    <InputPrimitive
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      value={value ?? undefined}
      defaultValue={value === undefined ? defaultValue : undefined}
      type={restInputProps.type ?? "text"}
      className={cn(inputClassName, className)}
      onChange={handleTextValueChange}
      maxLength={maxLength}
      {...(restInputProps as React.ComponentProps<typeof InputPrimitive>)}
    />
  )

  if (!helperMessage && !showCharacterCount) {
    return textInput
  }

  return (
    <div data-slot="input-field" className="grid gap-1.5">
      {textInput}
      <div
        data-slot="input-meta"
        className="flex items-start justify-between gap-3 px-1"
      >
        <div
          data-slot="input-helper"
          data-invalid={Boolean(errorText) || undefined}
          className={cn("min-w-0", helperClassName)}
        >
          {helperMessage}
        </div>
        {showCharacterCount ? (
          <div
            data-slot="input-count"
            data-invalid={Boolean(errorText) || undefined}
            className="shrink-0 tabular-nums"
          >
            {countFormatter?.(currentLength, maxLength) ??
              (typeof maxLength === "number" ? `${currentLength}/${maxLength}` : currentLength)}
          </div>
        ) : null}
      </div>
    </div>
  )
})
Input.displayName = "Input"

export {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
}
