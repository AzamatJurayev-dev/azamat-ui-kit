import type { DialogDemoItem } from "./types"

export const dialogDemoItems: DialogDemoItem[] = [
  {
    label: "Open dialog",
    triggerVariant: "default",
    title: "Publish update",
    description: "Confirm the release notes and push this component update live.",
    confirmLabel: "Publish",
    confirmVariant: "default",
  },
  {
    label: "Delete item",
    triggerVariant: "destructive",
    title: "Delete resource",
    description: "This action cannot be undone once the resource is removed.",
    confirmLabel: "Delete permanently",
    confirmVariant: "destructive",
  },
]
