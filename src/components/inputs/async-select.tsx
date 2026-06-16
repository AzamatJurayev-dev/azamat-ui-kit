import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, Loader2Icon, SearchIcon, XIcon } from "lucide-react"

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

export type AsyncSelectLabels = {
  placeholder?: string
  searchPlaceholder?: string
  loading?: string
  empty?: string
  error?: string
  clear?: string
}

export type AsyncSelectProps<
  TValue extends string = string,
  TData = unknown,
  TOption extends AsyncSelectOption<TValue, TData> = AsyncSelectOption<TValue, TData>,
> = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: TValue
  selectedOption?: TOption | null
  onValueChange?: (value: TValue | undefined, option?: TOption) => void
  loadOptions: (search: string) => Promise<TOption[]>
  defaultOptions?: TOption[]
  disabled?: boolean
  clearable?: boolean
  debounceMs?: number
  minSearchLength?: number
  labels?: AsyncSelectLabels
  renderOption?: (option: TOption, state: { selected: boolean }) => React.ReactNode
  renderValue?: (option: TOption) => React.ReactNode
  triggerClassName?: string
  contentClassName?: string
  searchClassName?: string
  optionClassName?: string
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

function findSelectedOption<
  TValue extends string,
  TData,
  TOption extends AsyncSelectOption<TValue, TData>,
>(
  value: TValue | undefined,
  selectedOption: TOption | null | undefined,
  options: TOption[],
  defaultOptions: TOption[]
) {
  if (!value) return undefined
  if (selectedOption?.value === value) return selectedOption

  return [...options, ...defaultOptions].find((option) => option.value === value)
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
  defaultOptions,
  disabled = false,
  clearable = true,
  debounceMs = 250,
  minSearchLength = 0,
  labels,
  renderOption,
  renderValue,
  triggerClassName,
  contentClassName,
  searchClassName,
  optionClassName,
  ...props
}: AsyncSelectProps<TValue, TData, TOption>) {
  const resolvedDefaultOptions = React.useMemo(() => defaultOptions ?? [], [defaultOptions])
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [options, setOptions] = React.useState<TOption[]>(resolvedDefaultOptions)
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const debouncedSearch = useDebouncedValue(search, debounceMs)

  const currentOption = findSelectedOption(
    value,
    selectedOption,
    options,
    resolvedDefaultOptions
  )
  const canClear = clearable && Boolean(value) && !disabled

  React.useEffect(() => {
    if (!open) return

    if (debouncedSearch.length < minSearchLength) {
      setOptions(resolvedDefaultOptions)
      return
    }

    let cancelled = false

    async function run() {
      setIsLoading(true)
      setHasError(false)

      try {
        const nextOptions = await loadOptions(debouncedSearch)
        if (!cancelled) {
          setOptions(nextOptions)
        }
      } catch {
        if (!cancelled) {
          setHasError(true)
          setOptions([])
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
  }, [debouncedSearch, loadOptions, minSearchLength, open, resolvedDefaultOptions])

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

            {!isLoading && !hasError && options.length === 0 && (
              <div className="px-2 py-3 text-sm text-muted-foreground">
                {labels?.empty ?? "No options found"}
              </div>
            )}

            {!isLoading &&
              !hasError &&
              options.map((option) => {
                const selected = option.value === value

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
                      selected && "bg-accent text-accent-foreground",
                      optionClassName
                    )}
                    onClick={() => handleSelect(option)}
                  >
                    <span className="flex size-4 shrink-0 items-center justify-center">
                      {selected && <CheckIcon className="size-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      {renderOption?.(option, { selected }) ?? (
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate">{option.label}</span>
                          {option.description && (
                            <span className="truncate text-xs text-muted-foreground">
                              {option.description}
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  </button>
                )
              })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { AsyncSelect }
