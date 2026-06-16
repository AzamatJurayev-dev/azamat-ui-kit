import * as React from "react"

import { cn } from "@/lib/utils"

export type FormFieldShellProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  htmlFor?: string
  labelClassName?: string
  descriptionClassName?: string
  errorClassName?: string
  contentClassName?: string
}

function FormFieldShell({
  className,
  label,
  description,
  error,
  required = false,
  htmlFor,
  labelClassName,
  descriptionClassName,
  errorClassName,
  contentClassName,
  children,
  ...props
}: FormFieldShellProps) {
  return (
    <div data-slot="form-field-shell" className={cn("grid gap-1.5", className)} {...props}>
      {label && (
        <label
          data-slot="form-field-label"
          htmlFor={htmlFor}
          className={cn("text-sm font-medium leading-none", labelClassName)}
        >
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}

      {description && (
        <p
          data-slot="form-field-description"
          className={cn("text-xs text-muted-foreground", descriptionClassName)}
        >
          {description}
        </p>
      )}

      <div data-slot="form-field-content" className={contentClassName}>
        {children}
      </div>

      {error && (
        <p
          data-slot="form-field-error"
          className={cn("text-xs font-medium text-destructive", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { FormFieldShell }
