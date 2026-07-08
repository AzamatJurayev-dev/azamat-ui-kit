import { type FormInputDateVariantProps } from "@/components/form/form-input"
import { renderDeprecatedFormInputAlias } from "@/components/form/deprecated-compat"
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
  return renderDeprecatedFormInputAlias({
    componentName: "FormDateInput",
    replacement: "FormInput with kind=\"date\"",
    kind: "date",
    props,
  })
}

export { FormDateInput }
