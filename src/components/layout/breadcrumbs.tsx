import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type BreadcrumbItem = {
  key: string
  label: React.ReactNode
  href?: string
  current?: boolean
  onSelect?: () => void
}

export type BreadcrumbsProps = React.ComponentProps<"nav"> & {
  items: BreadcrumbItem[]
  maxItems?: number
  collapseLabel?: React.ReactNode
  separator?: React.ReactNode
  renderLink?: (props: React.ComponentProps<"a"> & { item: BreadcrumbItem; [key: `data-${string}`]: string | boolean | undefined }) => React.ReactNode
}

function collapseBreadcrumbItems(items: BreadcrumbItem[], maxItems: number, collapseLabel: React.ReactNode): BreadcrumbItem[] {
  if (items.length <= maxItems || maxItems < 3) return items

  const firstItem = items[0]
  const trailingCount = Math.max(maxItems - 2, 1)
  const trailingItems = items.slice(-trailingCount)

  return [
    firstItem,
    {
      key: "__collapsed__",
      label: collapseLabel,
    },
    ...trailingItems,
  ]
}

function Breadcrumbs({
  className,
  items,
  maxItems,
  collapseLabel = "…",
  separator = <ChevronRightIcon className="size-3.5" />,
  renderLink,
  ...props
}: BreadcrumbsProps) {
  const resolvedItems = React.useMemo(
    () => (typeof maxItems === "number" ? collapseBreadcrumbItems(items, maxItems, collapseLabel) : items),
    [collapseLabel, items, maxItems]
  )

  return (
    <nav
      data-slot="breadcrumbs"
      aria-label="Breadcrumb"
      className={cn("flex min-w-0 items-center gap-1 text-sm text-muted-foreground", className)}
      {...props}
    >
      {resolvedItems.map((item, index) => {
        const isCollapsed = item.key === "__collapsed__"
        const isLast = index === resolvedItems.length - 1
        const isCurrent = item.current || isLast

        return (
          <React.Fragment key={item.key}>
            {index > 0 && <span className="shrink-0 opacity-60">{separator}</span>}
            {isCollapsed ? (
              <span data-slot="breadcrumbs-collapsed" className="shrink-0 rounded-full border border-border/65 px-2 py-0.5 text-xs text-muted-foreground">
                {item.label}
              </span>
            ) : item.href && !isCurrent ? (
              renderLink ? renderLink({
                item,
                href: item.href,
                className: "truncate transition-colors hover:text-foreground",
                onClick: () => item.onSelect?.(),
                children: item.label,
              }) : (
                <a
                  href={item.href}
                  className="truncate transition-colors hover:text-foreground"
                  onClick={() => item.onSelect?.()}
                >
                  {item.label}
                </a>
              )
            ) : (
              <span
                aria-current={isCurrent ? "page" : undefined}
                className={cn("truncate", isCurrent && "font-medium text-foreground")}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export { Breadcrumbs }
