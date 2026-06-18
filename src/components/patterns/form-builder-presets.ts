import type { FieldPath, FieldValues } from "react-hook-form"

import type {
  FormBuilderAsyncSelectField,
  FormBuilderCustomField,
  FormBuilderDateField,
  FormBuilderDateRangeField,
  FormBuilderInputField,
  FormBuilderNumberField,
  FormBuilderPhoneField,
  FormBuilderSection,
  FormBuilderSelectField,
  FormBuilderSwitchField,
  FormBuilderTextareaField,
} from "./form-builder"

type FieldBase = {
  id: string
  hidden?: boolean
  className?: string
  colSpan?: 1 | 2 | 3 | 4 | "full"
}

type FieldPresetOptions<TProps> = FieldBase & {
  props: TProps
}

function splitFieldOptions<TProps>(options: FieldPresetOptions<TProps>) {
  const { id, hidden, className, colSpan, props } = options
  return { base: { id, hidden, className, colSpan }, props }
}

function inputField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderInputField<TFieldValues, TName>["props"]>): FormBuilderInputField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "input", props }
}

function textareaField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderTextareaField<TFieldValues, TName>["props"]>): FormBuilderTextareaField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "textarea", props }
}

function selectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderSelectField<TFieldValues, TName>["props"]>): FormBuilderSelectField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "select", props }
}

function asyncSelectField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderAsyncSelectField<TFieldValues, TName>["props"]>): FormBuilderAsyncSelectField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "async-select", props }
}

function switchField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderSwitchField<TFieldValues, TName>["props"]>): FormBuilderSwitchField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "switch", props }
}

function numberField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderNumberField<TFieldValues, TName>["props"]>): FormBuilderNumberField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "number", props }
}

function phoneField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderPhoneField<TFieldValues, TName>["props"]>): FormBuilderPhoneField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "phone", props }
}

function dateField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderDateField<TFieldValues, TName>["props"]>): FormBuilderDateField<TFieldValues, TName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "date", props }
}

function dateRangeField<
  TFieldValues extends FieldValues,
  TFromName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TToName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: FieldPresetOptions<FormBuilderDateRangeField<TFieldValues, TFromName, TToName>["props"]>): FormBuilderDateRangeField<TFieldValues, TFromName, TToName> {
  const { base, props } = splitFieldOptions(options)
  return { ...base, type: "date-range", props }
}

function customField<TFieldValues extends FieldValues>(
  options: FieldBase & Pick<FormBuilderCustomField<TFieldValues>, "render">
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
