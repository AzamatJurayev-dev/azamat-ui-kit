import type { ComponentDemoMock } from "../types"

export const aspectRatioMock: ComponentDemoMock = {
  code: `import { AspectRatio } from "@/index"

export function Example() {
  return (
    <AspectRatio ratio={16 / 9} className="rounded-xl border bg-muted">
      <div className="grid size-full place-items-center text-sm font-medium text-foreground">
        16:9 media slot
      </div>
    </AspectRatio>
  )
}`,
  cliCommand: "npx azix add aspect-ratio",
  highlights: [
    "Controls media card proportions in one place",
    "Works for images, iframes, and any fixed-ratio container",
    "Stable in dashboard and content-heavy layouts",
  ],
  scenarios: [
    { title: "Media hero", description: "Reserve consistent 16:9 ratio for previews." },
    { title: "Card media", description: "Keep media and text alignment predictable." },
    { title: "Document preview", description: "Prevent jumpy layouts while content loads." },
  ],
}
