import type { ComponentDemoMock } from "../types"

export const dropdownMenuMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@azamatjurayevdev/azix"

export function Example() {
  const [status, setStatus] = useState("private")
  const [notifications, setNotifications] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Workspace actions</DropdownMenuLabel>
        <DropdownMenuItem>Open workspace</DropdownMenuItem>
        <DropdownMenuItem disabled>Delete from archive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={notifications} onCheckedChange={(value) => setNotifications(Boolean(value))}>
          Notification access
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          Show hidden sections
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Visibility</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="public">Public</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="private">Private</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="internal">Internal</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuItem variant="destructive">
          Remove workspace
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  htmlCode: `<button data-slot="dropdown-trigger">Open menu</button>`,
  cliCommand: "npx azix add dropdown-menu",
  highlights: ["Action items", "Checkbox and radio items", "Shortcut labels", "Disabled/danger variants"],
  relatedBlockSlugs: ["settings-form", "users-table", "dashboard-starter"],
  scenarios: [
    { title: "Action menu", description: "Use stable command-like menus for compact row actions." },
    { title: "Bulk controls", description: "Checkbox and radio items make complex menu states explicit." },
    { title: "Keyboard hints", description: "Render shortcuts to teach power users." },
    { title: "Destructive entry", description: "Keep dangerous actions visually and semantically distinct." },
  ],
  capabilityNotes: [
    "Use DropdownMenu for compact choice surfaces that must stay within local context.",
    "Keep disabled actions visible to preserve discoverability of temporarily unavailable commands.",
    "Reserve destructive variants for actions that remove data or change ownership.",
    "Map menu items to real route or action handlers and avoid deep workflows inside a single menu item.",
  ],
}


