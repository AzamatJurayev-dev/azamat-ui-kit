import * as React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type InfoCardProps = React.ComponentProps<typeof Card> & {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  actions?: React.ReactNode
  footer?: React.ReactNode
  media?: React.ReactNode
  orientation?: "vertical" | "horizontal"
  compact?: boolean
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
}

function InfoCard({
  className,
  eyebrow,
  title,
  description,
  icon,
  actions,
  footer,
  media,
  orientation = "vertical",
  compact = false,
  headerClassName,
  contentClassName,
  footerClassName,
  children,
  ...props
}: InfoCardProps) {
  const hasHeader = Boolean(eyebrow || title || description || icon || actions)

  return (
    <Card
      data-slot="info-card"
      data-orientation={orientation}
      className={cn("min-w-0 overflow-hidden", orientation === "horizontal" && "md:grid md:grid-cols-[auto_minmax(0,1fr)]", className)}
      {...props}
    >
      {media && (
        <div data-slot="info-card-media" className="min-w-0 bg-muted/40">
          {media}
        </div>
      )}

      <div className="min-w-0">
        {hasHeader && (
          <CardHeader className={cn("flex flex-row items-start justify-between gap-3", compact && "p-4", headerClassName)}>
            <div className="min-w-0 space-y-1">
              {eyebrow && <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</div>}
              {title && <CardTitle className="truncate">{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {icon && <div className="rounded-lg bg-muted p-2 text-muted-foreground [&_svg]:size-4">{icon}</div>}
              {actions}
            </div>
          </CardHeader>
        )}

        {children && <CardContent className={cn(compact && "px-4 pb-4", contentClassName)}>{children}</CardContent>}
        {footer && <CardFooter className={cn("border-t", compact && "px-4 py-3", footerClassName)}>{footer}</CardFooter>}
      </div>
    </Card>
  )
}

export { InfoCard }
