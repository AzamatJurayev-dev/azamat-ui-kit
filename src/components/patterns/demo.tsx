import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const patternsShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("empty-state", "EmptyState", "patterns", "Composable empty state primitive for dashboards, lists and onboarding."),
])
