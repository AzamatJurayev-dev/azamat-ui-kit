import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, Loader2Icon, PlusIcon, SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type AsyncSelectOption<TValue extends string = string, TData = unknown> = {
  value: TValue
  label: React.ReactNode
  disabled?: boolean
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

export type AsyncSelectLabels = {
  placeholder?: string
  searchPlaceholder?: string
  loading?: string
  creating?: string
  empty?: string
  error?: string
  clear?: string
  clearAll?: string
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
  loadOptions: (search: string) => Promise<AsyncSelectOptionsResult<TValue, TData, TOption>>
  loadSelectedOption?: (value: TValue) => Promise<TOption | null | undefined>
  defaultOptions?: AsyncSelectOptionsResult<TValue, TData, TOption>
  disabled?: boolean
  clearable?: boolean
  cacheOptions?: boolean
  debounceMs?: number
  minSearchLength?: number
  labels?: AsyncSelectLabels
  renderOption?: (option: TOption, state: { selected: boolean }) => React.ReactNode
  renderValue?: (option: TOption) => React.ReactNode
  onCreateOption?: (search: string) => Promise<TOption> | TOption
  createOptionLabel?: (search: string) => React.ReactNode
  showCreateOption?: (search: string, options: TOption[]) => boolean
  triggerClassName?: string
  contentClassName?: string
  searchClassName?: string
  optionClassName?: string
}

export type AsyncMultiSelectProps<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: TValue[]
  selectedOptions?: TOption[]
  onValueChange?: (value: TValue[], options: TOption[]) => void
  loadOptions: (search: string) => Promise<AsyncSelectOptionsResult<TValue, TData, TOption>>
  loadSelectedOptions?: (values: TValue[]) => Promise<TOption[]>
  defaultOptions?: AsyncSelectOptionsResult<TValue, TData, TOption>
  disabled?: boolean
  clearable?: boolean
  cacheOptions?: boolean
  closeOnSelect?: boolean
  debounceMs?: number
  minSearchLength?: number
  maxSelected?: number
  labels?: AsyncSelectLabels
  renderOption?: (option: TOption, state: { selected: boolean }) => React.ReactNode
  renderValue?: (option: TOption) => React.ReactNode
  renderTag?: (option: TOption, state: { remove: () => void }) => React.ReactNode
  onCreateOption?: (search: string) => Promise<TOption> | TOption
  createOptionLabel?: (search: string) => React.ReactNode
  showCreateOption?: (search: string, options: TOption[]) => boolean
  triggerClassName?: string
  contentClassName?: string
  searchClassName?: string
  optionClassName?: string
  tagClassName?: string
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
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        selected && "bg-accent text-accent-foreground",
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
      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
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
  debounceMs = 250,
  minSearchLength = 0,
  labels,
  renderOption,
  renderValue,
  onCreateOption,
  createOptionLabel,
  showCreateOption,
  triggerClassName,
  contentClassName,
  searchClassName,
  optionClassName,
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
  const cacheRef = React.useRef(new Map<string, AsyncSelectOptionGroup<TValue, TData, TOption>[]>() )
  const debouncedSearch = useDebouncedValue(search, debounceMs)
  const flatOptions = React.useMemo(() => flattenOptionGroups(optionGroups), [optionGroups])
  const currentOption = findSelectedOption(
    value,
    selectedOption,
    flatOptions,
    defaultFlatOptions,
    preloadedOption
  )
  const canClear = clearable && Boolean(value) && !disabled
  const canCreate = Boolean(onCreateOption) && (showCreateOption ?? defaultShowCreateOption)(search, flatOptions)

  React.useEffect(() => {
    setOptionGroups(resolvedDefaultGroups)
  }, [resolvedDefaultGroups])

  React.useEffect(() => {
    if (!value || currentOption || !loadSelectedOption) return

    let cancelled = false

    async function run() {
      const option = await loadSelectedOption?.(value)
      if (!cancelled) {
        setPreloadedOption(option ?? null)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [currentOption, loadSelectedOption, value])

  React.useEffect(() => {
    if (!open) return

    const searchKey = debouncedSearch.trim()

    if (searchKey.length < minSearchLength) {
      setOptionGroups(resolvedDefaultGroups)
      return
    }

    if (cacheOptions && cacheRef.current.has(searchKey)) {
      setOptionGroups(cacheRef.current.get(searchKey) ?? [])
      return
    }

    let cancelled = false

    async function run() {
      setIsLoading(true)
      setHasError(false)

      try {
        const nextOptions = normalizeOptionGroups(await loadOptions(searchKey))
        if (!cancelled) {
          if (cacheOptions) {
            cacheRef.current.set(searchKey, nextOptions)
          }
          setOptionGroups(nextOptions)
        }
      } catch {
        if (!cancelled) {
          setHasError(true)
          setOptionGroups([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [cacheOptions, debouncedSearch, loadOptions, minSearchLength, open, resolvedDefaultGroups])

  const handleSelect = (option: TOption) => {
    if (option.disabled) return

    onValueChange?.(option.value, option)
    setOpen(false)
    setSearch("")
  }

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onValueChange?.(undefined)
    setSearch("")
  }

  const handleCreate = async () => {
    if (!onCreateOption || !search.trim()) return

    setIsCreating(true)

    try {
      const createdOption = await onCreateOption(search.trim())
      setOptionGroups((previousGroups) => [{ options: [createdOption] }, ...previousGroups])
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
              className={cn("w-full justify-between", triggerClassName)}
            />
          }
        >
          <span className="min-w-0 flex-1 truncate text-left">
            {currentOption
              ? renderValue?.(currentOption) ?? currentOption.label
              : labels?.placeholder ?? "Select"}
          </span>
          <span className="ml-2 flex shrink-0 items-center gap-1">
            {canClear && (
              <span
                role="button"
                tabIndex={-1}
                className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                aria-label={labels?.clear ?? "Clear"}
                onClick={handleClear}
              >
                <XIcon className="size-3.5" />
              </span>
            )}
            <ChevronsUpDownIcon className="size-4 opacity-60" />
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn("w-(--anchor-width) gap-2 p-2", contentClassName)}
        >
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels?.searchPlaceholder ?? "Search..."}
              className={cn("pl-8", searchClassName)}
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" />
                {labels?.loading ?? "Loading..."}
              </div>
            )}

            {!isLoading && hasError && (
              <div className="px-2 py-3 text-sm text-destructive">
                {labels?.error ?? "Could not load options"}
              </div>
            )}

            {!isLoading && !hasError && flatOptions.length === 0 && !canCreate && (
              <div className="px-2 py-3 text-sm text-muted-foreground">
                {labels?.empty ?? "No options found"}
              </div>
            )}

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
                    <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
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
  closeOnSelect = false,
  debounceMs = 250,
  minSearchLength = 0,
  maxSelected,
  labels,
  renderOption,
  renderValue,
  renderTag,
  onCreateOption,
  createOptionLabel,
  showCreateOption,
  triggerClassName,
  contentClassName,
  searchClassName,
  optionClassName,
  tagClassName,
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
  const cacheRef = React.useRef(new Map<string, AsyncSelectOptionGroup<TValue, TData, TOption>[]>() )
  const debouncedSearch = useDebouncedValue(search, debounceMs)
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
  const hasValue = values.length > 0
  const canClear = clearable && hasValue && !disabled
  const isMaxReached = typeof maxSelected === "number" && values.length >= maxSelected
  const canCreate = Boolean(onCreateOption) && (showCreateOption ?? defaultShowCreateOption)(search, flatOptions)

  React.useEffect(() => {
    setOptionGroups(resolvedDefaultGroups)
  }, [resolvedDefaultGroups])

  React.useEffect(() => {
    if (!values.length || !loadSelectedOptions) return

    const knownValues = new Set(allKnownOptions.map((option) => option.value))
    const missingValues = values.filter((item) => !knownValues.has(item))

    if (!missingValues.length) return

    let cancelled = false

    async function run() {
      const loadedOptions = await loadSelectedOptions?.(missingValues)
      if (!cancelled && loadedOptions) {
        setPreloadedOptions((previousOptions) => mergeUniqueOptions(previousOptions, loadedOptions))
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [allKnownOptions, loadSelectedOptions, selectedValueKey, values])

  React.useEffect(() => {
    if (!open) return

    const searchKey = debouncedSearch.trim()

    if (searchKey.length < minSearchLength) {
      setOptionGroups(resolvedDefaultGroups)
      return
    }

    if (cacheOptions && cacheRef.current.has(searchKey)) {
      setOptionGroups(cacheRef.current.get(searchKey) ?? [])
      return
    }

    let cancelled = false

    async function run() {
      setIsLoading(true)
      setHasError(false)

      try {
        const nextOptions = normalizeOptionGroups(await loadOptions(searchKey))
        if (!cancelled) {
          if (cacheOptions) {
            cacheRef.current.set(searchKey, nextOptions)
          }
          setOptionGroups(nextOptions)
        }
      } catch {
        if (!cancelled) {
          setHasError(true)
          setOptionGroups([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [cacheOptions, debouncedSearch, loadOptions, minSearchLength, open, resolvedDefaultGroups])

  const emitChange = (nextValues: TValue[], nextKnownOptions: TOption[]) => {
    onValueChange?.(nextValues, getOptionsByValue(nextValues, nextKnownOptions))
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

  const removeOption = (option: TOption) => {
    emitChange(values.filter((item) => item !== option.value), allKnownOptions)
  }

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onValueChange?.([], [])
    setSearch("")
  }

  const handleCreate = async () => {
    if (!onCreateOption || !search.trim()) return

    setIsCreating(true)

    try {
      const createdOption = await onCreateOption(search.trim())
      const nextKnownOptions = mergeUniqueOptions(allKnownOptions, [createdOption])
      const nextValues = selectedSet.has(createdOption.value)
        ? values
        : isMaxReached
          ? values
          : [...values, createdOption.value]

      setOptionGroups((previousGroups) => [{ options: [createdOption] }, ...previousGroups])
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
              className={cn("min-h-8 w-full justify-between", triggerClassName)}
            />
          }
        >
          <span className="flex min-w-0 flex-1 flex-wrap gap-1 text-left">
            {currentOptions.length > 0 ? (
              currentOptions.map((option) => (
                <span
                  key={option.value}
                  className={cn(
                    "inline-flex max-w-full items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs text-foreground",
                    tagClassName
                  )}
                >
                  <span className="truncate">
                    {renderTag?.(option, { remove: () => removeOption(option) }) ??
                      renderValue?.(option) ??
                      option.label}
                  </span>
                  {!disabled && (
                    <span
                      role="button"
                      tabIndex={-1}
                      className="rounded-sm text-muted-foreground hover:text-foreground"
                      onClick={(event) => {
                        event.stopPropagation()
                        removeOption(option)
                      }}
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
                tabIndex={-1}
                className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                aria-label={labels?.clearAll ?? labels?.clear ?? "Clear all"}
                onClick={handleClear}
              >
                <XIcon className="size-3.5" />
              </span>
            )}
            <ChevronsUpDownIcon className="size-4 opacity-60" />
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn("w-(--anchor-width) gap-2 p-2", contentClassName)}
        >
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels?.searchPlaceholder ?? "Search..."}
              className={cn("pl-8", searchClassName)}
            />
          </div>

          {hasValue && labels?.selectedCount && (
            <div className="px-2 text-xs text-muted-foreground">
              {labels.selectedCount(values.length)}
            </div>
          )}

          <div className="max-h-64 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" />
                {labels?.loading ?? "Loading..."}
              </div>
            )}

            {!isLoading && hasError && (
              <div className="px-2 py-3 text-sm text-destructive">
                {labels?.error ?? "Could not load options"}
              </div>
            )}

            {!isLoading && !hasError && flatOptions.length === 0 && !canCreate && (
              <div className="px-2 py-3 text-sm text-muted-foreground">
                {labels?.empty ?? "No options found"}
              </div>
            )}

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
                    <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                      {group.label}
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
