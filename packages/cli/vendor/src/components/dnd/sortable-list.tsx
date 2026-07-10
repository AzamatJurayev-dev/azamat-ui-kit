import * as React from "react"
import { arrayMove } from "@dnd-kit/helpers"
import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/react"
import { isSortable, useSortable } from "@dnd-kit/react/sortable"
import { GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type SortableListChange<TItem> = {
  activeId: string
  overId: string | null
  oldIndex: number
  newIndex: number
  item: TItem
}

export type SortableListRenderContext = {
  index: number
  isDragging: boolean
  isDropTarget: boolean
  handle: React.ReactNode
}

export type SortableListProps<TItem> = Omit<
  React.ComponentProps<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  items?: TItem[]
  defaultItems?: TItem[]
  getItemId: (item: TItem) => string
  getItemLabel?: (item: TItem) => string
  renderItem: (item: TItem, context: SortableListRenderContext) => React.ReactNode
  onItemsChange?: (items: TItem[], change: SortableListChange<TItem>) => void
  disabled?: boolean | ((item: TItem) => boolean)
  orientation?: "vertical" | "horizontal" | "grid"
  empty?: React.ReactNode
  handleLabel?: (item: TItem) => string
  itemClassName?: string | ((item: TItem, context: SortableListRenderContext) => string)
  overlayClassName?: string
}

type SortableListItemProps<TItem> = {
  item: TItem
  index: number
  itemId: string
  label: string
  disabled: boolean
  renderItem: SortableListProps<TItem>["renderItem"]
  itemClassName: SortableListProps<TItem>["itemClassName"]
  handleLabel: string
}

function SortableListItem<TItem>({
  item,
  index,
  itemId,
  label,
  disabled,
  renderItem,
  itemClassName,
  handleLabel,
}: SortableListItemProps<TItem>) {
  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id: itemId,
    index,
    type: "tembro-sortable-list-item",
    accept: "tembro-sortable-list-item",
    disabled,
    transition: { duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)", idle: true },
  })
  const handle = (
    <button
      ref={handleRef as React.Ref<HTMLButtonElement>}
      type="button"
      className="inline-flex size-8 shrink-0 touch-none items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45"
      aria-label={handleLabel}
      disabled={disabled}
    >
      <GripVerticalIcon className="size-4" aria-hidden="true" />
    </button>
  )
  const context: SortableListRenderContext = {
    index,
    isDragging,
    isDropTarget,
    handle,
  }
  const resolvedItemClassName =
    typeof itemClassName === "function" ? itemClassName(item, context) : itemClassName

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      role="listitem"
      aria-label={label}
      data-slot="sortable-list-item"
      data-dragging={isDragging || undefined}
      data-drop-target={isDropTarget || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-lg border bg-card p-2 shadow-sm transition-[border-color,box-shadow,opacity]",
        isDropTarget && "border-primary/60 ring-2 ring-primary/15",
        isDragging && "opacity-35",
        disabled && "opacity-55",
        resolvedItemClassName
      )}
    >
      {handle}
      <div className="min-w-0 flex-1">{renderItem(item, context)}</div>
    </div>
  )
}

function SortableList<TItem>({
  items: itemsProp,
  defaultItems = [],
  getItemId,
  getItemLabel,
  renderItem,
  onItemsChange,
  disabled = false,
  orientation = "vertical",
  empty = "No items.",
  handleLabel,
  itemClassName,
  overlayClassName,
  className,
  "aria-label": ariaLabel = "Sortable list",
  ...props
}: SortableListProps<TItem>) {
  const [internalItems, setInternalItems] = React.useState<TItem[]>(() => defaultItems)
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const items = itemsProp ?? internalItems
  const isControlled = itemsProp !== undefined
  const itemById = React.useMemo(
    () => new Map(items.map((item) => [getItemId(item), item] as const)),
    [getItemId, items]
  )

  function isItemDisabled(item: TItem) {
    return typeof disabled === "function" ? disabled(item) : disabled
  }

  function getLabel(item: TItem) {
    return getItemLabel?.(item) ?? getItemId(item)
  }

  function handleDragStart(event: DragStartEvent) {
    const source = event.operation.source
    if (!source) return

    const id = String(source.id)
    setActiveId(id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const source = event.operation.source
    const target = event.operation.target
    setActiveId(null)

    if (event.canceled || !source || !isSortable(source)) {
      return
    }

    const oldIndex = source.initialIndex
    const newIndex = source.index
    const item = items[oldIndex]
    if (!item || oldIndex === newIndex) {
      return
    }

    const nextItems = arrayMove(items, oldIndex, newIndex)
    const activeItemId = getItemId(item)
    if (!isControlled) setInternalItems(nextItems)
    onItemsChange?.(nextItems, {
      activeId: activeItemId,
      overId: target ? String(target.id) : null,
      oldIndex,
      newIndex,
      item,
    })
  }

  const activeItem = activeId ? itemById.get(activeId) : undefined

  return (
    <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        {...props}
        role="list"
        aria-label={ariaLabel}
        data-slot="sortable-list"
        data-orientation={orientation}
        className={cn(
          "gap-2",
          orientation === "vertical" && "grid",
          orientation === "horizontal" && "flex overflow-x-auto pb-2",
          orientation === "grid" && "grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
          className
        )}
      >
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            {empty}
          </div>
        ) : (
          items.map((item, index) => {
            const id = getItemId(item)
            const label = getLabel(item)
            return (
              <SortableListItem
                key={id}
                item={item}
                index={index}
                itemId={id}
                label={label}
                disabled={isItemDisabled(item)}
                renderItem={renderItem}
                itemClassName={itemClassName}
                handleLabel={handleLabel?.(item) ?? `Move ${label}`}
              />
            )
          })
        )}
      </div>

      <DragOverlay>
        {activeItem ? (
          <div
            className={cn(
              "flex min-w-56 items-center gap-2 rounded-lg border bg-card p-2 shadow-xl ring-1 ring-primary/15",
              overlayClassName
            )}
          >
            <GripVerticalIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              {renderItem(activeItem, {
                index: items.findIndex((item) => getItemId(item) === activeId),
                isDragging: true,
                isDropTarget: false,
                handle: null,
              })}
            </div>
          </div>
        ) : null}
      </DragOverlay>

    </DragDropProvider>
  )
}

export { SortableList }
