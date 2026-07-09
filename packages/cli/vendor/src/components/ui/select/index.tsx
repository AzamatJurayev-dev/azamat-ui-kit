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
export type SelectItemProps = SelectPrimitive.Item.Props
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

export type SelectProps = Omit<SelectRootProps, "value" | "defaultValue" | "onValueChange"> & {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | undefined) => void
  options?: SelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyLabel?: React.ReactNode
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
  invalid?: boolean
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
  placeholder = "Select",
  searchPlaceholder = "Search options...",
  emptyLabel = "No options found",
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
  invalid,
  children,
  onOpenChange,
  ...props
}: SelectProps) {
  if (!options) {
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

  const [search, setSearch] = React.useState("")
  const selectedOption = options.find((option) => option.value === value)
  const filteredOptions = options.filter((option) => optionMatchesSearch(option, search))

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
            className="sticky top-0 z-10 mb-1 flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--aui-card-border,var(--border))] bg-popover px-2.5 py-2 text-sm"
          >
            <SearchIcon className="size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),transparent_55%)] px-3 py-2.5 text-sm text-muted-foreground"
          >
            <LoaderCircleIcon className="size-4 animate-spin" />
            {loadingLabel}
          </div>
        ) : filteredOptions.length === 0 ? (
          <div
            data-slot="select-state"
            className="rounded-[var(--radius-md)] border border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),transparent_55%)] px-3 py-2.5 text-sm text-muted-foreground"
          >
            {emptyLabel}
          </div>
        ) : (
          filteredOptions.map((option) => {
            const selected = option.value === value
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn("rounded-[var(--radius-md)]", itemClassName)}
              >
                {renderOption ? (
                  renderOption(option, { selected })
                ) : (
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="truncate">{option.label}</span>
                      {selected ? <CheckIcon className="ml-auto size-3.5 text-primary" /> : null}
                    </span>
                    {option.description ? (
                      <span className="truncate text-xs text-muted-foreground">{option.description}</span>
                    ) : null}
                  </span>
                )}
              </SelectItem>
            )
          })
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
        "flex w-full min-w-0 items-center justify-between gap-2 rounded-[var(--aui-control-radius,var(--radius-md))] border border-[color:var(--aui-control-border-strong,var(--input))] bg-[color:var(--aui-control-surface,var(--background))] pr-3 pl-3 text-sm whitespace-nowrap text-foreground shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04))] transition-[background-color,border-color,box-shadow,color] outline-none select-none hover:border-[color:var(--aui-control-hover-border,var(--ring))] hover:bg-[color:var(--aui-control-surface-hover,var(--background))] hover:shadow-[var(--aui-control-shadow-hover,0_2px_6px_rgba(15,23,42,0.06))] focus-visible:border-[color:var(--ring)] focus-visible:ring-0 focus-visible:shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04)),0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_4px_var(--aui-focus-ring-soft,transparent)] disabled:cursor-not-allowed disabled:border-[color:color-mix(in_oklch,var(--border),transparent_18%)] disabled:bg-[color:var(--aui-control-surface-disabled,var(--muted))] disabled:text-muted-foreground disabled:opacity-100 aria-invalid:border-destructive aria-invalid:shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04)),0_0_0_1px_var(--aui-danger-ring,var(--destructive)),0_0_0_4px_var(--aui-danger-ring-soft,transparent)] data-placeholder:text-muted-foreground/74 data-[size=default]:h-11 data-[size=lg]:h-12 data-[size=sm]:h-9 data-[size=sm]:rounded-[var(--radius-sm)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />} />
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
            "relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-52 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-popover p-1.5 text-popover-foreground shadow-[var(--aui-control-panel-shadow,0_18px_40px_rgba(15,23,42,0.14))] backdrop-blur duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
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
      className={cn(
        "px-2 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/90",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-[var(--radius-md)] border border-transparent py-2.5 pr-9 pl-3 text-sm text-[color:var(--aui-page-muted-strong,var(--foreground))] outline-hidden select-none transition-[background-color,border-color,color,box-shadow,transform] data-[highlighted]:border-[color:color-mix(in_oklch,var(--primary),transparent_72%)] data-[highlighted]:bg-[color:color-mix(in_oklch,var(--primary),transparent_92%)] data-[highlighted]:text-foreground data-[selected]:border-[color:color-mix(in_oklch,var(--primary),transparent_70%)] data-[selected]:bg-[color:color-mix(in_oklch,var(--primary),transparent_90%)] data-[selected]:font-semibold data-[selected]:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:min-w-0 *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />}
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1.5 h-px bg-border/80", className)}
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
