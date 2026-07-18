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
import { CalendarDaysIcon, CheckIcon, GripVerticalIcon, PlusIcon } from "lucide-react"

import { Avatar } from "@/components/display/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  labels?: Array<React.ReactNode | { key: string; label: React.ReactNode; tone?: "neutral" | "info" | "success" | "warning" | "danger" | "muted" }>
  priority?: "low" | "medium" | "high" | "urgent"
  assignee?: { name: string; src?: string; fallback?: React.ReactNode }
  dueDate?: React.ReactNode
  selected?: boolean
  disabled?: boolean
}

export type KanbanColumn = {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  cards: KanbanCard[]
  count?: React.ReactNode
  limit?: number
  color?: string
  actions?: React.ReactNode
  footer?: React.ReactNode
  disabled?: boolean
}

export type KanbanCardRenderContext = {
  index: number
  isDragging: boolean
  isDropTarget: boolean
  selected: boolean
  selectControl: React.ReactNode
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
  canMoveCard?: (change: KanbanCardMove) => boolean
  renderCard?: (
    card: KanbanCard,
    column: KanbanColumn,
    context: KanbanCardRenderContext
  ) => React.ReactNode
  onCardClick?: (card: KanbanCard, column: KanbanColumn) => void
  onAddCard?: (column: KanbanColumn) => void
  onAddColumn?: () => void
  renderColumnHeader?: (column: KanbanColumn) => React.ReactNode
  renderColumnFooter?: (column: KanbanColumn) => React.ReactNode
  selectionMode?: "none" | "single" | "multiple"
  selectedCardKeys?: string[]
  defaultSelectedCardKeys?: string[]
  onSelectionChange?: (keys: string[], cards: KanbanCard[]) => void
  allowCrossColumn?: boolean
  allowReorder?: boolean
  density?: "compact" | "comfortable"
  columnWidth?: number | string
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
  selected: boolean
  selectionMode: NonNullable<KanbanBoardProps["selectionMode"]>
  onSelect: (card: KanbanCard) => void
  dragHandleLabel?: KanbanBoardProps["dragHandleLabel"]
  cardClassName?: string
  onNativeDragStart?: (source: NativeDragSource) => void
  onNativeDragEnd?: () => void
  onNativeDrop?: (target: NativeDropTarget) => void
}

type NativeDragSource = {
  cardKey: string
  columnKey: string
  index: number
}

