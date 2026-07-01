import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const wizardShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("stepper", "Stepper", "wizard", "Clickable step navigation for multi-step forms."),
  component("wizard", "Wizard", "wizard", "Stepper, content and footer controls combined into one workflow."),
])
