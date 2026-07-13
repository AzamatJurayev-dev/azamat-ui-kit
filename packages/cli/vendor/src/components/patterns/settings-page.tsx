import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export type SettingsPageSection = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  content: React.ReactNode
}

export type SettingsPageProps = Omit<React.ComponentProps<"div">, "children"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  sections: SettingsPageSection[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  navClassName?: string
  contentClassName?: string
}

function SettingsPage({
  className,
  title,
  description,
  actions,
  sections,
  defaultValue,
  value,
  onValueChange,
  navClassName,
  contentClassName,
  ...props
}: SettingsPageProps) {
  const firstEnabled = sections.find((section) => !section.disabled)
  const resolvedDefaultValue = defaultValue ?? firstEnabled?.value
  const hasHeader = Boolean(title || description || actions)

  return (
    <div data-slot="settings-page" className={cn("grid min-w-0 gap-5", className)} {...props}>
      {hasHeader && (
        <div data-slot="settings-page-header" className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="grid min-w-0 gap-1">
            {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
            {description && <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
      <Tabs value={value} defaultValue={resolvedDefaultValue} onValueChange={onValueChange}>
        <div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <TabsList className={cn("h-auto w-full flex-col items-stretch justify-start gap-1 p-1", navClassName)}>
            {sections.map((section) => (
              <TabsTrigger
                key={section.value}
                value={section.value}
                disabled={section.disabled}
                className="w-full justify-start"
              >
                <span className="grid min-w-0 gap-0.5 text-left">
                  <span className="truncate">{section.label}</span>
                  {section.description && <span className="truncate text-xs font-normal text-muted-foreground">{section.description}</span>}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <div data-slot="settings-page-content" className={cn("min-w-0", contentClassName)}>
            {sections.map((section) => (
              <TabsContent key={section.value} value={section.value}>
                {section.content}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export { SettingsPage }
