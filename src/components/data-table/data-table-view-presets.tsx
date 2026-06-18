import * as React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type DataTableViewPreset<TValue extends string = string> = {
  value: TValue
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  count?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
}

export type DataTableViewPresetsProps<TValue extends string = string> = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: TValue
  presets: DataTableViewPreset<TValue>[]
  onValueChange?: (value: TValue | undefined, preset?: DataTableViewPreset<TValue>) => void
  clearable?: boolean
  clearLabel?: React.ReactNode
  emptyLabel?: React.ReactNode
  size?: "xs" | "sm" | "default"
  variant?: "tabs" | "buttons" | "pills"
  renderPreset?: (preset: DataTableViewPreset<TValue>, state: { active: boolean }) => React.ReactNode
  presetClassName?: string
  activePresetClassName?: string
}

const sizeClassName: Record<NonNullable<DataTableViewPresetsProps["size"]>, string> = {
  xs: "h-7 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  default: "h-9 px-3 text-sm",
}

function DataTableViewPresets<TValue extends string = string>({
  className,
  value,
  presets,
  onValueChange,
  clearable = true,
  clearLabel = "Clear",
  emptyLabel = "No views",
  size = "sm",
  variant = "pills",
  renderPreset,
  presetClassName,
  activePresetClassName,
  ...props
}: DataTableViewPresetsProps<TValue>) {
  const visiblePresets = presets.filter((preset) => !preset.hidden)
  const activePreset = visiblePresets.find((preset) => preset.value === value)
  const canClear = clearable && Boolean(value)

  if (visiblePresets.length === 0) {
    return (
      <div data-slot="data-table-view-presets-empty" className={cn("text-sm text-muted-foreground", className)} {...props}>
        {emptyLabel}
      </div>
    )
  }

  return (
    <div
      data-slot="data-table-view-presets"
      data-variant={variant}
      className={cn("flex min-w-0 flex-wrap items-center gap-2", className)}
      {...props}
    >
      {visiblePresets.map((preset) => {
        const active = preset.value === value

        return (
          <Button
            key={preset.value}
            type="button"
            variant={active ? "default" : variant === "tabs" ? "ghost" : "outline"}
            size={size === "default" ? "sm" : size}
            disabled={preset.disabled}
            data-active={active || undefined}
            className={cn(
              "min-w-0 gap-1.5 rounded-full",
              sizeClassName[size],
              variant === "tabs" && "rounded-none border-b-2 border-transparent shadow-none data-[active=true]:border-primary",
              variant === "buttons" && "rounded-md",
              presetClassName,
              active && activePresetClassName
            )}
            title={typeof preset.description === "string" ? preset.description : undefined}
            onClick={() => onValueChange?.(preset.value, preset)}
          >
            {renderPreset?.(preset, { active }) ?? (
              <>
                {preset.icon && <span className="shrink-0 [&_svg]:size-3.5">{preset.icon}</span>}
                <span className="truncate">{preset.label}</span>
                {preset.count !== undefined && (
                  <Badge variant={active ? "secondary" : "outline"} className="h-5 px-1.5 text-[10px]">
                    {preset.count}
                  </Badge>
                )}
              </>
            )}
          </Button>
        )
      })}

      {canClear && (
        <Button type="button" variant="ghost" size={size === "default" ? "sm" : size} onClick={() => onValueChange?.(undefined, activePreset)}>
          {clearLabel}
        </Button>
      )}
    </div>
  )
}

export { DataTableViewPresets }