type NativeDropTarget = {
  columnKey: string
  index?: number
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

function moveKanbanCardToTarget(
  columns: KanbanColumn[],
  source: NativeDragSource,
  target: NativeDropTarget
): { columns: KanbanColumn[]; change: KanbanCardMove } | null {
  const sourceColumn = columns.find((column) => column.key === source.columnKey)
  const targetColumn = columns.find((column) => column.key === target.columnKey)
  if (!sourceColumn || !targetColumn) return null

  const card = sourceColumn.cards.find((item) => item.key === source.cardKey)
  if (!card) return null

  const sourceIndex = sourceColumn.cards.findIndex((item) => item.key === source.cardKey)
  if (sourceIndex < 0) return null

  const targetCards = targetColumn.cards
  let targetIndex = target.index ?? targetCards.length
  if (sourceColumn.key === targetColumn.key && targetIndex > sourceIndex) {
    targetIndex -= 1
  }
  targetIndex = Math.max(0, Math.min(targetIndex, targetCards.length))
  if (sourceColumn.key === targetColumn.key && sourceIndex === targetIndex) return null

  const nextColumns = columns.map((column) => {
    if (column.key === sourceColumn.key) {
      return { ...column, cards: column.cards.filter((item) => item.key !== source.cardKey) }
    }
    return column
  }).map((column) => {
    if (column.key !== targetColumn.key) return column
    const nextCards = [...column.cards]
    nextCards.splice(targetIndex, 0, card)
    return { ...column, cards: nextCards }
  })

  const resolvedTargetColumn = nextColumns.find((column) => column.key === targetColumn.key) ?? targetColumn

  return {
    columns: nextColumns,
    change: {
      card,
      fromColumn: sourceColumn,
      toColumn: resolvedTargetColumn,
      fromIndex: sourceIndex,
      toIndex: targetIndex,
    },
  }
}

function getKanbanChange(before: KanbanColumn[], after: KanbanColumn[], cardKey: string): KanbanCardMove | null {
  const fromColumn = before.find((column) => column.cards.some((card) => card.key === cardKey))
  const toColumn = after.find((column) => column.cards.some((card) => card.key === cardKey))
  const card = fromColumn?.cards.find((item) => item.key === cardKey)
  if (!fromColumn || !toColumn || !card) return null
  return {
    card,
    fromColumn,
    toColumn,
    fromIndex: fromColumn.cards.findIndex((item) => item.key === cardKey),
    toIndex: toColumn.cards.findIndex((item) => item.key === cardKey),
  }
}

function isKanbanMoveAllowed(
  before: KanbanColumn[],
  after: KanbanColumn[],
  cardKey: string,
  allowCrossColumn: boolean,
  allowReorder: boolean,
  canMoveCard?: KanbanBoardProps["canMoveCard"]
) {
  const change = getKanbanChange(before, after, cardKey)
  if (!change) return false
  const crossColumn = change.fromColumn.key !== change.toColumn.key
  if (crossColumn && !allowCrossColumn) return false
  if (!crossColumn && !allowReorder) return false
  if (crossColumn && change.toColumn.limit !== undefined && change.toColumn.cards.length > change.toColumn.limit) return false
  return canMoveCard?.(change) ?? true
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

function DefaultKanbanCard({ card, handle, selectControl }: { card: KanbanCard; handle: React.ReactNode; selectControl?: React.ReactNode }) {
  const priorityTone = card.priority === "urgent" ? "danger" : card.priority === "high" ? "warning" : card.priority === "medium" ? "info" : "muted"
  return (
    <Card className="border-border/80 shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md">
      <CardHeader className="p-3.5 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-2">
            {selectControl}
            <CardTitle className="min-w-0 text-sm leading-5">{card.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {card.extra}
            {handle}
          </div>
        </div>
      </CardHeader>
      {(card.description || card.meta || card.labels?.length || card.priority || card.assignee || card.dueDate || card.actions) ? (
        <CardContent className="grid gap-3 p-3.5 pt-0 text-xs text-muted-foreground">
          {card.description ? <div className="line-clamp-3 leading-5">{card.description}</div> : null}
          {card.labels?.length || card.priority ? <div className="flex flex-wrap gap-1.5">
            {card.priority ? <Badge size="sm" tone={priorityTone} variant="soft" label={card.priority} showDot /> : null}
            {card.labels?.map((label, index) => React.isValidElement(label) ? React.cloneElement(label, { key: label.key ?? index }) : typeof label === "object" && label !== null && "key" in label ? <Badge key={label.key} size="sm" variant="outline" tone={label.tone} label={label.label} /> : <Badge key={index} size="sm" variant="outline" label={label} />)}
          </div> : null}
          {card.meta ? <div>{card.meta}</div> : null}
          {(card.assignee || card.dueDate) ? <div className="flex items-center justify-between gap-3 border-t pt-2.5">
            {card.assignee ? <div className="flex min-w-0 items-center gap-2"><Avatar size="xs" name={card.assignee.name} src={card.assignee.src} fallback={card.assignee.fallback} /><span className="truncate">{card.assignee.name}</span></div> : <span />}
            {card.dueDate ? <span className="inline-flex shrink-0 items-center gap-1"><CalendarDaysIcon className="size-3.5" />{card.dueDate}</span> : null}
          </div> : null}
          {card.actions ? <div className="flex flex-wrap items-center gap-2">{card.actions}</div> : null}
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
  selected,
  selectionMode,
  onSelect,
  dragHandleLabel,
  cardClassName,
  onNativeDragStart,
  onNativeDragEnd,
  onNativeDrop,
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
  const selectControl = selectionMode !== "none" ? (
    <button
      type="button"
      aria-label={`${selected ? "Deselect" : "Select"} ${String(card.title)}`}
      aria-pressed={selected}
      className={cn("mt-0.5 grid size-4 shrink-0 place-items-center rounded border bg-background text-primary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring", selected && "border-primary bg-primary text-primary-foreground")}
      onClick={(event) => { event.stopPropagation(); onSelect(card) }}
    >
      {selected ? <CheckIcon className="size-3" strokeWidth={3} /> : null}
    </button>
  ) : null
  const context: KanbanCardRenderContext = {
    index,
    isDragging,
    isDropTarget,
    selected,
    selectControl,
    handle,
  }

  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      data-slot="kanban-card"
      data-dragging={isDragging || undefined}
      data-drop-target={isDropTarget || undefined}
      data-disabled={disabled || undefined}
      role="group"
      aria-label={typeof card.title === "string" ? card.title : undefined}
      draggable={!disabled}
      className={cn(
        "rounded-lg outline-none transition-[opacity,box-shadow]",
        onCardClick && !disabled && "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring",
        isDropTarget && "ring-2 ring-primary/30",
        isDragging && "opacity-30",
        selected && "ring-2 ring-primary/35",
        disabled && "opacity-55",
        cardClassName
      )}
      onClick={() => {
        if (!disabled) onCardClick?.(card, column)
      }}
      onDragStart={(event) => {
        if (disabled) return
        const source = { cardKey: card.key, columnKey: column.key, index }
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/plain", JSON.stringify(source))
        onNativeDragStart?.(source)
      }}
      onDragEnd={onNativeDragEnd}
      onDragOver={(event) => {
        if (!disabled) event.preventDefault()
      }}
      onDrop={(event) => {
        if (disabled) return
        event.preventDefault()
        event.stopPropagation()
        onNativeDrop?.({ columnKey: column.key, index })
      }}
    >
      {renderCard?.(card, column, context) ?? <DefaultKanbanCard card={card} handle={handle} selectControl={selectControl} />}
    </article>
  )
}

function KanbanColumnView({
  column,
  boardDisabled,
  renderCard,
  onCardClick,
  selectedKeys,
  selectionMode,
  onSelect,
  onAddCard,
  renderColumnHeader,
  renderColumnFooter,
  dragHandleLabel,
  emptyColumn,
  columnClassName,
  cardClassName,
  onNativeDragStart,
  onNativeDragEnd,
  onNativeDrop,
  density,
}: {
  column: KanbanColumn
  boardDisabled: boolean
  renderCard?: KanbanBoardProps["renderCard"]
  onCardClick?: KanbanBoardProps["onCardClick"]
  selectedKeys: Set<string>
  selectionMode: NonNullable<KanbanBoardProps["selectionMode"]>
  onSelect: (card: KanbanCard) => void
  onAddCard?: KanbanBoardProps["onAddCard"]
  renderColumnHeader?: KanbanBoardProps["renderColumnHeader"]
  renderColumnFooter?: KanbanBoardProps["renderColumnFooter"]
  dragHandleLabel?: KanbanBoardProps["dragHandleLabel"]
  emptyColumn: React.ReactNode
  columnClassName?: string
  cardClassName?: string
  onNativeDragStart?: (source: NativeDragSource) => void
  onNativeDragEnd?: () => void
  onNativeDrop?: (target: NativeDropTarget) => void
  density: NonNullable<KanbanBoardProps["density"]>
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
      data-density={density}
      aria-label={typeof column.title === "string" ? column.title : undefined}
      className={cn(
        "grid min-h-40 content-start gap-3 rounded-lg border bg-muted/25 p-3 transition-[border-color,background-color,box-shadow] data-[density=compact]:gap-2 data-[density=compact]:p-2.5",
        isDropTarget && "border-primary/60 bg-primary/5 ring-2 ring-primary/15",
        column.disabled && "opacity-60",
        columnClassName
      )}
      onDragOver={(event) => {
        if (!(boardDisabled || column.disabled === true)) event.preventDefault()
      }}
      onDrop={(event) => {
        if (boardDisabled || column.disabled === true) return
        event.preventDefault()
        onNativeDrop?.({ columnKey: column.key, index: column.cards.length })
      }}
    >
      {renderColumnHeader?.(column) ?? <div className="flex items-start justify-between gap-3">
        {column.color ? <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ backgroundColor: column.color }} /> : null}
        <div className="grid gap-0.5">
          <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
          {column.description ? <p className="text-xs text-muted-foreground">{column.description}</p> : null}
        </div>
        <div className="ml-auto flex items-center gap-1">
          {column.actions}
          {onAddCard && !column.disabled ? <Button size="icon-xs" variant="ghost" iconOnly aria-label={`Add card to ${String(column.title)}`} onClick={() => onAddCard(column)}><PlusIcon /></Button> : null}
          <Badge size="sm" variant={column.limit !== undefined && column.cards.length >= column.limit ? "soft" : "outline"} tone={column.limit !== undefined && column.cards.length >= column.limit ? "warning" : "muted"} label={column.count ?? (column.limit === undefined ? column.cards.length : `${column.cards.length}/${column.limit}`)} />
        </div>
      </div>}
      <div className="grid min-h-16 content-start gap-2">
        {column.cards.length === 0 ? (
          <div className="grid min-h-20 place-items-center rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
            <span>{emptyColumn}</span>
            <span className="sr-only">No cards yet.</span>
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
              selected={selectedKeys.has(card.key) || card.selected === true}
              selectionMode={selectionMode}
              onSelect={onSelect}
              dragHandleLabel={dragHandleLabel}
              cardClassName={cardClassName}
              onNativeDragStart={onNativeDragStart}
              onNativeDragEnd={onNativeDragEnd}
              onNativeDrop={onNativeDrop}
            />
          ))
        )}
      </div>
      {renderColumnFooter?.(column) ?? column.footer ?? (onAddCard && !column.disabled ? <Button size="sm" variant="ghost" className="w-full justify-start" leftIcon={<PlusIcon />} onClick={() => onAddCard(column)}>Add task</Button> : null)}
    </section>
  )
}

function KanbanBoard({
  columns: columnsProp,
  defaultColumns = [],
  onColumnsChange,
  onCardMove,
  canMoveCard,
  renderCard,
  onCardClick,
  onAddCard,
  onAddColumn,
  renderColumnHeader,
  renderColumnFooter,
  selectionMode = "none",
  selectedCardKeys,
  defaultSelectedCardKeys = [],
  onSelectionChange,
  allowCrossColumn = true,
  allowReorder = true,
  density = "comfortable",
  columnWidth = 320,
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
  const nativeDragRef = React.useRef<NativeDragSource | null>(null)
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState(defaultSelectedCardKeys)
  const columns = columnsProp ?? internalColumns
  const renderedColumns = draftColumns ?? columns
  const isControlled = columnsProp !== undefined
  const resolvedSelectedKeys = selectedCardKeys ?? internalSelectedKeys
  const selectedKeySet = React.useMemo(() => new Set(resolvedSelectedKeys), [resolvedSelectedKeys])

  function updateSelection(card: KanbanCard) {
    if (selectionMode === "none" || card.disabled) return
    const next = selectionMode === "single"
      ? (selectedKeySet.has(card.key) ? [] : [card.key])
      : (selectedKeySet.has(card.key) ? resolvedSelectedKeys.filter((key) => key !== card.key) : [...resolvedSelectedKeys, card.key])
    if (selectedCardKeys === undefined) setInternalSelectedKeys(next)
    const allCards = columns.flatMap((column) => column.cards)
    onSelectionChange?.(next, allCards.filter((item) => next.includes(item.key)))
  }

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
    const cardKey = getCardKey(String(source.id))
    if (!isKanbanMoveAllowed(columns, nextColumns, cardKey, allowCrossColumn, allowReorder, canMoveCard)) return
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
    if (!isKanbanMoveAllowed(columns, finalColumns, card.key, allowCrossColumn, allowReorder, canMoveCard)) return
    if (!isControlled) setInternalColumns(finalColumns)
    onColumnsChange?.(finalColumns, change)
    onCardMove?.(change)
  }

  function handleNativeDrop(target: NativeDropTarget) {
    const source = nativeDragRef.current
    nativeDragRef.current = null
    if (!source) return

    const result = moveKanbanCardToTarget(columns, source, target)
    if (!result) return
    if (!isKanbanMoveAllowed(columns, result.columns, result.change.card.key, allowCrossColumn, allowReorder, canMoveCard)) return

    if (!isControlled) setInternalColumns(result.columns)
    onColumnsChange?.(result.columns, result.change)
    onCardMove?.(result.change)
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
        data-density={density}
        style={{ "--kanban-column-width": typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth, ...props.style } as React.CSSProperties}
        className={cn(
          "grid gap-4 sm:auto-cols-[var(--kanban-column-width)] sm:grid-flow-col sm:overflow-x-auto sm:pb-2",
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
            selectedKeys={selectedKeySet}
            selectionMode={selectionMode}
            onSelect={updateSelection}
            onAddCard={onAddCard}
            renderColumnHeader={renderColumnHeader}
            renderColumnFooter={renderColumnFooter}
            dragHandleLabel={dragHandleLabel}
            emptyColumn={emptyColumn}
            columnClassName={columnClassName}
            cardClassName={cardClassName}
            onNativeDragStart={(source) => { nativeDragRef.current = source }}
            onNativeDragEnd={() => { nativeDragRef.current = null }}
            onNativeDrop={handleNativeDrop}
            density={density}
          />
        ))}
        {onAddColumn ? <button type="button" className="flex min-h-32 items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/15 text-sm font-medium text-muted-foreground outline-none transition-colors hover:border-foreground/25 hover:bg-muted/35 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring" onClick={onAddColumn}><PlusIcon className="size-4" />Add column</button> : null}
      </div>

      <DragOverlay>
        {activeEntry ? (
          <div className={cn("min-w-64 rotate-1 opacity-95 shadow-2xl", overlayClassName)}>
            {renderCard?.(activeEntry.card, activeEntry.column, {
              index: activeEntry.column.cards.findIndex((card) => card.key === activeEntry.card.key),
              isDragging: true,
              isDropTarget: false,
              handle: null,
              selected: selectedKeySet.has(activeEntry.card.key),
              selectControl: null,
            }) ?? <DefaultKanbanCard card={activeEntry.card} handle={null} />}
          </div>
        ) : null}
      </DragOverlay>

    </DragDropProvider>
  )
}

export { KanbanBoard }
