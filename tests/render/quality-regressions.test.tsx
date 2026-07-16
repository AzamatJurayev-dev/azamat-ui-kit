import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  BulkActionBar,
  CalendarScheduler,
  DataView,
  DetailLayout,
  DualListPicker,
  EmptyState,
  JsonInput,
  PageToolbar,
  ResourceDetailPage,
  ResourcePage,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  SettingsPage,
} from "@/index"

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

  it("does not render empty pattern chrome when optional regions are absent", () => {
    const { container, rerender } = render(
      <ResourcePage title="Customers" breadcrumbs={<nav aria-label="Breadcrumbs">Customers</nav>} />
    )

    expect(container.querySelector("[data-slot='resource-page-breadcrumbs']")).toBeTruthy()
    expect(container.querySelector("[data-slot='resource-page-toolbar']")).toBeNull()
    expect(container.querySelector("[data-slot='resource-page-content']")).toBeNull()

    rerender(<ResourceDetailPage title="Customer profile" />)

    expect(container.querySelector("[data-slot='page-header'] [class*='shrink-0']")).toBeNull()
    expect(container.querySelector("[data-slot='resource-detail-page-content']")).toBeNull()
  })

  it("renders added pattern surfaces without empty chrome", () => {
    const onClear = vi.fn()

    const { container } = render(
      <div>
        <EmptyState title="No customers" description="Create the first customer." />
        <PageToolbar actions={<button type="button">Export</button>} />
        <BulkActionBar selectedCount={2} onClear={onClear} />
        <SettingsPage
          title="Settings"
          sections={[
            { value: "profile", label: "Profile", content: <div>Profile form</div> },
            { value: "billing", label: "Billing", content: <div>Billing form</div> },
          ]}
        />
        <DataView count={0} emptyTitle="No rows" />
      </div>
    )

    expect(container.querySelector("[data-slot='empty-state']")).toBeTruthy()
    expect(container.querySelector("[data-slot='page-toolbar']")).toBeTruthy()
    expect(container.querySelector("[data-slot='bulk-action-bar']")).toBeTruthy()
    expect(container.querySelector("[data-slot='settings-page']")).toBeTruthy()
    expect(screen.getByText("No rows")).toBeInTheDocument()
  })

  it("only reserves an aside column when an aside is present", () => {
    const { container, rerender } = render(<ResourcePage title="Customers">Customer list</ResourcePage>)

    expect(container.querySelector("[data-slot='resource-page-content']")?.className).not.toContain("xl:grid-cols")

    rerender(<ResourceDetailPage title="Customer">Customer detail</ResourceDetailPage>)
    expect(container.querySelector("[data-slot='resource-detail-page-content']")?.className).not.toContain("xl:grid-cols")

    rerender(<DetailLayout title="Customer">Customer detail</DetailLayout>)
    expect(container.querySelector("[data-slot='detail-layout-content']")?.className).not.toContain("xl:grid-cols")
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
