import type { TextareaDemoField } from "./types"

export const textareaDemoFields: TextareaDemoField[] = [
  { title: "Primary note", placeholder: "Write a detailed note...", minHeight: "min-h-28", rows: 6 },
  { title: "Internal changelog draft", defaultValue: "Internal changelog draft...", minHeight: "min-h-20", rows: 4 },
  { title: "Locked review comment", defaultValue: "Locked review comment", readOnly: true, minHeight: "min-h-20", rows: 3 },
]
