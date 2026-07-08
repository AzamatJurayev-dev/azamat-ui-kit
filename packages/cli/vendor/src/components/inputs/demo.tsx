import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const inputsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("password-input", "PasswordInput", "inputs", "Password field with visibility toggle and secure autocomplete defaults."),
  component("number-input", "NumberInput", "inputs", "Numeric entry surface for counts, thresholds and dashboard filters."),
  component("phone-input", "PhoneInput", "inputs", "Masked phone entry that preserves stable value handling in forms."),
  component("money-input", "MoneyInput", "inputs", "Currency-focused value entry for invoices, pricing and finance screens."),
  component("date-input", "DateInput", "inputs", "Single-date entry with normalized string value handling."),
  component("date-range-input", "DateRangeInput", "inputs", "Range-based date entry for reporting, booking and filter flows."),
  component("simple-select", "SimpleSelect", "inputs", "Static select member for local option sets and lightweight filter panels."),
  component("async-select", "AsyncSelect", "inputs", "Remote select member for server search, hydration and large datasets."),
  component("combobox", "Combobox", "inputs", "Local searchable choice input for reassignment and command-like selection."),
  component("slider", "Slider", "inputs", "Single value range control for density, threshold, and score tuning."),
  component("range-slider", "RangeSlider", "inputs", "Two-handle slider for min/max filtering."),
  component("rating", "Rating", "inputs", "Compact score input for feedback and review flows."),
  component("otp-input", "OtpInput", "inputs", "One-time code entry with fixed-length slots."),
  component("color-input", "ColorInput", "inputs", "Theme and accent color field with native color selection."),
  component("inline-editable", "InlineEditable", "inputs", "Inline text editing for compact dashboards and settings tables."),
  component("tag-input", "TagInput", "inputs", "Tokenized text input for labels, skills, and quick filters."),
])
