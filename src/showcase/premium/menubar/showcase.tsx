import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/index"

export function MenubarShowcase() {
  return (
    <div className="space-y-3">
      <Menubar className="w-fit">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New project</MenubarItem>
            <MenubarItem>Open</MenubarItem>
            <MenubarItem>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarItem>Find</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <p className="text-sm text-muted-foreground">
        Menubar is a non-dropdown primitive. Use it as a command surface for quick contextual actions.
      </p>
    </div>
  )
}

