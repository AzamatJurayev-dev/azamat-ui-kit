import * as React from "react"

import { FormActions } from "@/components/form/form-actions"
import { FormSection } from "@/components/form/form-section"
import { cn } from "@/lib/utils"

/** @deprecated Prefer `FormFamily.Section`/`FormFamily.Actions` composition or `FormFamily.Builder` for new public usage. */
export type SmartFormSection = {
  key: string
  title?: React.ReactNode
  description?: React.ReactNode
  content?: React.ReactNode
  fields?: React.ReactNode
  children?: React.ReactNode
  columns?: 1 | 2 | 3
  hidden?: boolean
}

/** @deprecated Prefer `FormFamily` entry members for new public usage. */
export type SmartFormShellProps = React.ComponentProps<"form"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  sections?: SmartFormSection[]
  actions?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  submitLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  onCancel?: () => void
  renderHeader?: () => React.ReactNode
  renderSection?: (section: SmartFormSection) => React.ReactNode
  contentClassName?: string
}

/** @deprecated Prefer `FormFamily.Shell` access and migrate new docs usage toward family-first form composition. */
function SmartFormShell({ title, description, sections, actions, loading = false, disabled = false, submitLabel, cancelLabel, onCancel, renderHeader, renderSection, contentClassName, className, children, ...props }: SmartFormShellProps) {
  const visibleSections = sections?.filter((section) => !section.hidden)

  return (
    <form data-slot="smart-form-shell" className={cn("grid gap-5", className)} {...props}>
      {renderHeader?.() ?? ((title || description) && (
        <div className="grid gap-1">
          {title && <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      ))}
      <div className={cn("grid gap-4", contentClassName)}>
        {visibleSections?.map((section) => renderSection?.(section) ?? (
          <FormSection key={section.key} title={section.title} description={section.description} columns={section.columns}>
            {section.children ?? section.content ?? section.fields}
          </FormSection>
        ))}
        {children}
      </div>
      {actions ?? <FormActions loading={loading} disabled={disabled} submitLabel={submitLabel} cancelLabel={cancelLabel} onCancel={onCancel} />}
    </form>
  )
}

export { SmartFormShell }
