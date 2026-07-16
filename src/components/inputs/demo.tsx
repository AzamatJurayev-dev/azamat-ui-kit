import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const inputsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("async-select", "AsyncSelect", "inputs", "Remote select member for server search, hydration and large datasets."),
  component("slider", "Slider", "inputs", "Single value range control for density, threshold, and score tuning."),
  component("range-slider", "RangeSlider", "inputs", "Two-handle slider for min/max filtering."),
  component("rating", "Rating", "inputs", "Compact score input for feedback and review flows."),
  component("otp-input", "OtpInput", "inputs", "One-time code entry with fixed-length slots."),
  component("color-input", "ColorInput", "inputs", "Theme and accent color field with native color selection."),
  component("inline-editable", "InlineEditable", "inputs", "Inline text editing for compact dashboards and settings tables."),
  component("tag-input", "TagInput", "inputs", "Tokenized text input for labels, skills, and quick filters."),
])
