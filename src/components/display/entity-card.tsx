import * as React from "react"

import { Card } from "@/components/ui/card"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type EntityCardProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
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
      className={cn(
        "overflow-hidden border-[color:var(--aui-surface-border)] bg-[color:color-mix(in_srgb,var(--aui-page-bg)_94%,white_6%)] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--aui-brand-strong)_26%,var(--aui-surface-border))] hover:shadow-md data-[selected=true]:border-[color:var(--aui-brand-strong)] data-[selected=true]:shadow-[0_0_0_1px_var(--aui-brand-strong),0_16px_36px_rgba(15,23,42,0.12)] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-55 dark:bg-[color:color-mix(in_srgb,var(--aui-page-bg)_97%,black_3%)]",
        onSelect && "cursor-pointer",
        orientation === "horizontal" && "flex",
        className
      )}
      onClick={onSelect}
      {...props}
    >
      {media && (
        <div
          className={cn(
            "overflow-hidden border-b border-[color:var(--aui-surface-border)] bg-[color:var(--aui-control-bg)]",
            orientation === "horizontal" ? "w-36 shrink-0 border-b-0 border-r" : "aspect-video"
          )}
        >
          {media}
        </div>
      )}
      <div className="grid min-w-0 flex-1 gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            {icon && (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-control-bg)] text-muted-foreground shadow-sm">
                {icon}
              </div>
            )}
            <div className="grid min-w-0 gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="truncate text-base font-semibold tracking-tight text-foreground">{title}</div>
                {status}
              </div>
              {description && <div className="line-clamp-2 text-sm leading-6 text-muted-foreground">{description}</div>}
            </div>
          </div>
          {actions && (
            <div
              className="shrink-0"
              onClick={stopInteractivePropagation}
              onMouseDown={stopInteractivePropagation}
              onDoubleClick={stopInteractivePropagation}
            >
              {actions}
            </div>
          )}
        </div>
        {meta && <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{meta}</div>}
        {footer && <div className="border-t border-[color:var(--aui-surface-border)] pt-3 text-sm text-muted-foreground">{footer}</div>}
      </div>
    </Card>
  )
}

export { EntityCard }
