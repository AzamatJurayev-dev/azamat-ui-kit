import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FormActionsProps = React.ComponentProps<"div"> & {
  submitLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  resetLabel?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  onCancel?: () => void
  onReset?: () => void
  align?: "start" | "end" | "between"
}

function FormActions({
  submitLabel = "Save",
  cancelLabel = "Cancel",
  resetLabel,
  loading = false,
  disabled = false,
  onCancel,
  onReset,
  align = "end",
  className,
  children,
  ...props
}: FormActionsProps) {
  return (
    <div
      data-slot="form-actions"
      className={cn(
        "flex flex-wrap items-center gap-2 border-t pt-4",
        align === "end" && "justify-end",
        align === "between" && "justify-between",
        align === "start" && "justify-start",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {resetLabel && <Button type="button" variant="ghost" disabled={disabled || loading} onClick={onReset}>{resetLabel}</Button>}
          {onCancel && <Button type="button" variant="outline" disabled={disabled || loading} onClick={onCancel}>{cancelLabel}</Button>}
          <Button type="submit" disabled={disabled || loading}>{loading ? "Saving..." : submitLabel}</Button>
        </>
      )}
    </div>
  )
}

export { FormActions }
