import * as React from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

import {
  Affix,
  DualListPicker,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  QRCode,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tag,
  Tour,
} from "@/index"

describe("modern components", () => {
  it("renders qr code svg fallback when src is omitted", () => {
    const { container } = render(<QRCode value="https://azamat-ui.vercel.app" alt="Azamat UI QR" />)

    expect(screen.getByLabelText("Azamat UI QR")).toBeInTheDocument()
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders affix and tag content", () => {
    render(
      <Affix offsetTop={12}>
        <Tag tone="info">Pinned tools</Tag>
      </Affix>,
    )

    expect(screen.getByText("Pinned tools")).toBeInTheDocument()
  })

  it("renders navigation menu links with active state", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs" active>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/components">Components</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    )

    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("data-active", "true")
    expect(screen.getByRole("link", { name: "Components" })).toBeInTheDocument()
  })

  it("changes picked values in dual list picker", async () => {
    const user = userEvent.setup()
    const onPickedChange = vi.fn()

    render(
      <DualListPicker
        items={[
          { label: "Revenue", value: "revenue" },
          { label: "Customers", value: "customers" },
        ]}
        picked={["revenue"]}
        onPickedChange={onPickedChange}
      />,
    )

    await user.click(screen.getByRole("button", { name: /customers/i }))
    expect(onPickedChange).toHaveBeenCalledWith(["revenue", "customers"])
  })

  it("renders resizable panel primitives", () => {
    const { container } = render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize="40%">Sidebar</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="60%">Content</ResizablePanel>
      </ResizablePanelGroup>,
    )

    expect(screen.getByText("Sidebar")).toBeInTheDocument()
    expect(screen.getByText("Content")).toBeInTheDocument()
    expect(container.querySelector('[data-slot="resizable-handle"]')).toBeInTheDocument()
  })

  it("advances tour steps", async () => {
    const user = userEvent.setup()
    const onIndexChange = vi.fn()
    const onClose = vi.fn()

    render(
      <Tour
        index={0}
        onIndexChange={onIndexChange}
        onClose={onClose}
        steps={[
          { title: "Open search", description: "Use Ctrl+K." },
          { title: "Copy source", description: "Add only what you need." },
        ]}
      />,
    )

    expect(screen.getByText("Open search")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Next" }))
    expect(onIndexChange).toHaveBeenCalledWith(1)
  })
})
