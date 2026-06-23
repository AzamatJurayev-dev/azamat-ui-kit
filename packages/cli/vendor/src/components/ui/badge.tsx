import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex min-h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.01em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary text-primary-foreground shadow-[0_8px_18px_color-mix(in_oklch,var(--primary),transparent_82%)] [a]:hover:bg-primary/88",
        secondary:
          "border-border/70 bg-secondary text-secondary-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] [a]:hover:bg-secondary/84",
        destructive:
          "border-destructive/18 bg-destructive/12 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/18",
        outline:
          "border-border/85 bg-background/88 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] [a]:hover:bg-muted [a]:hover:text-foreground",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
