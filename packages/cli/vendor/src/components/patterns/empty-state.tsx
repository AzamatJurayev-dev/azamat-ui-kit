import * as React from "react"
import { AlertCircleIcon, SearchXIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type EmptyStateTone = "empty" | "error" | "info"

export type EmptyStateAction = {
  label: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
}

export type EmptyStateProps = Omit<React.ComponentProps<"div">, "title"> & {
  tone?: EmptyStateTone
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  primaryAction?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  compact?: boolean
}

function renderEmptyStateAction(action: EmptyStateAction, fallbackVariant: React.ComponentProps<typeof Button>["variant"]) {
  if (action.href) {
    return (
      <a className={buttonVariants({ variant: action.variant ?? fallbackVariant })} href={action.href}>
        {action.label}
      </a>
    )
  }

  return (
    <Button type="button" variant={action.variant ?? fallbackVariant} onClick={action.onClick}>
      {action.label}
    </Button>
  )
}

function defaultEmptyStateIcon(tone: EmptyStateTone) {
  if (tone === "error") return <AlertCircleIcon data-icon="inline-start" />
  return <SearchXIcon data-icon="inline-start" />
}

function EmptyState({
  className,
  tone = "empty",
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  compact = false,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      data-tone={tone}
      data-compact={compact || undefined}
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border bg-card text-center text-card-foreground shadow-sm",
        compact ? "gap-3 p-5" : "min-h-64 gap-4 p-8",
        className
      )}
      {...props}
    >
      <div
        data-slot="empty-state-icon"
        className="flex size-12 items-center justify-center rounded-full border bg-muted text-muted-foreground"
      >
        {icon ?? defaultEmptyStateIcon(tone)}
      </div>
      {(title || description) && (
        <div data-slot="empty-state-content" className="grid max-w-md gap-1">
          {title && <h2 className="text-base font-semibold tracking-tight">{title}</h2>}
          {description && <p className="text-sm leading-6 text-muted-foreground">{description}</p>}
        </div>
      )}
      {(primaryAction || secondaryAction) && (
        <div data-slot="empty-state-actions" className="flex flex-wrap items-center justify-center gap-2">
          {secondaryAction ? renderEmptyStateAction(secondaryAction, "outline") : null}
          {primaryAction ? renderEmptyStateAction(primaryAction, "default") : null}
        </div>
      )}
    </div>
  )
}

export type ErrorStateProps = Omit<EmptyStateProps, "tone">

function ErrorState(props: ErrorStateProps) {
  return <EmptyState tone="error" {...props} />
}

export { EmptyState, ErrorState }
