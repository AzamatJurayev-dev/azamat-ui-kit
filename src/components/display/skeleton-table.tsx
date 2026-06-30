import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export type SkeletonTableProps = React.ComponentProps<"div"> & {
  rows?: number
  columns?: number
  showHeader?: boolean
  showToolbar?: boolean
}

function SkeletonTable({
  rows = 5,
  columns = 4,
  showHeader = true,
  showToolbar = false,
  className,
  ...props
}: SkeletonTableProps) {
  return (
    <div data-slot="skeleton-table" className={cn("w-full space-y-4", className)} {...props}>
      {showToolbar && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[250px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[80px]" />
          </div>
        </div>
      )}
      <div className="rounded-md border">
        {showHeader && (
          <div className="border-b bg-muted/50">
            <div className="flex px-4 py-3">
              {Array.from({ length: columns }).map((_, i) => (
                <div key={i} className="flex-1 pr-4">
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex px-4 py-3">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1 pr-4">
                  <Skeleton className={cn("h-4", colIndex === 0 ? "w-full max-w-[200px]" : "w-1/2")} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { SkeletonTable }
