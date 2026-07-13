import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const layoutShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("app-header", "AppHeader", "layout", "Sticky product header with left, center and right slots."),
])
