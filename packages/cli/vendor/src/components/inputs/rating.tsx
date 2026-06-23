import * as React from "react"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type RatingProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  count?: number
  allowClear?: boolean
  disabled?: boolean
  readOnly?: boolean
  labels?: {
    rate?: (value: number) => string
    clear?: string
  }
  icon?: React.ReactNode
}

function Rating({
  value,
  defaultValue = 0,
  onValueChange,
  count = 5,
  allowClear = true,
  disabled = false,
  readOnly = false,
  labels,
  icon,
  className,
  ...props
}: RatingProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const currentValue = value ?? internalValue
  const displayValue = hoverValue ?? currentValue
  const interactive = !disabled && !readOnly

  const setRating = (nextValue: number) => {
    if (!interactive) return
    const resolvedValue = allowClear && nextValue === currentValue ? 0 : nextValue
    if (value === undefined) setInternalValue(resolvedValue)
    onValueChange?.(resolvedValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, nextValue: number) => {
    if (!interactive) return
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setRating(nextValue)
    }
  }

  return (
    <div
      data-slot="rating"
      role="radiogroup"
      aria-disabled={disabled || undefined}
      className={cn("inline-flex items-center gap-1", className)}
      onMouseLeave={() => setHoverValue(null)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => {
        const nextValue = index + 1
        const selected = nextValue <= displayValue
        return (
          <button
            key={nextValue}
            type="button"
            role="radio"
            aria-checked={nextValue === currentValue}
            aria-label={labels?.rate?.(nextValue) ?? `Rate ${nextValue}`}
            disabled={disabled}
            tabIndex={readOnly ? -1 : 0}
            className={cn(
              "rounded-sm text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              interactive && "hover:text-primary",
              selected && "text-primary"
            )}
            onMouseEnter={() => interactive && setHoverValue(nextValue)}
            onClick={() => setRating(nextValue)}
            onKeyDown={(event) => handleKeyDown(event, nextValue)}
          >
            {icon ?? <StarIcon className={cn("size-5", selected && "fill-current")} />}
          </button>
        )
      })}
      {allowClear && currentValue > 0 && interactive && (
        <button type="button" className="ml-1 text-xs text-muted-foreground hover:text-foreground" onClick={() => setRating(0)}>
          {labels?.clear ?? "Clear"}
        </button>
      )}
    </div>
  )
}

export { Rating }
