import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export type SkeletonFormProps = React.ComponentProps<"div"> & {
  fields?: number
  showTitle?: boolean
  showActions?: boolean
  columns?: 1 | 2
}

function SkeletonForm({
  fields = 4,
  showTitle = true,
  showActions = true,
  columns = 1,
  className,
  ...props
}: SkeletonFormProps) {
  return (
    <div data-slot="skeleton-form" className={cn("w-full space-y-6", className)} {...props}>
      {showTitle && (
        <div className="space-y-2 border-b pb-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
      
      <div className={cn(
        "grid gap-6",
        columns === 2 && "sm:grid-cols-2"
      )}>
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {showActions && (
        <div className="flex justify-end gap-2 pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      )}
    </div>
  )
}

export { SkeletonForm }
