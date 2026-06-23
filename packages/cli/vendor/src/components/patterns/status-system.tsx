import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info"

export type StatusState<TValue extends string = string> = {
  value: TValue
  label: React.ReactNode
  icon?: React.ReactNode
  tone?: StatusTone
  next?: TValue[]
  disabled?: boolean
}

export type StatusSystemProps<TValue extends string = string> = React.ComponentProps<"div"> & {
  value: TValue
  states: StatusState<TValue>[]
  mode?: "badge" | "select" | "steps"
  allowAllTransitions?: boolean
  onValueChange?: (value: TValue, state: StatusState<TValue>) => void
  renderState?: (state: StatusState<TValue>, meta: { active: boolean; passed: boolean; disabled: boolean }) => React.ReactNode
}

const toneClassName: Record<StatusTone, string> = {
  neutral: "border-border bg-muted text-muted-foreground",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  danger: "border-destructive/20 bg-destructive/10 text-destructive",
  info: "border-primary/20 bg-primary/10 text-primary",
}

function StatusSystem<TValue extends string = string>({ value, states, mode = "badge", allowAllTransitions = false, onValueChange, renderState, className, ...props }: StatusSystemProps<TValue>) {
  const activeIndex = states.findIndex((state) => state.value === value)
  const activeState = states[activeIndex]
  const nextValues = new Set(allowAllTransitions ? states.map((state) => state.value) : activeState?.next ?? [])

  if (!activeState) return null

  if (mode === "select") {
    return (
      <div data-slot="status-system" className={cn("inline-flex", className)} {...props}>
        <select
          value={value}
          className="h-8 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onChange={(event) => {
            const state = states.find((item) => item.value === event.currentTarget.value)
            if (state) onValueChange?.(state.value, state)
          }}
        >
          {states.map((state) => {
            const active = state.value === value
            const disabled = state.disabled || (!active && !nextValues.has(state.value))
            return <option key={state.value} value={state.value} disabled={disabled}>{typeof state.label === "string" ? state.label : state.value}</option>
          })}
        </select>
      </div>
    )
  }

  if (mode === "steps") {
    return (
      <div data-slot="status-system" className={cn("flex flex-wrap items-center gap-3", className)} {...props}>
        {states.map((state, index) => {
          const active = state.value === value
          const passed = activeIndex >= index
          const disabled = state.disabled || (!active && !nextValues.has(state.value))
          return renderState?.(state, { active, passed, disabled }) ?? (
            <button key={state.value} type="button" disabled={disabled} className="flex items-center gap-2 disabled:opacity-50" onClick={() => onValueChange?.(state.value, state)}>
              <span className={cn("flex size-6 items-center justify-center rounded-full border text-xs", passed ? "border-primary bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{index + 1}</span>
              <span className={cn("text-sm", active ? "font-medium text-foreground" : "text-muted-foreground")}>{state.label}</span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div data-slot="status-system" className={className} {...props}>
      {renderState?.(activeState, { active: true, passed: true, disabled: Boolean(activeState.disabled) }) ?? (
        <Badge variant="outline" className={cn("gap-1", toneClassName[activeState.tone ?? "neutral"])}>{activeState.icon}{activeState.label}</Badge>
      )}
    </div>
  )
}

export { StatusSystem }
