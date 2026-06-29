import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-transparent font-semibold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,transform] focus-visible:ring-0 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        ghost: "",
        link: "border-transparent bg-transparent p-0 shadow-none underline-offset-4",
      },
      tone: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        danger: "",
      },
      size: {
        sm: "min-h-5 px-2.5 py-0.5 text-[0.64rem]",
        default: "min-h-6 px-3 py-1 text-[0.68rem]",
        lg: "min-h-7 px-3.5 py-1 text-[0.75rem]",
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
