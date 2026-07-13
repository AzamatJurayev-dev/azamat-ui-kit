import type { ComponentDemoMock } from "../types"

export const richTextEditorMock: ComponentDemoMock = {
  code: `import { RichTextEditor } from "tembro"

export function Example() {
  return <RichTextEditor defaultValue="<p>Write the release notes...</p>" onValueChange={console.log} />
}`,
  cliCommand: "npx tembro add rich-text-editor",
  highlights: ["TipTap and ProseMirror editing engine", "HTML/text output with formatting, history, lists, quotes, and links"],
  scenarios: [
    { title: "Knowledge base", description: "Author structured support and documentation content." },
    { title: "Product updates", description: "Create formatted release notes with controlled persistence." },
  ],
}
