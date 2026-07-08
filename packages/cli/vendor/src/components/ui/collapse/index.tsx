import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CollapseProps = React.ComponentProps<"details"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Collapse({ open, defaultOpen, onOpenChange, onToggle, className, children, ...props }: CollapseProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const currentOpen = isControlled ? open : internalOpen

  return (
    <details
      data-slot="collapse"
      className={cn(
        "group rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card text-card-foreground shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))] transition-[background-color,border-color,box-shadow] open:border-[color:var(--aui-control-hover-border,var(--ring))]",
        className
      )}
      onToggle={(event) => {
        onToggle?.(event)
        const nextOpen = event.currentTarget.open
        if (!isControlled) {
          setInternalOpen(nextOpen)
        }
        onOpenChange?.(nextOpen)
      }}
      open={currentOpen}
      {...props}
    >
      {children}
    </details>
  )
}

export type CollapseTriggerProps = React.ComponentProps<"summary"> & {
  icon?: React.ReactNode
  hideIcon?: boolean
}

function CollapseTrigger({ icon, hideIcon = false, className, children, ...props }: CollapseTriggerProps) {
  return (
    <summary
      data-slot="collapse-trigger"
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-3 rounded-[calc(var(--aui-card-radius,var(--radius-xl))-1px)] px-4 py-3 text-sm font-semibold outline-none transition-[background-color,color,box-shadow] hover:bg-[color:var(--aui-control-surface-hover,var(--muted))] focus-visible:shadow-[0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] group-open:text-foreground [&::-webkit-details-marker]:hidden",
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1">{children}</span>
      {!hideIcon && (
        <span className="shrink-0 rounded-md text-muted-foreground transition-[color,transform] group-open:rotate-180 group-open:text-foreground">
          {icon ?? <ChevronDownIcon className="size-4" />}
        </span>
      )}
    </summary>
  )
}

function CollapseContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collapse-content"
      className={cn(
        "border-t border-[color:var(--aui-card-border,var(--border))] px-4 py-3 text-sm leading-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type CollapseItem = {
  key: string
  title: React.ReactNode
  content: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

export type CollapseGroupProps = React.ComponentProps<"div"> & {
  items: CollapseItem[]
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

function CollapseGroup({ items, type = "multiple", value, defaultValue, onValueChange, className, ...props }: CollapseGroupProps) {
  const initialValue = React.useMemo(() => {
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    return type === "single" ? "" : []
  }, [defaultValue, type, value])
  const [internalValue, setInternalValue] = React.useState<string | string[]>(initialValue)
  const currentValue = value ?? internalValue

  const isOpen = (key: string) => Array.isArray(currentValue) ? currentValue.includes(key) : currentValue === key

  const updateValue = (key: string, nextOpen: boolean) => {
    const nextValue = type === "single"
      ? nextOpen ? key : ""
      : nextOpen
        ? Array.from(new Set([...(Array.isArray(currentValue) ? currentValue : []), key]))
        : (Array.isArray(currentValue) ? currentValue.filter((item) => item !== key) : [])

    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div data-slot="collapse-group" className={cn("grid gap-2.5", className)} {...props}>
      {items.map((item) => (
        <Collapse
          key={item.key}
          open={isOpen(item.key)}
          onOpenChange={(open) => updateValue(item.key, open)}
          className={cn(item.disabled && "pointer-events-none opacity-60")}
        >
          <CollapseTrigger>
            <span className="grid gap-0.5">
              <span>{item.title}</span>
              {item.description && <span className="text-xs font-normal text-muted-foreground">{item.description}</span>}
            </span>
          </CollapseTrigger>
          <CollapseContent>{item.content}</CollapseContent>
        </Collapse>
      ))}
    </div>
  )
}

export { Collapse, CollapseContent, CollapseGroup, CollapseTrigger }
