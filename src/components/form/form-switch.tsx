import * as React from "react"
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form"

import { FormFieldShell, type FormFieldShellProps } from "@/components/form/form-field-shell"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export type FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<React.ComponentProps<typeof Switch>, "name" | "checked" | "defaultChecked"> &
  Pick<
    FormFieldShellProps,
    "label" | "description" | "required" | "className" | "labelClassName" | "descriptionClassName"
  > & {
    control: Control<TFieldValues>
    name: TName
    fieldClassName?: string
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
  labelClassName,
  descriptionClassName,
  fieldClassName,
  id,
  onCheckedChange,
  ...props
}: FormSwitchProps<TFieldValues, TName>) {
  const switchId = id ?? name

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldShell error={fieldState.error?.message} className={className}>
          <div className="flex items-start gap-3">
            <Switch
              id={switchId}
              ref={field.ref}
              checked={Boolean(field.value)}
              aria-invalid={fieldState.invalid || undefined}
              className={fieldClassName}
              onBlur={field.onBlur}
              onCheckedChange={(checked) => {
                field.onChange(checked)
                onCheckedChange?.(checked)
              }}
              {...props}
            />

            {(label || description) && (
              <div className="grid gap-1">
                {label && (
                  <label
                    htmlFor={switchId}
                    className={cn("text-sm font-medium leading-none", labelClassName)}
                  >
                    {label}
                    {required && <span className="ml-1 text-destructive">*</span>}
                  </label>
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
      )}
    />
  )
}

export { FormSwitch }
