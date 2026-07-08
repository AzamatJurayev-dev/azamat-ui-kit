import type { ComponentDemoMock } from "../types"

export const skeletonMock: ComponentDemoMock = {
  code: `import { Skeleton, SkeletonCard, SkeletonText } from "@/index"

export function Example() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <SkeletonText rows={3} />
      <SkeletonCard avatar rows={4} />
    </div>
  )
}`,
  cliCommand: "npx tembro add skeleton",
  highlights: [
    "Base line/block placeholder plus text and card presets",
    "Useful while data shape is known but content is still loading",
    "Keeps layout stable before real content arrives",
  ],
  scenarios: [
    { title: "Header loading", description: "Reserve title and toolbar space before the API resolves." },
    { title: "List row loading", description: "Prevent layout jump inside dense operational screens." },
    { title: "Card loading", description: "Show content shape without implying final values yet." },
  ],
}
