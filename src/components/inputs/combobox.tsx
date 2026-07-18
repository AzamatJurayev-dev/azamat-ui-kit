"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type ComboboxOption<TValue extends string = string, TData = unknown> = {
  value: TValue
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  disabledReason?: React.ReactNode
  keywords?: string[]
  data?: TData
}

export type ComboboxGroup<TValue extends string = string, TData = unknown> = {
  label?: React.ReactNode
  options: ComboboxOption<TValue, TData>[]
}

export type ComboboxLabels = {
  placeholder?: string
  searchPlaceholder?: string
  empty?: string
  clear?: string
}

export type ComboboxProps<TValue extends string = string, TData = unknown> = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: TValue
  defaultValue?: TValue
  onValueChange?: (value: TValue | undefined, option?: ComboboxOption<TValue, TData>) => void
  options?: ComboboxOption<TValue, TData>[]
  groups?: ComboboxGroup<TValue, TData>[]
  disabled?: boolean
  clearable?: boolean
  searchable?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  labels?: ComboboxLabels
  invalid?: boolean
  renderOption?: (option: ComboboxOption<TValue, TData>, state: { selected: boolean }) => React.ReactNode
  renderValue?: (option: ComboboxOption<TValue, TData>) => React.ReactNode
  filterOption?: (option: ComboboxOption<TValue, TData>, search: string) => boolean
  triggerClassName?: string
  contentClassName?: string
  searchClassName?: string
  optionClassName?: string
}

function useControllableState<TValue>({
  value,
  defaultValue,
  onChange,
}: {
  value?: TValue
  defaultValue: TValue
  onChange?: (value: TValue) => void
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = React.useCallback(
    (nextValue: TValue) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onChange?.(nextValue)
    },
    [isControlled, onChange]
  )

  return [currentValue, setValue] as const
}

function normalizeComboboxGroups<TValue extends string, TData>({
  options,
  groups,
}: Pick<ComboboxProps<TValue, TData>, "options" | "groups">) {
  if (groups?.length) return groups
  if (options?.length) return [{ options }]
  return []
}

function getComboboxOptionText(option: ComboboxOption) {
  return [
    option.value,
    typeof option.label === "string" || typeof option.label === "number" ? String(option.label) : "",
    typeof option.description === "string" || typeof option.description === "number" ? String(option.description) : "",
    ...(option.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase()
}

function defaultFilterOption(option: ComboboxOption, search: string) {
  if (!search.trim()) return true
  return getComboboxOptionText(option).includes(search.trim().toLowerCase())
}

function findOption<TValue extends string, TData>(
  groups: ComboboxGroup<TValue, TData>[],
  value?: TValue
) {
  if (!value) return undefined

  for (const group of groups) {
    const option = group.options.find((item) => item.value === value)
    if (option) return option
  }

  return undefined
}

function Combobox<TValue extends string = string, TData = unknown>({
  className,
  value,
  defaultValue,
  onValueChange,
  options,
  groups,
  disabled = false,
  clearable = true,
  searchable = true,
  open,
  defaultOpen = false,
  onOpenChange,
  labels,
  invalid,
  renderOption,
  renderValue,
  filterOption = defaultFilterOption,
  triggerClassName,
  contentClassName,
  searchClassName,
  optionClassName,
  ...props
}: ComboboxProps<TValue, TData>) {
  const normalizedGroups = React.useMemo(() => normalizeComboboxGroups({ options, groups }), [groups, options])
  const [currentValue, setCurrentValue] = useControllableState<TValue | undefined>({
    value,
    defaultValue,
    onChange: (nextValue) => onValueChange?.(nextValue, findOption(normalizedGroups, nextValue)),
  })
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [search, setSearch] = React.useState("")
  const selectedOption = findOption(normalizedGroups, currentValue)
  const filteredGroups = React.useMemo(
    () =>
      normalizedGroups
        .map((group) => ({
          ...group,
          options: group.options.filter((option) => filterOption(option, search)),
        }))
        .filter((group) => group.options.length > 0),
    [filterOption, normalizedGroups, search]
  )
  const hasMatches = filteredGroups.some((group) => group.options.length > 0)

  const selectOption = (option: ComboboxOption<TValue, TData>) => {
    if (option.disabled) return

    setCurrentValue(option.value)
    setIsOpen(false)
    setSearch("")
  }

  const clearSelection = () => {
    setCurrentValue(undefined)
    setSearch("")
  }

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    stopInteractivePropagation(event)
    clearSelection()
  }

  return (
    <div data-slot="combobox" className={cn("w-full", className)} {...props}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              aria-expanded={isOpen}
              aria-invalid={invalid || undefined}
              data-slot="combobox-trigger"
              className={cn("w-full justify-between text-left", triggerClassName)}
            />
          }
        >
          <span className="min-w-0 flex-1 truncate">
            {selectedOption ? renderValue?.(selectedOption) ?? selectedOption.label : (
              <span className="text-muted-foreground">{labels?.placeholder ?? "Select option"}</span>
            )}
          </span>
          <span className="ml-2 inline-flex shrink-0 items-center gap-1">
            {clearable && currentValue && !disabled ? (
              <span
                role="button"
                tabIndex={0}
                data-slot="combobox-clear"
                aria-label={labels?.clear ?? "Clear selection"}
                onClick={handleClear}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return
                  event.preventDefault()
                  stopInteractivePropagation(event)
                  clearSelection()
                }}
              >
                <XIcon data-icon="clear" />
              </span>
            ) : null}
            <ChevronsUpDownIcon className="size-4 opacity-60" />
          </span>
        </PopoverTrigger>
        <PopoverContent align="start" data-slot="combobox-content" className={cn("w-(--anchor-width) min-w-72 gap-2 p-2", contentClassName)}>
          {searchable ? (
            <div data-slot="combobox-search-wrap" className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                data-slot="combobox-search"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder={labels?.searchPlaceholder ?? "Search..."}
                className={cn("pl-9", searchClassName)}
                autoFocus
              />
            </div>
          ) : null}

          <div data-slot="combobox-list" className="flex max-h-72 flex-col gap-1 overflow-y-auto pr-1">
            {!hasMatches ? (
              <div data-slot="combobox-empty" className="rounded-[var(--radius-md)] px-3 py-6 text-center text-sm text-muted-foreground">
                {labels?.empty ?? "No options found"}
              </div>
            ) : null}

            {filteredGroups.map((group, groupIndex) => (
              <div key={groupIndex} data-slot="combobox-group">
                {group.label ? (
                  <div data-slot="combobox-group-label" className="sticky top-0 z-10 bg-popover px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {group.label}
                  </div>
                ) : null}
                {group.options.map((option) => {
                  const selected = option.value === currentValue

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={option.disabled}
                      data-slot="combobox-option"
                      data-selected={selected || undefined}
                      data-disabled={option.disabled || undefined}
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-accent/70",
                        optionClassName
                      )}
                      onClick={() => selectOption(option)}
                    >
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center">
                        {selected ? <CheckIcon className="size-4" /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        {renderOption?.(option, { selected }) ?? (
                          <span className="flex min-w-0 flex-col">
                            <span className="truncate font-medium">{option.label}</span>
                            {(option.description || option.disabledReason) ? (
                              <span className="truncate text-xs text-muted-foreground">
                                {option.disabled ? option.disabledReason ?? option.description : option.description}
                              </span>
                            ) : null}
                          </span>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { Combobox }
