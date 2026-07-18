import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap outline-none [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        soft: "",
        outline: "",
        ghost: "",
        link: "",
      },
      tone: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        danger: "",
        muted: "",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
      dot: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      tone: "neutral",
      size: "default",
      dot: false,
    },
  }
)

type BadgeProps = useRender.ComponentProps<"span"> &
  Omit<VariantProps<typeof badgeVariants>, "dot"> & {
    label?: React.ReactNode
    count?: React.ReactNode
    status?: "neutral" | "info" | "success" | "warning" | "danger" | "muted"
    removable?: boolean
    selected?: boolean
    onRemove?: () => void
    removeLabel?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    avatar?: React.ReactNode
    dot?: boolean | React.ReactNode
    showDot?: boolean
    dotPosition?: "start" | "end"
    pulse?: boolean
    interactive?: boolean
  }

function Badge({
  className,
  variant = "default",
  tone = "neutral",
  size = "default",
  dot = false,
  label,
  count,
  status,
  removable = false,
  selected = false,
  onRemove,
  removeLabel = "Remove badge",
  leftIcon,
  rightIcon,
  avatar,
  showDot,
  dotPosition = "start",
  pulse = false,
  interactive = false,
  children,
  render,
  onKeyDown,
  ...props
}: BadgeProps) {
  const resolvedTone = status ?? tone
  const resolvedLabel = label ?? children
  const resolvedShowDot = showDot ?? Boolean(dot || status === "success" || status === "warning" || status === "danger" || status === "info")
  const dotNode = resolvedShowDot ? (
    <span data-slot="badge-dot" data-pulse={pulse || undefined}>
      {React.isValidElement(dot) ? dot : null}
    </span>
  ) : null

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(
          badgeVariants({ variant, tone: resolvedTone, size, dot: resolvedShowDot }),
          selected && "ring-2 ring-ring/45 ring-offset-1",
          interactive && "cursor-pointer",
          className
        ),
        tabIndex: removable || interactive ? 0 : undefined,
        onKeyDown: (event: React.KeyboardEvent<HTMLSpanElement>) => {
          if (removable && (event.key === "Backspace" || event.key === "Delete")) {
            event.preventDefault()
            onRemove?.()
          }
          onKeyDown?.(event)
        },
        children: (
          <>
            {dotPosition === "start" ? dotNode : null}
            {avatar ? <span data-slot="badge-avatar" className="grid shrink-0 place-items-center overflow-hidden rounded-full">{avatar}</span> : null}
            {leftIcon ? <span data-icon="inline-start" data-slot="badge-icon" className="grid shrink-0 place-items-center">{leftIcon}</span> : null}
            {resolvedLabel ? <span data-slot="badge-label">{resolvedLabel}</span> : null}
            {count != null ? (
              <span
                data-slot="badge-count"
              >
                {count}
              </span>
            ) : null}
            {rightIcon ? <span data-icon="inline-end" data-slot="badge-icon" className="grid shrink-0 place-items-center">{rightIcon}</span> : null}
            {dotPosition === "end" ? dotNode : null}
            {removable ? (
              <button
                type="button"
                data-slot="badge-remove"
                aria-label={removeLabel}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  onRemove?.()
                }}
              >
                <XIcon data-icon="remove" />
              </button>
            ) : null}
          </>
        ),
      } as React.HTMLAttributes<HTMLSpanElement>,
      {
        "data-variant": variant ?? "default",
        "data-tone": resolvedTone ?? "neutral",
        "data-size": size ?? "default",
        "data-removable": removable || undefined,
        "data-selected": selected || undefined,
        "data-interactive": interactive || undefined,
        "data-pulse": pulse || undefined,
      } as React.HTMLAttributes<HTMLSpanElement>,
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      tone: resolvedTone,
      size,
      dot: resolvedShowDot,
    },
  })
}

export { Badge, badgeVariants, type BadgeProps }
