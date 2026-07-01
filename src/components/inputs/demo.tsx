import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const inputsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("clearable-input", "ClearableInput", "inputs", "Input with clear action, Escape handling and focus restore."),
  component("search-input", "SearchInput", "inputs", "Search field with icon, count, shortcut and debounce-friendly value handling."),
  component("password-input", "PasswordInput", "inputs", "Password field with visibility toggle and secure autocomplete defaults."),
  component("slider", "Slider", "inputs", "Single value range control for density, threshold, and score tuning."),
  component("range-slider", "RangeSlider", "inputs", "Two-handle slider for min/max filtering."),
  component("rating", "Rating", "inputs", "Compact score input for feedback and review flows."),
  component("otp-input", "OtpInput", "inputs", "One-time code entry with fixed-length slots."),
  component("color-input", "ColorInput", "inputs", "Theme and accent color field with native color selection."),
  component("tag-input", "TagInput", "inputs", "Tokenized text input for labels, skills, and quick filters."),
])
