import * as React from "react"

import { cn } from "@/lib/utils"

export type PriceTagProps = React.ComponentProps<"div"> & {
  price: React.ReactNode
  oldPrice?: React.ReactNode
  discount?: React.ReactNode
  currency?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

function PriceTag({ price, oldPrice, discount, currency, size = "md", className, ...props }: PriceTagProps) {
  return (
    <div data-slot="price-tag" className={cn("inline-flex flex-wrap items-baseline gap-1.5", className)} {...props}>
      {currency && <span className="text-sm text-muted-foreground">{currency}</span>}
      <span className={cn("font-semibold text-foreground", size === "sm" && "text-base", size === "md" && "text-xl", size === "lg" && "text-2xl")}>{price}</span>
      {oldPrice && <span className="text-sm text-muted-foreground line-through">{oldPrice}</span>}
      {discount && <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">{discount}</span>}
    </div>
  )
}

export { PriceTag }
