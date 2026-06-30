import * as React from "react"
import { SearchXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type EmptySearchStateProps = React.ComponentProps<"div"> & {
  query?: string
  title?: React.ReactNode
  description?: React.ReactNode
  suggestions?: React.ReactNode
  onClear?: () => void
  clearLabel?: React.ReactNode
}

function EmptySearchState({
  query,
  title = "No results found",
  description,
  suggestions,
  onClear,
  clearLabel = "Clear search",
  className,
  ...props
}: EmptySearchStateProps) {
  return (
    <div
      data-slot="empty-search-state"
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center min-h-[300px]",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
        <SearchXIcon className="size-6" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight">
        {title} {query ? `for "${query}"` : ""}
      </h3>
      
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}

      {suggestions && (
        <div className="mt-4 text-sm text-muted-foreground">
          {suggestions}
        </div>
      )}

      {onClear && (
        <div className="mt-6">
          <Button variant="outline" onClick={onClear}>
            {clearLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export { EmptySearchState }
