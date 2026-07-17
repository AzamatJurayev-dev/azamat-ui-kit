import * as React from "react"

import { StateView, type StateViewProps } from "./state-view"

export type LoadingStateProps = Omit<StateViewProps, "status" | "title" | "loadingVariant" | "variant" | "slot"> & {
  label?: React.ReactNode
  variant?: "spinner" | "skeleton" | "progress"
}

/** @deprecated Use StateView with status="loading". */
function LoadingState({ label = "Loading...", variant = "spinner", ...props }: LoadingStateProps) {
  return <StateView status="loading" title={label} loadingVariant={variant} slot="loading-state" {...props} />
}

export { LoadingState }
