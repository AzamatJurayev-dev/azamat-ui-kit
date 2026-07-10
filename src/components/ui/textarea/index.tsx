"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.ComponentProps<"textarea"> & {
  onValueChange?: (value: string) => void
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  showCharacterCount?: boolean
  countFormatter?: (currentLength: number, maxLength?: number) => React.ReactNode
  wrapperClassName?: string
  textareaClassName?: string
}

function getTextareaLength(value: TextareaProps["value"] | TextareaProps["defaultValue"]) {
  if (typeof value === "string") return value.length
  if (typeof value === "number") return String(value).length
  if (Array.isArray(value)) return value.join("").length
  return 0
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      onValueChange,
      helperText,
      errorText,
      showCharacterCount = false,
      countFormatter,
      wrapperClassName,
      textareaClassName,
      maxLength,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [uncontrolledLength, setUncontrolledLength] = React.useState(() => getTextareaLength(defaultValue))
    const currentLength = isControlled ? getTextareaLength(value) : uncontrolledLength
    const helperMessage = errorText ?? helperText
    const invalid = Boolean(errorText) || ariaInvalid === true || ariaInvalid === "true"

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      if (!isControlled) {
        setUncontrolledLength(event.target.value.length)
      }
      onChange?.(event)
      onValueChange?.(event.target.value)
    }

    const textarea = (
      <textarea
        data-slot="textarea"
        value={value}
        defaultValue={isControlled ? undefined : defaultValue}
        maxLength={maxLength}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex field-sizing-content min-h-28 w-full rounded-[var(--aui-control-radius,var(--radius-lg))] border border-[color:var(--aui-control-border-strong,var(--input))] bg-[color:var(--aui-control-surface,var(--background))] px-4 py-3.5 text-sm font-medium text-foreground shadow-[var(--aui-shadow-xs,0_1px_2px_rgba(15,23,42,0.04))] transition-[background-color,border-color,box-shadow,color] outline-none placeholder:text-muted-foreground/78 hover:border-[color:var(--aui-control-hover-border,var(--ring))] hover:bg-[color:var(--aui-control-surface-hover,var(--background))] focus-visible:border-[color:var(--ring)] focus-visible:ring-0 focus-visible:shadow-[var(--aui-shadow-xs,0_1px_2px_rgba(15,23,42,0.04)),0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] disabled:cursor-not-allowed disabled:border-[color:color-mix(in_oklch,var(--border),transparent_18%)] disabled:bg-[color:var(--aui-control-surface-disabled,var(--muted))] disabled:text-muted-foreground disabled:shadow-none disabled:opacity-100 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_1px_color-mix(in_oklch,var(--destructive),transparent_32%)] read-only:bg-[color:var(--aui-control-surface-readonly,var(--muted))]",
          textareaClassName,
          className
        )}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    )

    if (!helperMessage && !showCharacterCount) {
      return textarea
    }

    return (
      <div data-slot="textarea-field" className={cn("grid gap-1.5", wrapperClassName)}>
        {textarea}
        <div data-slot="textarea-meta" className="flex items-start justify-between gap-3 px-1">
          <div
            data-slot="textarea-helper"
            className={cn(
              "min-w-0 text-xs leading-5",
              errorText ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperMessage}
          </div>
          {showCharacterCount ? (
            <div
              data-slot="textarea-count"
              className={cn(
                "shrink-0 text-[11px] font-medium tabular-nums",
                errorText ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {countFormatter?.(currentLength, maxLength) ??
                (typeof maxLength === "number" ? `${currentLength}/${maxLength}` : currentLength)}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
