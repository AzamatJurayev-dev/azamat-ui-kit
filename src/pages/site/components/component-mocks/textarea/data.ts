import type { TextareaDemoField } from "./types"

export const textareaDemoFields: TextareaDemoField[] = [
  { title: "Primary note", placeholder: "Write a detailed note...", minHeight: "min-h-28" },
  { title: "Internal changelog draft", defaultValue: "Internal changelog draft...", minHeight: "min-h-20" },
  { title: "Locked review comment", defaultValue: "Locked review comment", disabled: true, minHeight: "min-h-20" },
]
