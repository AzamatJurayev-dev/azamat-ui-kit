import { FormAppInput, type FormAppInputProps } from "@/components/form/form-app-input"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormAppInputProps<TFieldValues, TName>, "kind">

function FormSearchInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormSearchInputProps<TFieldValues, TName>) {
  return <FormAppInput {...props} kind="search" />
}

export { FormSearchInput }
