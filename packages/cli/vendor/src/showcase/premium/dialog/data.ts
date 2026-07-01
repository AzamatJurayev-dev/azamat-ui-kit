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
  {
    label: "Start form",
    triggerVariant: "default",
    title: "Create workspace",
    description: "Open a focused form when you need explicit name and visibility fields.",
    confirmLabel: "Create",
    confirmVariant: "default",
  },
]
