import * as React from "react"
import { XIcon } from "lucide-react"

import { PriceTag } from "@/components/display/price-tag"
import { QuantityStepper } from "@/components/inputs/quantity-stepper"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CartItemData = {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  price?: React.ReactNode
  quantity?: number
  image?: React.ReactNode
  disabled?: boolean
}

export type CartItemProps = React.ComponentProps<"div"> & {
  item: CartItemData
  onQuantityChange?: (item: CartItemData, quantity: number) => void
  onRemove?: (item: CartItemData) => void
}

function CartItem({ item, onQuantityChange, onRemove, className, ...props }: CartItemProps) {
  return (
    <div data-slot="cart-item" className={cn("flex items-start gap-3 rounded-lg border bg-card p-3", item.disabled && "opacity-55", className)} {...props}>
      {item.image && <div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted">{item.image}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{item.title}</div>
        {item.description && <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.description}</div>}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {item.price && <PriceTag price={item.price} size="sm" />}
          {typeof item.quantity === "number" && (
            <QuantityStepper value={item.quantity} disabled={item.disabled} onValueChange={(quantity) => onQuantityChange?.(item, quantity)} />
          )}
        </div>
      </div>
      {onRemove && (
        <Button type="button" variant="ghost" size="icon-xs" disabled={item.disabled} onClick={() => onRemove(item)}>
          <XIcon />
          <span className="sr-only">Remove item</span>
        </Button>
      )}
    </div>
  )
}

export type CartPanelProps = React.ComponentProps<"div"> & {
  items: CartItemData[]
  title?: React.ReactNode
  summary?: React.ReactNode
  footer?: React.ReactNode
  empty?: React.ReactNode
  onQuantityChange?: (item: CartItemData, quantity: number) => void
  onRemove?: (item: CartItemData) => void
}

function CartPanel({ items, title = "Cart", summary, footer, empty, onQuantityChange, onRemove, className, ...props }: CartPanelProps) {
  return (
    <div data-slot="cart-panel" className={cn("grid gap-3 rounded-lg border bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"}</div>
      </div>
      <div className="grid gap-2">
        {items.length === 0 ? (
          empty ?? <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Cart is empty</div>
        ) : (
          items.map((item) => <CartItem key={item.key} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />)
        )}
      </div>
      {summary && <div className="border-t pt-3">{summary}</div>}
      {footer && <div>{footer}</div>}
    </div>
  )
}

export { CartItem, CartPanel }
