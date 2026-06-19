import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type KanbanCard = {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  extra?: React.ReactNode
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
  columnClassName?: string
  cardClassName?: string
}

function KanbanBoard({ columns, renderCard, onCardClick, columnClassName, cardClassName, className, ...props }: KanbanBoardProps) {
  return (
    <div data-slot="kanban-board" className={cn("grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2", className)} {...props}>
      {columns.map((column) => (
        <KanbanColumnView
          key={column.key}
          column={column}
          renderCard={renderCard}
          onCardClick={onCardClick}
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
  columnClassName,
  cardClassName,
}: {
  column: KanbanColumn
  renderCard?: (card: KanbanCard, column: KanbanColumn) => React.ReactNode
  onCardClick?: (card: KanbanCard, column: KanbanColumn) => void
  columnClassName?: string
  cardClassName?: string
}) {
  return (
    <section data-slot="kanban-column" className={cn("grid min-h-40 content-start gap-3 rounded-lg border bg-muted/35 p-3", columnClassName)}>
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-0.5">
          <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
          {column.description && <p className="text-xs text-muted-foreground">{column.description}</p>}
        </div>
        <div className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">{column.count ?? column.cards.length}</div>
      </div>
      <div className="grid gap-2">
        {column.cards.map((card) => (
          renderCard?.(card, column) ?? (
            <Card
              key={card.key}
              data-slot="kanban-card"
              className={cn(
                "transition-colors hover:bg-muted/40",
                onCardClick && !card.disabled && "cursor-pointer",
                card.disabled && "pointer-events-none opacity-55",
                cardClassName
              )}
              onClick={() => onCardClick?.(card, column)}
            >
              <CardHeader className="p-3 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm">{card.title}</CardTitle>
                  {card.extra}
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
