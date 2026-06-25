import * as React from "react"
import { DownloadIcon } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type TableExportOption = {
  key: string
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export type TableExportMenuProps = Omit<ButtonProps, "onSelect" | "onClick"> & {
  options?: TableExportOption[]
  label?: React.ReactNode
  menuLabel?: React.ReactNode
  onExport?: (option: TableExportOption) => void
  renderOption?: (option: TableExportOption) => React.ReactNode
}

const defaultExportOptions: TableExportOption[] = [
  { key: "csv", label: "CSV" },
  { key: "xlsx", label: "Excel" },
  { key: "pdf", label: "PDF" },
]

function TableExportMenu({ options = defaultExportOptions, label = "Export", menuLabel = "Export as", onExport, renderOption, children, ...props }: TableExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button type="button" variant="outline" size="sm" {...props} />}>
        <DownloadIcon data-icon="inline-start" />
        {children ?? label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {menuLabel && <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>}
        {options.map((option) => (
          <DropdownMenuItem key={option.key} disabled={option.disabled} onClick={() => onExport?.(option)}>
            {renderOption?.(option) ?? (
              <>
                {option.icon}
                <span className="grid gap-0.5">
                  <span>{option.label}</span>
                  {option.description && <span className="text-xs text-muted-foreground">{option.description}</span>}
                </span>
              </>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { TableExportMenu }
