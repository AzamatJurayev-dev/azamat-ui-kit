import * as React from "react"
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual"

import { cn } from "@/lib/utils"

export type VirtualListRange = {
  startIndex: number
  endIndex: number
  visibleItems: VirtualItem[]
}

export type VirtualListRenderContext = {
  index: number
  virtualItem: VirtualItem
}

export type VirtualListItemKey = string | number

export type VirtualListProps<TItem> = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  items: TItem[]
  renderItem: (item: TItem, context: VirtualListRenderContext) => React.ReactNode
  getItemKey?: (item: TItem, index: number) => VirtualListItemKey
  estimateSize?: number | ((index: number) => number)
  overscan?: number
  height?: number | string
  gap?: number
  empty?: React.ReactNode
  itemClassName?: string | ((item: TItem, context: VirtualListRenderContext) => string)
  onRangeChange?: (range: VirtualListRange) => void
  scrollToIndex?: number
  scrollToAlignment?: "auto" | "start" | "center" | "end"
}

function createInitialVirtualItems(
  count: number,
  viewportHeight: number,
  overscan: number,
  gap: number,
  estimateSize: (index: number) => number,
  getItemKey: (index: number) => VirtualListItemKey
) {
  const items: VirtualItem[] = []
  let start = 0
  const targetHeight = viewportHeight + overscan * estimateSize(0)

  for (let index = 0; index < count && start < targetHeight; index += 1) {
    const size = estimateSize(index)
    items.push({
      key: getItemKey(index),
      index,
      start,
      end: start + size,
      size,
      lane: 0,
    })
    start += size + gap
  }

  return items
}

function VirtualList<TItem>({
  items,
  renderItem,
  getItemKey,
  estimateSize = 48,
  overscan = 6,
  height = 400,
  gap = 8,
  empty = "No items.",
  itemClassName,
  onRangeChange,
  scrollToIndex,
  scrollToAlignment = "auto",
  className,
  style,
  "aria-label": ariaLabel = "Virtual list",
  ...props
}: VirtualListProps<TItem>) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const estimateItemSize = React.useCallback(
    (index: number) =>
      typeof estimateSize === "function" ? estimateSize(index) : estimateSize,
    [estimateSize]
  )
  const itemKey = React.useCallback(
    (index: number) => getItemKey?.(items[index], index) ?? index,
    [getItemKey, items]
  )

  // TanStack Virtual returns imperative helpers that React Compiler flags by design.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: estimateItemSize,
    getItemKey: itemKey,
    overscan,
    gap,
    initialRect: {
      width: 0,
      height: typeof height === "number" ? height : 400,
    },
    onChange(instance) {
      if (!onRangeChange) return
      const visibleItems = instance.getVirtualItems()
      onRangeChange({
        startIndex: visibleItems[0]?.index ?? -1,
        endIndex: visibleItems.at(-1)?.index ?? -1,
        visibleItems,
      })
    },
  })

  React.useEffect(() => {
    if (scrollToIndex === undefined || scrollToIndex < 0 || scrollToIndex >= items.length) return
    virtualizer.scrollToIndex(scrollToIndex, { align: scrollToAlignment })
  }, [items.length, scrollToAlignment, scrollToIndex, virtualizer])

  const virtualItems = virtualizer.getVirtualItems()
  const renderedVirtualItems = virtualItems.length > 0
    ? virtualItems
    : createInitialVirtualItems(
        items.length,
        typeof height === "number" ? height : 400,
        overscan,
        gap,
        estimateItemSize,
        itemKey
      )

  return (
    <div
      {...props}
      ref={scrollRef}
      role="list"
      aria-label={ariaLabel}
      aria-setsize={items.length}
      data-slot="virtual-list"
      className={cn("relative overflow-auto overscroll-contain", className)}
      style={{ height, ...style }}
    >
      {items.length === 0 ? (
        <div className="grid min-h-full place-items-center p-6 text-center text-sm text-muted-foreground">
          {empty}
        </div>
      ) : (
        <div
          className="relative w-full"
          style={{ height: virtualizer.getTotalSize() }}
        >
          {renderedVirtualItems.map((virtualItem) => {
            const item = items[virtualItem.index]
            const context: VirtualListRenderContext = {
              index: virtualItem.index,
              virtualItem,
            }
            const resolvedItemClassName =
              typeof itemClassName === "function" ? itemClassName(item, context) : itemClassName

            return (
              <div
                key={virtualItem.key}
                ref={virtualizer.measureElement}
                role="listitem"
                aria-posinset={virtualItem.index + 1}
                aria-setsize={items.length}
                data-index={virtualItem.index}
                data-slot="virtual-list-item"
                className={cn("absolute left-0 top-0 w-full", resolvedItemClassName)}
                style={{ transform: `translateY(${virtualItem.start}px)` }}
              >
                {renderItem(item, context)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { VirtualList }
