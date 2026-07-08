import type { ComponentDemoMock } from "../types"

export const buttonMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { ArrowRightIcon, DownloadIcon } from "lucide-react"
import { Button, buttonVariants } from "@/index"

export function BasicExamples() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button size="sm">Small</Button>
        <Button size="icon" aria-label="Download">
          <DownloadIcon className="size-4" />
        </Button>
        <Button>
          Continue
          <ArrowRightIcon className="ml-2 size-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" disabled>
          Disabled
        </Button>
        <Button variant="default" loading>
          Loading
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href="/docs">Open docs</a>
        </Button>
        <a className={buttonVariants({ variant: "outline", size: "sm" })} href="/components">
          Link styled as button
        </a>
      </div>
    </div>
  )
}

export function ControlledButton() {
  const [loading, setLoading] = React.useState(false)

  return (
    <Button
      variant="default"
      onClick={() => {
        setLoading(true)
        window.setTimeout(() => setLoading(false), 1800)
      }}
      loading={loading}
    >
      Submit
    </Button>
  )
}

// Don't overuse buttonVariants for every button instance.
// Use Button's own variant/size props by default, and keep buttonVariants
// only for styling non-button elements (a, Link) with shared look.`,
  htmlCode: `<button data-slot="button" data-variant="primary">
  Continue
</button>`,
  cliCommand: "npx tembro add button",
  highlights: [
    "Primary/secondary/outline/destructive/ghost/link and size tokens",
    "Icon slots with helper text and compact icon-only variant",
    "Loading and disabled interactive states",
    "buttonVariants utility usage for link-like elements",
  ],
  relatedBlockSlugs: ["auth-sign-in", "settings-form", "sidebar-layout"],
  scenarios: [
    { title: "Primary CTA", description: "Lead users toward the highest-priority action." },
    { title: "Utility action", description: "Use compact outline buttons for secondary workflows." },
    { title: "Destructive confirm", description: "Use strong color contrast for irreversible actions." },
    { title: "Link behavior", description: "Prefer semantic <a> when navigation is required." },
    { title: "When not to use variants", description: "Avoid using variants as a general utility class system for custom markup; use native controls/components instead." },
  ],
  capabilityNotes: [
    "Supports primary, secondary, outline, ghost, link and destructive visual styles.",
    "Supports size tokens: sm, default, lg and icon.",
    "Works in inline rows, full-width action areas and dense toolbars.",
    "Supports focus, disabled and loading states for safe async interactions.",
    "Use buttonVariants for non-button elements, but keep Button variant props for real button usage.",
  ],
}
