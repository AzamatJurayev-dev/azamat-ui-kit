import * as React from "react"

export type TextProps = React.ComponentProps<"p"> & {
  muted?: boolean
  size?: "sm" | "default" | "lg"
}

export type HeadingProps = React.ComponentProps<"h2"> & {
  level?: 1 | 2 | 3 | 4
}

function Text({ muted, size = "default", className, ...props }: TextProps) {
  return <p data-slot="text" data-size={size} data-muted={muted || undefined} className={className} {...props} />
}

function Heading({ level = 2, className, ...props }: HeadingProps) {
  const Component = `h${level}` as "h1" | "h2" | "h3" | "h4"
  return <Component data-slot="heading" data-level={level} className={className} {...props} />
}

function Blockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return <blockquote data-slot="blockquote" className={className} {...props} />
}

function Mark({ className, ...props }: React.ComponentProps<"mark">) {
  return <mark data-slot="mark" className={className} {...props} />
}

function Spoiler({ className, children, ...props }: React.ComponentProps<"details">) {
  return (
    <details data-slot="spoiler" className={className} {...props}>
      {children}
    </details>
  )
}

function SpoilerSummary({ className, ...props }: React.ComponentProps<"summary">) {
  return <summary data-slot="spoiler-summary" className={className} {...props} />
}

export { Blockquote, Heading, Mark, Spoiler, SpoilerSummary, Text }
