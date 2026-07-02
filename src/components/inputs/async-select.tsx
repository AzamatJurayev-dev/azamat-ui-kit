import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, Loader2Icon, PlusIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type AsyncSelectOption<TValue extends string = string, TData = unknown> = {
  value: TValue
  label: React.ReactNode
  disabled?: boolean
  disabledReason?: React.ReactNode
  description?: React.ReactNode
  data?: TData
}

export type AsyncSelectOptionGroup<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = {
  label?: React.ReactNode
  options: TOption[]
}

export type AsyncSelectOptionsResult<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = TOption[] | AsyncSelectOptionGroup<TValue, TData, TOption>[]

export type AsyncSelectRenderState<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = {
  search: string
  minSearchLength: number
  options: TOption[]
  selectedCount?: number
  maxSelected?: number
}

export type AsyncSelectStateRenderer<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = (state: AsyncSelectRenderState<TValue, TData, TOption>) => React.ReactNode

export type AsyncSelectLabels = {
  placeholder?: string
  searchPlaceholder?: string
  loading?: string
  creating?: string
  empty?: string
  error?: string
  clear?: string
  clearAll?: string
  selectAll?: string
  minSearchLength?: (minSearchLength: number) => string
  maxSelected?: (maxSelected: number) => string
  selectedCount?: (count: number) => string
}

export type AsyncSelectProps<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: TValue
  selectedOption?: TOption | null
  onValueChange?: (value: TValue | undefined, option?: TOption) => void
  loadOptions: (search: string, signal?: AbortSignal) => Promise<AsyncSelectOptionsResult<TValue, TData, TOption>>
  loadSelectedOption?: (value: TValue, signal?: AbortSignal) => Promise<TOption | null | undefined>
  defaultOptions?: AsyncSelectOptionsResult<TValue, TData, TOption>
  disabled?: boolean
  clearable?: boolean
  cacheOptions?: boolean
  cacheTtl?: number
  debounceMs?: number
  minSearchLength?: number
  labels?: AsyncSelectLabels
  renderOption?: (option: TOption, state: { selected: boolean }) => React.ReactNode
  renderValue?: (option: TOption) => React.ReactNode
  renderLoading?: AsyncSelectStateRenderer<TValue, TData, TOption>
  renderEmpty?: AsyncSelectStateRenderer<TValue, TData, TOption>
  renderError?: AsyncSelectStateRenderer<TValue, TData, TOption>
  renderMinSearch?: AsyncSelectStateRenderer<TValue, TData, TOption>
  onCreateOption?: (search: string) => Promise<TOption> | TOption
  createOptionLabel?: (search: string) => React.ReactNode
  showCreateOption?: (search: string, options: TOption[]) => boolean
  triggerClassName?: string
  contentClassName?: string
  searchClassName?: string
  optionClassName?: string
  invalid?: boolean
}

export type AsyncMultiSelectProps<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: TValue[]
  selectedOptions?: TOption[]
  onValueChange?: (value: TValue[], options: TOption[]) => void
  loadOptions: (search: string, signal?: AbortSignal) => Promise<AsyncSelectOptionsResult<TValue, TData, TOption>>
  loadSelectedOptions?: (values: TValue[], signal?: AbortSignal) => Promise<TOption[]>
  defaultOptions?: AsyncSelectOptionsResult<TValue, TData, TOption>
  disabled?: boolean
  clearable?: boolean
  cacheOptions?: boolean
  cacheTtl?: number
  closeOnSelect?: boolean
  debounceMs?: number
  minSearchLength?: number
  maxSelected?: number
  showSelectAll?: boolean
  labels?: AsyncSelectLabels
  renderOption?: (option: TOption, state: { selected: boolean }) => React.ReactNode
  renderValue?: (option: TOption) => React.ReactNode
  renderTag?: (option: TOption, state: { remove: () => void }) => React.ReactNode
  renderLoading?: AsyncSelectStateRenderer<TValue, TData, TOption>
  renderEmpty?: AsyncSelectStateRenderer<TValue, TData, TOption>
  renderError?: AsyncSelectStateRenderer<TValue, TData, TOption>
  renderMinSearch?: AsyncSelectStateRenderer<TValue, TData, TOption>
  renderMaxSelected?: AsyncSelectStateRenderer<TValue, TData, TOption>
  onCreateOption?: (search: string) => Promise<TOption> | TOption
  createOptionLabel?: (search: string) => React.ReactNode
  showCreateOption?: (search: string, options: TOption[]) => boolean
  triggerClassName?: string
  contentClassName?: string
  searchClassName?: string
  optionClassName?: string
  tagClassName?: string
  invalid?: boolean
}

