import * as React from "react"
import { AsyncMultiSelect, AsyncSelect, type AsyncSelectOption } from "../../src"

type Option = AsyncSelectOption<string>

const baseOptions: Option[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta", disabled: true, disabledReason: "Beta is locked" },
  { value: "gamma", label: "Gamma" },
]

export function createLoadOptionsSpy() {
  const calls: Array<{ search: string; aborted: boolean }> = []

  const loadOptions = async (search: string, signal?: AbortSignal) => {
    calls.push({ search, aborted: Boolean(signal?.aborted) })

    return baseOptions.filter((option) => {
      const labelText = typeof option.label === "string" ? option.label.toLowerCase() : String(option.value).toLowerCase()
      return option.value.includes(search) || labelText.includes(search.toLowerCase())
    })
  }

  return { calls, loadOptions }
}

export function AsyncSelectFixture({
  onValueChange,
  loadOptions,
  loadSelectedOption,
  debounceMs,
  minSearchLength,
  cacheTtl,
  cacheOptions,
}: {
  onValueChange?: (value: string | undefined, option?: Option) => void
  loadOptions: (search: string, signal?: AbortSignal) => Promise<Option[]>
  loadSelectedOption?: (value: string, signal?: AbortSignal) => Promise<Option | null | undefined>
  debounceMs?: number
  minSearchLength?: number
  cacheTtl?: number
  cacheOptions?: boolean
}) {
  const selectedValue: string = "beta"

  return (
    <AsyncSelect
      value={selectedValue}
      loadOptions={loadOptions}
      loadSelectedOption={loadSelectedOption}
      onValueChange={onValueChange}
      debounceMs={debounceMs}
      minSearchLength={minSearchLength}
      cacheTtl={cacheTtl}
      cacheOptions={cacheOptions}
      labels={{
        placeholder: "Select an item",
        searchPlaceholder: "Search items",
      }}
    />
  )
}

export function AsyncMultiSelectFixture({
  value = ["alpha", "gamma"],
  onValueChange,
  loadOptions,
  loadSelectedOptions,
  debounceMs,
  minSearchLength,
  cacheTtl,
  cacheOptions,
  closeOnSelect,
  maxSelected,
  showSelectAll,
}: {
  value?: string[]
  onValueChange?: (nextValue: string[], options: Option[]) => void
  loadOptions: (search: string, signal?: AbortSignal) => Promise<Option[]>
  loadSelectedOptions?: (values: string[], signal?: AbortSignal) => Promise<Option[]>
  debounceMs?: number
  minSearchLength?: number
  cacheTtl?: number
  cacheOptions?: boolean
  closeOnSelect?: boolean
  maxSelected?: number
  showSelectAll?: boolean
}) {
  const selectedValues: string[] = value

  return (
    <AsyncMultiSelect
      value={selectedValues}
      loadOptions={loadOptions}
      loadSelectedOptions={loadSelectedOptions}
      onValueChange={onValueChange}
      debounceMs={debounceMs}
      minSearchLength={minSearchLength}
      cacheTtl={cacheTtl}
      cacheOptions={cacheOptions}
      closeOnSelect={closeOnSelect}
      maxSelected={maxSelected}
      showSelectAll={showSelectAll}
      labels={{
        placeholder: "Select many",
        searchPlaceholder: "Search items",
        clearAll: "Clear all",
        selectAll: "Select all",
        selectedCount: (count) => `${count} selected`,
        maxSelected: (count) => `Maximum ${count} selected`,
      }}
    />
  )
}
