import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const formShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("form-input", "FormInput", "form", "Form wrapper for the universal Input surface."),
  component("form-select", "FormSelect", "form", "Form wrapper for controlled select fields."),
  component("form-async-select", "FormAsyncSelect", "form", "RHF wrapper for remote option search."),
  component("form-textarea", "FormTextarea", "form", "Textarea wrapper with validation slots."),
  component("form-switch", "FormSwitch", "form", "Boolean form control with shell-level label and hint handling."),
  component("form-search-input", "FormSearchInput", "form", "Search input wrapper for forms and filter builders."),
  component("form-password-input", "FormPasswordInput", "form", "Password field wrapper with shell-managed feedback."),
  component("form-number-input", "FormNumberInput", "form", "Numeric input wrapper for typed values."),
  component("form-phone-input", "FormPhoneInput", "form", "Phone field wrapper with shell-managed state."),
  component("form-date-input", "FormDateInput", "form", "Date field wrapper for single-day selection."),
  component("form-date-range-input", "FormDateRangeInput", "form", "Range field wrapper for check-in or reporting filters."),
  component("form-date-picker", "FormDatePicker", "form", "Popover date picker wrapper with RHF integration."),
  component("form-date-range-picker", "FormDateRangePicker", "form", "Range date picker wrapper with RHF integration."),
])
