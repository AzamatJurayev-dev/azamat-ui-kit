import {
  FormInput,
  type FormInputNumberVariantProps,
} from "@/components/form/form-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormInputNumberVariantProps<TFieldValues, TName>, "kind" | "step" | "max" | "min"> & {
  step?: number
  min?: number
  max?: number
}

/**
 * @deprecated Use {@link FormInput} with `kind="number"` instead.
 */
function FormNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormNumberInputProps<TFieldValues, TName>) {
  return <FormInput {...props} kind="number" />
}

export { FormNumberInput }
