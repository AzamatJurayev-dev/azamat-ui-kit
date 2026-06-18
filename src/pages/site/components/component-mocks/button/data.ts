import type { ButtonDemoRow } from "./types"

export const buttonDemoRows: ButtonDemoRow[] = [
  {
    title: "Variant coverage",
    actions: [
      { label: "Primary", variant: "default" },
      { label: "Secondary", variant: "secondary" },
      { label: "Outline", variant: "outline" },
      { label: "Destructive", variant: "destructive" },
    ],
  },
  {
    title: "Utility actions",
    actions: [
      { label: "Download", variant: "outline", icon: "download" },
      { label: "Ghost action", variant: "ghost" },
      { label: "Inline link", variant: "link" },
    ],
  },
  {
    title: "Responsive CTA row",
    actions: [
      { label: "Publish release", variant: "default", icon: "arrow" },
      { label: "Save draft", variant: "secondary", icon: "arrow" },
    ],
  },
]
