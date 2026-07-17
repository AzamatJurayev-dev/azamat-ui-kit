import * as React from "react"

import { StateView, type StateViewProps, type StateViewStatus } from "./state-view"
import { cn } from "@/lib/utils"

export type PageStateTone = Extract<StateViewStatus, "empty" | "loading" | "error" | "success" | "info">
export type PageStateProps = Omit<StateViewProps, "status" | "size" | "variant" | "tone" | "actions" | "slot"> & {
  tone?: PageStateTone
  action?: React.ReactNode
  extra?: React.ReactNode
  compact?: boolean
}

/** @deprecated Use StateView. */
function PageState({ tone = "empty", action, extra, compact = false, className, ...props }: PageStateProps) {
  return <StateView status={tone} size={compact ? "compact" : "page"} actions={<>{action}{extra}</>} slot="page-state" className={className} {...props} />
}

export type InlineStateProps = Omit<PageStateProps, "compact"> & {
  retryLabel?: React.ReactNode
  onRetry?: () => void
}

/** @deprecated Use StateView with variant="inline". */
function InlineState({ tone = "empty", action, className, ...props }: InlineStateProps) {
  return <StateView variant="inline" size="compact" actions={action} slot="inline-state" className={cn("min-h-0", className)} {...props} status={tone} />
}

export { InlineState, PageState }
