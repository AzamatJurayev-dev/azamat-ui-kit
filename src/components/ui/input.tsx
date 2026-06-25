import * as React from "react"

import { InputPrimitive, type InputPrimitiveProps } from "@/components/ui/input-primitive"
import { ClearableInput, type ClearableInputProps } from "@/components/inputs/clearable-input"
import { DateInput, type DateInputProps } from "@/components/inputs/date-input"
import { DateRangeInput, type DateRangeInputProps } from "@/components/inputs/date-range-input"
import { MoneyInput, type MoneyInputProps } from "@/components/inputs/money-input"
import { MaskedInput, type MaskedInputProps } from "@/components/inputs/masked-input"
import { NumberInput, type NumberInputProps } from "@/components/inputs/number-input"
import { PasswordInput, type PasswordInputProps } from "@/components/inputs/password-input"
import { PhoneInput, type PhoneInputProps } from "@/components/inputs/phone-input"
import { QuantityInput, type QuantityInputProps } from "@/components/inputs/quantity-input"
import { SearchInput, type SearchInputProps } from "@/components/inputs/search-input"

export type InputKind =
  | "text"
  | "clearable"
  | "search"
  | "password"
  | "number"
  | "phone"
  | "money"
  | "quantity"
  | "masked"
  | "date"
  | "date-range"

export type InputTextProps = Omit<InputPrimitiveProps, "value"> & {
  kind?: "text"
  value?: string | number | readonly string[] | null
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

export type InputNumberProps = Omit<NumberInputProps, "kind"> & {
  kind: "number"
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
  | InputNumberProps
  | InputPhoneProps
  | InputMoneyProps
  | InputQuantityProps
  | InputMaskedProps
  | InputDateProps
  | InputDateRangeProps

const Input = React.forwardRef<HTMLInputElement | HTMLDivElement, InputProps>((props, ref) => {
  const kind = props.kind ?? "text"

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

  if (kind === "number") {
    return (
      <NumberInput
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        {...(props as Omit<NumberInputProps, "kind">)}
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

  return (
    <InputPrimitive
      ref={ref as React.ForwardedRef<HTMLInputElement>}
      value={inputProps.value ?? ""}
      type={inputProps.type ?? "text"}
      {...(inputProps as React.ComponentProps<typeof InputPrimitive>)}
    />
  )
})
Input.displayName = "Input"

export { Input }
