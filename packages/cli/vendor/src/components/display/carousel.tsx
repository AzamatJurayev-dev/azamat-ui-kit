import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CarouselProps = React.ComponentProps<"div"> & {
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  loop?: boolean
  showDots?: boolean
  showArrows?: boolean
  keyboard?: boolean
  previousLabel?: string
  nextLabel?: string
}

export type CarouselItemProps = React.ComponentProps<"div">

function clampIndex(index: number, length: number, loop: boolean) {
  if (length <= 0) return 0
  if (loop) return ((index % length) + length) % length
  return Math.min(Math.max(index, 0), length - 1)
}

function Carousel({
  index,
  defaultIndex = 0,
  onIndexChange,
  loop = false,
  showDots = true,
  showArrows = true,
  keyboard = true,
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  className,
  children,
  ...props
}: CarouselProps) {
  const items = React.Children.toArray(children)
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex)
  const controlled = index !== undefined
  const activeIndex = clampIndex(controlled ? index : internalIndex, items.length, loop)

  function setActiveIndex(nextIndex: number) {
    const resolvedIndex = clampIndex(nextIndex, items.length, loop)
    if (!controlled) setInternalIndex(resolvedIndex)
    onIndexChange?.(resolvedIndex)
  }

  const canGoPrevious = loop || activeIndex > 0
  const canGoNext = loop || activeIndex < items.length - 1

  return (
    <div
      data-slot="carousel"
      className={cn("grid gap-3", className)}
      onKeyDown={(event) => {
        if (!keyboard || items.length <= 1) return
        if (event.key === "ArrowLeft" && canGoPrevious) {
          event.preventDefault()
          setActiveIndex(activeIndex - 1)
        }
        if (event.key === "ArrowRight" && canGoNext) {
          event.preventDefault()
          setActiveIndex(activeIndex + 1)
        }
      }}
      {...props}
    >
      <div className="relative overflow-hidden rounded-xl border bg-card">
        {items[activeIndex]}
        {showArrows && items.length > 1 ? (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              className="absolute left-3 top-3"
              disabled={!canGoPrevious}
              aria-label={previousLabel}
              onClick={() => setActiveIndex(activeIndex - 1)}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              className="absolute right-3 top-3"
              disabled={!canGoNext}
              aria-label={nextLabel}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              <ChevronRightIcon />
            </Button>
          </>
        ) : null}
      </div>
      {showDots && items.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {items.map((_, itemIndex) => (
            <button
              key={itemIndex}
              type="button"
              aria-label={`Go to slide ${itemIndex + 1}`}
              aria-pressed={itemIndex === activeIndex}
              className={cn("size-2.5 rounded-full bg-muted-foreground/30 transition-colors", itemIndex === activeIndex && "bg-primary")}
              onClick={() => setActiveIndex(itemIndex)}
            />
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
