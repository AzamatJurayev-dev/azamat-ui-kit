import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellControlProps } from "@/components/form/form-field-shell"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export type FormSwitchLabelPlacement = "start" | "end"

export type FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<typeof Switch>, "name" | "checked" | "defaultChecked" | "disabled"> &
  FormFieldShellControlProps & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
    labelPlacement?: FormSwitchLabelPlacement
    onCheckedChange?: (checked: boolean) => void
  }

function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
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
  labelPlacement = "end",
  id,
  onCheckedChange,
  ...props
}: FormSwitchProps<TFieldValues, TName>) {
  const switchId = id ?? name
  const labelContent = label ? (
    <label
      htmlFor={switchId}
      className={cn("text-sm font-medium leading-none", disabled && "opacity-60", labelClassName)}
    >
      {label}
      {required && (requiredIndicator ?? <span className="ml-1 text-destructive">*</span>)}
    </label>
  ) : null

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const switchControl = (
          <Switch
            id={switchId}
            ref={field.ref}
            checked={Boolean(field.value)}
            disabled={disabled || readOnly}
            aria-invalid={fieldState.invalid || undefined}
            className={fieldClassName}
            onBlur={field.onBlur}
            onCheckedChange={(checked) => {
              field.onChange(checked)
              onCheckedChange?.(checked)
            }}
            {...props}
          />
        )

        return labelPlacement === "start" ? (
          <FormFieldShell
            label={label}
            description={description}
            required={required}
            error={fieldState.error?.message}
            htmlFor={switchId}
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
            {switchControl}
          </FormFieldShell>
        ) : (
          <FormFieldShell
            error={fieldState.error?.message}
            className={className}
            errorIcon={errorIcon}
            showErrorIcon={showErrorIcon}
            disabled={disabled}
            readOnly={readOnly}
            errorClassName={errorClassName}
            contentClassName={contentClassName}
          >
            <div className="flex items-start gap-3">
              {switchControl}

              {(label || description || labelAction) && (
                <div className="grid min-w-0 gap-1">
                  {(label || labelAction) && (
                    <div className={cn("flex items-center justify-between gap-2", labelRowClassName)}>
                      {labelContent}
                      {labelAction && <div className="shrink-0 text-sm">{labelAction}</div>}
                    </div>
                  )}
                  {description && (
                    <p className={cn("text-xs text-muted-foreground", descriptionClassName)}>
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </FormFieldShell>
        )
      }}
    />
  )
}

export { FormSwitch }
