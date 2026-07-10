import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import {
  AsyncSelect,
  type AsyncSelectOption,
  type AsyncSelectProps,
} from "@/components/inputs/async-select"
import { SimpleSelect, type SimpleSelectProps } from "@/components/inputs/simple-select"
import {
  FormFieldShell,
  type FormFieldShellControlProps,
} from "@/components/form/form-field-shell"

export type FormSelectKind = "simple" | "async"

type FormSelectBaseProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FormFieldShellControlProps & {
  control: Control<TFieldValues>
  name: TName
  fieldClassName?: string
}

export type FormSimpleSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<SimpleSelectProps, "value" | "onValueChange" | "disabled"> &
  FormSelectBaseProps<TFieldValues, TName> & {
    kind?: "simple"
    emptyValue?: unknown
    onValueChange?: (value: string) => void
  }

export type FormSelectAsyncVariantProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = Omit<AsyncSelectProps<TValue, TData, TOption>, "value" | "onValueChange" | "disabled"> &
  FormSelectBaseProps<TFieldValues, TName> & {
    kind: "async"
    emptyValue?: unknown
    onValueChange?: (value: TValue | undefined, option?: TOption) => void
  }

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> =
  | FormSimpleSelectProps<TFieldValues, TName>
  | FormSelectAsyncVariantProps<TFieldValues, TName, TValue, TData, TOption>

function buildShellProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(props: FormSelectProps<TFieldValues, TName, TValue, TData, TOption>) {
  return {
    label: props.label,
    description: props.description,
    required: props.required,
    className: props.className,
    layout: props.layout,
    descriptionPosition: props.descriptionPosition,
    labelAction: props.labelAction,
    requiredIndicator: props.requiredIndicator,
    errorIcon: props.errorIcon,
    showErrorIcon: props.showErrorIcon,
    disabled: props.disabled,
    readOnly: props.readOnly,
    labelClassName: props.labelClassName,
    labelRowClassName: props.labelRowClassName,
    descriptionClassName: props.descriptionClassName,
    errorClassName: props.errorClassName,
    contentClassName: props.contentClassName,
  } satisfies FormFieldShellControlProps
}

function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
>(props: FormSelectProps<TFieldValues, TName, TValue, TData, TOption>) {
  const shellProps = buildShellProps(props)
  const kind = props.kind ?? "simple"
  const resolvedFieldClassName = props.fieldClassName ?? "w-full"

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message

        if (kind === "async") {
          const {
            control: _control,
            name: _name,
            label: _label,
            description: _description,
            required: _required,
            className: _className,
            layout: _layout,
            descriptionPosition: _descriptionPosition,
            labelAction: _labelAction,
            requiredIndicator: _requiredIndicator,
            errorIcon: _errorIcon,
            showErrorIcon: _showErrorIcon,
            disabled,
            readOnly,
            labelClassName: _labelClassName,
            labelRowClassName: _labelRowClassName,
            descriptionClassName: _descriptionClassName,
            errorClassName: _errorClassName,
            contentClassName: _contentClassName,
            fieldClassName,
            emptyValue,
            kind: _kind,
            onValueChange,
            ...asyncProps
          } = props as FormSelectAsyncVariantProps<TFieldValues, TName, TValue, TData, TOption>

          return (
            <FormFieldShell {...shellProps} error={error}>
            <AsyncSelect<TValue, TData, TOption>
                {...asyncProps}
                value={field.value == null || field.value === "" ? undefined : (String(field.value) as TValue)}
                disabled={disabled || readOnly}
                onValueChange={(nextValue, option) => {
                  field.onChange(nextValue ?? emptyValue)
                  onValueChange?.(nextValue, option)
                }}
                triggerClassName={fieldClassName ?? resolvedFieldClassName}
              />
            </FormFieldShell>
          )
        }

        const {
          control: _control,
          name: _name,
          label: _label,
          description: _description,
          required: _required,
          className: _className,
          layout: _layout,
          descriptionPosition: _descriptionPosition,
          labelAction: _labelAction,
          requiredIndicator: _requiredIndicator,
          errorIcon: _errorIcon,
          showErrorIcon: _showErrorIcon,
          disabled,
          readOnly,
          labelClassName: _labelClassName,
          labelRowClassName: _labelRowClassName,
          descriptionClassName: _descriptionClassName,
          errorClassName: _errorClassName,
          contentClassName: _contentClassName,
          fieldClassName,
          emptyValue,
          kind: _kind,
          onValueChange,
          ...simpleProps
        } = props as FormSimpleSelectProps<TFieldValues, TName>

        return (
          <FormFieldShell {...shellProps} error={error}>
            <SimpleSelect
              {...simpleProps}
              value={field.value == null ? "" : String(field.value)}
              disabled={disabled || readOnly}
              onValueChange={(nextValue) => {
                field.onChange(nextValue || emptyValue)
                onValueChange?.(nextValue as string)
              }}
              triggerClassName={fieldClassName ?? resolvedFieldClassName}
            />
          </FormFieldShell>
        )
      }}
    />
  )
}

export { FormSelect }
