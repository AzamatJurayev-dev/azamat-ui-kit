import * as React from "react"
import { ArrowUpRightIcon, Code2Icon } from "lucide-react"

import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/index"
import { cn } from "@/lib/utils"

export type DemoSectionProps = React.ComponentProps<"section"> & {
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  eyebrow?: React.ReactNode
  sectionIndex?: number
}

export function DemoSection({
  title,
  description,
  action,
  eyebrow,
  sectionIndex,
  children,
  className,
  id,
  ...props
}: DemoSectionProps) {
  const delayMs = sectionIndex !== undefined ? Math.min(sectionIndex * 70, 320) : 0
  const sectionId = id ? String(id) : undefined

  return (
    <section
      id={sectionId}
      className={cn("playground-section reveal scroll-mt-24", className)}
      style={{ animationDelay: `${delayMs}ms` }}
      {...props}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 space-y-1">
          {eyebrow && (
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </div>
          )}
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  )
}

export function PlaygroundCard({
  title,
  description,
  children,
  footer,
  className,
  badge,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  badge?: React.ReactNode
}) {
  return (
    <Card className={cn("relative overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/35", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <CardHeader>
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <CardTitle className="flex min-w-0 items-center gap-2">
              <span className="min-w-0 truncate">{title}</span>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

export function TokenPill({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-flex w-fit items-center rounded-full border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </code>
  )
}

export function ShowcaseGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-3", className)}>{children}</div>
}

export function PreviewSurface({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-background/70 p-4 shadow-inner", className)}>
      {children}
    </div>
  )
}

export function PlaygroundUsage({
  title = "Usage",
  items,
  code,
}: {
  title?: React.ReactNode
  items: React.ReactNode[]
  code?: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Reusable implementation notes for this component family.</CardDescription>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <Code2Icon className="size-3" />
            Guide
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2 rounded-lg border bg-muted/25 p-3">
              <ArrowUpRightIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {code ? (
          <pre className="relative overflow-x-auto rounded-xl border bg-muted/50 p-4 text-xs text-foreground">
            <code>{code}</code>
          </pre>
        ) : null}
      </CardContent>
    </Card>
  )
}
