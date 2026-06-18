import type { ComponentDemoMock } from "../types"

export const dialogMock: ComponentDemoMock = {
  code: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@azamat/ui"\n\nexport function Example() {\n  return (\n    <Dialog>\n      <DialogTrigger render={<Button />}>Open</DialogTrigger>\n      <DialogContent>\n        <DialogHeader><DialogTitle>Dialog</DialogTitle></DialogHeader>\n      </DialogContent>\n    </Dialog>\n  )\n}`,
  cliCommand: "npx azamat-ui@latest add dialog",
  highlights: ["Modal trigger", "Overlay state", "Header and footer slots", "Confirmation actions"],
  relatedBlockSlugs: ["auth-sign-in", "settings-form", "crm-dashboard"],
  scenarios: [
    { title: "Publish dialog", description: "Confirm important updates before shipping." },
    { title: "Danger flow", description: "Use modal confirmation for destructive actions." },
    { title: "Form modal", description: "Collect focused input without leaving the page." },
    { title: "Review modal", description: "Wrap approval or handoff steps in a focused overlay." },
  ],
  capabilityNotes: [
    "Supports modal triggers, headers, descriptions and footer actions.",
    "Useful for destructive confirms, focused forms and approval steps.",
    "Should cover open, close and confirm action patterns in docs.",
    "Benefits from examples with both neutral and destructive intent.",
  ],
}

