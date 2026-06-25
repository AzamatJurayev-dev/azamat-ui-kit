import {
  FormInput,
  type FormInputPhoneInputValueMode,
  type FormInputPhoneVariantProps,
} from "@/components/form/form-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormPhoneInputValueMode = FormInputPhoneInputValueMode
export type { FormInputPhoneInputValueMode }

export type FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormInputPhoneVariantProps<TFieldValues, TName>, "kind" | "valueMode"> & {
  valueMode?: FormInputPhoneInputValueMode
}

/**
 * @deprecated Use {@link FormInput} with `kind="phone"` instead.
 */
function FormPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormPhoneInputProps<TFieldValues, TName>) {
  const { valueMode, ...rest } = props
  return <FormInput {...rest} valueMode={valueMode} kind="phone" />
}

export { FormPhoneInput }
