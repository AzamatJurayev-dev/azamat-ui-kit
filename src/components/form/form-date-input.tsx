import { FormAppInput, type FormAppInputProps } from "@/components/form/form-app-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormDateInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormAppInputProps<TFieldValues, TName>, "kind">

function FormDateInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormDateInputProps<TFieldValues, TName>) {
  return <FormAppInput {...props} kind="date" />
}

export { FormDateInput }
