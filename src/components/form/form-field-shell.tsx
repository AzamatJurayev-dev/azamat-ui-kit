import * as React from "react"
import { AlertCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type FormFieldLayout = "vertical" | "horizontal" | "inline"
export type FormFieldDescriptionPosition = "top" | "bottom"

export type FormFieldShellProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  htmlFor?: string
  layout?: FormFieldLayout
  descriptionPosition?: FormFieldDescriptionPosition
  labelAction?: React.ReactNode
  requiredIndicator?: React.ReactNode
  errorIcon?: React.ReactNode
  showErrorIcon?: boolean
  disabled?: boolean
  readOnly?: boolean
  labelClassName?: string
  labelRowClassName?: string
  descriptionClassName?: string
  errorClassName?: string
  contentClassName?: string
}

export type FormFieldShellControlProps = Pick<
  FormFieldShellProps,
  | "label"
  | "description"
  | "required"
  | "className"
  | "layout"
  | "descriptionPosition"
  | "labelAction"
  | "requiredIndicator"
  | "errorIcon"
  | "showErrorIcon"
  | "disabled"
  | "readOnly"
  | "labelClassName"
  | "labelRowClassName"
  | "descriptionClassName"
  | "errorClassName"
  | "contentClassName"
>

const layoutClassName: Record<FormFieldLayout, string> = {
  vertical: "grid gap-1.5",
  horizontal: "grid gap-1.5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-start sm:gap-4",
  inline: "flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3",
}

function FormFieldShell({
  className,
  label,
  description,
  error,
  required = false,
  htmlFor,
  layout = "vertical",
  descriptionPosition = "top",
  labelAction,
  requiredIndicator = <span className="ml-1 text-destructive">*</span>,
  errorIcon,
  showErrorIcon = true,
  disabled = false,
  readOnly = false,
  labelClassName,
  labelRowClassName,
  descriptionClassName,
  errorClassName,
  contentClassName,
  children,
  ...props
}: FormFieldShellProps) {
  const hasHeader = Boolean(label || labelAction)
  const hasDescriptionTop = description && descriptionPosition === "top"
  const hasDescriptionBottom = description && descriptionPosition === "bottom"
  const resolvedErrorIcon = errorIcon ?? <AlertCircleIcon className="size-3.5" />

  const header = hasHeader ? (
    <div
      data-slot="form-field-label-row"
      className={cn(
        "flex min-w-0 items-center justify-between gap-2",
        layout === "inline" && "sm:w-auto",
        labelRowClassName
      )}
    >
      {label ? (
        <label
          data-slot="form-field-label"
          htmlFor={htmlFor}
          className={cn(
            "min-w-0 text-sm font-medium leading-none text-foreground",
            disabled && "cursor-not-allowed opacity-60",
            readOnly && "opacity-80",
            labelClassName
          )}
        >
          {label}
          {required && requiredIndicator}
        </label>
      ) : (
        <span />
      )}

      {labelAction && (
        <div data-slot="form-field-label-action" className="shrink-0 text-sm">
          {labelAction}
        </div>
      )}
    </div>
  ) : null

  const descriptionNode = description ? (
    <p
      data-slot="form-field-description"
      className={cn("text-xs text-muted-foreground", disabled && "opacity-60", descriptionClassName)}
    >
      {description}
    </p>
  ) : null

  const content = (
    <div data-slot="form-field-content" className={cn("min-w-0", contentClassName)}>
      {children}
    </div>
  )

  const errorNode = error ? (
    <p
      data-slot="form-field-error"
      className={cn("flex items-start gap-1.5 text-xs font-medium text-destructive", errorClassName)}
    >
      {showErrorIcon && <span className="mt-0.5 shrink-0">{resolvedErrorIcon}</span>}
      <span className="min-w-0">{error}</span>
    </p>
  ) : null

  return (
    <div
      data-slot="form-field-shell"
      data-layout={layout}
      data-invalid={Boolean(error) || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      className={cn(layoutClassName[layout], className)}
      {...props}
    >
      {layout === "horizontal" ? (
        <>
          <div className="grid gap-1.5 sm:pt-2">
            {header}
            {hasDescriptionTop && descriptionNode}
          </div>
          <div className="grid min-w-0 gap-1.5">
            {content}
            {hasDescriptionBottom && descriptionNode}
            {errorNode}
          </div>
        </>
      ) : layout === "inline" ? (
        <>
          {header}
          <div className="grid min-w-0 flex-1 gap-1.5">
            {hasDescriptionTop && descriptionNode}
            {content}
            {hasDescriptionBottom && descriptionNode}
            {errorNode}
          </div>
        </>
      ) : (
        <>
          {header}
          {hasDescriptionTop && descriptionNode}
          {content}
          {hasDescriptionBottom && descriptionNode}
          {errorNode}
        </>
      )}
    </div>
  )
}

export { FormFieldShell }
