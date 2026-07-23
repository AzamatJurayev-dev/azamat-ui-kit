import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { CalendarScheduler, DualListPicker, EmptyState, HoverCard, HoverCardContent, HoverCardTrigger, JsonInput, Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuPositioner, NavigationMenuTrigger, NavigationMenuViewport, ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/index"

describe("component quality regressions", () => {
  it("renders a useful scheduler empty state when no days are available", () => {
    render(<CalendarScheduler events={[]} empty="Nothing scheduled" />)

    expect(screen.getByText("Nothing scheduled")).toHaveAttribute("data-empty", "true")
  })

  it("supports uncontrolled dual-list selection", async () => {
    const user = userEvent.setup()
    const onPickedChange = vi.fn()

    render(
      <DualListPicker
        items={[
          { label: "Alpha", value: "alpha" },
          { label: "Beta", value: "beta" },
        ]}
        onPickedChange={onPickedChange}
      />
    )

    const alpha = screen.getByRole("button", { name: /Alpha/ })
    expect(alpha).toHaveAttribute("aria-pressed", "false")

    await user.click(alpha)

    expect(screen.getByRole("button", { name: /Alpha/ })).toHaveAttribute("aria-pressed", "true")
    expect(onPickedChange).toHaveBeenLastCalledWith(["alpha"])
  })

  it("keeps JsonInput editable when value is uncontrolled and reports validity", () => {
    const onValueChange = vi.fn()

    render(<JsonInput aria-label="Configuration JSON" onValueChange={onValueChange} />)

    const input = screen.getByRole("textbox", { name: "Configuration JSON" })
    fireEvent.change(input, { target: { value: '{"enabled":true}' } })

    expect(input).toHaveValue('{"enabled":true}')
    expect(input).not.toHaveAttribute("aria-invalid")
    expect(onValueChange).toHaveBeenLastCalledWith('{"enabled":true}', { enabled: true }, true)

    fireEvent.change(input, { target: { value: '{"enabled":' } })

    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid JSON")
  })

  it("supports rich agenda events and selection without rendering hidden events", async () => {
    const user = userEvent.setup()
    const onSelectedEventChange = vi.fn()

    const { container } = render(
      <CalendarScheduler
        variant="agenda"
        density="compact"
        title="Clinical schedule"
        defaultSelectedEventId="review"
        onSelectedEventChange={onSelectedEventChange}
        events={[
          { id: "review", date: "Today", time: "09:00", title: "Patient review", description: "Cardiology", badge: <span>Urgent</span> },
          { id: "hidden", date: "Today", title: "Hidden event", hidden: true },
          { id: "disabled", date: "Today", title: "Unavailable", disabled: true },
        ]}
      />
    )

    expect(container.querySelector("[data-slot='calendar-scheduler']")).toHaveAttribute("data-variant", "agenda")
    expect(screen.getByRole("button", { name: /Patient review/ })).toHaveAttribute("data-selected", "true")
    expect(screen.queryByText("Hidden event")).toBeNull()

    await user.click(screen.getByRole("button", { name: /Patient review/ }))
    expect(onSelectedEventChange).toHaveBeenCalledWith("review", expect.objectContaining({ title: "Patient review" }))
    expect(screen.getByRole("button", { name: /Unavailable/ })).toBeDisabled()
  })

  it("keeps patterns limited to composable empty state", () => {
    const { container } = render(
      <EmptyState title="No customers" description="Create the first customer." />
    )

    expect(container.querySelector("[data-slot='empty-state']")).toBeTruthy()
  })

  it("renders new reusable navigation primitives", () => {
    const { container } = render(
      <div>
        <HoverCard><HoverCardTrigger>Owner</HoverCardTrigger><HoverCardContent>Azamat workspace</HoverCardContent></HoverCard>
        <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New file</MenubarItem></MenubarContent></MenubarMenu></Menubar>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent><NavigationMenuLink href="/products">Products overview</NavigationMenuLink></NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuPositioner><NavigationMenuViewport /></NavigationMenuPositioner>
        </NavigationMenu>
      </div>
    )

    expect(container.querySelector("[data-slot='hover-card-trigger']")).toBeTruthy()
    expect(container.querySelector("[data-slot='menubar']")).toBeTruthy()
    expect(container.querySelector("[data-slot='navigation-menu']")).toBeTruthy()
  })

  it("does not leak ResizablePanel sizing props to the DOM", () => {
    const { container } = render(
      <ResizablePanelGroup>
        <ResizablePanel minSize={25}>First</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}>Second</ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(container.querySelector("[minsize]")).toBeNull()
  })
})
