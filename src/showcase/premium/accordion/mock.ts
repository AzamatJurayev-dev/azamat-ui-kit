import type { ComponentDemoMock } from "../types"

export const accordionMock: ComponentDemoMock = {
  code: `import { Accordion } from "@/index"

const items = [
  {
    key: "tokens",
    title: "Theme tokens",
    description: "Control border, background, radius, and spacing from one place.",
    content: "Keep product decisions inside tokens instead of hardcoded one-off wrappers.",
  },
  {
    key: "families",
    title: "Component families",
    description: "Teach one primary surface first.",
    content: "Members like AsyncSelect or FormAsyncSelect should stay inside the canonical route.",
  },
]

export function Example() {
  return <Accordion type="single" defaultValue="tokens" items={items} />
}`,
  htmlCode: `<details data-slot="accordion">
  <summary data-slot="accordion-trigger">Theme tokens</summary>
  <div data-slot="accordion-content">Keep product decisions inside tokens.</div>
</details>`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add accordion",
  highlights: [
    "Single and multiple expansion behavior",
    "Title, description, and body content through one item contract",
    "Good for docs FAQs, settings help, and release notes",
  ],
  scenarios: [
    { title: "Settings help", description: "Hide advanced explanation until the user requests it." },
    { title: "FAQ", description: "Keep pages shorter while preserving full guidance." },
    { title: "Release checklist", description: "Reveal only the currently relevant operational details." },
  ],
  capabilityNotes: [
    "Use `type=\"single\"` for focus-first documentation flows.",
    "Use `type=\"multiple\"` when users may compare several sections together.",
  ],
}
