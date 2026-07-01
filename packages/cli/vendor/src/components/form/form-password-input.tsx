import {
  FormInput,
  type FormInputPasswordVariantProps as BaseFormPasswordInputProps,
} from "@/components/form/form-input"
import { warnDeprecatedComponent } from "@/lib/deprecated-warning"
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
  warnDeprecatedComponent(
    "FormPasswordInput",
    "FormInput with kind=\"password\""
  )
  return <FormInput {...props} kind="password" />
}

export { FormPasswordInput }
