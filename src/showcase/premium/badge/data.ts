import type { BadgeDemoItem } from "./types"

export const badgeDemoItems: BadgeDemoItem[] = [
  { label: "Current", variant: "default", note: "Primary state badge" },
  { label: "Secondary", variant: "secondary", note: "Supportive metadata" },
  { label: "Outline", variant: "outline", note: "Light emphasis" },
  { label: "Alert", variant: "destructive", note: "Critical state" },
  { label: "Ghost", variant: "ghost", note: "Soft inline state" },
  { label: "Inline link", variant: "link", note: "Navigational text badge" },
]
