"use client"

import * as React from "react"
import { move } from "@dnd-kit/helpers"
import {
  DragDropProvider,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/react"
import { isSortable, useSortable } from "@dnd-kit/react/sortable"
import { GripVerticalIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const KANBAN_CARD_PREFIX = "tembro-kanban-card:"
const KANBAN_COLUMN_PREFIX = "tembro-kanban-column:"

function getCardId(cardKey: string) {
  return `${KANBAN_CARD_PREFIX}${cardKey}`
}

function getColumnId(columnKey: string) {
  return `${KANBAN_COLUMN_PREFIX}${columnKey}`
}

function getCardKey(id: string) {
  return id.startsWith(KANBAN_CARD_PREFIX) ? id.slice(KANBAN_CARD_PREFIX.length) : id
}

function getColumnKey(id: string | number | symbol | undefined) {
  const value = id === undefined ? "" : String(id)
  return value.startsWith(KANBAN_COLUMN_PREFIX) ? value.slice(KANBAN_COLUMN_PREFIX.length) : value
}

export type KanbanCard = {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  extra?: React.ReactNode
  actions?: React.ReactNode
  disabled?: boolean
}

export type KanbanColumn = {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  cards: KanbanCard[]
  count?: React.ReactNode
  disabled?: boolean
}

export type KanbanCardRenderContext = {
  index: number
  isDragging: boolean
  isDropTarget: boolean
  handle: React.ReactNode
}

export type KanbanCardMove = {
  card: KanbanCard
  fromColumn: KanbanColumn
  toColumn: KanbanColumn
  fromIndex: number
  toIndex: number
}

export type KanbanBoardProps = Omit<React.ComponentProps<"div">, "defaultValue"> & {
  columns?: KanbanColumn[]
  defaultColumns?: KanbanColumn[]
  onColumnsChange?: (columns: KanbanColumn[], change: KanbanCardMove) => void
  onCardMove?: (change: KanbanCardMove) => void
  renderCard?: (
    card: KanbanCard,
    column: KanbanColumn,
    context: KanbanCardRenderContext
  ) => React.ReactNode
  onCardClick?: (card: KanbanCard, column: KanbanColumn) => void
  disabled?: boolean
  emptyColumn?: React.ReactNode
  dragHandleLabel?: (card: KanbanCard, column: KanbanColumn) => string
  columnClassName?: string
  cardClassName?: string
  overlayClassName?: string
}

type KanbanCardViewProps = {
  card: KanbanCard
  column: KanbanColumn
  index: number
  boardDisabled: boolean
  renderCard?: KanbanBoardProps["renderCard"]
  onCardClick?: KanbanBoardProps["onCardClick"]
  dragHandleLabel?: KanbanBoardProps["dragHandleLabel"]
  cardClassName?: string
}

function createCardMap(columns: KanbanColumn[]) {
  return new Map(
    columns.flatMap((column) =>
      column.cards.map((card) => [getCardId(card.key), card] as const)
    )
  )
}

function moveKanbanCards(
  columns: KanbanColumn[],
  event: DragOverEvent | DragEndEvent
) {
  const cardMap = createCardMap(columns)
  const cardIdsByColumn = Object.fromEntries(
    columns.map((column) => [
      getColumnId(column.key),
      column.cards.map((card) => getCardId(card.key)),
    ])
  )
  const movedIds = move(cardIdsByColumn, event)

  return columns.map((column) => ({
    ...column,
    cards: (movedIds[getColumnId(column.key)] ?? [])
      .map((id) => cardMap.get(String(id)))
      .filter((card): card is KanbanCard => Boolean(card)),
  }))
}

const KanbanDragHandle = React.forwardRef<HTMLButtonElement, {
  label: string
  disabled: boolean
}>(function KanbanDragHandle({ label, disabled }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className="inline-flex size-8 shrink-0 touch-none items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45"
      aria-label={label}
      disabled={disabled}
      onClick={(event) => event.stopPropagation()}
    >
      <GripVerticalIcon className="size-4" aria-hidden="true" />
    </button>
  )
})

function DefaultKanbanCard({ card, handle }: { card: KanbanCard; handle: React.ReactNode }) {
  return (
    <Card className="transition-colors hover:bg-muted/40">
      <CardHeader className="p-3 pb-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm">{card.title}</CardTitle>
          <div className="flex items-center gap-1">
            {card.extra}
            {handle}
          </div>
        </div>
      </CardHeader>
      {(card.description || card.meta) ? (
        <CardContent className="grid gap-2 p-3 pt-0 text-xs text-muted-foreground">
          {card.description}
          {card.meta ? <div>{card.meta}</div> : null}
        </CardContent>
      ) : null}
    </Card>
  )
}

function KanbanCardView({
  card,
  column,
  index,
  boardDisabled,
  renderCard,
  onCardClick,
  dragHandleLabel,
  cardClassName,
}: KanbanCardViewProps) {
  const disabled = boardDisabled || column.disabled === true || card.disabled === true
  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id: getCardId(card.key),
    index,
    group: getColumnId(column.key),
    type: "tembro-kanban-card",
    accept: "tembro-kanban-card",
    disabled,
    data: { cardKey: card.key, columnKey: column.key },
    transition: { duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)", idle: true },
  })
  const label = dragHandleLabel?.(card, column) ?? `Move ${String(card.title)}`
  const handle = (
    <KanbanDragHandle
      ref={handleRef as React.Ref<HTMLButtonElement>}
      label={label}
      disabled={disabled}
    />
  )
  const context: KanbanCardRenderContext = {
    index,
    isDragging,
    isDropTarget,
    handle,
  }

  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      data-slot="kanban-card"
      data-dragging={isDragging || undefined}
      data-drop-target={isDropTarget || undefined}
      data-disabled={disabled || undefined}
      role={onCardClick && !disabled ? "button" : undefined}
      tabIndex={onCardClick && !disabled ? 0 : undefined}
      aria-label={typeof card.title === "string" ? card.title : undefined}
      className={cn(
        "rounded-lg outline-none transition-[opacity,box-shadow]",
        onCardClick && !disabled && "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
        isDropTarget && "ring-2 ring-primary/30",
        isDragging && "opacity-30",
        disabled && "opacity-55",
        cardClassName
      )}
      onClick={() => {
        if (!disabled) onCardClick?.(card, column)
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || disabled || !onCardClick) return
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onCardClick(card, column)
        }
      }}
    >
      {renderCard?.(card, column, context) ?? <DefaultKanbanCard card={card} handle={handle} />}
    </article>
  )
}

