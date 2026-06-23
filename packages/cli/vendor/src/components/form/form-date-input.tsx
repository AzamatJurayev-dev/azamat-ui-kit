import {
  FormInput,
  type FormInputDateVariantProps as BaseFormDateInputProps,
} from "@/components/form/form-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormDateInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<BaseFormDateInputProps<TFieldValues, TName>, "kind">

function FormDateInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormDateInputProps<TFieldValues, TName>) {
  return <FormInput {...props} kind="date" />
}

export { FormDateInput }
