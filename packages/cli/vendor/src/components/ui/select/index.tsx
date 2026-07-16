"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, LoaderCircleIcon, SearchIcon, XIcon } from "lucide-react"

import { cn, stopInteractivePropagation } from "@/lib/utils"

export type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
export type SelectGroupProps = SelectPrimitive.Group.Props
export type SelectValueProps = SelectPrimitive.Value.Props
export type SelectTriggerProps = SelectPrimitive.Trigger.Props & { size?: "sm" | "default" | "lg" }
export type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >
export type SelectLabelProps = SelectPrimitive.GroupLabel.Props
export type SelectItemProps = SelectPrimitive.Item.Props & {
  showIndicator?: boolean
}
export type SelectSeparatorProps = SelectPrimitive.Separator.Props
export type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>
export type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>

export type SelectOption = {
  label: React.ReactNode
  value: string
  disabled?: boolean
  description?: React.ReactNode
  keywords?: string[]
}

export type SelectOptionGroup = {
  label?: React.ReactNode
  options: SelectOption[]
}

export type SelectProps = Omit<SelectRootProps, "value" | "defaultValue" | "onValueChange"> & {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | undefined) => void
  options?: SelectOption[]
  groups?: SelectOptionGroup[]
  placeholder?: string
  searchPlaceholder?: string
  emptyLabel?: React.ReactNode
  emptyMessage?: React.ReactNode
  clearLabel?: string
  size?: "sm" | "default" | "lg"
  clearable?: boolean
  searchable?: boolean
  loading?: boolean
  loadingLabel?: React.ReactNode
  disabled?: boolean
  showSelectedDescription?: boolean
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  searchClassName?: string
  renderOption?: (option: SelectOption, state: { selected: boolean }) => React.ReactNode
  showSelectedIndicator?: boolean
  invalid?: boolean
  onSearchChange?: (value: string) => void
}

const SelectRoot = SelectPrimitive.Root

function optionMatchesSearch(option: SelectOption, search: string) {
  const normalized = search.trim().toLowerCase()
  if (!normalized) return true

  const labelText =
    typeof option.label === "string" || typeof option.label === "number"
      ? String(option.label)
      : option.value
  const haystack = [labelText, option.value, ...(option.keywords ?? [])].join(" ").toLowerCase()
  return haystack.includes(normalized)
}

