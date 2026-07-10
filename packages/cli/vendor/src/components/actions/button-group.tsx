import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonProps = React.ComponentProps<typeof Button>

export type ButtonGroupItem = Omit<ButtonProps, "children"> & {
  key: string
  label: React.ReactNode
  description?: React.ReactNode
}

export type ButtonGroupProps = React.ComponentProps<"div"> & {
  items?: ButtonGroupItem[]
  attached?: boolean
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
  activeVariant?: ButtonProps["variant"]
  orientation?: "horizontal" | "vertical"
  fullWidth?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

function ButtonGroup({
  items,
  attached = true,
  size = "sm",
  variant = "outline",
  activeVariant = "default",
  orientation = "horizontal",
  fullWidth = false,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  const isVertical = orientation === "vertical"
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = isControlled ? value : internalValue
  const groupId = React.useId()

  const updateValue = (nextValue: string) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div
      data-slot="button-group"
      role="group"
      data-orientation={orientation}
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "items-center",
        fullWidth && "w-full",
        attached
          ? "overflow-hidden rounded-[var(--aui-control-radius,var(--radius-md))] border border-[color:var(--aui-control-border,var(--border))] bg-[color:var(--aui-control-surface,var(--background))] shadow-[var(--aui-control-shadow,none)]"
          : "gap-2",
        className
      )}
      {...props}
    >
      {items?.map(({ key, label, description, className: itemClassName, size: itemSize, variant: itemVariant, onClick, "aria-label": itemAriaLabel, ...item }) => {
        const selected = currentValue === key
        const descriptionId = description ? `${groupId}-${key}-description` : undefined
        const resolvedAriaLabel = itemAriaLabel ?? (description && typeof label === "string" ? label : undefined)

        return (
        <Button
          key={key}
          size={itemSize ?? size}
          variant={itemVariant ?? (selected ? activeVariant : variant)}
          aria-label={resolvedAriaLabel}
          aria-pressed={selected || undefined}
          aria-describedby={descriptionId}
          data-selected={selected || undefined}
          className={cn(
            attached &&
              cn(
                "relative rounded-none border-0 shadow-none first:ml-0 data-[selected=true]:shadow-none",
                fullWidth && "flex-1",
                isVertical
                  ? "w-full border-t border-[color:var(--aui-control-border,var(--border))] first:border-t-0"
                  : "border-l border-[color:var(--aui-control-border,var(--border))] first:border-l-0"
              ),
            description && "h-auto min-h-9 py-2",
            itemClassName
          )}
          onClick={(event) => {
            updateValue(key)
            onClick?.(event)
          }}
          {...item}
        >
          {description ? (
            <span className="flex min-w-0 flex-col items-start text-left">
              <span>{label}</span>
              <span aria-hidden="true" className="truncate text-[11px] font-medium opacity-80">{description}</span>
              <span id={descriptionId} className="sr-only">{description}</span>
            </span>
          ) : (
            label
          )}
        </Button>
      )})}
      {children}
    </div>
  )
}

export { ButtonGroup }
