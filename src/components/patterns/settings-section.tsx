import * as React from "react"

import { cn } from "@/lib/utils"

export type SettingsSectionProps = React.ComponentProps<"section"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

function SettingsSection({ title, description, actions, className, children, ...props }: SettingsSectionProps) {
  return (
    <section data-slot="settings-section" className={cn("grid gap-4 rounded-lg border bg-card p-4", className)} {...props}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="grid divide-y">{children}</div>
    </section>
  )
}

export type SettingsRowProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  description?: React.ReactNode
  control?: React.ReactNode
}

function SettingsRow({ label, description, control, className, children, ...props }: SettingsRowProps) {
  return (
    <div data-slot="settings-row" className={cn("flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0", className)} {...props}>
      <div className="grid min-w-0 gap-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
      <div className="shrink-0">{control ?? children}</div>
    </div>
  )
}

export { SettingsRow, SettingsSection }
