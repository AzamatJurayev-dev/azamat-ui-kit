import * as React from "react"

import { CopyButton, type CopyButtonProps } from "@/components/actions/copy-button"
import { cn } from "@/lib/utils"

export type CopyFieldProps = React.ComponentProps<"div"> & {
  value: string
  label?: React.ReactNode
  description?: React.ReactNode
  copyButtonProps?: Omit<CopyButtonProps, "value">
  monospace?: boolean
}

function CopyField({ value, label, description, copyButtonProps, monospace = true, className, ...props }: CopyFieldProps) {
  return (
    <div data-slot="copy-field" className={cn("grid gap-2", className)} {...props}>
      {(label || description) && (
        <div className="grid gap-0.5">
          {label && <div className="text-sm font-medium text-foreground">{label}</div>}
          {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
      )}
      <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
        <div className={cn("min-w-0 flex-1 truncate text-sm text-muted-foreground", monospace && "font-mono")}>{value}</div>
        <CopyButton value={value} size="sm" variant="outline" {...copyButtonProps} />
      </div>
    </div>
  )
}

export { CopyField }
