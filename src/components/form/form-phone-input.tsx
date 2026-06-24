import {
  FormAppInput,
  type FormAppInputPhoneValueMode,
  type FormAppInputProps,
} from "@/components/form/form-app-input"
import type { FieldPath, FieldValues } from "react-hook-form"

import type { FormInputPhoneInputValueMode } from "@/components/form/form-input"

export type FormPhoneInputValueMode = FormAppInputPhoneValueMode
export type { FormInputPhoneInputValueMode, FormAppInputPhoneValueMode }

export type FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormAppInputProps<TFieldValues, TName>, "kind" | "phoneValueMode"> & {
  valueMode?: FormInputPhoneInputValueMode
}

function FormPhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormPhoneInputProps<TFieldValues, TName>) {
  const { valueMode, ...rest } = props
  return <FormAppInput {...rest} phoneValueMode={valueMode} kind="phone" />
}

export { FormPhoneInput }
