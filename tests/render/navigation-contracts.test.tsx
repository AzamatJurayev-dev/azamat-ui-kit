import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AppSidebar, Breadcrumbs, SidebarNav } from "@/index"

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
      <AppSidebar
        collapsed
        items={[
          { key: "dashboard", label: "Dashboard", tooltip: "Open dashboard", onSelect: () => undefined },
        ]}
      />
    )

    expect(screen.getByText("Open dashboard")).toBeTruthy()
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
})
