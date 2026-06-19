import * as React from "react"

import { cn } from "@/lib/utils"

export type SkeletonProps = React.ComponentProps<"div"> & {
  rounded?: "sm" | "md" | "lg" | "full"
  animated?: boolean
}

const roundedClassName: Record<NonNullable<SkeletonProps["rounded"]>, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
}

function Skeleton({ rounded = "md", animated = true, className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("bg-muted", animated && "animate-pulse", roundedClassName[rounded], className)}
      {...props}
    />
  )
}

export type SkeletonTextProps = React.ComponentProps<"div"> & {
  rows?: number
  lastRowWidth?: string
}

function SkeletonText({ rows = 3, lastRowWidth = "65%", className, ...props }: SkeletonTextProps) {
  return (
    <div data-slot="skeleton-text" className={cn("grid gap-2", className)} {...props}>
      {Array.from({ length: Math.max(rows, 1) }, (_, index) => (
        <Skeleton
          key={index}
          className="h-4 w-full"
          style={index === rows - 1 ? { width: lastRowWidth } : undefined}
        />
      ))}
    </div>
  )
}

export type SkeletonCardProps = React.ComponentProps<"div"> & {
  avatar?: boolean
  rows?: number
}

function SkeletonCard({ avatar = false, rows = 3, className, ...props }: SkeletonCardProps) {
  return (
    <div data-slot="skeleton-card" className={cn("rounded-lg border bg-card p-4", className)} {...props}>
      <div className="flex gap-3">
        {avatar && <Skeleton rounded="full" className="size-10 shrink-0" />}
        <div className="grid flex-1 gap-3">
          <Skeleton className="h-5 w-1/2" />
          <SkeletonText rows={rows} />
        </div>
      </div>
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonText }
