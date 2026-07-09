import * as React from "react"
import { LoaderCircleIcon, SearchIcon } from "lucide-react"

import { ClearableInput, type ClearableInputProps } from "@/components/inputs/clearable-input"

export type SearchInputProps = Omit<ClearableInputProps, "leadingIcon" | "type" | "onValueChange"> & {
  searchIcon?: React.ReactNode
  loading?: boolean
  loadingLabel?: string
  resultCount?: number
  shortcut?: React.ReactNode
  debounceMs?: number
  showMetaOnClear?: boolean
  onValueChange?: (value: string) => void
  onDebouncedValueChange?: (value: string) => void
}

/**
 * @deprecated Prefer `Input` with `type="search"` and search-related props for new usage.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      searchIcon,
      loading = false,
      loadingLabel = "Searching",
      resultCount,
      shortcut,
      debounceMs,
      value,
      onValueChange,
      onDebouncedValueChange,
      placeholder = "Search...",
      inputMode = "search",
      trailing,
      showMetaOnClear = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const stringValue = value == null ? "" : String(value)

    React.useEffect(() => {
      if (debounceMs == null || !onDebouncedValueChange) return
      const timeoutId = window.setTimeout(() => onDebouncedValueChange(stringValue), debounceMs)
      return () => window.clearTimeout(timeoutId)
    }, [debounceMs, onDebouncedValueChange, stringValue])

    const meta = (
      <span data-slot="search-input-meta" className="inline-flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
        {loading ? (
          <span aria-live="polite" className="inline-flex items-center gap-1.5">
            <LoaderCircleIcon className="size-3.5 animate-spin" aria-hidden="true" />
            <span className="sr-only">{loadingLabel}</span>
          </span>
        ) : null}
        {typeof resultCount === "number" ? <span>{resultCount}</span> : null}
        {shortcut ? <span className="rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono">{shortcut}</span> : null}
        {trailing}
      </span>
    )

    return (
      <ClearableInput
        ref={ref}
        type="search"
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        disabled={disabled || loading}
        leadingIcon={searchIcon ?? <SearchIcon />}
        trailing={meta}
        replaceTrailingWhenClear={!showMetaOnClear}
        onValueChange={onValueChange}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
