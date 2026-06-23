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

function omitKind<TProps extends { kind?: AppInputKind }>(props: TProps): Omit<TProps, "kind"> {
  const { kind, ...inputProps } = props
  void kind
  return inputProps
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, ref) => {
  if (props.kind === "search") {
    return <SearchInput ref={ref} {...omitKind(props)} />
  }

  if (props.kind === "password") {
    return <PasswordInput ref={ref} {...omitKind(props)} />
  }

  if (props.kind === "number") {
    return <NumberInput ref={ref} {...omitKind(props)} />
  }

  if (props.kind === "phone") {
    return <PhoneInput ref={ref} {...omitKind(props)} />
  }

  if (props.kind === "date") {
    return <DateInput ref={ref} {...omitKind(props)} />
  }

  if (props.kind === "clearable") {
    return <ClearableInput ref={ref} {...omitKind(props)} />
  }

  return <InputDecorator ref={ref} {...omitKind(props)} />
})
AppInput.displayName = "AppInput"

const UniversalInput = AppInput

export { AppInput, UniversalInput }
