import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent font-semibold tracking-[0.01em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary text-primary-foreground shadow-[0_8px_18px_color-mix(in_oklch,var(--primary),transparent_82%)] [a]:hover:bg-primary/88",
        secondary:
          "border-border/65 bg-secondary/88 text-secondary-foreground shadow-[0_1px_0_rgba(255,255,255,0.06)] [a]:hover:bg-secondary",
        destructive:
          "border-destructive/18 bg-destructive/12 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/18",
        outline:
          "border-border/68 bg-background/80 text-foreground shadow-none [a]:hover:bg-muted/72 [a]:hover:text-foreground",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      tone: {
        neutral: "",
        info: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        warning: "border-amber-500/24 bg-amber-500/12 text-amber-700 dark:text-amber-300",
        danger: "border-destructive/20 bg-destructive/12 text-destructive dark:bg-destructive/20",
      },
      size: {
        sm: "min-h-5 px-2.5 py-0.5 text-[0.65rem]",
        default: "min-h-6 px-3 py-1 text-[0.7rem]",
        lg: "min-h-7 px-3.5 py-1 text-xs",
      },
      dot: {
        true: "pl-2",
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
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

function Badge({
  className,
  variant = "default",
  tone = "neutral",
  size = "default",
  dot = false,
  leftIcon,
  rightIcon,
  children,
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, tone, size, dot }), className),
        children: (
          <>
            {dot ? <span data-slot="badge-dot" className="size-1.5 rounded-full bg-current opacity-75" /> : null}
            {leftIcon ? <span data-icon="inline-start" data-slot="badge-icon" className="inline-flex shrink-0 items-center">{leftIcon}</span> : null}
            {children ? <span data-slot="badge-label">{children}</span> : null}
            {rightIcon ? <span data-icon="inline-end" data-slot="badge-icon" className="inline-flex shrink-0 items-center">{rightIcon}</span> : null}
          </>
        ),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      tone,
      size,
      dot,
    },
  })
}

export { Badge, badgeVariants, type BadgeProps }
