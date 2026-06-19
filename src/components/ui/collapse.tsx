import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CollapseProps = React.ComponentProps<"details"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Collapse({ open, defaultOpen, onOpenChange, onToggle, className, children, ...props }: CollapseProps) {
  const controlledProps = open === undefined ? { defaultOpen } : { open }

  return (
    <details
      data-slot="collapse"
      className={cn("group rounded-lg border bg-card text-card-foreground", className)}
      onToggle={(event) => {
        onToggle?.(event)
        onOpenChange?.(event.currentTarget.open)
      }}
      {...controlledProps}
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
        "flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1">{children}</span>
      {!hideIcon && (
        <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
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
      className={cn("border-t px-4 py-3 text-sm text-muted-foreground", className)}
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
    <div data-slot="collapse-group" className={cn("grid gap-2", className)} {...props}>
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
