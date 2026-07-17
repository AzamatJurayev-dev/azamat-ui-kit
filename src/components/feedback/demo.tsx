import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const feedbackShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("alert", "Alert", "feedback", "Inline feedback banner for success, warning, info, and error states."),
  component("state-view", "StateView", "feedback", "Canonical empty, loading, error, success and informational state surface."),
])
