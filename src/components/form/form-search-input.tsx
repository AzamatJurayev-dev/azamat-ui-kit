import {
  FormInput,
  type FormInputSearchVariantProps as BaseFormSearchInputProps,
} from "@/components/form/form-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<BaseFormSearchInputProps<TFieldValues, TName>, "kind">

function FormSearchInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormSearchInputProps<TFieldValues, TName>) {
  return <FormInput {...props} kind="search" />
}

export { FormSearchInput }
