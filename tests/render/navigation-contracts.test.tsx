import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { Breadcrumbs, Sidebar, SidebarNav } from "@/index"

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
  it("renders nested sidebar navigation with section labels", () => {
    render(
      <SidebarNav
        aria-label="primary-nav"
        items={[
          {
            key: "workspace",
            label: "Workspace",
            sectionLabel: "Main",
            items: [
              { key: "overview", label: "Overview", href: "/overview", active: true },
              { key: "billing", label: "Billing", href: "/billing" },
            ],
          },
        ]}
      />
    )

    expect(screen.getByLabelText("primary-nav").getAttribute("data-slot")).toBe("sidebar-nav")
    expect(screen.getByText("Main")).toBeTruthy()
    expect(screen.getByText("Workspace")).toBeTruthy()
    expect(screen.getByText("Overview").closest("[aria-current]")?.getAttribute("aria-current")).toBe("page")
  })

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
})
