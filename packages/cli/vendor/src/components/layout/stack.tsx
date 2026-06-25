import * as React from "react"

import { cn } from "@/lib/utils"

type StackGap = "xs" | "sm" | "md" | "lg" | "xl"
type InlineAlign = "start" | "center" | "end" | "stretch"
type InlineJustify = "start" | "center" | "end" | "between"
type GridColumns = 1 | 2 | 3 | 4 | 5 | 6

const stackGapClassName: Record<StackGap, string> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

const inlineAlignClassName: Record<InlineAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

const inlineJustifyClassName: Record<InlineJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}

const gridColumnClassName: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
}

export type StackProps = React.ComponentProps<"div"> & {
  gap?: StackGap
  splitAfter?: React.ReactNode
}

function Stack({ gap = "md", splitAfter, className, children, ...props }: StackProps) {
  return (
    <div data-slot="stack" className={cn("flex min-w-0 flex-col", stackGapClassName[gap], className)} {...props}>
      {children}
      {splitAfter ? <div data-slot="stack-split-after">{splitAfter}</div> : null}
    </div>
  )
}

export type InlineProps = React.ComponentProps<"div"> & {
  gap?: StackGap
  align?: InlineAlign
  justify?: InlineJustify
  wrap?: boolean
}

export type GridProps = React.ComponentProps<"div"> & {
  gap?: StackGap
  columns?: GridColumns
}

function Inline({
  gap = "md",
  align = "center",
  justify = "start",
  wrap = true,
  className,
  children,
  ...props
}: InlineProps) {
  return (
    <div
      data-slot="inline"
      className={cn(
        "flex min-w-0",
        stackGapClassName[gap],
        inlineAlignClassName[align],
        inlineJustifyClassName[justify],
        wrap ? "flex-wrap" : "flex-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function Grid({ gap = "md", columns = 2, className, children, ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn("grid min-w-0", stackGapClassName[gap], gridColumnClassName[columns], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Grid, Inline, Stack }
