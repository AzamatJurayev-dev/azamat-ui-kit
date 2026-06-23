import { FormAppInput, type FormAppInputProps } from "@/components/form/form-app-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormAppInputProps<TFieldValues, TName>, "kind">

function FormNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormNumberInputProps<TFieldValues, TName>) {
  return <FormAppInput {...props} kind="number" />
}

export { FormNumberInput }
