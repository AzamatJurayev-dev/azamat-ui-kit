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
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[color:var(--aui-surface-border)] bg-[color:color-mix(in_srgb,var(--aui-control-bg)_82%,white_18%)] px-2 py-1.5 shadow-sm dark:bg-[color:color-mix(in_srgb,var(--aui-control-bg)_90%,black_10%)]",
        className
      )}
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
              "inline-flex size-8 items-center justify-center rounded-full text-[color:var(--aui-text-muted)] outline-none transition duration-150 focus-visible:ring-2 focus-visible:ring-[color:var(--aui-brand-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--aui-page-bg)] disabled:pointer-events-none disabled:opacity-50",
              interactive && "hover:bg-[color:var(--aui-control-bg)] hover:text-[color:var(--aui-brand-strong)]",
              selected && "bg-[color:color-mix(in_srgb,var(--aui-brand-strong)_16%,transparent)] text-[color:var(--aui-brand-strong)]"
            )}
            onMouseEnter={() => interactive && setHoverValue(nextValue)}
            onClick={() => setRating(nextValue)}
            onKeyDown={(event) => handleKeyDown(event, nextValue)}
          >
            {icon ?? <StarIcon className={cn("size-4.5", selected && "fill-current")} />}
          </button>
        )
      })}
      {allowClear && currentValue > 0 && interactive && (
        <button
          type="button"
          className="ml-1 inline-flex h-8 items-center rounded-full border border-[color:var(--aui-surface-border)] px-3 text-xs font-semibold text-muted-foreground transition hover:bg-[color:var(--aui-control-bg)] hover:text-foreground"
          onClick={() => setRating(0)}
        >
          {labels?.clear ?? "Clear"}
        </button>
      )}
    </div>
  )
}

export { Rating }
