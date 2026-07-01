import {
  FormInput,
  type FormInputDateVariantProps,
} from "@/components/form/form-input"
import { warnDeprecatedComponent } from "@/lib/deprecated-warning"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormDateInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormInputDateVariantProps<TFieldValues, TName>, "kind">

/**
 * @deprecated Use {@link FormInput} with `kind="date"` instead.
 */
function FormDateInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormDateInputProps<TFieldValues, TName>) {
  warnDeprecatedComponent("FormDateInput", "FormInput with kind=\"date\"")
  return <FormInput {...props} kind="date" />
}

export { FormDateInput }
