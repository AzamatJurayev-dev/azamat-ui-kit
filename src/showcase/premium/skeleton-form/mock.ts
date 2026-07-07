import type { ComponentDemoMock } from "../types"

export const skeletonFormMock: ComponentDemoMock = {
  code: `import { SkeletonForm } from "@/index"

export function Example() {
  return <SkeletonForm fields={3} showTitle columns={2} />
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add skeleton-form",
  highlights: [
    "Form-first loading states that preserve field rhythm",
    "Supports one- or two-column layouts",
    "Optional title and action skeleton areas",
  ],
  scenarios: [
    { title: "Settings", description: "Keep form layout stable while waiting for data." },
    { title: "Create form", description: "Match final structure without exposing layout jitter." },
  ],
}

