import type { ComponentDemoMock } from "../types"

export const keyboardShortcutMock: ComponentDemoMock = {
  code: `import { KeyboardShortcut } from "@/index"

export function Example() {
  return <KeyboardShortcut keys={["Ctrl", "K"]} />
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add keyboard-shortcut",
  highlights: [
    "Compact visual hint for one or many keys",
    "Accepts key arrays or raw children",
    "Useful inside command palette, docs hints and action toolbars",
  ],
  scenarios: [
    { title: "Search hint", description: "Show the command palette trigger beside a search action." },
    { title: "Editor help", description: "Reveal save or publish shortcuts close to the action." },
    { title: "Docs legend", description: "Document power-user flows without adding a heavy table." },
  ],
}
