import {
  Select,
  type SelectOption,
  type SelectProps,
} from "@/components/ui/select"

export type SimpleSelectOption = SelectOption

/**
 * @deprecated Prefer `Select` with `options` for new usage.
 */
export type SimpleSelectProps = Omit<SelectProps, "children"> & {
  options: SimpleSelectOption[]
}

/**
 * @deprecated Prefer `Select` with `options` for new usage.
 */
function SimpleSelect(props: SimpleSelectProps) {
  return <Select {...props} />
}

export { SimpleSelect }
