import { type FormInputNumberVariantProps } from "@/components/form/form-input"
import { renderDeprecatedFormInputAlias } from "@/components/form/deprecated-compat"
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
  return renderDeprecatedFormInputAlias({
    componentName: "FormNumberInput",
    replacement: "FormInput with kind=\"number\"",
    kind: "number",
    props,
  })
}

export { FormNumberInput }
