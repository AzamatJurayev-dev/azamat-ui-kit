import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow,opacity] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary/80 bg-primary text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.18),0_12px_30px_color-mix(in_oklch,var(--primary),transparent_74%)] hover:bg-[color-mix(in_oklch,var(--primary),white_10%)] hover:shadow-[0_1px_0_rgba(255,255,255,0.22),0_16px_34px_color-mix(in_oklch,var(--primary),transparent_68%)]",
        outline:
          "border-border/90 bg-background/96 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] hover:border-ring/35 hover:bg-accent hover:text-foreground hover:shadow-[0_8px_18px_rgba(15,23,42,0.08)] aria-expanded:border-ring/35 aria-expanded:bg-accent aria-expanded:text-foreground dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/10 dark:hover:text-foreground",
        secondary:
          "border-border/60 bg-secondary text-secondary-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)] hover:text-secondary-foreground aria-expanded:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)] aria-expanded:text-secondary-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground/86 hover:border-border/60 hover:bg-accent/88 hover:text-foreground aria-expanded:border-border/60 aria-expanded:bg-accent/88 aria-expanded:text-foreground dark:text-foreground/84 dark:hover:bg-white/8",
        destructive:
          "border-destructive/30 bg-destructive text-white shadow-[0_1px_0_rgba(255,255,255,0.16),0_12px_30px_color-mix(in_oklch,var(--destructive),transparent_76%)] hover:bg-[color-mix(in_oklch,var(--destructive),black_8%)] hover:shadow-[0_1px_0_rgba(255,255,255,0.2),0_16px_34px_color-mix(in_oklch,var(--destructive),transparent_70%)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-7 gap-1 rounded-[min(var(--radius-lg),12px)] px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-lg),14px)] px-3 text-[0.82rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs":
          "size-7 rounded-[min(var(--radius-lg),12px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-lg),14px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
