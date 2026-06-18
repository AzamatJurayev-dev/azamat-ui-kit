import type { FieldPath, FieldValues } from "react-hook-form"

import type {
  FormBuilderAsyncSelectField,
  FormBuilderCustomField,
  FormBuilderDateField,
  FormBuilderDateRangeField,
  FormBuilderField,
  FormBuilderInputField,
  FormBuilderNumberField,
  FormBuilderPhoneField,
  FormBuilderSection,
  FormBuilderSelectField,
  FormBuilderSwitchField,
  FormBuilderTextareaField,
} from "./form-builder"

type FieldBase<TFieldValues extends FieldValues> = Pick<
  FormBuilderField<TFieldValues>,
  "id" | "hidden" | "className" | "colSpan"
>

type WithoutBase<TValue, TBase> = Omit<TValue, keyof TBase>

type InputFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderInputField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type TextareaFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderTextareaField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type SelectFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderSelectField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type AsyncSelectFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderAsyncSelectField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type SwitchFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderSwitchField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type NumberFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderNumberField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type PhoneFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderPhoneField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type DateFieldOptions<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderDateField<TFieldValues, TName>, FieldBase<TFieldValues> | { type: unknown }>

type DateRangeFieldOptions<
  TFieldValues extends FieldValues,
  TFromName extends FieldPath<TFieldValues>,
  TToName extends FieldPath<TFieldValues>,
> = FieldBase<TFieldValues> & WithoutBase<FormBuilderDateRangeField<TFieldValues, TFromName, TToName>, FieldBase<TFieldValues> | { type: unknown }>

type CustomFieldOptions<TFieldValues extends FieldValues> = FieldBase<TFieldValues> &
  WithoutBase<FormBuilderCustomField<TFieldValues>, FieldBase<TFieldValues> | { type: unknown }>

function splitFieldOptions<TFieldValues extends FieldValues, TProps>(
  options: FieldBase<TFieldValues> & { props: TProps }
) {
  const { id, hidden, className, colSpan, props } = options

  return {
    base: { id, hidden, className, colSpan },
    props,
  }
}

function inputField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: InputFieldOptions<TFieldValues, TName>): FormBuilderInputField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "input", props }
}

function textareaField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: TextareaFieldOptions<TFieldValues, TName>): FormBuilderTextareaField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "textarea", props }
}

function selectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: SelectFieldOptions<TFieldValues, TName>): FormBuilderSelectField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "select", props }
}

function asyncSelectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: AsyncSelectFieldOptions<TFieldValues, TName>): FormBuilderAsyncSelectField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "async-select", props }
}

function switchField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: SwitchFieldOptions<TFieldValues, TName>): FormBuilderSwitchField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "switch", props }
}

function numberField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: NumberFieldOptions<TFieldValues, TName>): FormBuilderNumberField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "number", props }
}

function phoneField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: PhoneFieldOptions<TFieldValues, TName>): FormBuilderPhoneField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "phone", props }
}

function dateField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: DateFieldOptions<TFieldValues, TName>): FormBuilderDateField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "date", props }
}

function dateRangeField<
  TFieldValues extends FieldValues,
  TFromName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TToName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: DateRangeFieldOptions<TFieldValues, TFromName, TToName>): FormBuilderDateRangeField<TFieldValues, TFromName, TToName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "date-range", props }
}

function customField<TFieldValues extends FieldValues>(
  options: CustomFieldOptions<TFieldValues>
): FormBuilderCustomField<TFieldValues> {
  const { id, hidden, className, colSpan, render } = options
  return { id, hidden, className, colSpan, type: "custom", render }
}

function formSection<TFieldValues extends FieldValues>(
  section: FormBuilderSection<TFieldValues>
): FormBuilderSection<TFieldValues> {
  return section
}

export {
  asyncSelectField,
  customField,
  dateField,
  dateRangeField,
  formSection,
  inputField,
  numberField,
  phoneField,
  selectField,
  switchField,
  textareaField,
}
