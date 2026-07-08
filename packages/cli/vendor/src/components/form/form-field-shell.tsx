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
  labelId?: string
  descriptionId?: string
  errorId?: string
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
  | "htmlFor"
  | "labelId"
  | "descriptionId"
  | "errorId"
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

export type FormFieldMessageState = {
  description?: React.ReactNode
  error?: React.ReactNode
}

export type FormFieldResolvedIds = {
  labelId: string
  descriptionId: string
  errorId: string
  describedBy?: string
}

function resolveFormFieldIds(id: string, state: FormFieldMessageState = {}): FormFieldResolvedIds {
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const describedBy = [state.description ? descriptionId : null, state.error ? errorId : null]
    .filter(Boolean)
    .join(" ") || undefined

  return { labelId, descriptionId, errorId, describedBy }
}

const layoutClassName: Record<FormFieldLayout, string> = {
  vertical: "grid gap-2",
  horizontal: "grid gap-2 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-start sm:gap-5",
  inline: "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4",
}

function FormFieldShell({
  className,
  label,
  description,
  error,
  required = false,
  htmlFor,
  labelId,
  descriptionId,
  errorId,
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
        "flex min-w-0 items-center justify-between gap-3",
        layout === "inline" && "sm:w-auto",
        labelRowClassName
      )}
    >
      {label ? (
        <label
          data-slot="form-field-label"
          htmlFor={htmlFor}
          id={labelId}
          className={cn(
            "min-w-0 text-sm font-semibold leading-none tracking-tight text-foreground",
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
      id={descriptionId}
      className={cn("text-sm leading-6 text-muted-foreground", disabled && "opacity-60", descriptionClassName)}
    >
      {description}
    </p>
  ) : null

  const content = (
    <div data-slot="form-field-content" className={cn("min-w-0 space-y-2", contentClassName)}>
      {children}
    </div>
  )

  const errorNode = error ? (
    <p
      data-slot="form-field-error"
      id={errorId}
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-2 rounded-[min(var(--radius-xl),16px)] border border-destructive/18 bg-destructive/8 px-3 py-2 text-sm font-medium leading-6 text-destructive",
        errorClassName
      )}
    >
      {showErrorIcon && <span className="mt-1 shrink-0">{resolvedErrorIcon}</span>}
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
      className={cn(layoutClassName[layout], "rounded-[var(--radius-2xl)]", className)}
      {...props}
    >
      {layout === "horizontal" ? (
        <>
          <div className="grid gap-2 sm:pt-2.5">
            {header}
            {hasDescriptionTop && descriptionNode}
          </div>
          <div className="grid min-w-0 gap-2">
            {content}
            {hasDescriptionBottom && descriptionNode}
            {errorNode}
          </div>
        </>
      ) : layout === "inline" ? (
        <>
          {header}
          <div className="grid min-w-0 flex-1 gap-2">
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

export { FormFieldShell, resolveFormFieldIds }
