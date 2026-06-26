import * as React from "react"

import { PropertyGrid, type PropertyGridItem } from "@/components/display/property-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type EntityDetailsTab = {
  key: string
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export type EntityDetailsSection = {
  key: string
  title?: React.ReactNode
  content: React.ReactNode
}

export type EntityDetailsProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  subtitle?: React.ReactNode
  avatar?: React.ReactNode
  status?: React.ReactNode
  actions?: React.ReactNode
  metadata?: PropertyGridItem[]
  sections?: EntityDetailsSection[]
  tabs?: EntityDetailsTab[]
  tab?: string
  defaultTab?: string
  onTabChange?: (key: string) => void
  renderHeader?: () => React.ReactNode
}

function EntityDetails({ title, subtitle, avatar, status, actions, metadata, sections, tabs, tab, defaultTab, onTabChange, renderHeader, className, children, ...props }: EntityDetailsProps) {
  return (
    <div data-slot="entity-details" className={cn("grid gap-6", className)} {...props}>
      {renderHeader?.() ?? (
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            {avatar}
            <div className="grid min-w-0 gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
                {status}
              </div>
              {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
            </div>
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {metadata?.length ? <PropertyGrid items={metadata} columns={3} /> : null}
      {sections?.length ? <div className="grid gap-4">{sections.map((section) => <section key={section.key} className="grid gap-3 rounded-lg border bg-card p-4">{section.title && <h2 className="text-base font-semibold text-foreground">{section.title}</h2>}{section.content}</section>)}</div> : null}
      {tabs?.length ? (
        <Tabs value={tab} defaultValue={defaultTab ?? tabs[0]?.key} onValueChange={onTabChange}>
          <TabsList>{tabs.map((item) => <TabsTrigger key={item.key} value={item.key} disabled={item.disabled}>{item.label}</TabsTrigger>)}</TabsList>
          {tabs.map((item) => <TabsContent key={item.key} value={item.key}>{item.content}</TabsContent>)}
        </Tabs>
      ) : null}
      {children}
    </div>
  )
}

export { EntityDetails }
