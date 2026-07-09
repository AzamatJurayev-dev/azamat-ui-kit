import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const navigationShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("pagination", "Pagination", "navigation", "Controlled page navigation with edge buttons and active state."),
  component("nav-tabs", "NavTabs", "navigation", "Navigation tabs for switching related document sections."),
  component("page-tabs", "PageTabs", "navigation", "Top-level page tab strip for route-sized sections."),
  component("stepper-tabs", "StepperTabs", "navigation", "Step-like tabs for setup and onboarding progress."),
])
