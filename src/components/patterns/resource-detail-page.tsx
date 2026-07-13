import * as React from "react"

import { Button } from "@/components/ui/button"
import { DescriptionList, type DescriptionListItem } from "@/components/display/description-list"
import { PageHeader, type PageHeaderProps } from "@/components/layout/page-header"
import { cn } from "@/lib/utils"

export type ResourceDetailPageDensity = "default" | "compact" | "comfortable"

export type ResourceDetailPageSection = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  hidden?: boolean
  className?: string
  bodyClassName?: string
  items?: DescriptionListItem[]
  children?: React.ReactNode
}

export type ResourceDetailPageProps = Omit<React.ComponentProps<"div">, "children"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  eyebrow?: React.ReactNode
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  status?: React.ReactNode
  summary?: React.ReactNode
  meta?: React.ReactNode
  sections?: ResourceDetailPageSection[]
  children?: React.ReactNode
  aside?: React.ReactNode
  footer?: React.ReactNode
  backLabel?: React.ReactNode
  onBack?: () => void
  headerProps?: Omit<PageHeaderProps, "title" | "description" | "actions" | "eyebrow">
  density?: ResourceDetailPageDensity
  pageHeaderClassName?: string
  contentClassName?: string
  asideClassName?: string
  sectionClassName?: string
}

const densityClassName: Record<ResourceDetailPageDensity, string> = {
  compact: "gap-3",
  default: "gap-4",
  comfortable: "gap-6",
}

function ResourceDetailPage({
  className,
  title,
  description,
  eyebrow,
  actions,
  breadcrumbs,
  status,
  summary,
  meta,
  sections,
  children,
  aside,
  footer,
  backLabel = "Back",
  onBack,
  headerProps,
  density = "default",
  pageHeaderClassName,
  contentClassName,
  asideClassName,
  sectionClassName,
  ...props
}: ResourceDetailPageProps) {
  const visibleSections = sections?.filter((section) => !section.hidden) ?? []
  const hasHeader = Boolean(title || description || eyebrow || actions || onBack)
  const headerActions = onBack || actions ? (
    <>
      {onBack && (
        <Button type="button" variant="outline" onClick={onBack}>
          {backLabel}
        </Button>
      )}
      {actions}
    </>
  ) : undefined
  const hasMainContent = Boolean(children || visibleSections.length > 0)

  return (
    <div
      data-slot="resource-detail-page"
      data-density={density}
      className={cn("grid min-w-0", densityClassName[density], className)}
      {...props}
    >
      {breadcrumbs && <div data-slot="resource-detail-page-breadcrumbs">{breadcrumbs}</div>}

      {hasHeader && (
        <PageHeader
          data-slot="resource-detail-page-header"
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={headerActions}
          className={pageHeaderClassName}
          {...headerProps}
        />
      )}

      {(status || summary || meta) && (
        <div data-slot="resource-detail-page-summary" className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="grid min-w-0 gap-3">
            {status && <div data-slot="resource-detail-page-status">{status}</div>}
            {summary && <div data-slot="resource-detail-page-summary-content">{summary}</div>}
          </div>
          {meta && <div data-slot="resource-detail-page-meta" className="min-w-0 lg:w-80">{meta}</div>}
        </div>
      )}

      {(hasMainContent || aside) && (
        <div
          data-slot="resource-detail-page-content"
          className={cn("grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]", contentClassName)}
        >
          <div data-slot="resource-detail-page-main" className="grid min-w-0 gap-4">
            {children}

            {visibleSections.map((section) => (
              <section
                key={section.id}
                data-slot="resource-detail-page-section"
                className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", section.className, sectionClassName)}
              >
                {(section.title || section.description || section.actions) && (
                  <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-1">
                      {section.title && <h2 className="text-base font-semibold leading-none tracking-tight">{section.title}</h2>}
                      {section.description && <p className="text-sm text-muted-foreground">{section.description}</p>}
                    </div>
                    {section.actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{section.actions}</div>}
                  </div>
                )}

                <div className={cn("p-4", section.bodyClassName)}>
                  {section.children ?? (section.items ? <DescriptionList items={section.items} /> : null)}
                </div>
              </section>
            ))}
          </div>

          {aside && (
            <aside data-slot="resource-detail-page-aside" className={cn("min-w-0", asideClassName)}>
              {aside}
            </aside>
          )}
        </div>
      )}

      {footer && <div data-slot="resource-detail-page-footer">{footer}</div>}
    </div>
  )
}

export { ResourceDetailPage }
