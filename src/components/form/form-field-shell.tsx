import * as React from "react"
import { AlertCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type FormFieldLayout = "vertical" | "horizontal" | "inline"
export type FormFieldDescriptionPosition = "top" | "bottom"

export type FormFieldShellProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  loading?: boolean
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
  | "success"
  | "loading"
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
  success,
  loading = false,
  required = false,
  htmlFor,
  labelId,
  descriptionId,
  errorId,
  layout = "vertical",
  descriptionPosition = "top",
  labelAction,
  requiredIndicator = <span data-slot="form-field-required">*</span>,
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
  const resolvedErrorIcon = errorIcon ?? <AlertCircleIcon data-icon="error" />

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
            "min-w-0",
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
      className={descriptionClassName}
    >
      {description}
    </p>
  ) : null

  const content = (
    <div data-slot="form-field-content" className={cn("flex min-w-0 flex-col gap-2", contentClassName)}>
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
        "flex items-start gap-2",
        errorClassName
      )}
    >
      {showErrorIcon && <span data-slot="form-field-error-icon" className="shrink-0">{resolvedErrorIcon}</span>}
      <span className="min-w-0">{error}</span>
    </p>
  ) : null

  const successNode = success && !error ? (
    <p
      data-slot="form-field-success"
    >
      {success}
    </p>
  ) : null

  const loadingNode = loading ? (
    <p data-slot="form-field-loading">
      Loading...
    </p>
  ) : null

  return (
    <div
      data-slot="form-field-shell"
      data-layout={layout}
      data-invalid={Boolean(error) || undefined}
      data-success={Boolean(success && !error) || undefined}
      data-loading={loading || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      className={cn(layoutClassName[layout], className)}
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
            {loadingNode}
            {hasDescriptionBottom && descriptionNode}
            {successNode}
            {errorNode}
          </div>
        </>
      ) : layout === "inline" ? (
        <>
          {header}
          <div className="grid min-w-0 flex-1 gap-2">
            {hasDescriptionTop && descriptionNode}
            {content}
            {loadingNode}
            {hasDescriptionBottom && descriptionNode}
            {successNode}
            {errorNode}
          </div>
        </>
      ) : (
        <>
          {header}
          {hasDescriptionTop && descriptionNode}
          {content}
          {loadingNode}
          {hasDescriptionBottom && descriptionNode}
          {successNode}
          {errorNode}
        </>
      )}
    </div>
  )
}

export { FormFieldShell, resolveFormFieldIds }
