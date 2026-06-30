import * as React from "react"
import { ChevronLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type EntityHeaderProps = React.ComponentProps<"div"> & {
  title: React.ReactNode
  description?: React.ReactNode
  avatar?: React.ReactNode
  badge?: React.ReactNode
  actions?: React.ReactNode
  breadcrumb?: React.ReactNode
  backHref?: string
  onBack?: () => void
}

function EntityHeader({
  title,
  description,
  avatar,
  badge,
  actions,
  breadcrumb,
  backHref,
  onBack,
  className,
  ...props
}: EntityHeaderProps) {
  return (
    <div data-slot="entity-header" className={cn("flex flex-col gap-4 pb-6", className)} {...props}>
      {/* Top row: Breadcrumb and optional back button */}
      {(breadcrumb || backHref || onBack) && (
        <div className="flex items-center gap-2">
          {(backHref || onBack) && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Go back"
            >
              {/* If using next/link etc., this would ideally be an 'asChild' setup, but we use an anchor tag or button based on props for simplicity */}
              {backHref && !onBack ? (
                <a href={backHref} className="flex h-full w-full items-center justify-center">
                  <ChevronLeftIcon className="size-4" />
                </a>
              ) : (
                <ChevronLeftIcon className="size-4" />
              )}
            </button>
          )}
          {breadcrumb}
        </div>
      )}

      {/* Main row: Avatar, Title/Description/Badge, Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {avatar && <div className="shrink-0">{avatar}</div>}
          <div className="min-w-0 flex-1 grid gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h1>
              {badge}
            </div>
            {description && (
              <p className="truncate text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export { EntityHeader }
