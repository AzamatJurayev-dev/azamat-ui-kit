"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CollapseProps = React.ComponentProps<"details"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "default" | "soft" | "ghost"
  size?: "sm" | "md" | "lg"
}

function Collapse({
  open,
  defaultOpen,
  onOpenChange,
  onToggle,
  className,
  children,
  variant = "default",
  size = "md",
  ...props
}: CollapseProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const currentOpen = isControlled ? open : internalOpen

  return (
    <details
      data-slot="collapse"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group overflow-hidden rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card text-card-foreground shadow-[var(--aui-card-shadow,var(--aui-control-shadow,none))] transition-[background-color,border-color,box-shadow] hover:border-[color:var(--aui-control-hover-border,var(--ring))] open:border-[color:var(--aui-control-hover-border,var(--ring))] data-[variant=soft]:bg-[color:color-mix(in_oklch,var(--muted),transparent_58%)] data-[variant=soft]:shadow-none data-[variant=ghost]:border-transparent data-[variant=ghost]:bg-transparent data-[variant=ghost]:shadow-none",
        className
      )}
      onToggle={(event) => {
        onToggle?.(event)
        const nextOpen = event.currentTarget.open
        if (!isControlled) {
          setInternalOpen(nextOpen)
        } else if (nextOpen !== currentOpen) {
          event.currentTarget.open = currentOpen
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
  size?: "sm" | "md" | "lg"
  inset?: boolean
  indicatorPosition?: "start" | "end"
}

function CollapseTrigger({
  icon,
  hideIcon = false,
  size = "md",
  inset = false,
  indicatorPosition = "end",
  className,
  children,
  ...props
}: CollapseTriggerProps) {
  const indicator = !hideIcon ? (
    <span className="shrink-0 rounded-md text-muted-foreground transition-[color,transform] group-open:rotate-180 group-open:text-foreground">
      {icon ?? <ChevronDownIcon className="size-4" />}
    </span>
  ) : null

  return (
    <summary
      data-slot="collapse-trigger"
      data-size={size}
      data-inset={inset || undefined}
      data-indicator-position={indicatorPosition}
      className={cn(
        "flex cursor-pointer list-none items-start gap-3 px-4 text-sm font-semibold outline-none transition-[background-color,color,box-shadow] hover:bg-[color:var(--aui-control-surface-hover,var(--muted))] focus-visible:bg-[color:var(--aui-control-surface-hover,var(--muted))] focus-visible:shadow-[0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] group-open:text-foreground data-[indicator-position=end]:justify-between data-[indicator-position=start]:justify-start data-[size=sm]:py-2.5 data-[size=md]:py-3.5 data-[size=lg]:py-4.5 data-[inset=true]:px-5 [&::-webkit-details-marker]:hidden",
        className
      )}
      onClick={(event) => {
        if (props["aria-disabled"]) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
      {...props}
    >
      {indicatorPosition === "start" ? indicator : null}
      <span className="min-w-0 flex-1">{children}</span>
      {indicatorPosition === "end" ? indicator : null}
    </summary>
  )
}

function CollapseContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collapse-content"
      className={cn(
        "border-t border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),transparent_70%)] px-4 py-3.5 text-sm leading-6 text-muted-foreground",
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
  meta?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
  indicatorPosition?: CollapseTriggerProps["indicatorPosition"]
  triggerClassName?: string
  contentClassName?: string
}

export type CollapseGroupProps = React.ComponentProps<"div"> & {
  items: CollapseItem[]
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: CollapseProps["variant"]
  size?: CollapseTriggerProps["size"]
}

function CollapseGroup({
  items,
  type = "multiple",
  value,
  defaultValue,
  onValueChange,
  variant = "default",
  size = "md",
  className,
  ...props
}: CollapseGroupProps) {
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
          variant={variant}
          size={size}
          className={cn(item.disabled && "pointer-events-none opacity-60")}
        >
          <CollapseTrigger
            size={size}
            icon={item.icon}
            indicatorPosition={item.indicatorPosition}
            className={item.triggerClassName}
          >
            <span className="grid gap-0.5">
              <span>{item.title}</span>
              {item.description && <span className="text-xs font-normal text-muted-foreground">{item.description}</span>}
              {item.disabled && item.disabledReason ? (
                <span className="text-[11px] font-medium text-muted-foreground">{item.disabledReason}</span>
              ) : null}
            </span>
          </CollapseTrigger>
          <CollapseContent className={item.contentClassName}>{item.content}</CollapseContent>
        </Collapse>
      ))}
    </div>
  )
}

export { Collapse, CollapseContent, CollapseGroup, CollapseTrigger }
