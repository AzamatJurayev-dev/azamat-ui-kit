import * as React from "react"

import { StateView, type StateViewProps } from "@/components/feedback/state-view"
import { Button, buttonVariants } from "@/components/ui/button"

export type EmptyStateTone = "empty" | "error" | "info"

export type EmptyStateAction = {
  label: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
}

export type EmptyStateProps = Omit<StateViewProps, "status" | "tone" | "actions" | "size" | "slot"> & {
  tone?: EmptyStateTone
  primaryAction?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  compact?: boolean
}

function renderAction(action: EmptyStateAction, fallbackVariant: React.ComponentProps<typeof Button>["variant"]) {
  if (action.href) return <a className={buttonVariants({ variant: action.variant ?? fallbackVariant })} href={action.href}>{action.label}</a>
  return <Button type="button" variant={action.variant ?? fallbackVariant} onClick={action.onClick}>{action.label}</Button>
}

/** @deprecated Use StateView. */
function EmptyState({ tone = "empty", primaryAction, secondaryAction, compact = false, ...props }: EmptyStateProps) {
  const actions = primaryAction || secondaryAction ? (
    <>
      {secondaryAction ? renderAction(secondaryAction, "outline") : null}
      {primaryAction ? renderAction(primaryAction, "default") : null}
    </>
  ) : undefined

  return <StateView status={tone} size={compact ? "compact" : "default"} actions={actions} slot="empty-state" {...props} />
}

export type ErrorStateProps = Omit<EmptyStateProps, "tone">

/** @deprecated Use StateView with status="error". */
function ErrorState(props: ErrorStateProps) {
  return <EmptyState tone="error" {...props} />
}

export { EmptyState, ErrorState }
