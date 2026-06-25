import {
  FormInput,
  type FormInputSearchVariantProps,
} from "@/components/form/form-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormInputSearchVariantProps<TFieldValues, TName>, "kind">

/**
 * @deprecated Use {@link FormInput} with `kind="search"` instead.
 */
function FormSearchInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormSearchInputProps<TFieldValues, TName>) {
  return <FormInput {...props} kind="search" />
}

export { FormSearchInput }
