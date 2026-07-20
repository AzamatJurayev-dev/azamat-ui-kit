"use client"

import * as React from "react"

import { StateView } from "@/components/feedback/state-view"

export type AsyncBoundaryProps = React.PropsWithChildren<{
  loading?: boolean
  error?: unknown
  empty?: boolean
  loadingTitle?: React.ReactNode
  errorTitle?: React.ReactNode
  emptyTitle?: React.ReactNode
  onRetry?: () => void
}>

function AsyncBoundary({
  loading,
  error,
  empty,
  loadingTitle = "Loading",
  errorTitle = "Unable to load",
  emptyTitle = "No data",
  onRetry,
  children,
}: AsyncBoundaryProps) {
  if (loading) return <StateView status="loading" title={loadingTitle} loadingVariant="skeleton" />
  if (error) {
    const description = error instanceof Error ? error.message : "Try again or check the request."
    return <StateView status="error" title={errorTitle} description={description} onRetry={onRetry} />
  }
  if (empty) return <StateView status="empty" title={emptyTitle} />
  return <>{children}</>
}

export { AsyncBoundary }
