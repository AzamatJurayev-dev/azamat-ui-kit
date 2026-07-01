import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const feedbackShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("alert", "Alert", "feedback", "Inline feedback banner for success, warning, info, and error states."),
  component("page-state", "PageState", "feedback", "Full-page completion or blocked state with next actions."),
])
