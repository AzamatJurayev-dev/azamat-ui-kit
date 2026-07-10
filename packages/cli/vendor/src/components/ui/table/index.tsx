import * as React from "react"

import { cn } from "@/lib/utils"

type TableProps = React.ComponentProps<"table"> & {
  containerClassName?: string
  containerRef?: React.Ref<HTMLDivElement>
  containerStyle?: React.CSSProperties
}

function Table({ className, containerClassName, containerRef, containerStyle, ...props }: TableProps) {
  return (
    <div
      ref={containerRef}
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-[color:var(--aui-table-container-surface,var(--card))] shadow-[var(--aui-card-shadow,0_12px_30px_rgba(15,23,42,0.08))]",
        containerClassName
      )}
      style={containerStyle}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-[color:color-mix(in_oklch,var(--muted),var(--background)_30%)] [&_tr]:border-b [&_tr]:border-[color:var(--aui-card-border,var(--border))]", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),var(--background)_46%)] font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithoutRef<"tr">
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "border-b border-[color:var(--aui-card-border,var(--border))] transition-colors hover:bg-[color:color-mix(in_oklch,var(--muted),var(--background)_14%)] data-[state=selected]:bg-[color:color-mix(in_oklch,var(--primary),transparent_90%)] data-[striped=true]:bg-[color:color-mix(in_oklch,var(--muted),transparent_68%)]",
        className
      )}
      {...props}
    />
  )
})

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-4 text-left align-middle text-[0.72rem] font-semibold whitespace-nowrap uppercase tracking-[0.14em] text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-3.5 align-middle whitespace-nowrap text-foreground/92 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
