import type { ComponentDemoMock } from "../types"

export const navigationMenuMock: ComponentDemoMock = {
  code: `import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/index"

export function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" active>Home</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`,
  cliCommand: "npx tembro add navigation-menu",
  highlights: [
    "Accessible anchor-style navigation links",
    "Active state is handled via prop",
    "Simple composition with list and item primitives",
  ],
  scenarios: [
    { title: "Landing header", description: "Build top navigation with clear active route feedback." },
    { title: "Docs menu", description: "Use for horizontally aligned documentation categories." },
  ],
}
