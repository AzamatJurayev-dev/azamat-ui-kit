import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form"

import {
  FormFieldShell,
  type FormFieldShellControlProps,
  resolveFormFieldIds,
} from "@/components/form/form-field-shell"
import { Textarea } from "@/components/ui/textarea"

export type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<typeof Textarea>, "name" | "value" | "defaultValue"> &
  FormFieldShellControlProps & {
    control: Control<TFieldValues>
    name: TName
    rules?: RegisterOptions<TFieldValues, TName>
    fieldClassName?: string
    transformIn?: (value: unknown) => string | number | readonly string[] | undefined
    transformOut?: (event: React.ChangeEvent<HTMLTextAreaElement>) => unknown
  }

function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  description,
  required,
  className,
  layout,
  descriptionPosition,
  labelAction,
  requiredIndicator,
  errorIcon,
  showErrorIcon,
  disabled,
  readOnly,
  labelClassName,
  labelRowClassName,
  descriptionClassName,
  errorClassName,
  contentClassName,
  fieldClassName,
  transformIn,
  transformOut,
  id,
  onChange,
  onBlur,
  ...props
}: FormTextareaProps<TFieldValues, TName>) {
  const textareaId = id ?? name

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message
        const resolvedIds = resolveFormFieldIds(textareaId, { description, error })

        return (
          <FormFieldShell
            label={label}
            description={description}
            required={required}
            error={error}
            htmlFor={textareaId}
            labelId={resolvedIds.labelId}
            descriptionId={resolvedIds.descriptionId}
            errorId={resolvedIds.errorId}
            className={className}
            layout={layout}
            descriptionPosition={descriptionPosition}
            labelAction={labelAction}
            requiredIndicator={requiredIndicator}
            errorIcon={errorIcon}
            showErrorIcon={showErrorIcon}
            disabled={disabled}
            readOnly={readOnly}
            labelClassName={labelClassName}
            labelRowClassName={labelRowClassName}
            descriptionClassName={descriptionClassName}
            errorClassName={errorClassName}
            contentClassName={contentClassName}
          >
            <Textarea
              id={textareaId}
              ref={field.ref}
              name={field.name}
              value={transformIn ? transformIn(field.value) : field.value ?? ""}
              disabled={disabled}
              readOnly={readOnly}
              onBlur={(event) => {
                field.onBlur()
                onBlur?.(event)
              }}
              onChange={(event) => {
                field.onChange(transformOut ? transformOut(event) : event)
                onChange?.(event)
              }}
              aria-invalid={fieldState.invalid || undefined}
              aria-describedby={resolvedIds.describedBy}
              aria-errormessage={error ? resolvedIds.errorId : undefined}
              className={fieldClassName}
              {...props}
            />
          </FormFieldShell>
        )
      }}
    />
  )
}

export { FormTextarea }
