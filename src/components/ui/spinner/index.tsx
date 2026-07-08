import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export type SpinnerProps = React.ComponentProps<"span"> & {
  size?: "xs" | "sm" | "md" | "lg"
  label?: string
}

const spinnerSizeClassName = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
}

function Spinner({ size = "md", label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <Loader2Icon className={cn("animate-spin", spinnerSizeClassName[size])} />
    </span>
  )
}

export type LoadingOverlayProps = React.ComponentProps<"div"> & {
  loading?: boolean
  label?: string
}

function LoadingOverlay({ loading = true, label, className, children, ...props }: LoadingOverlayProps) {
  return (
    <div data-slot="loading-overlay" className={cn("relative", className)} {...props}>
      {children}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-inherit bg-background/70 backdrop-blur-sm">
          <Spinner label={label} />
        </div>
      )}
    </div>
  )
}

export { LoadingOverlay, Spinner }
