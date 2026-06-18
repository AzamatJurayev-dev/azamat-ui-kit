import type { ComponentDemoMock } from "../types"

export const textareaMock: ComponentDemoMock = {
  code: `import { Textarea } from "@azamat/ui"\n\nexport function Example() {\n  return <Textarea placeholder="Write your message..." />\n}`,
  htmlCode: `<textarea data-slot="textarea" placeholder="Write your message..."></textarea>`,
  cliCommand: "npx azamat-ui@latest add textarea",
  highlights: ["Long-form notes", "Feedback forms", "Autosizing layout", "Controlled content"],
  relatedBlockSlugs: ["settings-form", "auth-sign-in", "pricing-section"],
  scenarios: [
    { title: "Support notes", description: "Capture longer messages without leaving the current page." },
    { title: "Release notes", description: "Use multiline fields for changelog and update summaries." },
    { title: "Review comments", description: "Collect structured feedback with room for detail." },
    { title: "Internal description editor", description: "Write denser admin-facing content in settings and detail views." },
  ],
  capabilityNotes: [
    "Designed for multi-line content with enough vertical rhythm for long text.",
    "Useful in feedback, note-taking and settings flows where helper text matters.",
    "Should demonstrate empty, filled and disabled content states.",
    "Pairs well with form shells and richer editorial patterns.",
  ],
}

