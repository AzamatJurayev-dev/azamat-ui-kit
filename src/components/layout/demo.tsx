import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const layoutShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("app-header", "AppHeader", "layout", "Sticky product header with left, center and right slots."),
  component("section-header", "SectionHeader", "layout", "Reusable section title block with actions and metadata."),
  component("stat-card", "StatCard", "layout", "Dashboard stat card for KPI, trend and helper text."),
])
