import type { ComponentDemoMock } from "../types"

export const breadcrumbsMock: ComponentDemoMock = {
  code: `import { Breadcrumbs } from "@azamatjurayevdev/azix-ui"

const items = [
  { key: "home", label: "Home", href: "/" },
  { key: "products", label: "Products", href: "/products" },
  { key: "active", label: "Overview", current: true },
]

export function Example() {
  return <Breadcrumbs items={items} separator="/" />
}`,
  highlights: ["Readable route context", "Current route flagging", "Custom separator support", "Custom link rendering hook"],
  scenarios: [
    { title: "Deep navigation", description: "Render nested routes with one-line context breadcrumbs." },
    { title: "Router links", description: "Provide hrefs for SPA links or custom render for router primitives." },
    { title: "Page headings", description: "Use with PageHeader when users need location confirmation." },
  ],
  capabilityNotes: [
    "Keep the last item marked as current so focus and navigation patterns stay consistent.",
    "Custom separators can match your design language without breaking semantics.",
    "Inject router-specific links through `renderLink` for framework compatibility.",
  ],
}

