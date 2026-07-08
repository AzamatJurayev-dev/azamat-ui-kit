import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const filtersShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("filter-bar", "FilterBar", "actions", "Search, filters, active-count and reset actions in one toolbar."),
  component("data-table-saved-filters", "SavedFilterSelect", "actions", "Saved filter chips and quick view controls."),
])
