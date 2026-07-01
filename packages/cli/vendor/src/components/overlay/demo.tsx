import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const overlayShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("dialog-actions", "DialogActions", "overlay", "Modal footer action row with cancel, secondary and primary actions."),
  component("alert-dialog", "AlertDialog", "overlay", "Destructive confirmation dialog with loading-ready action states."),
  component("drawer", "Drawer", "overlay", "Side panel for contextual details without leaving the page."),
])
