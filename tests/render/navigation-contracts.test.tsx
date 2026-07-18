import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  Breadcrumbs,
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  WorkspaceContent,
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceMain,
} from "@/index"

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe("navigation contracts", () => {
  it("keeps collapsed app sidebar items discoverable with tooltip content", () => {
    render(
      <Sidebar
        collapsed
        railItems={[
          { key: "settings", label: "Settings", tooltip: "Open settings", onSelect: () => undefined },
        ]}
        footerAccount={{
          label: "Azamat",
          description: "Admin",
          tooltip: "Account",
          avatar: "A",
        }}
        items={[
          { key: "dashboard", label: "Dashboard", tooltip: "Open dashboard", onSelect: () => undefined },
        ]}
      />
    )

    expect(screen.getByText("Open dashboard")).toBeTruthy()
    expect(screen.getByText("Open settings")).toBeTruthy()
    expect(screen.getByText("Account")).toBeTruthy()
  })

  it("renders breadcrumb icons, collapsed items, and explicit current labels", () => {
    render(
      <Breadcrumbs
        maxItems={3}
        items={[
          { key: "home", label: "Home", href: "/", icon: <span>H</span> },
          { key: "team", label: "Team", href: "/team" },
          { key: "workspace", label: "Workspace", href: "/team/workspace" },
          { key: "settings", label: "Settings", current: true, currentLabel: "location" },
        ]}
      />
    )

    expect(screen.getByText("…")).toBeTruthy()
    expect(screen.getByText("H")).toBeTruthy()
    expect(screen.getByText("Settings").closest("[aria-current]")?.getAttribute("aria-current")).toBe("location")
  })

  it("renders sidebar footer account and secondary actions when expanded", () => {
    render(
      <Sidebar
        footerAccount={{
          label: "Azamat Jurayev",
          description: "Product owner",
          avatar: "AJ",
        }}
        secondaryActions={[
          { key: "help", label: "Help center", onSelect: () => undefined },
          { key: "feedback", label: "Send feedback", onSelect: () => undefined },
        ]}
      />
    )

    expect(screen.getByText("Azamat Jurayev")).toBeTruthy()
    expect(screen.getByText("Product owner")).toBeTruthy()
    expect(screen.getByText("Help center")).toBeTruthy()
    expect(screen.getByText("Send feedback")).toBeTruthy()
  })

  it("switches to a mobile drawer with a hamburger trigger and closes after selection", () => {
    mockMatchMedia(true)

    const onItemSelect = vi.fn()
    render(
      <Sidebar
        responsive
        mobileTitle="Workspace navigation"
        items={[
          { key: "dashboard", label: "Dashboard", onSelect: () => undefined },
          { key: "reports", label: "Reports", onSelect: () => undefined },
        ]}
        onItemSelect={onItemSelect}
      />
    )

    const trigger = screen.getByRole("button", { name: "Open navigation" })
    fireEvent.click(trigger)

    expect(document.body.style.overflow).toBe("hidden")
    expect(screen.getByRole("dialog", { name: "Workspace navigation" }).getAttribute("data-state")).toBe("open")

    fireEvent.click(screen.getByText("Reports"))

    expect(onItemSelect).toHaveBeenCalledTimes(1)
    expect(document.body.style.overflow).toBe("")
    expect(screen.getByRole("dialog", { name: "Workspace navigation" }).getAttribute("data-state")).toBe("closed")
  })

  it("supports explicit desktop and mobile sidebar widths", () => {
    mockMatchMedia(false)

    const { rerender, unmount } = render(
      <Sidebar
        width="20rem"
        collapsedWidth="5rem"
        items={[{ key: "dashboard", label: "Dashboard", onSelect: () => undefined }]}
      />
    )

    const desktopSidebar = screen.getByText("Dashboard").closest('[data-slot="sidebar"]') as HTMLElement
    expect(desktopSidebar.style.width).toBe("20rem")
    expect(desktopSidebar.style.minWidth).toBe("20rem")

    rerender(
      <Sidebar
        collapsed
        width="20rem"
        collapsedWidth="5rem"
        items={[{ key: "dashboard", label: "Dashboard", tooltip: "Dashboard", onSelect: () => undefined }]}
      />
    )

    expect((screen.getByText("Dashboard").closest('[data-slot="sidebar"]') as HTMLElement | null)?.style.width).toBe("5rem")

    unmount()
    mockMatchMedia(true)

    render(
      <Sidebar
        responsive
        mobileTitle="Workspace navigation"
        mobileWidth="19rem"
        items={[{ key: "dashboard", label: "Dashboard", onSelect: () => undefined }]}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }))
    const mobileSidebar = screen.getByRole("dialog", { name: "Workspace navigation" })
    expect((mobileSidebar as HTMLElement).style.width).toBe("19rem")
    expect((mobileSidebar as HTMLElement).style.minWidth).toBe("19rem")
  })

  it("coordinates sidebar collapse through the canonical provider", () => {
    mockMatchMedia(false)
    render(
      <SidebarProvider>
        <WorkspaceLayout>
          <Sidebar items={[{ key: "dashboard", label: "Dashboard" }]} />
          <WorkspaceContent>
            <WorkspaceHeader left={<SidebarTrigger />} />
            <WorkspaceMain>Workspace body</WorkspaceMain>
          </WorkspaceContent>
        </WorkspaceLayout>
      </SidebarProvider>
    )

    const sidebar = screen.getByText("Dashboard").closest('[data-slot="sidebar"]')
    expect(sidebar).not.toHaveAttribute("data-collapsed")
    fireEvent.click(screen.getByRole("button", { name: "Collapse navigation" }))
    expect(sidebar).toHaveAttribute("data-collapsed", "true")
    expect(screen.getByRole("button", { name: "Expand navigation" })).toBeTruthy()
    expect(screen.getByText("Workspace body").closest('[data-slot="workspace-main"]')).toHaveClass("overflow-y-auto")
  })
})