type AsyncSelectCacheEntry<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
> = {
  createdAt: number
  groups: AsyncSelectOptionGroup<TValue, TData, TOption>[]
}

function useDebouncedValue<TValue>(value: TValue, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [delay, value])

  return debouncedValue
}

function isOptionGroup<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(
  item: TOption | AsyncSelectOptionGroup<TValue, TData, TOption>
): item is AsyncSelectOptionGroup<TValue, TData, TOption> {
  return typeof item === "object" && item !== null && "options" in item
}

function normalizeOptionGroups<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(
  result?: AsyncSelectOptionsResult<TValue, TData, TOption>
): AsyncSelectOptionGroup<TValue, TData, TOption>[] {
  if (!result || result.length === 0) return []

  const firstItem = result[0]

  if (isOptionGroup(firstItem)) {
    return result as AsyncSelectOptionGroup<TValue, TData, TOption>[]
  }

  return [{ options: result as TOption[] }]
}

function flattenOptionGroups<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(groups: AsyncSelectOptionGroup<TValue, TData, TOption>[]) {
  return groups.flatMap((group) => group.options)
}

function optionToComparableText(option: AsyncSelectOption) {
  if (typeof option.label === "string" || typeof option.label === "number") {
    return String(option.label).toLowerCase()
  }

  return option.value.toLowerCase()
}

function defaultShowCreateOption<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(search: string, options: TOption[]) {
  const normalizedSearch = search.trim().toLowerCase()

  if (!normalizedSearch) return false

  return !options.some(
    (option) => option.value.toLowerCase() === normalizedSearch || optionToComparableText(option) === normalizedSearch
  )
}

function findSelectedOption<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(
  value: TValue | undefined,
  selectedOption: TOption | null | undefined,
  options: TOption[],
  defaultOptions: TOption[],
  preloadedOption?: TOption | null
) {
  if (!value) return undefined
  if (selectedOption?.value === value) return selectedOption
  if (preloadedOption?.value === value) return preloadedOption

  return [...options, ...defaultOptions].find((option) => option.value === value)
}

function mergeUniqueOptions<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(...optionLists: (TOption[] | undefined)[]) {
  const map = new Map<TValue, TOption>()

  optionLists.forEach((optionList) => {
    optionList?.forEach((option) => {
      map.set(option.value, option)
    })
  })

  return Array.from(map.values())
}

function getOptionsByValue<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(values: TValue[], options: TOption[]) {
  const map = new Map(options.map((option) => [option.value, option]))
  return values.map((value) => map.get(value)).filter((option): option is TOption => Boolean(option))
}

function getCachedOptionGroups<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(
  cache: Map<string, AsyncSelectCacheEntry<TValue, TData, TOption>>,
  key: string,
  cacheTtl: number
) {
  const entry = cache.get(key)

  if (!entry) return undefined

  if (Number.isFinite(cacheTtl) && Date.now() - entry.createdAt > cacheTtl) {
    cache.delete(key)
    return undefined
  }

  return entry.groups
}

function setCachedOptionGroups<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(
  cache: Map<string, AsyncSelectCacheEntry<TValue, TData, TOption>>,
  key: string,
  groups: AsyncSelectOptionGroup<TValue, TData, TOption>[]
) {
  cache.set(key, {
    groups,
    createdAt: Date.now(),
  })
}

function normalizeAsyncSearch(search: string) {
  return search.trim().toLowerCase()
}

