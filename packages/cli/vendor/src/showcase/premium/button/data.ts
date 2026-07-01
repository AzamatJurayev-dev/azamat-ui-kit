import type { ButtonDemoRow } from "./types"

export const buttonDemoRows: ButtonDemoRow[] = [
  {
    title: "Variant coverage",
    actions: [
      { label: "Primary", variant: "default" },
      { label: "Secondary", variant: "secondary" },
      { label: "Outline", variant: "outline" },
      { label: "Destructive", variant: "destructive" },
      { label: "Ghost", variant: "ghost" },
    ],
  },
  {
    title: "Button sizes",
    actions: [
      { label: "Small", variant: "outline", size: "sm" },
      { label: "Default", variant: "outline" },
      { label: "Large", variant: "outline", size: "lg" },
      { label: "Icon only", variant: "default", size: "icon", icon: "download" },
    ],
  },
  {
    title: "Icon and state actions",
    actions: [
      { label: "Download", variant: "outline", icon: "download" },
      { label: "Continue", variant: "default", icon: "arrow" },
      { label: "Loading", variant: "default", loading: true },
      { label: "Disabled", variant: "secondary", disabled: true },
    ],
  },
  {
    title: "Link behavior",
    actions: [
      { label: "Inline link", variant: "link" },
      { label: "Link as button", variant: "outline", asLink: true },
      { label: "Route button", variant: "default", asLink: true, size: "sm" },
    ],
  },
]
