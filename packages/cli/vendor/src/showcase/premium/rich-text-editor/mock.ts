import type { ComponentDemoMock } from "../types"

export const richTextEditorMock: ComponentDemoMock = {
  code: `import { RichTextEditor } from "@/index"

export function Example() {
  const [value, setValue] = useState("<p>Start writing...</p>")

  return <RichTextEditor value={value} onValueChange={setValue} />
}`,
  cliCommand: "npx azix add rich-text-editor",
  highlights: [
    "Inline editable content block",
    "Simple toolbar actions for basic formatting",
    "Controlled value with value/onValueChange",
  ],
  scenarios: [
    { title: "CMS blocks", description: "Capture short rich-text snippets for card descriptions." },
    { title: "Internal notes", description: "Attach lightweight WYSIWYG content to records." },
  ],
}