function AsyncStateMessage({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="async-select-state"
      className={cn(
        "rounded-[min(var(--radius-xl),16px)] border px-3 py-3 text-sm text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

function getOptionLabelText<TValue extends string, TData>(option: AsyncSelectOption<TValue, TData>) {
  if (typeof option.label === "string" || typeof option.label === "number") {
    return String(option.label)
  }

  return option.value
}

function AsyncOptionButton<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>({
  option,
  selected,
  renderOption,
  optionClassName,
  onSelect,
}: {
  option: TOption
  selected: boolean
  renderOption?: (option: TOption, state: { selected: boolean }) => React.ReactNode
  optionClassName?: string
  onSelect: (option: TOption) => void
}) {
  return (
    <button
      type="button"
      disabled={option.disabled}
      data-slot="async-select-option"
      data-selected={selected || undefined}
      data-disabled={option.disabled || undefined}
      className={cn(
        "flex w-full items-start gap-2 rounded-[min(var(--radius-xl),16px)] border border-transparent px-3 py-2.5 text-left text-sm outline-none transition-[background-color,border-color,color,box-shadow] disabled:pointer-events-none disabled:opacity-50",
        optionClassName
      )}
      onClick={() => onSelect(option)}
    >
      <span className="flex size-4 shrink-0 items-center justify-center">
        {selected && <CheckIcon className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        {renderOption?.(option, { selected }) ?? (
          <span className="flex min-w-0 flex-col">
            <span className="truncate">{option.label}</span>
            {option.description && (
              <span className="truncate text-xs text-muted-foreground">{option.description}</span>
            )}
            {option.disabled && option.disabledReason && (
              <span className="truncate text-xs text-muted-foreground">{option.disabledReason}</span>
            )}
          </span>
        )}
      </span>
    </button>
  )
}

function AsyncCreateButton({
  search,
  isCreating,
  label,
  onCreate,
}: {
  search: string
  isCreating: boolean
  label?: (search: string) => React.ReactNode
  onCreate: () => void
}) {
  return (
    <button
      type="button"
      disabled={isCreating}
      data-slot="async-select-create"
      className="flex w-full items-center gap-2 rounded-[min(var(--radius-xl),16px)] border border-dashed px-3 py-2.5 text-left text-sm outline-none transition-[background-color,border-color,color,box-shadow] disabled:pointer-events-none disabled:opacity-50"
      onClick={onCreate}
    >
      <span className="flex size-4 shrink-0 items-center justify-center">
        {isCreating ? <Loader2Icon className="size-4 animate-spin" /> : <PlusIcon className="size-4" />}
      </span>
      <span className="min-w-0 flex-1 truncate">
        {label?.(search) ?? `Create "${search.trim()}"`}
      </span>
    </button>
  )
}

function AsyncSelect<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
>({
  className,
  value,
  selectedOption,
  onValueChange,
  loadOptions,
  loadSelectedOption,
  defaultOptions,
  disabled = false,
  clearable = true,
  cacheOptions = true,
  cacheTtl = Number.POSITIVE_INFINITY,
  debounceMs = 250,
  minSearchLength = 0,
  labels,
  renderOption,
  renderValue,
  renderLoading,
  renderEmpty,
  renderError,
  renderMinSearch,
  onCreateOption,
  createOptionLabel,
  showCreateOption,
  triggerClassName,
  contentClassName,
  searchClassName,
  optionClassName,
  invalid,
  ...props
}: AsyncSelectProps<TValue, TData, TOption>) {
  const resolvedDefaultGroups = React.useMemo(() => normalizeOptionGroups(defaultOptions), [defaultOptions])
  const defaultFlatOptions = React.useMemo(() => flattenOptionGroups(resolvedDefaultGroups), [resolvedDefaultGroups])
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [optionGroups, setOptionGroups] = React.useState(resolvedDefaultGroups)
  const [preloadedOption, setPreloadedOption] = React.useState<TOption | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const cacheRef = React.useRef(new Map<string, AsyncSelectCacheEntry<TValue, TData, TOption>>())
  const loadOptionsRequestRef = React.useRef(0)
  const loadSelectedOptionRequestRef = React.useRef(0)
  const debouncedSearch = useDebouncedValue(search, debounceMs)
  const searchKey = debouncedSearch.trim()
  const flatOptions = React.useMemo(() => flattenOptionGroups(optionGroups), [optionGroups])
  const state = React.useMemo<AsyncSelectRenderState<TValue, TData, TOption>>(
    () => ({ search, minSearchLength, options: flatOptions }),
    [flatOptions, minSearchLength, search]
  )
  const currentOption = findSelectedOption(
    value,
    selectedOption,
    flatOptions,
    defaultFlatOptions,
    preloadedOption
  )
  const canClear = clearable && Boolean(value) && !disabled
  const searchTooShort = searchKey.length < minSearchLength
  const canCreate =
    !searchTooShort &&
    Boolean(onCreateOption) &&
    (showCreateOption ?? defaultShowCreateOption)(search, flatOptions)

  React.useEffect(() => {
    cacheRef.current.clear()
  }, [loadOptions])

  React.useEffect(() => {
    setOptionGroups(resolvedDefaultGroups)
  }, [resolvedDefaultGroups])

  React.useEffect(() => {
    if (!value || currentOption || !loadSelectedOption) return

    const controller = new AbortController()
    const requestId = ++loadSelectedOptionRequestRef.current

    async function run() {
      const option = await loadSelectedOption?.(value as TValue, controller.signal)
      if (!controller.signal.aborted && requestId === loadSelectedOptionRequestRef.current) {
        setPreloadedOption(option ?? null)
      }
    }

    void run()

    return () => {
      controller.abort()
    }
  }, [currentOption, loadSelectedOption, value])

  React.useEffect(() => {
    if (!open) return

    if (searchTooShort) {
      setOptionGroups(resolvedDefaultGroups)
      setIsLoading(false)
      setHasError(false)
      return
    }

    const cachedGroups = cacheOptions ? getCachedOptionGroups(cacheRef.current, searchKey, cacheTtl) : undefined

    if (cachedGroups) {
      setOptionGroups(cachedGroups)
      setIsLoading(false)
      setHasError(false)
      return
    }

    const controller = new AbortController()
    const requestId = ++loadOptionsRequestRef.current

    async function run() {
      setIsLoading(true)
      setHasError(false)

      try {
        const nextOptions = normalizeOptionGroups(await loadOptions(searchKey, controller.signal))
        if (!controller.signal.aborted && requestId === loadOptionsRequestRef.current) {
          if (cacheOptions) {
            setCachedOptionGroups(cacheRef.current, searchKey, nextOptions)
          }
          setOptionGroups(nextOptions)
        }
      } catch {
        if (!controller.signal.aborted && requestId === loadOptionsRequestRef.current) {
          setHasError(true)
          setOptionGroups([])
        }
      } finally {
        if (!controller.signal.aborted && requestId === loadOptionsRequestRef.current) {
          setIsLoading(false)
        }
      }
    }

    void run()

    return () => {
      controller.abort()
    }
  }, [cacheOptions, cacheTtl, loadOptions, open, resolvedDefaultGroups, searchKey, searchTooShort])

  const handleSelect = (option: TOption) => {
    if (option.disabled) return

    onValueChange?.(option.value, option)
    setOpen(false)
    setSearch("")
  }

  const clearSelection = () => {
    onValueChange?.(undefined)
    setSearch("")
  }

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    stopInteractivePropagation(event)
    clearSelection()
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setOpen(true)
      return
    }

    if ((event.key === "Backspace" || event.key === "Delete") && value) {
      event.preventDefault()
      clearSelection()
    }
  }

  const handleCreate = async () => {
    if (!onCreateOption || !search.trim() || searchTooShort) return

    setIsCreating(true)

    try {
      const createdOption = await onCreateOption(search.trim())
      const normalizedSearch = normalizeAsyncSearch(search)
      setOptionGroups((previousGroups) => [{ options: [createdOption] }, ...previousGroups])
      if (cacheOptions && normalizedSearch) {
        setCachedOptionGroups(cacheRef.current, normalizedSearch, [{ options: [createdOption] }])
      }
      onValueChange?.(createdOption.value, createdOption)
      setSearch("")
      setOpen(false)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div data-slot="async-select" className={cn("w-full", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              aria-expanded={open}
              aria-invalid={invalid || undefined}
              data-slot="async-select-trigger"
              className={cn(
                "min-h-11 w-full justify-between",
                triggerClassName
              )}
              onKeyDown={handleTriggerKeyDown}
            />
          }
        >
          <span className="min-w-0 flex-1 text-left">
            {currentOption ? (
              <span className="flex min-w-0 flex-col">
                <span className="truncate">
                  {renderValue?.(currentOption) ?? currentOption.label}
                </span>
                {currentOption.disabled && currentOption.disabledReason && (
                  <span className="truncate text-xs text-muted-foreground">{currentOption.disabledReason}</span>
                )}
              </span>
            ) : (
              <span className="truncate">{labels?.placeholder ?? "Select"}</span>
            )}
          </span>
          <span className="ml-2 flex shrink-0 items-center gap-1">
            {canClear && (
              <span
                role="button"
                tabIndex={0}
                className="rounded-full border border-border/65 p-1 text-muted-foreground transition-colors hover:border-border hover:bg-muted/55 hover:text-foreground"
                aria-label={labels?.clear ?? "Clear"}
                onClick={handleClear}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return
                  event.preventDefault()
                  stopInteractivePropagation(event)
                  clearSelection()
                }}
              >
                <XIcon className="size-3.5" />
              </span>
            )}
            <ChevronsUpDownIcon className="size-4 opacity-60" />
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          data-slot="async-select-content"
          className={cn(
            "w-(--anchor-width) gap-3 rounded-[var(--radius-2xl)] p-3.5",
            contentClassName
          )}
        >
          <div data-slot="async-select-search-wrap" className="relative">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-slot="async-select-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels?.searchPlaceholder ?? "Search..."}
              className={cn("pl-8", searchClassName)}
            />
          </div>

          <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
            {searchTooShort && flatOptions.length === 0 && (
              renderMinSearch?.(state) ?? (
                <AsyncStateMessage>
                  {labels?.minSearchLength?.(minSearchLength) ?? `Type at least ${minSearchLength} characters`}
                </AsyncStateMessage>
              )
            )}

            {isLoading &&
              (renderLoading?.(state) ?? (
                <AsyncStateMessage>
                  <span className="inline-flex items-center gap-2">
                    <Loader2Icon className="size-4 animate-spin" />
                    {labels?.loading ?? "Loading..."}
                  </span>
                </AsyncStateMessage>
              ))}

            {!isLoading && hasError &&
              (renderError?.(state) ?? (
                <AsyncStateMessage className="text-destructive">
                  {labels?.error ?? "Could not load options"}
                </AsyncStateMessage>
              ))}

            {!isLoading && !hasError && !searchTooShort && flatOptions.length === 0 && !canCreate &&
              (renderEmpty?.(state) ?? (
                <AsyncStateMessage>{labels?.empty ?? "No options found"}</AsyncStateMessage>
              ))}

            {!isLoading && !hasError && canCreate && (
              <AsyncCreateButton
                search={search}
                isCreating={isCreating}
                label={createOptionLabel}
                onCreate={handleCreate}
              />
            )}

            {!isLoading &&
              !hasError &&
              optionGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.label && (
                    <div className="sticky top-0 z-10 bg-popover px-2 py-1 text-xs font-medium text-muted-foreground">
                      {group.label}
                    </div>
                  )}
                  {group.options.map((option) => (
                    <AsyncOptionButton
                      key={option.value}
                      option={option}
                      selected={option.value === value}
                      renderOption={renderOption}
                      optionClassName={optionClassName}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function AsyncMultiSelect<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
>({
  className,
  value,
  selectedOptions,
  onValueChange,
  loadOptions,
  loadSelectedOptions,
  defaultOptions,
  disabled = false,
  clearable = true,
  cacheOptions = true,
  cacheTtl = Number.POSITIVE_INFINITY,
  closeOnSelect = false,
  debounceMs = 250,
  minSearchLength = 0,
  maxSelected,
  showSelectAll = false,
  labels,
  renderOption,
  renderValue,
  renderTag,
  renderLoading,
  renderEmpty,
  renderError,
  renderMinSearch,
  renderMaxSelected,
  onCreateOption,
  createOptionLabel,
  showCreateOption,
  triggerClassName,
  contentClassName,
  searchClassName,
  optionClassName,
  tagClassName,
  invalid,
  ...props
}: AsyncMultiSelectProps<TValue, TData, TOption>) {
  const values = React.useMemo(() => value ?? [], [value])
  const selectedValueKey = values.join("|")
  const resolvedDefaultGroups = React.useMemo(() => normalizeOptionGroups(defaultOptions), [defaultOptions])
  const defaultFlatOptions = React.useMemo(() => flattenOptionGroups(resolvedDefaultGroups), [resolvedDefaultGroups])
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [optionGroups, setOptionGroups] = React.useState(resolvedDefaultGroups)
  const [preloadedOptions, setPreloadedOptions] = React.useState<TOption[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const cacheRef = React.useRef(new Map<string, AsyncSelectCacheEntry<TValue, TData, TOption>>())
  const loadOptionsRequestRef = React.useRef(0)
  const loadSelectedOptionsRequestRef = React.useRef(0)
  const debouncedSearch = useDebouncedValue(search, debounceMs)
  const searchKey = debouncedSearch.trim()
  const flatOptions = React.useMemo(() => flattenOptionGroups(optionGroups), [optionGroups])
  const selectedSet = React.useMemo(() => new Set<TValue>(values), [values])
  const allKnownOptions = React.useMemo(
    () => mergeUniqueOptions(selectedOptions, preloadedOptions, flatOptions, defaultFlatOptions),
    [defaultFlatOptions, flatOptions, preloadedOptions, selectedOptions]
  )
  const currentOptions = React.useMemo(
    () => getOptionsByValue(values, allKnownOptions),
    [allKnownOptions, values]
  )
  const state = React.useMemo<AsyncSelectRenderState<TValue, TData, TOption>>(
    () => ({ search, minSearchLength, options: flatOptions, selectedCount: values.length, maxSelected }),
    [flatOptions, maxSelected, minSearchLength, search, values.length]
  )
  const hasValue = values.length > 0
  const canClear = clearable && hasValue && !disabled
  const isMaxReached = typeof maxSelected === "number" && values.length >= maxSelected
  const searchTooShort = searchKey.length < minSearchLength
  const canCreate =
    !searchTooShort &&
    Boolean(onCreateOption) &&
    (showCreateOption ?? defaultShowCreateOption)(search, flatOptions)
  const visibleSelectableOptions = flatOptions.filter((option) => !option.disabled)
  const unselectedVisibleOptions = visibleSelectableOptions.filter((option) => !selectedSet.has(option.value))
  const canSelectAll = showSelectAll && unselectedVisibleOptions.length > 0 && !isMaxReached

  React.useEffect(() => {
    cacheRef.current.clear()
  }, [loadOptions])

  React.useEffect(() => {
    setOptionGroups(resolvedDefaultGroups)
  }, [resolvedDefaultGroups])

  React.useEffect(() => {
    if (!values.length || !loadSelectedOptions) return

    const knownValues = new Set(allKnownOptions.map((option) => option.value))
    const missingValues = values.filter((item) => !knownValues.has(item))

    if (!missingValues.length) return

    const controller = new AbortController()
    const requestId = ++loadSelectedOptionsRequestRef.current

    async function run() {
      const loadedOptions = await loadSelectedOptions?.(missingValues, controller.signal)
      if (!controller.signal.aborted && requestId === loadSelectedOptionsRequestRef.current && loadedOptions) {
        setPreloadedOptions((previousOptions) => mergeUniqueOptions(previousOptions, loadedOptions))
      }
    }

    void run()

    return () => {
      controller.abort()
    }
  }, [allKnownOptions, loadSelectedOptions, selectedValueKey, values])

  React.useEffect(() => {
    if (!open) return

    if (searchTooShort) {
      setOptionGroups(resolvedDefaultGroups)
      setIsLoading(false)
      setHasError(false)
      return
    }

    const cachedGroups = cacheOptions ? getCachedOptionGroups(cacheRef.current, searchKey, cacheTtl) : undefined

    if (cachedGroups) {
      setOptionGroups(cachedGroups)
      setIsLoading(false)
      setHasError(false)
      return
    }

    const controller = new AbortController()
    const requestId = ++loadOptionsRequestRef.current

    async function run() {
      setIsLoading(true)
      setHasError(false)

      try {
        const nextOptions = normalizeOptionGroups(await loadOptions(searchKey, controller.signal))
        if (!controller.signal.aborted && requestId === loadOptionsRequestRef.current) {
          if (cacheOptions) {
            setCachedOptionGroups(cacheRef.current, searchKey, nextOptions)
          }
          setOptionGroups(nextOptions)
        }
      } catch {
        if (!controller.signal.aborted && requestId === loadOptionsRequestRef.current) {
          setHasError(true)
          setOptionGroups([])
        }
      } finally {
        if (!controller.signal.aborted && requestId === loadOptionsRequestRef.current) {
          setIsLoading(false)
        }
      }
    }

    void run()

    return () => {
      controller.abort()
    }
  }, [cacheOptions, cacheTtl, loadOptions, open, resolvedDefaultGroups, searchKey, searchTooShort])

  const emitChange = (nextValues: TValue[], nextKnownOptions: TOption[]) => {
    onValueChange?.(nextValues, getOptionsByValue(nextValues, nextKnownOptions))
  }

  const removeValue = (nextValue: TValue) => {
    emitChange(values.filter((item) => item !== nextValue), allKnownOptions)
  }

  const handleSelect = (option: TOption) => {
    if (option.disabled) return

    const isSelected = selectedSet.has(option.value)
    const nextValues = isSelected
      ? values.filter((item) => item !== option.value)
      : isMaxReached
        ? values
        : [...values, option.value]
    const nextKnownOptions = mergeUniqueOptions(allKnownOptions, [option])

    emitChange(nextValues, nextKnownOptions)

    if (closeOnSelect) {
      setOpen(false)
      setSearch("")
    }
  }

  const handleTagRemoveKeyDown = (event: React.KeyboardEvent<HTMLElement>, option: TOption) => {
    if (event.key !== "Enter" && event.key !== " " && event.key !== "Backspace" && event.key !== "Delete") return

    event.preventDefault()
    stopInteractivePropagation(event)
    removeValue(option.value)
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setOpen(true)
      return
    }

    if (search.length > 0 || values.length === 0) return

    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault()
      removeValue(values[values.length - 1])
    }
  }

  const handleSelectAllVisible = () => {
    if (!unselectedVisibleOptions.length) return

    const remainingCount = typeof maxSelected === "number" ? Math.max(maxSelected - values.length, 0) : unselectedVisibleOptions.length
    const nextOptions = unselectedVisibleOptions.slice(0, remainingCount)
    const nextValues = Array.from(new Set([...values, ...nextOptions.map((option) => option.value)]))
    const nextKnownOptions = mergeUniqueOptions(allKnownOptions, nextOptions)

    emitChange(nextValues, nextKnownOptions)
  }

  const removeOption = (option: TOption) => {
    removeValue(option.value)
  }

  const clearAllSelection = () => {
    onValueChange?.([], [])
    setSearch("")
  }

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    stopInteractivePropagation(event)
    clearAllSelection()
  }

  const handleCreate = async () => {
    if (!onCreateOption || !search.trim() || searchTooShort) return

    setIsCreating(true)

    try {
      const createdOption = await onCreateOption(search.trim())
      const normalizedSearch = normalizeAsyncSearch(search)
      const nextKnownOptions = mergeUniqueOptions(allKnownOptions, [createdOption])
      const nextValues = selectedSet.has(createdOption.value)
        ? values
        : isMaxReached
          ? values
          : [...values, createdOption.value]

      setOptionGroups((previousGroups) => [{ options: [createdOption] }, ...previousGroups])
      if (cacheOptions && normalizedSearch) {
        setCachedOptionGroups(cacheRef.current, normalizedSearch, [{ options: [createdOption] }])
      }
      emitChange(nextValues, nextKnownOptions)
      setSearch("")

      if (closeOnSelect) {
        setOpen(false)
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div data-slot="async-multi-select" className={cn("w-full", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              aria-expanded={open}
              aria-invalid={invalid || undefined}
              data-slot="async-select-trigger"
              className={cn(
                "min-h-11 w-full justify-between",
                triggerClassName
              )}
              onKeyDown={handleTriggerKeyDown}
            />
          }
        >
          <span className="flex min-w-0 flex-1 flex-wrap gap-1 text-left">
            {currentOptions.length > 0 ? (
              currentOptions.map((option) => (
                <span
                  key={option.value}
                  data-slot="async-select-tag"
                  className={cn(
                    "inline-flex max-w-full items-center gap-1 rounded-full border px-2 py-1 text-xs text-foreground",
                    tagClassName
                  )}
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate">
                      {renderTag?.(option, { remove: () => removeOption(option) }) ??
                        renderValue?.(option) ??
                        option.label}
                    </span>
                    {option.disabled && option.disabledReason && (
                      <span className="truncate text-[11px] text-muted-foreground">{option.disabledReason}</span>
                    )}
                  </span>
                  {!disabled && (
                    <span
                      role="button"
                      tabIndex={0}
                      data-slot="async-select-tag-remove"
                      className="rounded-full text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Remove ${getOptionLabelText(option)}`}
                      onClick={(event) => {
                        stopInteractivePropagation(event)
                        removeOption(option)
                      }}
                      onKeyDown={(event) => handleTagRemoveKeyDown(event, option)}
                    >
                      <XIcon className="size-3" />
                    </span>
                  )}
                </span>
              ))
            ) : (
              <span className="truncate text-muted-foreground">
                {labels?.placeholder ?? "Select"}
              </span>
            )}
          </span>
          <span className="ml-2 flex shrink-0 items-center gap-1">
            {canClear && (
              <span
                role="button"
                tabIndex={0}
                data-slot="async-select-clear"
                className="rounded-full border p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={labels?.clearAll ?? labels?.clear ?? "Clear all"}
                onClick={handleClear}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return
                  event.preventDefault()
                  stopInteractivePropagation(event)
                  clearAllSelection()
                }}
              >
                <XIcon className="size-3.5" />
              </span>
            )}
            <ChevronsUpDownIcon className="size-4 opacity-60" />
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          data-slot="async-select-content"
          className={cn(
            "w-(--anchor-width) gap-3 rounded-[var(--radius-2xl)] p-3.5",
            contentClassName
          )}
        >
          <div data-slot="async-select-search-wrap" className="relative">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-slot="async-select-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels?.searchPlaceholder ?? "Search..."}
              className={cn("pl-8", searchClassName)}
            />
          </div>

          <div data-slot="async-select-meta" className="flex flex-wrap items-center justify-between gap-2 rounded-[min(var(--radius-xl),16px)] border px-3 py-2 text-xs text-muted-foreground">
            {hasValue && labels?.selectedCount && <span>{labels.selectedCount(values.length)}</span>}
            {isMaxReached &&
              (renderMaxSelected?.(state) ?? (
                <span>{labels?.maxSelected?.(maxSelected ?? values.length) ?? `Maximum ${maxSelected} selected`}</span>
              ))}
            <div className="ml-auto flex items-center gap-2">
              {canSelectAll && (
                <button
                  type="button"
                  data-slot="async-select-meta-action"
                  className="rounded-full border border-border/75 px-2.5 py-1 font-medium text-foreground transition-colors hover:bg-background"
                  onClick={handleSelectAllVisible}
                >
                  {labels?.selectAll ?? "Select all"}
                </button>
              )}
              {canClear && (
                <button
                  type="button"
                  data-slot="async-select-meta-action"
                  className="rounded-full border border-border/75 px-2.5 py-1 font-medium text-foreground transition-colors hover:bg-background"
                  onClick={() => onValueChange?.([], [])}
                >
                  {labels?.clearAll ?? labels?.clear ?? "Clear all"}
                </button>
              )}
            </div>
          </div>

          <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
            {searchTooShort && flatOptions.length === 0 && (
              renderMinSearch?.(state) ?? (
                <AsyncStateMessage>
                  {labels?.minSearchLength?.(minSearchLength) ?? `Type at least ${minSearchLength} characters`}
                </AsyncStateMessage>
              )
            )}

            {isLoading &&
              (renderLoading?.(state) ?? (
                <AsyncStateMessage>
                  <span className="inline-flex items-center gap-2">
                    <Loader2Icon className="size-4 animate-spin" />
                    {labels?.loading ?? "Loading..."}
                  </span>
                </AsyncStateMessage>
              ))}

            {!isLoading && hasError &&
              (renderError?.(state) ?? (
                <AsyncStateMessage className="text-destructive">
                  {labels?.error ?? "Could not load options"}
                </AsyncStateMessage>
              ))}

            {!isLoading && !hasError && !searchTooShort && flatOptions.length === 0 && !canCreate &&
              (renderEmpty?.(state) ?? (
                <AsyncStateMessage>{labels?.empty ?? "No options found"}</AsyncStateMessage>
              ))}

            {!isLoading && !hasError && canCreate && (
              <AsyncCreateButton
                search={search}
                isCreating={isCreating}
                label={createOptionLabel}
                onCreate={handleCreate}
              />
            )}

            {!isLoading &&
              !hasError &&
              optionGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.label && (
                    <div className="sticky top-0 z-10 bg-popover px-2 py-1 text-xs font-medium text-muted-foreground">
                      <span data-slot="async-select-group-label">{group.label}</span>
                    </div>
                  )}
                  {group.options.map((option) => (
                    <AsyncOptionButton
                      key={option.value}
                      option={option}
                      selected={selectedSet.has(option.value)}
                      renderOption={renderOption}
                      optionClassName={optionClassName}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { AsyncSelect, AsyncMultiSelect }