function Select({
  value,
  defaultValue,
  onValueChange,
  options,
  groups,
  placeholder = "Select",
  searchPlaceholder = "Search options...",
  emptyLabel = "No options found",
  emptyMessage,
  clearLabel = "Clear selection",
  size = "default",
  clearable = false,
  searchable = false,
  loading = false,
  loadingLabel = "Loading options...",
  disabled = false,
  showSelectedDescription = true,
  triggerClassName,
  contentClassName,
  itemClassName,
  searchClassName,
  renderOption,
  showSelectedIndicator = true,
  invalid,
  children,
  onOpenChange,
  onSearchChange,
  ...props
}: SelectProps) {
  const hasCustomOptions = Boolean(options || groups)
  const [search, setSearch] = React.useState("")
  const optionGroups = React.useMemo<SelectOptionGroup[]>(
    () => (hasCustomOptions ? groups ?? [{ options: options ?? [] }] : []),
    [groups, hasCustomOptions, options]
  )
  const flatOptions = React.useMemo(
    () => optionGroups.flatMap((group) => group.options),
    [optionGroups]
  )
  const selectedOption = flatOptions.find((option) => option.value === value)
  const filteredGroups = optionGroups
    .map((group) => ({
      ...group,
      options: group.options.filter((option) => optionMatchesSearch(option, search)),
    }))
    .filter((group) => group.options.length > 0)
  const filteredOptionsCount = filteredGroups.reduce((count, group) => count + group.options.length, 0)

  if (!hasCustomOptions) {
    return (
      <SelectRoot
        value={value ?? undefined}
        defaultValue={defaultValue ?? undefined}
        onValueChange={(nextValue) => onValueChange?.((nextValue as string | null | undefined) ?? undefined)}
        onOpenChange={onOpenChange}
        disabled={disabled}
        {...props}
      >
        {children}
      </SelectRoot>
    )
  }

  return (
    <SelectRoot
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onValueChange={(nextValue) => onValueChange?.((nextValue as string | null | undefined) ?? undefined)}
      disabled={disabled || loading}
      onOpenChange={(open, eventDetails) => {
        if (!open) setSearch("")
        onOpenChange?.(open, eventDetails)
      }}
      {...props}
    >
      <SelectTrigger
        size={size}
        aria-invalid={invalid || undefined}
        className={cn("w-full", triggerClassName)}
      >
        <SelectValue placeholder={placeholder}>
          {selectedOption ? (
            <span className="flex min-w-0 flex-col items-start">
              <span className="truncate">{selectedOption.label}</span>
              {showSelectedDescription && selectedOption.description ? (
                <span className="truncate text-[11px] font-medium text-muted-foreground">
                  {selectedOption.description}
                </span>
              ) : null}
            </span>
          ) : null}
        </SelectValue>
        {loading ? <LoaderCircleIcon className="size-4 animate-spin text-muted-foreground" /> : null}
        {clearable && value && !disabled && !loading ? (
          <span
            role="button"
            tabIndex={0}
            aria-label={clearLabel}
            className="ml-1 rounded-[var(--radius-sm)] border border-border/65 p-1 text-muted-foreground transition-colors hover:border-border hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={(event) => {
              event.preventDefault()
              stopInteractivePropagation(event)
              onValueChange?.(undefined)
            }}
            onMouseDown={stopInteractivePropagation}
            onDoubleClick={stopInteractivePropagation}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onValueChange?.(undefined)
              }
            }}
          >
            <XIcon className="size-3.5" />
          </span>
        ) : null}
      </SelectTrigger>
      <SelectContent className={cn("w-(--anchor-width)", contentClassName)}>
        {searchable ? (
          <div
            data-slot="select-search"
            className="sticky top-0 flex items-center gap-2"
          >
            <SearchIcon className="size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                onSearchChange?.(event.target.value)
              }}
              placeholder={searchPlaceholder}
              className={cn(
                "min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
                searchClassName
              )}
            />
          </div>
        ) : null}

        {loading ? (
          <div
            data-slot="select-state"
            className="flex items-center gap-2"
          >
            <LoaderCircleIcon className="size-4 animate-spin" />
            {loadingLabel}
          </div>
        ) : filteredOptionsCount === 0 ? (
          <div
            data-slot="select-state"
          >
            {emptyMessage ?? emptyLabel}
          </div>
        ) : (
          filteredGroups.map((group, groupIndex) => (
            <SelectGroup key={groupIndex}>
              {group.label ? <SelectLabel>{group.label}</SelectLabel> : null}
              {group.options.map((option) => {
                const selected = option.value === value
                return (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    showIndicator={showSelectedIndicator}
                    className={cn("rounded-[var(--radius-md)]", itemClassName)}
                  >
                    {renderOption ? (
                      renderOption(option, { selected })
                    ) : (
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate">{option.label}</span>
                        </span>
                        {option.description ? (
                          <span className="truncate text-xs text-muted-foreground">{option.description}</span>
                        ) : null}
                      </span>
                    )}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          ))
        )}
      </SelectContent>
    </SelectRoot>
  )
}

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full min-w-0 items-center justify-between gap-2 whitespace-nowrap outline-none select-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "rounded-[var(--radius-lg)] border border-[color:var(--aui-input-border,var(--border))] bg-[color:var(--aui-input-bg,var(--background))] px-3 text-[color:var(--aui-input-fg,var(--foreground))] shadow-sm transition-[border-color,box-shadow,background-color] hover:border-[color:var(--aui-input-border-hover,var(--border))] focus-visible:border-[color:var(--aui-ring,var(--ring))] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--aui-ring,var(--ring)),transparent_82%)] disabled:opacity-60 data-[size=sm]:h-9 data-[size=default]:min-h-10 data-[size=lg]:min-h-11 data-[size=lg]:px-4 aria-[invalid=true]:border-[color:var(--aui-danger,var(--destructive))] aria-[invalid=true]:shadow-[0_0_0_3px_color-mix(in_oklch,var(--aui-danger,var(--destructive)),transparent_84%)]",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <span data-slot="select-icon" className="inline-flex shrink-0 items-center justify-center">
            <ChevronDownIcon data-icon="chevron" />
          </span>
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate max-h-(--available-height) w-(--anchor-width) min-w-52 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--radius-xl)] border border-[color:var(--aui-surface-border,var(--border))] bg-[color:var(--aui-popover-bg,var(--popover))] p-1 text-[color:var(--aui-popover-fg,var(--popover-foreground))] shadow-xl",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={className}
      {...props}
    />
  )
}

function SelectItem({ className, children, showIndicator = true, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 px-2.5 py-2 pr-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-highlighted:bg-[color:var(--aui-control-bg,var(--muted))] data-highlighted:text-[color:var(--aui-control-fg,var(--foreground))] data-selected:bg-[color:var(--aui-control-bg,var(--muted))] data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      {showIndicator ? (
        <SelectPrimitive.ItemIndicator
          render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />}
        >
          <CheckIcon className="pointer-events-none size-4" />
        </SelectPrimitive.ItemIndicator>
      ) : null}
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({ className, ...props }: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
