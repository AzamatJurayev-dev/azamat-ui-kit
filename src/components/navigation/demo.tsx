import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const navigationShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("accordion", "Accordion", "navigation", "Collapsible content groups for settings, FAQs and structured details."),
  component("pagination", "Pagination", "navigation", "Controlled page navigation with edge buttons and active state."),
])
