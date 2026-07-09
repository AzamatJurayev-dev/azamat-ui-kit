"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
}

export type KanbanBoardProps = React.ComponentProps<"div"> & {
  columns: KanbanColumn[]
  renderCard?: (card: KanbanCard, column: KanbanColumn) => React.ReactNode
  onCardClick?: (card: KanbanCard, column: KanbanColumn) => void
  onCardMove?: (card: KanbanCard, fromColumn: KanbanColumn, toColumn: KanbanColumn) => void
  emptyColumn?: React.ReactNode | ((column: KanbanColumn) => React.ReactNode)
  columnClassName?: string
  cardClassName?: string
}

function KanbanBoard({ columns, renderCard, onCardClick, onCardMove, emptyColumn = "No cards yet.", columnClassName, cardClassName, className, ...props }: KanbanBoardProps) {
  const columnByKey = React.useMemo(() => new Map(columns.map((column) => [column.key, column])), [columns])

  return (
    <div data-slot="kanban-board" className={cn("grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2", className)} {...props}>
      {columns.map((column) => (
        <KanbanColumnView
          key={column.key}
          column={column}
          renderCard={renderCard}
          onCardClick={onCardClick}
          onCardMove={onCardMove}
          columnByKey={columnByKey}
          emptyColumn={emptyColumn}
          columnClassName={columnClassName}
          cardClassName={cardClassName}
        />
      ))}
    </div>
  )
}

function KanbanColumnView({
  column,
  renderCard,
  onCardClick,
  onCardMove,
  columnByKey,
  emptyColumn,
  columnClassName,
  cardClassName,
}: {
  column: KanbanColumn
  renderCard?: (card: KanbanCard, column: KanbanColumn) => React.ReactNode
  onCardClick?: (card: KanbanCard, column: KanbanColumn) => void
  onCardMove?: (card: KanbanCard, fromColumn: KanbanColumn, toColumn: KanbanColumn) => void
  columnByKey: Map<string, KanbanColumn>
  emptyColumn: React.ReactNode | ((column: KanbanColumn) => React.ReactNode)
  columnClassName?: string
  cardClassName?: string
}) {
  return (
    <section
      data-slot="kanban-column"
      className={cn("grid min-h-40 content-start gap-3 rounded-lg border bg-muted/35 p-3", columnClassName)}
      onDragOver={(event) => {
        if (onCardMove) event.preventDefault()
      }}
      onDrop={(event) => {
        const cardKey = event.dataTransfer.getData("application/x-tembro-kanban-card")
        const fromColumnKey = event.dataTransfer.getData("application/x-tembro-kanban-column")
        const fromColumn = columnByKey.get(fromColumnKey)
        const card = fromColumn?.cards.find((item) => item.key === cardKey)
        if (card && fromColumn && fromColumn.key !== column.key) onCardMove?.(card, fromColumn, column)
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-0.5">
          <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
          {column.description && <p className="text-xs text-muted-foreground">{column.description}</p>}
        </div>
        <div className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">{column.count ?? column.cards.length}</div>
      </div>
      <div className="grid gap-2">
        {column.cards.length === 0 ? (
          <div data-slot="kanban-column-empty" className="rounded-md border border-dashed bg-background/60 px-3 py-6 text-center text-sm text-muted-foreground">
            {typeof emptyColumn === "function" ? emptyColumn(column) : emptyColumn}
          </div>
        ) : column.cards.map((card) => (
          renderCard?.(card, column) ?? (
            <Card
              key={card.key}
              data-slot="kanban-card"
              role={onCardClick ? "button" : undefined}
              tabIndex={onCardClick && !card.disabled ? 0 : undefined}
              draggable={Boolean(onCardMove && !card.disabled)}
              className={cn(
                "transition-colors hover:bg-muted/40",
                onCardClick && !card.disabled && "cursor-pointer",
                onCardMove && !card.disabled && "cursor-grab active:cursor-grabbing",
                card.disabled && "pointer-events-none opacity-55",
                cardClassName
              )}
              onDragStart={(event) => {
                event.dataTransfer.setData("application/x-tembro-kanban-card", card.key)
                event.dataTransfer.setData("application/x-tembro-kanban-column", column.key)
                event.dataTransfer.effectAllowed = "move"
              }}
              onClick={() => onCardClick?.(card, column)}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === " ") && onCardClick && !card.disabled) {
                  event.preventDefault()
                  onCardClick(card, column)
                }
              }}
            >
              <CardHeader className="p-3 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm">{card.title}</CardTitle>
                  {(card.extra || card.actions) && <div className="flex shrink-0 items-center gap-1">{card.extra}{card.actions}</div>}
                </div>
              </CardHeader>
              {(card.description || card.meta) && (
                <CardContent className="grid gap-2 p-3 pt-0 text-xs text-muted-foreground">
                  {card.description}
                  {card.meta && <div>{card.meta}</div>}
                </CardContent>
              )}
            </Card>
          )
        ))}
      </div>
    </section>
  )
}

export { KanbanBoard }
