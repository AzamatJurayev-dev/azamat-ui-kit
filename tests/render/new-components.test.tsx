import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

import {
  TrendCard,
  ComparisonCard,
  DeltaBadge,
  DataState,
  DataList,
  InfoCard,
} from "@/components/display"
import { Accordion } from "@/components/ui/accordion"
import { InlineEditable } from "@/components/inputs/inline-editable"
import { CommandBar } from "@/components/navigation/command-bar"
import { SavedFilterSelect } from "@/components/filters/saved-filter-select"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { Badge } from "@/components/ui/badge"

describe("New components rendering tests", () => {
  it("renders TrendCard with sparkline", () => {
    render(<TrendCard title="Revenue" value="$12,345" change="+12%" trend="up" sparkline={[10, 20, 15, 30]} />)
    expect(screen.getByText("Revenue")).toBeInTheDocument()
    expect(screen.getByText("$12,345")).toBeInTheDocument()
    expect(screen.getByText("+12%")).toBeInTheDocument()
  })

  it("renders ComparisonCard", () => {
    render(
      <ComparisonCard
        title="Comparison"
        items={[
          { label: "Metric 1", value: "100" },
          { label: "Metric 2", value: "200" },
        ]}
      />
    )
    expect(screen.getByText("Comparison")).toBeInTheDocument()
    expect(screen.getByText("Metric 1")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
    expect(screen.getByText("Metric 2")).toBeInTheDocument()
    expect(screen.getByText("200")).toBeInTheDocument()
  })

  it("renders DeltaBadge", () => {
    render(<DeltaBadge value="-3.5%" trend="down" />)
    expect(screen.getByText("-3.5%")).toBeInTheDocument()
  })

  it("renders InfoCard as the universal summary card", () => {
    render(<InfoCard title="Acme Corp" description="Enterprise Customer" />)
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
    expect(screen.getByText("Enterprise Customer")).toBeInTheDocument()
  })

  it("renders Accordion", async () => {
    const user = userEvent.setup()
    render(<Accordion type="single" items={[{ key: "one", title: "Question", content: "Answer" }]} />)

    await user.click(screen.getByText("Question"))
    expect(screen.getByText("Answer")).toBeInTheDocument()
  })

  it("renders DataList", () => {
    render(<DataList items={[{ key: "one", label: "Pipeline", value: "$24k", description: "Qualified opportunities" }]} />)

    expect(screen.getByText("Pipeline")).toBeInTheDocument()
    expect(screen.getByText("$24k")).toBeInTheDocument()
    expect(screen.getByText("Qualified opportunities")).toBeInTheDocument()
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

  it("renders CommandBar", () => {
    render(
      <CommandBar open={true}>
        <button>Action</button>
      </CommandBar>
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
