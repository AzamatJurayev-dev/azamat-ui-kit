import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[color:color-mix(in_oklch,var(--border),var(--foreground)_6%)] bg-[color:color-mix(in_oklch,var(--muted),var(--background)_36%)] font-semibold tracking-[0.01em] text-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,white,transparent_34%)] transition-[background-color,border-color,color,box-shadow,transform] focus-visible:ring-0 focus-visible:shadow-[0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "border-[color:color-mix(in_oklch,var(--primary),transparent_48%)] bg-[color:color-mix(in_oklch,var(--primary),transparent_78%)] text-[color:color-mix(in_oklch,var(--primary),black_24%)] dark:text-[color:color-mix(in_oklch,var(--primary),white_36%)]",
        secondary:
          "border-[color:color-mix(in_oklch,var(--border),var(--foreground)_10%)] bg-[color:color-mix(in_oklch,var(--muted),var(--background)_8%)] text-foreground",
        destructive:
          "border-[color:color-mix(in_oklch,var(--destructive),transparent_52%)] bg-[color:color-mix(in_oklch,var(--destructive),transparent_82%)] text-[color:color-mix(in_oklch,var(--destructive),black_16%)] dark:text-[color:color-mix(in_oklch,var(--destructive),white_38%)]",
        outline: "bg-[color:color-mix(in_oklch,var(--background),var(--muted)_6%)] text-foreground shadow-none",
        ghost: "border-transparent bg-[color:color-mix(in_oklch,var(--muted),transparent_76%)] text-muted-foreground shadow-none",
        link: "border-transparent bg-transparent p-0 text-primary shadow-none underline-offset-4",
      },
      tone: {
        neutral: "",
        info: "border-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),transparent_64%)] bg-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),transparent_82%)] text-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),black_18%)] dark:text-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),white_48%)]",
        success:
          "border-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),transparent_56%)] bg-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),transparent_78%)] text-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),black_14%)] dark:text-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),white_40%)]",
        warning:
          "border-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),transparent_52%)] bg-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),transparent_72%)] text-[color:color-mix(in_oklch,var(--aui-warning-foreground,var(--foreground)),black_6%)] dark:text-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),white_30%)]",
        danger:
          "border-[color:color-mix(in_oklch,var(--destructive),transparent_56%)] bg-[color:color-mix(in_oklch,var(--destructive),transparent_80%)] text-[color:color-mix(in_oklch,var(--destructive),black_14%)] dark:text-[color:color-mix(in_oklch,var(--destructive),white_38%)]",
        muted:
          "border-[color:color-mix(in_oklch,var(--border),var(--foreground)_8%)] bg-[color:color-mix(in_oklch,var(--muted),var(--background)_18%)] text-muted-foreground",
      },
      size: {
        sm: "min-h-5 px-2.5 py-0.5 text-[0.64rem]",
        default: "min-h-6 px-3 py-1 text-[0.7rem]",
        lg: "min-h-7 px-3.5 py-1 text-[0.78rem]",
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
      } as React.HTMLAttributes<HTMLSpanElement>,
      {
        "data-variant": variant ?? "default",
        "data-tone": tone ?? "neutral",
        "data-size": size ?? "default",
      } as React.HTMLAttributes<HTMLSpanElement>,
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
