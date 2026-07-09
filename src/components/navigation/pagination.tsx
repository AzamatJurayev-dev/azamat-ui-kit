import * as React from "react"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type PaginationItem = number | "ellipsis"

export type PaginationLabels = {
  first?: string
  previous?: string
  next?: string
  last?: string
  page?: (page: number) => string
}

export type PaginationProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showEdges?: boolean
  disabled?: boolean
  labels?: PaginationLabels
  compact?: boolean
  totalCount?: number
  pageSize?: number
  pageSizeOptions?: number[]
  onPageSizeChange?: (pageSize: number) => void
  showSummary?: boolean
}

function range(start: number, end: number) {
  const length = Math.max(end - start + 1, 0)
  return Array.from({ length }, (_, index) => index + start)
}

function getPaginationItems(
  page: number,
  pageCount: number,
  siblingCount = 1
): PaginationItem[] {
  const totalPageNumbers = siblingCount * 2 + 5

  if (pageCount <= totalPageNumbers) {
    return range(1, pageCount)
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1)
  const rightSiblingIndex = Math.min(page + siblingCount, pageCount)

  const shouldShowLeftEllipsis = leftSiblingIndex > 2
  const shouldShowRightEllipsis = rightSiblingIndex < pageCount - 1

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = siblingCount * 2 + 3
    return [...range(1, leftItemCount), "ellipsis", pageCount]
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = siblingCount * 2 + 3
    return [1, "ellipsis", ...range(pageCount - rightItemCount + 1, pageCount)]
  }

  return [1, "ellipsis", ...range(leftSiblingIndex, rightSiblingIndex), "ellipsis", pageCount]
}

function Pagination({
  className,
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  disabled = false,
  labels,
  compact = false,
  totalCount,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  showSummary = false,
  ...props
}: PaginationProps) {
  const safePageCount = Math.max(pageCount, 1)
  const currentPage = Math.min(Math.max(page, 1), safePageCount)
  const items = getPaginationItems(currentPage, safePageCount, siblingCount)

  const goToPage = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(nextPage, 1), safePageCount)

    if (clampedPage !== currentPage) {
      onPageChange(clampedPage)
    }
  }

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1 rounded-full border border-border/70 bg-background/76 p-1 shadow-none backdrop-blur",
        className
      )}
      {...props}
    >
      {showSummary && totalCount !== undefined && pageSize ? (
        <div className="px-2 text-xs text-muted-foreground">
          {Math.min((currentPage - 1) * pageSize + 1, totalCount)}-{Math.min(currentPage * pageSize, totalCount)} of {totalCount}
        </div>
      ) : null}
      {showEdges && (
        <Button
          type="button"
          variant="outline"
          size={compact ? "icon-xs" : "icon-sm"}
          disabled={disabled || currentPage <= 1}
          aria-label={labels?.first ?? "First page"}
          onClick={() => goToPage(1)}
        >
          <ChevronFirstIcon />
        </Button>
      )}

      <Button
        type="button"
        variant="outline"
        size={compact ? "icon-xs" : "icon-sm"}
        disabled={disabled || currentPage <= 1}
        aria-label={labels?.previous ?? "Previous page"}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      {items.map((item, index) => {
        if (item === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              data-slot="pagination-ellipsis"
              className="flex size-8 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontalIcon className="size-4" />
              <span className="sr-only">More pages</span>
            </span>
          )
        }

        return (
          <Button
            key={item}
            type="button"
            variant={item === currentPage ? "default" : "outline"}
            size={compact ? "icon-xs" : "icon-sm"}
            disabled={disabled}
            aria-current={item === currentPage ? "page" : undefined}
            aria-label={labels?.page?.(item) ?? `Page ${item}`}
            onClick={() => goToPage(item)}
            className={cn(item !== currentPage && "border-border/70 bg-background/80 shadow-none")}
          >
            {item}
          </Button>
        )
      })}

      <Button
        type="button"
        variant="outline"
        size={compact ? "icon-xs" : "icon-sm"}
        disabled={disabled || currentPage >= safePageCount}
        aria-label={labels?.next ?? "Next page"}
        onClick={() => goToPage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      {showEdges && (
        <Button
          type="button"
          variant="outline"
          size={compact ? "icon-xs" : "icon-sm"}
          disabled={disabled || currentPage >= safePageCount}
          aria-label={labels?.last ?? "Last page"}
          onClick={() => goToPage(safePageCount)}
        >
          <ChevronLastIcon />
        </Button>
      )}
      {pageSizeOptions && pageSize && onPageSizeChange ? (
        <label className="ml-1 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-3 py-1 text-xs text-muted-foreground">
          <span>Rows</span>
          <select
            className="bg-transparent text-foreground outline-none"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            disabled={disabled}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      ) : null}
    </nav>
  )
}

export { Pagination, getPaginationItems }
