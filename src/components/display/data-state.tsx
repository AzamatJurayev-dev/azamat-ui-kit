import {
  StateView,
  type StateViewProps,
  type StateViewStatus,
  type StateViewTone,
  type StateViewVariant,
} from "@/components/feedback/state-view"

export type DataStateStatus = Exclude<StateViewStatus, "info">
export type DataStateVariant = StateViewVariant
export type DataStateTone = StateViewTone

export type DataStateProps = Omit<StateViewProps, "status" | "variant" | "size" | "slot"> & {
  status: DataStateStatus
  variant?: DataStateVariant
  compact?: boolean
}

/** @deprecated Use StateView. */
function DataState({ status, variant = "card", compact = false, ...props }: DataStateProps) {
  return <StateView status={status} variant={variant} size={compact ? "compact" : "default"} slot="data-state" {...props} />
}

export { DataState }
