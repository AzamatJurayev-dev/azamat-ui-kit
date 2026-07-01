import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const actionsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("action-menu", "ActionMenu", "actions", "Compact dropdown action menu for rows and cards."),
  component("button-group", "ButtonGroup", "actions", "Grouped action buttons for view switching and compact controls."),
  component("quick-action-grid", "QuickActionGrid", "actions", "Action launcher grid for dense dashboard shortcuts."),
])
