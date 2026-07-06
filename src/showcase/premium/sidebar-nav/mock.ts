import type { ComponentDemoMock } from "../types"

export const sidebarNavMock: ComponentDemoMock = {
  code: `import { SidebarNav } from "azix"

const items = [
  { key: "overview", label: "Overview", href: "/overview" },
  { key: "resources", label: "Resources", href: "/resources", active: true },
  { key: "settings", label: "Settings", href: "/settings", disabled: true },
]

export function Example() {
  return <SidebarNav items={items} />
}`,
  highlights: ["Compact and active states", "Disabled route handling", "Render hooks for custom link and item", "Works with controlled active item"],
  scenarios: [
    { title: "Left navigation", description: "Use SidebarNav for primary route anchors and command links." },
    { title: "Custom links", description: "Render each link through Next/React Router integration." },
    { title: "Collapsed rail", description: "Use compact mode on narrow sidebars and drawers." },
  ],
  capabilityNotes: [
    "Keep `items` as source of truth for route and badge metadata.",
    "Preserve keys and active state consistency across re-renders.",
    "For keyboard users, keep labels human-readable and non-empty.",
    "Disabled items should still show intent but block interaction clearly.",
  ],
}
