import type { FieldPath, FieldValues, Control } from "react-hook-form"

import type { FormFieldShellControlProps } from "@/components/form/form-field-shell"

export type FormControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FormFieldShellControlProps & {
  control: Control<TFieldValues>
  name: TName
  fieldClassName?: string
  id?: string
}

export function pickFormFieldShellProps(props: FormFieldShellControlProps): FormFieldShellControlProps {
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
  }
}
