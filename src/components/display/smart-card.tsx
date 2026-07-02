import * as React from "react"

import { Card } from "@/components/ui/card"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type InfoCardVariant = "default" | "outline" | "elevated" | "ghost"
export type InfoCardSize = "sm" | "md" | "lg"
export type InfoCardDensity = "compact" | "default" | "comfortable"
export type InfoCardOrientation = "vertical" | "horizontal"

export type InfoCardClassNames = {
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

export type InfoCardRenderContext = {
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

export type InfoCardProps = Omit<React.ComponentProps<typeof Card>, "title" | "content" | "size"> & InfoCardRenderContext & {
  orientation?: InfoCardOrientation
  variant?: InfoCardVariant
  size?: InfoCardSize
  density?: InfoCardDensity
  compact?: boolean
  loading?: boolean
  disabled?: boolean
  selected?: boolean
  interactive?: boolean
  classNames?: InfoCardClassNames
  renderHeader?: (ctx: InfoCardRenderContext) => React.ReactNode
  renderMedia?: (ctx: InfoCardRenderContext) => React.ReactNode
  renderContent?: (ctx: InfoCardRenderContext) => React.ReactNode
  renderFooter?: (ctx: InfoCardRenderContext) => React.ReactNode
}

const variantClassName: Record<InfoCardVariant, string> = {
  default: "border border-border/70 bg-card/96 shadow-sm ring-1 ring-foreground/4",
  outline: "border border-border/75 bg-card/96 shadow-sm ring-1 ring-foreground/4",
  elevated: "border border-border/75 bg-card/98 shadow-[0_24px_80px_rgba(15,23,42,0.12)] ring-1 ring-foreground/4",
  ghost: "border-transparent bg-transparent shadow-none",
}

const densityClassName: Record<InfoCardDensity, string> = {
  compact: "p-3",
  default: "p-4",
  comfortable: "p-5",
}

const titleClassName: Record<InfoCardSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
}

function InfoCard({
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
  density,
  compact,
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
}: InfoCardProps) {
  const ctx: InfoCardRenderContext = { eyebrow, title, description, media, icon, status, actions, meta, content, footer }
  const clickable = Boolean(onClick || interactive)
  const resolvedDensity = compact ? "compact" : density ?? "default"

  return (
    <Card
      data-slot="info-card"
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
        <div className={cn("grid gap-3", densityClassName[resolvedDensity])}>
          <Skeleton className="h-5 w-1/2" />
          <SkeletonText rows={3} />
        </div>
      ) : (
        <>
          {media &&
            (renderMedia?.(ctx) ?? (
              <div
                data-slot="info-card-media"
                className={cn(
                  "bg-muted/50",
                  orientation === "horizontal" ? "w-40 shrink-0 border-r border-border/70" : "aspect-video border-b border-border/70",
                  classNames?.media
                )}
              >
                {media}
              </div>
            ))}
          <div data-slot="info-card-body" className={cn("grid min-w-0 flex-1 gap-3", densityClassName[resolvedDensity], classNames?.body)}>
            {renderHeader?.(ctx) ?? (
              <div data-slot="info-card-header" className={cn("flex items-start justify-between gap-3", classNames?.header)}>
                <div className="flex min-w-0 items-start gap-3">
                  {icon && (
                    <div
                      data-slot="info-card-icon"
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-[min(var(--radius-xl),16px)] border border-border/70 bg-muted/45 text-muted-foreground shadow-[0_1px_0_rgba(255,255,255,0.05)]",
                        classNames?.icon
                      )}
                    >
                      {icon}
                    </div>
                  )}
                  <div className="grid min-w-0 gap-1">
                    {eyebrow && <div data-slot="info-card-eyebrow" className={cn("text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground", classNames?.eyebrow)}>{eyebrow}</div>}
                    <div className="flex flex-wrap items-center gap-2">
                      {title && <div data-slot="info-card-title" className={cn("truncate font-semibold tracking-tight text-foreground", titleClassName[size], classNames?.title)}>{title}</div>}
                      {status && <div data-slot="info-card-status" className={classNames?.status}>{status}</div>}
                    </div>
                    {description && <div data-slot="info-card-description" className={cn("line-clamp-2 text-sm text-muted-foreground", classNames?.description)}>{description}</div>}
                  </div>
                </div>
                {actions && (
                  <div
                    data-slot="info-card-actions"
                    className={cn("shrink-0", classNames?.actions)}
                    onClick={stopInteractivePropagation}
                    onMouseDown={stopInteractivePropagation}
                    onDoubleClick={stopInteractivePropagation}
                  >
                    {actions}
                  </div>
                )}
              </div>
            )}
            {meta && <div data-slot="info-card-meta" className={cn("text-xs text-muted-foreground", classNames?.meta)}>{meta}</div>}
            {(content || children) && (renderContent?.(ctx) ?? <div data-slot="info-card-content" className={classNames?.content}>{content ?? children}</div>)}
            {footer && (renderFooter?.(ctx) ?? <div data-slot="info-card-footer" className={cn("border-t pt-3 text-sm text-muted-foreground", classNames?.footer)}>{footer}</div>)}
          </div>
        </>
      )}
    </Card>
  )
}

/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
export type SmartCardVariant = InfoCardVariant
/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
export type SmartCardSize = InfoCardSize
/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
export type SmartCardDensity = InfoCardDensity
/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
export type SmartCardOrientation = InfoCardOrientation
/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
export type SmartCardClassNames = InfoCardClassNames
/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
export type SmartCardRenderContext = InfoCardRenderContext
/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
export type SmartCardProps = InfoCardProps

/** @deprecated Prefer `InfoCard` or `CardFamily.Info` for new public usage. */
function SmartCard(props: SmartCardProps) {
  return <InfoCard {...props} />
}

export { InfoCard, SmartCard }
