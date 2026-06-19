import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type DataCardProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  description?: React.ReactNode
  value?: React.ReactNode
  meta?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  footer?: React.ReactNode
}

function DataCard({ title, description, value, meta, icon, action, footer, className, children, ...props }: DataCardProps) {
  return (
    <Card data-slot="data-card" className={cn("overflow-hidden", className)} {...props}>
      {(title || description || icon || action) && (
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            {icon && <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">{icon}</div>}
            <div className="grid min-w-0 gap-1">
              {title && <CardTitle className="truncate text-base">{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
          {action}
        </CardHeader>
      )}
      <CardContent className="grid gap-3">
        {value && <div className="text-2xl font-semibold tracking-tight text-foreground">{value}</div>}
        {children}
        {meta && <div className="text-xs text-muted-foreground">{meta}</div>}
      </CardContent>
      {footer && <div className="border-t bg-muted/30 px-6 py-3 text-sm text-muted-foreground">{footer}</div>}
    </Card>
  )
}

export { DataCard }
