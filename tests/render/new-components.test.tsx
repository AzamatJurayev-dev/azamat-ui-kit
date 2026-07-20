import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

import {
  DataState,
  InfoCard,
} from "@/components/display"
import { InlineEditable } from "@/components/inputs/inline-editable"
import { CommandPalette } from "@/components/command/command-palette"
import { SavedFilterSelect } from "@/components/filters/saved-filter-select"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { Badge } from "@/components/ui/badge"
import { StateView } from "@/components/feedback/state-view"
import { Tag } from "@/components/display/tag"

describe("New components rendering tests", () => {
  it("renders InfoCard as the universal summary card", () => {
    render(<InfoCard title="Acme Corp" description="Enterprise Customer" />)
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
    expect(screen.getByText("Enterprise Customer")).toBeInTheDocument()
  })

  it("handles InlineEditable", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<InlineEditable value="Initial text" onValueChange={onValueChange} />)
    
    // Display mode
    const displayElement = screen.getByText("Initial text")
    expect(displayElement).toBeInTheDocument()
    
    // Click to edit
    await user.click(displayElement)
    const input = screen.getByDisplayValue("Initial text")
    expect(input).toBeInTheDocument()
    
    // Type and commit
    await user.type(input, " updated")
    await user.keyboard("{Enter}")
    expect(onValueChange).toHaveBeenCalledWith("Initial text updated")
  })

  it("renders searchable empty DataState", async () => {
    const onClear = vi.fn()
    const user = userEvent.setup()
    render(<DataState status="empty" title="No results found" query="foo" clearLabel="Clear search" onClear={onClear} />)
    
    expect(screen.getByText("No results found")).toBeInTheDocument()
    expect(screen.getByText("foo")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Clear search" }))
    expect(onClear).toHaveBeenCalled()
  })

  it("renders DataState badge and footer content", () => {
    render(
      <DataState
        status="success"
        title="Workspace ready"
        badge={<Badge variant="secondary">Live</Badge>}
        footer={<div>Footer details</div>}
      />
    )

    expect(screen.getByText("Workspace ready")).toBeInTheDocument()
    expect(screen.getByText("Live")).toBeInTheDocument()
    expect(screen.getByText("Footer details")).toBeInTheDocument()
  })

  it("uses StateView as the canonical state contract", async () => {
    const onRetry = vi.fn()
    const user = userEvent.setup()
    render(<StateView status="error" title="Request failed" onRetry={onRetry} />)

    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "state-view")
    await user.click(screen.getByRole("button", { name: "Retry" }))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it("keeps Tag as a thin Badge compatibility surface", async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    render(<Tag removable onRemove={onRemove}>Billing</Tag>)

    const tag = screen.getByText("Billing").closest('[data-slot="tag"]')
    expect(tag).toHaveAttribute("data-tone", "neutral")
    ;(tag as HTMLElement | null)?.focus()
    await user.keyboard("{Delete}")
    expect(onRemove).toHaveBeenCalledOnce()
  })

  it("renders CommandPalette", () => {
    render(
      <CommandPalette
        open
        onOpenChange={() => undefined}
        groups={[{ id: "actions", label: "Actions", items: [{ id: "action", label: "Action" }] }]}
      />
    )
    expect(screen.getByText("Action")).toBeInTheDocument()
  })

  it("renders SavedFilterSelect", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <SavedFilterSelect
        value="1"
        onValueChange={onValueChange}
        filters={[{ value: "1", label: "Filter 1" }]}
      />
    )
    
    await user.click(screen.getByRole("combobox"))
    expect(screen.getAllByText("Filter 1")[1]).toBeInTheDocument()
  })

  it("handles NotificationCenter", async () => {
    const user = userEvent.setup()
    const onNotificationClick = vi.fn()
    const onMarkAllRead = vi.fn()
    render(
      <NotificationCenter
        notifications={[
          { id: "1", title: "Notification 1", read: false },
          { id: "2", title: "Notification 2", read: true },
        ]}
        onNotificationClick={onNotificationClick}
        onMarkAllRead={onMarkAllRead}
      />
    )
    
    // 1 unread badge should exist
    expect(screen.getByText("1 unread notifications")).toBeInTheDocument()
    
    // Open popover
    await user.click(screen.getByRole("button"))
    
    // Notifications should be rendered
    expect(screen.getByText("Notification 1")).toBeInTheDocument()
    expect(screen.getByText("Notification 2")).toBeInTheDocument()
    
    // Click notification
    await user.click(screen.getByText("Notification 1"))
    expect(onNotificationClick).toHaveBeenCalled()
    
    // Mark all read
    await user.click(screen.getByText("Mark all read"))
    expect(onMarkAllRead).toHaveBeenCalled()
  })
})
