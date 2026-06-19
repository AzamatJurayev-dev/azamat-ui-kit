import * as React from "react"

import { PriceTag } from "@/components/display/price-tag"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ProductTileProps = React.ComponentProps<"div"> & {
  title: React.ReactNode
  description?: React.ReactNode
  image?: React.ReactNode
  price?: React.ReactNode
  oldPrice?: React.ReactNode
  badge?: React.ReactNode
  action?: React.ReactNode
  disabled?: boolean
  onSelect?: () => void
}

function ProductTile({ title, description, image, price, oldPrice, badge, action, disabled = false, onSelect, className, ...props }: ProductTileProps) {
  return (
    <div
      data-slot="product-tile"
      data-disabled={disabled || undefined}
      className={cn("grid gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/35 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-55", onSelect && "cursor-pointer", className)}
      onClick={onSelect}
      {...props}
    >
      {image && <div className="aspect-square overflow-hidden rounded-md bg-muted">{image}</div>}
      <div className="grid gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="line-clamp-2 text-sm font-medium text-foreground">{title}</div>
          {badge && <Badge variant="secondary">{badge}</Badge>}
        </div>
        {description && <div className="line-clamp-2 text-xs text-muted-foreground">{description}</div>}
      </div>
      <div className="flex items-center justify-between gap-2">
        {price && <PriceTag price={price} oldPrice={oldPrice} size="sm" />}
        {action ?? <Button type="button" size="sm" onClick={(event) => event.stopPropagation()}>Add</Button>}
      </div>
    </div>
  )
}

export { ProductTile }
