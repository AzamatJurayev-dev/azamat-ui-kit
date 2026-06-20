import {
  FormInput,
  type FormInputPhoneVariantProps as BaseFormPhoneInputProps,
  type FormPhoneInputValueMode,
} from "@/components/form/form-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type { FormPhoneInputValueMode }

export type FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<BaseFormPhoneInputProps<TFieldValues, TName>, "kind">

function FormPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormPhoneInputProps<TFieldValues, TName>) {
  return <FormInput {...props} kind="phone" />
}

export { FormPhoneInput }
