import {
  FormAppInput,
  type FormAppInputPhoneValueMode,
  type FormAppInputProps,
} from "@/components/form/form-app-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormPhoneInputValueMode = FormAppInputPhoneValueMode
export type { FormAppInputPhoneValueMode }

export type FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormAppInputProps<TFieldValues, TName>, "kind">

function FormPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormPhoneInputProps<TFieldValues, TName>) {
  return <FormAppInput {...props} kind="phone" />
}

export { FormPhoneInput }
