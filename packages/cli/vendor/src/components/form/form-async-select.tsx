import {
  FormSelect,
  type FormSelectAsyncVariantProps as BaseFormAsyncSelectProps,
} from "@/components/form/form-select"
import type { AsyncSelectOption } from "@/components/inputs/async-select"
import type { FieldPath, FieldValues } from "react-hook-form"

export type FormAsyncSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = Omit<BaseFormAsyncSelectProps<TFieldValues, TName, TValue, TData, TOption>, "kind">

/**
 * @deprecated Use {@link FormSelect} with `kind="async"` instead.
 */
function FormAsyncSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
>(props: FormAsyncSelectProps<TFieldValues, TName, TValue, TData, TOption>) {
  return <FormSelect {...props} kind="async" />
}

export { FormAsyncSelect }
