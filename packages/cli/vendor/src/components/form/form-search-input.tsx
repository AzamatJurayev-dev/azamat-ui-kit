import { type FormInputSearchVariantProps } from "@/components/form/form-input"
import { renderDeprecatedFormInputAlias } from "@/components/form/deprecated-compat"
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
  return renderDeprecatedFormInputAlias({
    componentName: "FormSearchInput",
    replacement: "FormInput with kind=\"search\"",
    kind: "search",
    props,
  })
}

export { FormSearchInput }
