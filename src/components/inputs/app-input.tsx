import * as React from "react"

import { ClearableInput, type ClearableInputProps } from "@/components/inputs/clearable-input"
import { DateInput, type DateInputProps } from "@/components/inputs/date-input"
import { NumberInput, type NumberInputProps } from "@/components/inputs/number-input"
import { PasswordInput, type PasswordInputProps } from "@/components/inputs/password-input"
import { PhoneInput, type PhoneInputProps } from "@/components/inputs/phone-input"
import { SearchInput, type SearchInputProps } from "@/components/inputs/search-input"
import { InputDecorator, type InputDecoratorProps } from "@/components/inputs/input-decorator"

export type AppInputKind = "text" | "clearable" | "search" | "password" | "number" | "phone" | "date"

export type AppTextInputProps = InputDecoratorProps & {
  kind?: "text"
}

export type AppClearableInputProps = ClearableInputProps & {
  kind: "clearable"
}

export type AppSearchInputProps = SearchInputProps & {
  kind: "search"
}

export type AppPasswordInputProps = PasswordInputProps & {
  kind: "password"
}

export type AppNumberInputProps = NumberInputProps & {
  kind: "number"
}

export type AppPhoneInputProps = PhoneInputProps & {
  kind: "phone"
}

export type AppDateInputProps = DateInputProps & {
  kind: "date"
}

export type AppInputProps =
  | AppTextInputProps
  | AppClearableInputProps
  | AppSearchInputProps
  | AppPasswordInputProps
  | AppNumberInputProps
  | AppPhoneInputProps
  | AppDateInputProps

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => {
  if (props.kind === "search") {
    const { kind: _kind, ...inputProps } = props
    return <SearchInput ref={ref} {...inputProps} />
  }

  if (props.kind === "password") {
    const { kind: _kind, ...inputProps } = props
    return <PasswordInput ref={ref} {...inputProps} />
  }

  if (props.kind === "number") {
    const { kind: _kind, ...inputProps } = props
    return <NumberInput ref={ref} {...inputProps} />
  }

  if (props.kind === "phone") {
    const { kind: _kind, ...inputProps } = props
    return <PhoneInput ref={ref} {...inputProps} />
  }

  if (props.kind === "date") {
    const { kind: _kind, ...inputProps } = props
    return <DateInput ref={ref} {...inputProps} />
  }

  if (props.kind === "clearable") {
    const { kind: _kind, ...inputProps } = props
    return <ClearableInput ref={ref} {...inputProps} />
  }

  const { kind: _kind, ...inputProps } = props
  return <InputDecorator ref={ref} {...inputProps} />
})
AppInput.displayName = "AppInput"

const UniversalInput = AppInput

export { AppInput, UniversalInput }
