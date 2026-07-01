import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const patternsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("resource-page", "ResourcePage", "patterns", "Full resource index page shell for admin dashboards."),
  component("resource-detail-page", "ResourceDetailPage", "patterns", "Detail page shell with title, metadata and sections."),
])
