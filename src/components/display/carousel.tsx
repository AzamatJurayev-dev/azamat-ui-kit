import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CarouselProps = React.ComponentProps<"div"> & {
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  loop?: boolean
  variant?: "default" | "hero" | "minimal"
  showDots?: boolean
  showArrows?: boolean
  keyboard?: boolean
  ariaLabel?: string
  previousLabel?: string
  nextLabel?: string
  swipeThreshold?: number
  autoplay?: boolean
  autoplayInterval?: number
  pauseOnHover?: boolean
  stopAutoplayOnInteraction?: boolean
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
  variant = "default",
  showDots = true,
  showArrows = true,
  keyboard = true,
  ariaLabel = "Carousel",
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  swipeThreshold = 44,
  autoplay = false,
  autoplayInterval = 4500,
  pauseOnHover = true,
  stopAutoplayOnInteraction = true,
  className,
  children,
  ...props
}: CarouselProps) {
  const items = React.Children.toArray(children)
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex)
  const touchStartXRef = React.useRef<number | null>(null)
  const [isHovered, setIsHovered] = React.useState(false)
  const [autoplayStopped, setAutoplayStopped] = React.useState(false)
  const controlled = index !== undefined
  const activeIndex = clampIndex(controlled ? index : internalIndex, items.length, loop)

  function setActiveIndex(nextIndex: number, reason: "manual" | "autoplay" = "manual") {
    const resolvedIndex = clampIndex(nextIndex, items.length, loop)
    if (!controlled) setInternalIndex(resolvedIndex)
    if (reason === "manual" && stopAutoplayOnInteraction) {
      setAutoplayStopped(true)
    }
    onIndexChange?.(resolvedIndex)
  }

  const canGoPrevious = loop || activeIndex > 0
  const canGoNext = loop || activeIndex < items.length - 1

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (touchStartXRef.current == null || items.length <= 1) return
    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current
    const deltaX = endX - touchStartXRef.current
    touchStartXRef.current = null

    if (Math.abs(deltaX) < swipeThreshold) return
    if (deltaX > 0 && canGoPrevious) setActiveIndex(activeIndex - 1)
    if (deltaX < 0 && canGoNext) setActiveIndex(activeIndex + 1)
  }

  React.useEffect(() => {
    if (!autoplay || items.length <= 1 || autoplayStopped) return
    if (pauseOnHover && isHovered) return

    const timer = window.setInterval(() => {
      if (!loop && activeIndex >= items.length - 1) {
        setActiveIndex(0, "autoplay")
        return
      }
      setActiveIndex(activeIndex + 1, "autoplay")
    }, autoplayInterval)

    return () => {
      window.clearInterval(timer)
    }
  }, [activeIndex, autoplay, autoplayInterval, autoplayStopped, isHovered, items.length, loop, pauseOnHover])

  return (
    <div
      data-slot="carousel"
      data-variant={variant}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={keyboard ? 0 : undefined}
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className={cn(
        "relative overflow-hidden rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-card shadow-[var(--aui-card-shadow,0_12px_32px_rgba(15,23,42,0.08))]",
        variant === "hero" && "min-h-72",
        variant === "minimal" && "rounded-[var(--radius-md)] shadow-none"
      )}>
        <div className="transition-transform duration-300 ease-out" aria-live="polite">
          {items[activeIndex]}
        </div>
        {showArrows && items.length > 1 ? (
          <>
            <Button
              type="button"
              variant={variant === "hero" ? "default" : "secondary"}
              size="icon-sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
              disabled={!canGoPrevious}
              aria-label={previousLabel}
              onClick={() => setActiveIndex(activeIndex - 1)}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              type="button"
              variant={variant === "hero" ? "default" : "secondary"}
              size="icon-sm"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
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
        <div className="flex items-center justify-center gap-2" role="tablist" aria-label={`${ariaLabel} slides`}>
          {items.map((_, itemIndex) => (
            <button
              key={itemIndex}
              type="button"
              role="tab"
              aria-label={`Go to slide ${itemIndex + 1}`}
              aria-selected={itemIndex === activeIndex}
              className={cn(
                "h-2.5 rounded-full bg-muted-foreground/30 transition-[width,background-color,opacity] hover:bg-muted-foreground/55",
                itemIndex === activeIndex ? "w-7 bg-primary" : "w-2.5"
              )}
              onClick={() => setActiveIndex(itemIndex)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CarouselItem({ className, ...props }: CarouselItemProps) {
  return <div data-slot="carousel-item" className={cn("min-h-40 p-5 sm:p-6", className)} {...props} />
}

export { Carousel, CarouselItem }
