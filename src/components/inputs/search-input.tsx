import * as React from "react"
import { SearchIcon } from "lucide-react"

import { ClearableInput, type ClearableInputProps } from "@/components/inputs/clearable-input"

export type SearchInputProps = Omit<ClearableInputProps, "leadingIcon" | "type"> & {
  searchIcon?: React.ReactNode
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ searchIcon, placeholder = "Search...", inputMode = "search", ...props }, ref) => {
    return (
      <ClearableInput
        ref={ref}
        type="search"
        inputMode={inputMode}
        placeholder={placeholder}
        leadingIcon={searchIcon ?? <SearchIcon />}
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
