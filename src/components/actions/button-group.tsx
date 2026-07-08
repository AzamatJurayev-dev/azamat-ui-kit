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
  allowDeselect?: boolean
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
  allowDeselect = false,
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
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([])

  const updateValue = (nextValue: string) => {
    const resolvedValue = allowDeselect && currentValue === nextValue ? "" : nextValue
    if (!isControlled) setInternalValue(resolvedValue)
    onValueChange?.(resolvedValue)
  }

  return (
    <div
      data-slot="button-group"
      role="group"
      data-orientation={orientation}
      aria-orientation={orientation}
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
      {items?.map(({ key, label, description, className: itemClassName, size: itemSize, variant: itemVariant, onClick, "aria-label": itemAriaLabel, ...item }, index) => {
        const selected = currentValue === key
        const descriptionId = description ? `${groupId}-${key}-description` : undefined
        const resolvedAriaLabel = itemAriaLabel ?? (description && typeof label === "string" ? label : undefined)

        return (
        <Button
          key={key}
          ref={(node) => {
            itemRefs.current[index] = node
          }}
          size={itemSize ?? size}
          variant={itemVariant ?? (selected ? activeVariant : variant)}
          aria-label={resolvedAriaLabel}
          aria-pressed={selected || undefined}
          aria-describedby={descriptionId}
          tabIndex={selected || (!currentValue && index === 0) ? 0 : -1}
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
          onKeyDown={(event) => {
            const itemCount = items?.length ?? 0
            if (!itemCount) return

            const moveFocus = (nextIndex: number) => {
              const boundedIndex = (nextIndex + itemCount) % itemCount
              itemRefs.current[boundedIndex]?.focus()
            }

            if (event.key === "ArrowRight" && !isVertical) {
              event.preventDefault()
              moveFocus(index + 1)
            } else if (event.key === "ArrowLeft" && !isVertical) {
              event.preventDefault()
              moveFocus(index - 1)
            } else if (event.key === "ArrowDown" && isVertical) {
              event.preventDefault()
              moveFocus(index + 1)
            } else if (event.key === "ArrowUp" && isVertical) {
              event.preventDefault()
              moveFocus(index - 1)
            } else if (event.key === "Home") {
              event.preventDefault()
              moveFocus(0)
            } else if (event.key === "End") {
              event.preventDefault()
              moveFocus(itemCount - 1)
            }
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
