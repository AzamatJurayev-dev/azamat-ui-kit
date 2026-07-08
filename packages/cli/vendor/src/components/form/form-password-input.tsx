import { type FormInputPasswordVariantProps as BaseFormPasswordInputProps } from "@/components/form/form-input"
import { renderDeprecatedFormInputAlias } from "@/components/form/deprecated-compat"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormPasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<BaseFormPasswordInputProps<TFieldValues, TName>, "kind">

/**
 * @deprecated Use {@link FormInput} with `kind="password"` instead.
 */
function FormPasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormPasswordInputProps<TFieldValues, TName>) {
  return renderDeprecatedFormInputAlias({
    componentName: "FormPasswordInput",
    replacement: "FormInput with kind=\"password\"",
    kind: "password",
    props,
  })
}

export { FormPasswordInput }