function KanbanColumnView({
  column,
  boardDisabled,
  renderCard,
  onCardClick,
  dragHandleLabel,
  emptyColumn,
  columnClassName,
  cardClassName,
}: {
  column: KanbanColumn
  boardDisabled: boolean
  renderCard?: KanbanBoardProps["renderCard"]
  onCardClick?: KanbanBoardProps["onCardClick"]
  dragHandleLabel?: KanbanBoardProps["dragHandleLabel"]
  emptyColumn: React.ReactNode
  columnClassName?: string
  cardClassName?: string
}) {
  const { ref, isDropTarget } = useDroppable({
    id: getColumnId(column.key),
    type: "tembro-kanban-column",
    accept: "tembro-kanban-card",
    disabled: boardDisabled || column.disabled === true,
    collisionPriority: 1,
    data: { columnKey: column.key },
  })

  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      data-slot="kanban-column"
      data-drop-target={isDropTarget || undefined}
      data-disabled={column.disabled || undefined}
      aria-label={typeof column.title === "string" ? column.title : undefined}
      className={cn(
        "grid min-h-40 content-start gap-3 rounded-lg border bg-muted/35 p-3 transition-[border-color,background-color,box-shadow]",
        isDropTarget && "border-primary/60 bg-primary/5 ring-2 ring-primary/15",
        column.disabled && "opacity-60",
        columnClassName
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-0.5">
          <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
          {column.description ? <p className="text-xs text-muted-foreground">{column.description}</p> : null}
        </div>
        <div className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">
          {column.count ?? column.cards.length}
        </div>
      </div>
      <div className="grid min-h-16 content-start gap-2">
        {column.cards.length === 0 ? (
          <div className="grid min-h-20 place-items-center rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
            {emptyColumn}
          </div>
        ) : (
          column.cards.map((card, index) => (
            <KanbanCardView
              key={card.key}
              card={card}
              column={column}
              index={index}
              boardDisabled={boardDisabled}
              renderCard={renderCard}
              onCardClick={onCardClick}
              dragHandleLabel={dragHandleLabel}
              cardClassName={cardClassName}
            />
          ))
        )}
      </div>
    </section>
  )
}

function KanbanBoard({
  columns: columnsProp,
  defaultColumns = [],
  onColumnsChange,
  onCardMove,
  renderCard,
  onCardClick,
  disabled = false,
  emptyColumn = "Drop cards here.",
  dragHandleLabel,
  columnClassName,
  cardClassName,
  overlayClassName,
  className,
  "aria-label": ariaLabel = "Kanban board",
  ...props
}: KanbanBoardProps) {
  const [internalColumns, setInternalColumns] = React.useState<KanbanColumn[]>(() => defaultColumns)
  const [draftColumns, setDraftColumns] = React.useState<KanbanColumn[] | null>(null)
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null)
  const draftColumnsRef = React.useRef<KanbanColumn[] | null>(null)
  const columns = columnsProp ?? internalColumns
  const renderedColumns = draftColumns ?? columns
  const isControlled = columnsProp !== undefined

  function handleDragStart(event: DragStartEvent) {
    const source = event.operation.source
    if (!source) return

    const id = String(source.id)
    draftColumnsRef.current = columns
    setDraftColumns(columns)
    setActiveCardId(id)
  }

  function handleDragOver(event: DragOverEvent) {
    const source = event.operation.source
    if (!source || !isSortable(source)) return

    const currentColumns = draftColumnsRef.current ?? columns
    const nextColumns = moveKanbanCards(currentColumns, event)
    draftColumnsRef.current = nextColumns
    setDraftColumns(nextColumns)
  }

  function handleDragEnd(event: DragEndEvent) {
    const source = event.operation.source
    setActiveCardId(null)

    if (event.canceled || !source || !isSortable(source)) {
      draftColumnsRef.current = null
      setDraftColumns(null)
      return
    }

    const finalColumns = draftColumnsRef.current ?? moveKanbanCards(columns, event)
    const cardKey = getCardKey(String(source.id))
    const fromColumnKey = getColumnKey(source.initialGroup)
    const toColumnKey = getColumnKey(source.group)
    const fromColumn = columns.find((column) => column.key === fromColumnKey)
    const toColumn = finalColumns.find((column) => column.key === toColumnKey)
    const card = fromColumn?.cards.find((item) => item.key === cardKey)

    draftColumnsRef.current = null
    setDraftColumns(null)

    if (!card || !fromColumn || !toColumn) return

    const change: KanbanCardMove = {
      card,
      fromColumn,
      toColumn,
      fromIndex: source.initialIndex,
      toIndex: source.index,
    }
    if (!isControlled) setInternalColumns(finalColumns)
    onColumnsChange?.(finalColumns, change)
    onCardMove?.(change)
  }

  const activeEntry = activeCardId
    ? renderedColumns
        .flatMap((column) => column.cards.map((card) => ({ card, column })))
        .find(({ card }) => getCardId(card.key) === activeCardId)
    : undefined

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        {...props}
        role="group"
        aria-label={ariaLabel}
        data-slot="kanban-board"
        className={cn(
          "grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2",
          className
        )}
      >
        {renderedColumns.map((column) => (
          <KanbanColumnView
            key={column.key}
            column={column}
            boardDisabled={disabled}
            renderCard={renderCard}
            onCardClick={onCardClick}
            dragHandleLabel={dragHandleLabel}
            emptyColumn={emptyColumn}
            columnClassName={columnClassName}
            cardClassName={cardClassName}
          />
        ))}
      </div>

      <DragOverlay>
        {activeEntry ? (
          <div className={cn("min-w-64 rotate-1 opacity-95 shadow-2xl", overlayClassName)}>
            {renderCard?.(activeEntry.card, activeEntry.column, {
              index: activeEntry.column.cards.findIndex((card) => card.key === activeEntry.card.key),
              isDragging: true,
              isDropTarget: false,
              handle: null,
            }) ?? <DefaultKanbanCard card={activeEntry.card} handle={null} />}
          </div>
        ) : null}
      </DragOverlay>

    </DragDropProvider>
  )
}

export { KanbanBoard }
