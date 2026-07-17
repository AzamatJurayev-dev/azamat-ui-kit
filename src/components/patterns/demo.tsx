import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const patternsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("bulk-action-bar", "BulkActionBar", "patterns", "Selection-aware action surface for table and list workflows."),
  component("detail-layout", "DetailLayout", "patterns", "Responsive detail route with summary, main content, aside and footer slots."),
  component("resource-page", "ResourcePage", "patterns", "Full resource index page shell for admin dashboards."),
  component("resource-detail-page", "ResourceDetailPage", "patterns", "Detail page shell with title, metadata and sections."),
  component("settings-page", "SettingsPage", "patterns", "Responsive settings navigation with route-sized section content."),
])
