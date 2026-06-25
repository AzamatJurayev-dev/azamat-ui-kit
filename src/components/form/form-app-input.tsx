import { type FieldPath, type FieldValues } from "react-hook-form"

import { AppInputKind } from "@/components/inputs/app-input"
import {
  FormInput,
  type FormInputDateVariantProps,
  type FormInputNumberVariantProps,
  type FormInputPasswordVariantProps,
  type FormInputPhoneVariantProps,
  type FormInputSearchVariantProps,
  type FormTextInputProps,
} from "@/components/form/form-input"

export type FormAppInputPhoneValueMode = "raw" | "masked"
type FormAppInputVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | Omit<FormTextInputProps<TFieldValues, TName>, "kind" | "onValueChange">
  | Omit<FormInputSearchVariantProps<TFieldValues, TName>, "kind">
  | Omit<FormInputPasswordVariantProps<TFieldValues, TName>, "kind">
  | Omit<FormInputNumberVariantProps<TFieldValues, TName>, "kind">
  | Omit<FormInputPhoneVariantProps<TFieldValues, TName>, "kind">
  | Omit<FormInputDateVariantProps<TFieldValues, TName>, "kind">

export type FormAppInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = FormAppInputVariantProps<TFieldValues, TName> & {
  kind?: AppInputKind
  phoneValueMode?: FormAppInputPhoneValueMode
}

/**
 * @deprecated Use {@link FormInput} directly.
 */
function FormAppInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: FormAppInputProps<TFieldValues, TName>
) {
  const { phoneValueMode = "raw", kind = "text", ...rest } = props

  const safeRest = rest as unknown as Record<string, unknown>

  if (kind === "text") {
    return <FormInput {...(safeRest as Omit<FormTextInputProps<TFieldValues, TName>, "kind">)} kind="text" />
  }

  if (kind === "search") {
    return (
      <FormInput
        {...(safeRest as Omit<FormInputSearchVariantProps<TFieldValues, TName>, "kind">)}
        kind="search"
      />
    )
  }

  if (kind === "password") {
    return (
      <FormInput
        {...(safeRest as Omit<FormInputPasswordVariantProps<TFieldValues, TName>, "kind">)}
        kind="password"
      />
    )
  }

  if (kind === "number") {
    return (
      <FormInput
        {...(safeRest as Omit<FormInputNumberVariantProps<TFieldValues, TName>, "kind">)}
        kind="number"
      />
    )
  }

  if (kind === "phone") {
    return (
      <FormInput
        {...(safeRest as Omit<FormInputPhoneVariantProps<TFieldValues, TName>, "kind">)}
        kind="phone"
        valueMode={phoneValueMode}
      />
    )
  }

  if (kind === "date") {
    return (
      <FormInput
        {...(safeRest as Omit<FormInputDateVariantProps<TFieldValues, TName>, "kind">)}
        kind="date"
      />
    )
  }

  if (kind === "date-range" || kind === "masked" || kind === "clearable" || kind === "money" || kind === "quantity") {
    return <FormInput {...(safeRest as Omit<FormTextInputProps<TFieldValues, TName>, "kind">)} kind="text" />
  }

  return <FormInput {...(safeRest as Omit<FormTextInputProps<TFieldValues, TName>, "kind">)} kind="text" />
}

export { FormAppInput }
