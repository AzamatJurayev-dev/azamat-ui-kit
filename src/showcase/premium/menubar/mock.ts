import type { ComponentDemoMock } from "../types"

export const menubarMock: ComponentDemoMock = {
  code: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/index"

export function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New project</MenubarItem>
          <MenubarItem>Open</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
  cliCommand: "npx azix add menubar",
  highlights: [
    "Composable menubar surfaces with grouped actions",
    "Trigger + content + item primitives",
  ],
  scenarios: [
    { title: "Editor top bar", description: "Display grouped app actions in one compact area." },
    { title: "Admin tools", description: "Expose grouped controls without full menu system overhead." },
  ],
}

