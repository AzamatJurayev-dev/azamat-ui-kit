import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import type { ColumnDef, VisibilityState } from "@tanstack/react-table"

import { DataTable } from "@/components/data-table/data-table"
import { createDataTableSelectColumn } from "@/components/data-table/data-table-select-column"

type PersonRow = {
  id: string
  name: string
  role: string
}

const rows: PersonRow[] = [
  { id: "1", name: "Azamat", role: "Owner" },
  { id: "2", name: "Nodir", role: "Editor" },
]

function getColumns(): ColumnDef<PersonRow>[] {
  return [
    createDataTableSelectColumn<PersonRow>(),
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ]
}

function VisibilityHarness() {
  const [query, setQuery] = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  return (
    <DataTable
      columns={getColumns()}
      data={rows}
      rowSelection={{}}
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={(next) => {
        setColumnVisibility(typeof next === "function" ? next(columnVisibility) : next)
      }}
      features={{
        search: true,
        columnVisibility: true,
      }}
      search={{
        value: query,
        onValueChange: setQuery,
        placeholder: "Search team",
      }}
    />
  )
}

describe("DataTable", () => {
  it("renders loading, empty, and error states", () => {
    const { rerender, container } = render(
      <DataTable columns={getColumns()} data={rows} rowSelection={{}} isLoading />
    )

    expect(container.querySelectorAll('tr[aria-hidden="true"]').length).toBeGreaterThan(0)

    rerender(
      <DataTable
        columns={getColumns()}
        data={rows}
        rowSelection={{}}
        isLoading
        loadingVariant="state"
      />
    )

    expect(screen.getByText("Loading data...")).toBeTruthy()

    rerender(<DataTable columns={getColumns()} data={[]} rowSelection={{}} />)
    expect(screen.getByText("No data")).toBeTruthy()

    rerender(<DataTable columns={getColumns()} data={rows} rowSelection={{}} isError />)
    expect(screen.getByText("Could not load data")).toBeTruthy()
  })

  it("renders search and column visibility controls and can hide a column", async () => {
    const user = userEvent.setup()

    render(<VisibilityHarness />)

    const searchInput = screen.getByRole("searchbox", { name: "" })
    await user.type(searchInput, "Aza")
    expect((searchInput as HTMLInputElement).value).toBe("Aza")

    await user.click(screen.getByRole("button", { name: /columns/i }))
    const roleToggle = await screen.findByRole("menuitemcheckbox", { name: "Role" })
    await user.click(roleToggle)

    expect(screen.queryByRole("columnheader", { name: "Role" })).toBeNull()
  })

  it("renders row actions and triggers pagination callbacks", async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    const onEdit = vi.fn()

    render(
      <DataTable
        columns={getColumns()}
        data={rows}
        rowSelection={{}}
        features={{ rowActions: true }}
        rowActions={() => [
          {
            key: "edit",
            label: "Edit row",
            onSelect: (row, original) => onEdit(row.id, original.name),
          },
        ]}
        pagination={{
          pageIndex: 0,
          pageSize: 1,
          pageCount: 2,
          rowCount: rows.length,
          manual: false,
          onPageChange,
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: "Open actions" }))
    await user.click(await screen.findByRole("menuitem", { name: "Edit row" }))
    expect(onEdit).toHaveBeenCalledWith("0", "Azamat")

    await user.click(screen.getByRole("button", { name: "Next page" }))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })
})
