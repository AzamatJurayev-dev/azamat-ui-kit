import * as React from "react"

import { cn } from "@/lib/utils"

export type TextProps = React.ComponentProps<"p"> & {
  muted?: boolean
  size?: "sm" | "default" | "lg"
}

export type HeadingProps = React.ComponentProps<"h2"> & {
  level?: 1 | 2 | 3 | 4
}

function Text({ muted, size = "default", className, ...props }: TextProps) {
  return <p className={cn(size === "sm" && "text-sm", size === "lg" && "text-lg", muted && "text-muted-foreground", className)} {...props} />
}

function Heading({ level = 2, className, ...props }: HeadingProps) {
  const Component = `h${level}` as "h1" | "h2" | "h3" | "h4"
  return <Component className={cn("font-semibold tracking-tight", level === 1 && "text-4xl", level === 2 && "text-3xl", level === 3 && "text-2xl", level === 4 && "text-xl", className)} {...props} />
}

function Blockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return <blockquote className={cn("border-l-4 pl-4 italic text-muted-foreground", className)} {...props} />
}

function Mark({ className, ...props }: React.ComponentProps<"mark">) {
  return <mark className={cn("rounded bg-amber-100 px-1 py-0.5 text-amber-950 dark:bg-amber-900 dark:text-amber-100", className)} {...props} />
}

function Spoiler({ className, children, ...props }: React.ComponentProps<"details">) {
  return (
    <details className={cn("rounded-lg border bg-card p-3", className)} {...props}>
      {children}
    </details>
  )
}

function SpoilerSummary({ className, ...props }: React.ComponentProps<"summary">) {
  return <summary className={cn("cursor-pointer font-medium", className)} {...props} />
}

export { Blockquote, Heading, Mark, Spoiler, SpoilerSummary, Text }
