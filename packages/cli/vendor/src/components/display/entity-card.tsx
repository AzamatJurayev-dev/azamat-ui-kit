import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type EntityCardProps = React.ComponentProps<typeof Card> & {
  title: React.ReactNode
  description?: React.ReactNode
  media?: React.ReactNode
  icon?: React.ReactNode
  status?: React.ReactNode
  meta?: React.ReactNode
  actions?: React.ReactNode
  footer?: React.ReactNode
  selected?: boolean
  disabled?: boolean
  orientation?: "vertical" | "horizontal"
  onSelect?: () => void
}

function EntityCard({ title, description, media, icon, status, meta, actions, footer, selected = false, disabled = false, orientation = "vertical", onSelect, className, ...props }: EntityCardProps) {
  return (
    <Card
      data-slot="entity-card"
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      className={cn("overflow-hidden transition-colors hover:bg-muted/35 data-[selected=true]:border-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-55", onSelect && "cursor-pointer", orientation === "horizontal" && "flex", className)}
      onClick={onSelect}
      {...props}
    >
      {media && <div className={cn("bg-muted", orientation === "horizontal" ? "w-32 shrink-0" : "aspect-video")}>{media}</div>}
      <div className="grid min-w-0 flex-1 gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            {icon && <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">{icon}</div>}
            <div className="grid min-w-0 gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="truncate text-sm font-medium text-foreground">{title}</div>
                {status}
              </div>
              {description && <div className="line-clamp-2 text-sm text-muted-foreground">{description}</div>}
            </div>
          </div>
          {actions && <div className="shrink-0" onClick={(event) => event.stopPropagation()}>{actions}</div>}
        </div>
        {meta && <div className="text-xs text-muted-foreground">{meta}</div>}
        {footer && <div className="border-t pt-3 text-sm text-muted-foreground">{footer}</div>}
      </div>
    </Card>
  )
}

export { EntityCard }
