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

export type InfoCardProps = Omit<React.ComponentProps<typeof Card>, "title" | "content" | "size" | "orientation"> & InfoCardRenderContext & {
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

const densityClassName: Record<InfoCardDensity, string> = {
  compact: "gap-2",
  default: "gap-3",
  comfortable: "gap-4",
}

const titleClassName: Record<InfoCardSize, string> = {
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-lg font-semibold",
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
      data-info-variant={variant}
      data-info-size={size}
      data-info-density={resolvedDensity}
      data-orientation={orientation}
      variant={variant}
      size={size === "md" ? "default" : size}
      density={resolvedDensity}
      interactive={clickable}
      selected={selected}
      disabled={disabled}
      className={cn(
        "overflow-hidden",
        orientation === "horizontal" && "flex",
        className,
        classNames?.root
      )}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {loading ? (
        <div data-slot="info-card-loading" className="grid gap-3">
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
                  orientation === "horizontal" ? "w-40 shrink-0" : "aspect-video",
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
                        "flex shrink-0 items-center justify-center",
                        classNames?.icon
                      )}
                    >
                      {icon}
                    </div>
                  )}
                  <div className="grid min-w-0 gap-1">
                    {eyebrow && <div data-slot="info-card-eyebrow" className={classNames?.eyebrow}>{eyebrow}</div>}
                    <div className="flex flex-wrap items-center gap-2">
                      {title && <div data-slot="info-card-title" className={cn("truncate", titleClassName[size], classNames?.title)}>{title}</div>}
                      {status && <div data-slot="info-card-status" className={classNames?.status}>{status}</div>}
                    </div>
                    {description && <div data-slot="info-card-description" className={cn("line-clamp-2", classNames?.description)}>{description}</div>}
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
            {meta && <div data-slot="info-card-meta" className={classNames?.meta}>{meta}</div>}
            {(content || children) && (renderContent?.(ctx) ?? <div data-slot="info-card-content" className={classNames?.content}>{content ?? children}</div>)}
            {footer && (renderFooter?.(ctx) ?? <div data-slot="info-card-footer" className={classNames?.footer}>{footer}</div>)}
          </div>
        </>
      )}
    </Card>
  )
}

export { InfoCard }
