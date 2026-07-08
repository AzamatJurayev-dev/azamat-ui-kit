import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const formShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("form-input", "FormInput", "form", "Form wrapper for the universal Input surface."),
  component("form-select", "FormSelect", "form", "Form wrapper for controlled select fields."),
  component("form-textarea", "FormTextarea", "form", "Textarea wrapper with validation slots."),
  component("form-switch", "FormSwitch", "form", "Boolean form control with shell-level label and hint handling."),
  component("form-date-picker", "FormDatePicker", "form", "Popover date picker wrapper with RHF integration."),
  component("form-date-range-picker", "FormDateRangePicker", "form", "Range date picker wrapper with RHF integration."),
])
