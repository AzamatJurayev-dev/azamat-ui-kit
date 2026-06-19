import * as React from "react"

import { Card } from "@/components/ui/card"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export type SmartCardVariant = "default" | "outline" | "elevated" | "ghost"
export type SmartCardSize = "sm" | "md" | "lg"
export type SmartCardDensity = "compact" | "default" | "comfortable"
export type SmartCardOrientation = "vertical" | "horizontal"

export type SmartCardClassNames = {
  root?: string
  media?: string
  header?: string
  icon?: string
  body?: string
  eyebrow?: string
  title?: string
  description?: string
  content?: string
  footer?: string
  actions?: string
  meta?: string
  status?: string
}

export type SmartCardRenderContext = {
  title?: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  media?: React.ReactNode
  icon?: React.ReactNode
  status?: React.ReactNode
  actions?: React.ReactNode
  meta?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}

export type SmartCardProps = Omit<React.ComponentProps<typeof Card>, "title" | "content"> & SmartCardRenderContext & {
  orientation?: SmartCardOrientation
  variant?: SmartCardVariant
  size?: SmartCardSize
  density?: SmartCardDensity
  loading?: boolean
  disabled?: boolean
  selected?: boolean
  interactive?: boolean
  classNames?: SmartCardClassNames
  renderHeader?: (ctx: SmartCardRenderContext) => React.ReactNode
  renderMedia?: (ctx: SmartCardRenderContext) => React.ReactNode
  renderContent?: (ctx: SmartCardRenderContext) => React.ReactNode
  renderFooter?: (ctx: SmartCardRenderContext) => React.ReactNode
}

const variantClassName: Record<SmartCardVariant, string> = {
  default: "bg-card",
  outline: "border bg-card",
  elevated: "border bg-card shadow-md",
  ghost: "border-transparent bg-transparent shadow-none",
}

const densityClassName: Record<SmartCardDensity, string> = {
  compact: "p-3",
  default: "p-4",
  comfortable: "p-5",
}

const titleClassName: Record<SmartCardSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

function SmartCard({
  eyebrow,
  title,
  description,
  media,
  icon,
  status,
  actions,
  meta,
  content,
  footer,
  orientation = "vertical",
  variant = "outline",
  size = "md",
  density = "default",
  loading = false,
  disabled = false,
  selected = false,
  interactive,
  className,
  classNames,
  renderHeader,
  renderMedia,
  renderContent,
  renderFooter,
  children,
  onClick,
  ...props
}: SmartCardProps) {
  const ctx: SmartCardRenderContext = { eyebrow, title, description, media, icon, status, actions, meta, content, footer }
  const clickable = Boolean(onClick || interactive)

  return (
    <Card
      data-slot="smart-card"
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      className={cn(
        "overflow-hidden transition-colors data-[selected=true]:border-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-55",
        variantClassName[variant],
        clickable && "cursor-pointer hover:bg-muted/35",
        orientation === "horizontal" && "flex",
        className,
        classNames?.root
      )}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {loading ? (
        <div className={cn("grid gap-3", densityClassName[density])}>
          <Skeleton className="h-5 w-1/2" />
          <SkeletonText rows={3} />
        </div>
      ) : (
        <>
          {media && (renderMedia?.(ctx) ?? <div data-slot="smart-card-media" className={cn("bg-muted", orientation === "horizontal" ? "w-40 shrink-0" : "aspect-video", classNames?.media)}>{media}</div>)}
          <div data-slot="smart-card-body" className={cn("grid min-w-0 flex-1 gap-3", densityClassName[density], classNames?.body)}>
            {renderHeader?.(ctx) ?? (
              <div data-slot="smart-card-header" className={cn("flex items-start justify-between gap-3", classNames?.header)}>
                <div className="flex min-w-0 items-start gap-3">
                  {icon && <div data-slot="smart-card-icon" className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground", classNames?.icon)}>{icon}</div>}
                  <div className="grid min-w-0 gap-1">
                    {eyebrow && <div data-slot="smart-card-eyebrow" className={cn("text-xs font-medium uppercase tracking-wide text-muted-foreground", classNames?.eyebrow)}>{eyebrow}</div>}
                    <div className="flex flex-wrap items-center gap-2">
                      {title && <div data-slot="smart-card-title" className={cn("truncate font-semibold text-foreground", titleClassName[size], classNames?.title)}>{title}</div>}
                      {status && <div data-slot="smart-card-status" className={classNames?.status}>{status}</div>}
                    </div>
                    {description && <div data-slot="smart-card-description" className={cn("line-clamp-2 text-sm text-muted-foreground", classNames?.description)}>{description}</div>}
                  </div>
                </div>
                {actions && <div data-slot="smart-card-actions" className={cn("shrink-0", classNames?.actions)} onClick={(event) => event.stopPropagation()}>{actions}</div>}
              </div>
            )}
            {meta && <div data-slot="smart-card-meta" className={cn("text-xs text-muted-foreground", classNames?.meta)}>{meta}</div>}
            {(content || children) && (renderContent?.(ctx) ?? <div data-slot="smart-card-content" className={classNames?.content}>{content ?? children}</div>)}
            {footer && (renderFooter?.(ctx) ?? <div data-slot="smart-card-footer" className={cn("border-t pt-3 text-sm text-muted-foreground", classNames?.footer)}>{footer}</div>)}
          </div>
        </>
      )}
    </Card>
  )
}

export { SmartCard }
