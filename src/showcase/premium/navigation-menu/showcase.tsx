import * as React from "react"

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/index"

const items = ["Products", "Solutions", "Resources", "Pricing"]

export function NavigationMenuShowcase() {
  const [active, setActive] = React.useState(items[0])

  return (
    <div className="space-y-3">
      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item}>
              <NavigationMenuLink
                href="#"
                active={active === item}
                onClick={(event) => {
                  event.preventDefault()
                  setActive(item)
                }}
              >
                {item}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <p className="text-sm text-muted-foreground">Active segment: {active}</p>
    </div>
  )
}

