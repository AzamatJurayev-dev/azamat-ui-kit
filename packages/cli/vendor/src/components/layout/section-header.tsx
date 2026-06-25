import * as React from "react"

import { cn } from "@/lib/utils"

export type SectionHeaderProps = React.ComponentProps<"div"> & {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  meta?: React.ReactNode
  align?: "start" | "center"
  size?: "sm" | "default" | "lg"
  titleClassName?: string
  descriptionClassName?: string
}

const titleSizeClassName = {
  sm: "text-xl",
  default: "text-2xl",
  lg: "text-3xl",
}

function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  actions,
  meta,
  align = "start",
  size = "default",
  titleClassName,
  descriptionClassName,
  children,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      data-align={align}
      className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", align === "center" && "text-center sm:flex-col sm:items-center", className)}
      {...props}
    >
      <div className={cn("min-w-0 space-y-2", align === "center" && "mx-auto max-w-2xl")}> 
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p> : null}
        {title ? <h2 className={cn("font-semibold tracking-[-0.03em] text-foreground", titleSizeClassName[size], titleClassName)}>{title}</h2> : null}
        {description ? <p className={cn("max-w-3xl text-sm leading-7 text-muted-foreground", descriptionClassName)}>{description}</p> : null}
        {meta ? <div className="text-sm text-muted-foreground">{meta}</div> : null}
        {children}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2.5">{actions}</div> : null}
    </div>
  )
}

export { SectionHeader }
