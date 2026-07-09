import { actionDemoCodeSnippets } from "./actions"
import { formDemoCodeSnippets } from "./forms"
import { layoutDemoCodeSnippets } from "./layout"
import { uploadDemoCodeSnippets } from "./upload"

export const demoCodeSnippets: Record<string, string> = {
  ...actionDemoCodeSnippets,
  ...formDemoCodeSnippets,
  ...layoutDemoCodeSnippets,
  ...uploadDemoCodeSnippets,
}
