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
  VariantProps<typeof badgeVariants> & {
    label?: React.ReactNode
    count?: React.ReactNode
    status?: "neutral" | "info" | "success" | "warning" | "danger" | "muted"
    removable?: boolean
    onRemove?: () => void
    removeLabel?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
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
  onRemove,
  removeLabel = "Remove badge",
  leftIcon,
  rightIcon,
  children,
  render,
  ...props
}: BadgeProps) {
  const resolvedTone = status ?? tone
  const resolvedLabel = label ?? children
  const showDot = dot || status === "success" || status === "warning" || status === "danger" || status === "info"

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, tone: resolvedTone, size, dot: showDot }), className),
        children: (
          <>
            {showDot ? <span data-slot="badge-dot" /> : null}
            {leftIcon ? <span data-icon="inline-start" data-slot="badge-icon" className="inline-flex shrink-0 items-center">{leftIcon}</span> : null}
            {resolvedLabel ? <span data-slot="badge-label">{resolvedLabel}</span> : null}
            {count != null ? (
              <span
                data-slot="badge-count"
              >
                {count}
              </span>
            ) : null}
            {rightIcon ? <span data-icon="inline-end" data-slot="badge-icon" className="inline-flex shrink-0 items-center">{rightIcon}</span> : null}
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
      } as React.HTMLAttributes<HTMLSpanElement>,
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      tone: resolvedTone,
      size,
      dot: showDot,
    },
  })
}

export { Badge, badgeVariants, type BadgeProps }
