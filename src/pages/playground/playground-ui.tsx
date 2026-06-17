import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export type DemoSectionProps = React.ComponentProps<"section"> & {
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  sectionIndex?: number
}

export function DemoSection({
  title,
  description,
  action,
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
      className={`playground-section reveal ${className || ""}`.trim()}
      style={{
        animationDelay: `${delayMs}ms`,
        scrollMarginTop: "88px",
      }}
      {...props}
    >
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
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
}: {
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="grid gap-3">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

export function TokenPill({ children }: { children: React.ReactNode }) {
  return <code className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{children}</code>
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
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {code ? (
          <pre className="relative overflow-x-auto rounded-md border bg-muted/50 p-3 text-xs text-foreground">
            <code>{code}</code>
          </pre>
        ) : null}
      </CardContent>
    </Card>
  )
}
