import type { ComponentDemoMock } from "../types"

export const codeBlockMock: ComponentDemoMock = {
  code: `import { CodeBlock } from "@/index"

const snippet = \`npx tembro add button select\`

export function Example() {
  return <CodeBlock title="CLI" language="bash" code={snippet} />
}`,
  cliCommand: "npx tembro add code-block",
  highlights: [
    "Header with title, language and built-in copy action",
    "Supports long wrapped snippets or horizontal scroll",
    "Useful for CLI, config and docs snippets",
  ],
  scenarios: [
    { title: "CLI docs", description: "Show install or add commands with fast copy action." },
    { title: "Config snippet", description: "Render small code samples without building a syntax highlighter." },
    { title: "Response sample", description: "Present payload examples in compact technical docs." },
  ],
}
