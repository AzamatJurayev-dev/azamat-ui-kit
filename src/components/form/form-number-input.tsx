import {
  FormInput,
  type FormInputNumberVariantProps as BaseFormNumberInputProps,
} from "@/components/form/form-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<BaseFormNumberInputProps<TFieldValues, TName>, "kind">

function FormNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormNumberInputProps<TFieldValues, TName>) {
  return <FormInput {...props} kind="number" />
}

export { FormNumberInput }
