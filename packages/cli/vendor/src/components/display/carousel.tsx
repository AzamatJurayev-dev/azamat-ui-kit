import * as React from "react"

import { cn } from "@/lib/utils"

export type CarouselProps = React.ComponentProps<"div"> & {
  index?: number
  onIndexChange?: (index: number) => void
}

export type CarouselItemProps = React.ComponentProps<"div">

function Carousel({ index = 0, onIndexChange, className, children, ...props }: CarouselProps) {
  const items = React.Children.toArray(children)
  const activeIndex = Math.min(Math.max(index, 0), Math.max(items.length - 1, 0))

  return (
    <div data-slot="carousel" className={cn("grid gap-3", className)} {...props}>
      <div className="overflow-hidden rounded-xl border bg-card">
        {items[activeIndex]}
      </div>
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {items.map((_, itemIndex) => (
            <button key={itemIndex} type="button" aria-label={`Go to slide ${itemIndex + 1}`} className={cn("size-2.5 rounded-full bg-muted-foreground/30", itemIndex === activeIndex && "bg-primary")} onClick={() => onIndexChange?.(itemIndex)} />
          ))}
        </div>
      )}
    </div>
  )
}

function CarouselItem({ className, ...props }: CarouselItemProps) {
  return <div data-slot="carousel-item" className={cn("p-4", className)} {...props} />
}

export { Carousel, CarouselItem }
