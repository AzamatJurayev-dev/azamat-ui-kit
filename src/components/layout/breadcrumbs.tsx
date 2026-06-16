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
  separator?: React.ReactNode
}

function Breadcrumbs({
  className,
  items,
  separator = <ChevronRightIcon className="size-3.5" />,
  ...props
}: BreadcrumbsProps) {
  return (
    <nav
      data-slot="breadcrumbs"
      aria-label="Breadcrumb"
      className={cn("flex min-w-0 items-center gap-1 text-sm text-muted-foreground", className)}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isCurrent = item.current || isLast

        return (
          <React.Fragment key={item.key}>
            {index > 0 && <span className="shrink-0 opacity-60">{separator}</span>}
            {item.href && !isCurrent ? (
              <a
                href={item.href}
                className="truncate transition-colors hover:text-foreground"
                onClick={() => item.onSelect?.()}
              >
                {item.label}
              </a>
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
