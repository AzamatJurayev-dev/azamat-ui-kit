import type { ComponentDemoMock } from "../types"

export const buttonMock: ComponentDemoMock = {
  code: `import { Button } from "@azamat/ui"\n\nexport function Example() {\n  return <Button>Continue</Button>\n}`,
  htmlCode: `<button data-slot="button" data-variant="primary">\n  Continue\n</button>`,
  cliCommand: "npx azamat-ui@latest add button",
  highlights: ["Primary and secondary variants", "Outline and destructive styles", "Action groups", "CTA rows"],
  relatedBlockSlugs: ["pricing-section", "auth-sign-in", "ecommerce-product"],
  scenarios: [
    { title: "Primary CTA", description: "Lead users toward the highest-priority action." },
    { title: "Toolbar actions", description: "Mix multiple intents inside compact toolbars." },
    { title: "Destructive confirm", description: "Use strong color contrast for irreversible actions." },
    { title: "Responsive action row", description: "Stack and stretch actions for tablet and mobile layouts." },
  ],
  capabilityNotes: [
    "Supports primary, secondary, outline, ghost, link and destructive visual styles.",
    "Works in inline rows, full-width action areas and dense toolbars.",
    "Can be paired with left and right icons for directional or utility actions.",
    "Should expose focus, disabled and loading states in public documentation.",
  ],
}

