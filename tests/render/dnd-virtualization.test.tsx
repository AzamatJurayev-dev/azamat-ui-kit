import * as React from "react"
import { render, screen, waitFor, within } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { DataTable } from "@/components/data-table/data-table"
import { SortableList } from "@/components/dnd/sortable-list"
import { KanbanBoard, type KanbanColumn } from "@/components/display/kanban"
import { VirtualList } from "@/components/display/virtual-list"

function createRect(x: number, y: number, width: number, height: number): DOMRect {
  return {
    x,
    y,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    width,
    height,
    toJSON: () => ({}),
  } as DOMRect
}

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const slot = this.getAttribute("data-slot")
    const dataIndexAttribute = this.getAttribute("data-index")
    const dataIndex = dataIndexAttribute === null ? Number.NaN : Number(dataIndexAttribute)
    const siblingIndex = this.parentElement
      ? Array.from(this.parentElement.children).indexOf(this)
      : 0
    const index = Number.isFinite(dataIndex) ? dataIndex : Math.max(siblingIndex, 0)
    const width = Number.parseFloat(this.style.width) || 800
    const styledHeight = Number.parseFloat(this.style.height)

    if (slot === "sortable-list-item") {
      return createRect(0, index * 52, width, 44)
    }

    if (Number.isFinite(dataIndex)) {
      const height = styledHeight || 44
      return createRect(0, index * height, width, height)
    }

    if (slot === "virtual-list" || slot === "table-container") {
      return createRect(0, 0, width, styledHeight || 240)
    }

    return createRect(0, 0, width, 1_000)
  })
})

describe("production DnD and virtualization", () => {
  it("exposes keyboard-operable sortable handles and instructions", async () => {
    render(
      <SortableList
        items={[
          { id: "alpha", label: "Alpha" },
          { id: "beta", label: "Beta" },
          { id: "gamma", label: "Gamma" },
        ]}
        getItemId={(item) => item.id}
        getItemLabel={(item) => item.label}
        renderItem={(item) => item.label}
      />
    )
    const handle = screen.getByRole("button", { name: "Move Alpha" })
    await waitFor(() => {
      expect(handle.getAttribute("aria-roledescription")).toBe("draggable")
    })
    const descriptionId = handle.getAttribute("aria-describedby")
    expect(descriptionId).toBeTruthy()
    expect(document.getElementById(descriptionId ?? "")?.textContent).toContain("arrow keys")
    expect(screen.getAllByRole("listitem")).toHaveLength(3)
  })

  it("renders accessible kanban drag handles and an empty drop lane", () => {
    const onColumnsChange = vi.fn()
    const columns: KanbanColumn[] = [
      {
        key: "todo",
        title: "To do",
        cards: [{ key: "audit", title: "Audit components" }],
      },
      { key: "done", title: "Done", cards: [] },
    ]

    render(<KanbanBoard columns={columns} onColumnsChange={onColumnsChange} />)

    expect(screen.getByRole("button", { name: "Move Audit components" })).toBeTruthy()
    expect(within(screen.getByRole("group", { name: "Kanban board" })).getByText("Drop cards here.")).toBeTruthy()
  })

  it("only mounts the visible part of a large virtual list", () => {
    const items = Array.from({ length: 1_000 }, (_, index) => `Item ${index + 1}`)

    const { container } = render(
      <VirtualList
        items={items}
        height={240}
        estimateSize={40}
        renderItem={(item) => <div className="h-10">{item}</div>}
      />
    )

    const renderedItems = container.querySelectorAll('[data-slot="virtual-list-item"]')
    expect(renderedItems.length).toBeGreaterThan(0)
    expect(renderedItems.length).toBeLessThan(1_000)
    expect(screen.getByText("Item 1")).toBeTruthy()
    expect(screen.queryByText("Item 1000")).toBeNull()
  })

  it("virtualizes DataTable rows inside a bounded viewport", () => {
    const data = Array.from({ length: 500 }, (_, index) => ({
      id: String(index + 1),
      name: `Account ${index + 1}`,
    }))

    const { container } = render(
      <DataTable
        data={data}
        columns={[{ accessorKey: "name", header: "Account" }]}
        getRowId={(row) => row.id}
        virtualization={{ height: 260, estimateRowHeight: 44, overscan: 3 }}
      />
    )

    const wrapper = container.querySelector('[data-slot="data-table-wrapper"]')
    const mountedRows = container.querySelectorAll('tbody [data-slot="table-row"][data-index]')
    expect(wrapper?.getAttribute("data-virtualized")).toBe("true")
    expect(mountedRows.length).toBeGreaterThan(0)
    expect(mountedRows.length).toBeLessThan(500)
    expect(screen.getByText("Account 1")).toBeTruthy()
    expect(screen.queryByText("Account 500")).toBeNull()
  })
})
