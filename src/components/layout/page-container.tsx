import * as React from "react"

import { cn } from "@/lib/utils"

export type PageContainerSize = "default" | "sm" | "md" | "lg" | "xl" | "full"

export type PageContainerProps = React.ComponentProps<"div"> & {
  size?: PageContainerSize
}

const sizeClassName: Record<PageContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  default: "max-w-7xl",
  full: "max-w-none",
}

function PageContainer({ className, size = "default", ...props }: PageContainerProps) {
  return (
    <div
      data-slot="page-container"
      className={cn("mx-auto flex w-full flex-col gap-4", sizeClassName[size], className)}
      {...props}
    />
  )
}

export { PageContainer }
