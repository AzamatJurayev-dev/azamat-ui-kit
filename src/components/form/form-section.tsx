import * as React from "react"

import { cn } from "@/lib/utils"

export type FormSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  columns?: 1 | 2 | 3
}

function FormSection({ title, description, actions, columns = 1, className, children, ...props }: FormSectionProps) {
  return (
    <section data-slot="form-section" className={cn("grid gap-4 rounded-lg border bg-card p-4", className)} {...props}>
      {(title || description || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="grid gap-1">
            {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className={cn("grid gap-4", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-2 lg:grid-cols-3")}>{children}</div>
    </section>
  )
}

export { FormSection }
