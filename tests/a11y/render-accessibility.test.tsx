import * as React from "react"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { useForm } from "react-hook-form"
import { describe, expect, it } from "vitest"
import type { ColumnDef } from "@tanstack/react-table"

import { AppShell } from "@/components/layout/app-shell"
import { CommandPalette, type CommandPaletteGroup } from "@/components/command/command-palette"
import { AsyncSelect, type AsyncSelectOption } from "@/components/inputs/async-select"
import { DataTable } from "@/components/data-table/data-table"
import { createDataTableSelectColumn } from "@/components/data-table/data-table-select-column"
import { FileUpload } from "@/components/upload/file-upload"
import { ResourcePage } from "@/components/patterns/resource-page"
import { FormBuilder, type FormBuilderField } from "@/components/patterns/form-builder"

type PersonRow = {
  id: string
  name: string
  role: string
}

function FormBuilderHarness() {
  const { control } = useForm({
    defaultValues: {
      name: "Azamat",
    },
  })

  const fields: FormBuilderField<{ name: string }>[] = [
    {
      id: "name",
      type: "input",
      props: {
        name: "name",
        kind: "text",
        label: "Name",
      },
    },
  ]

  return (
    <FormBuilder
      control={control}
      fields={fields}
      submitLabel="Save"
      resetLabel="Reset"
    />
  )
}

describe("render-based accessibility coverage", () => {
  it("renders labelled app shell mobile navigation controls", () => {
    const { container } = render(
      <AppShell
        header={<div>Header</div>}
        sidebar={<nav aria-label="Primary">Sidebar</nav>}
        defaultMobileSidebarOpen
      >
        <div>Main</div>
      </AppShell>
    )

    expect(screen.getByRole("button", { name: "Open navigation" })).toBeTruthy()
    expect(screen.getAllByRole("button", { name: "Close navigation" }).length).toBeGreaterThan(0)
    expect(container.querySelector('[data-slot="app-shell-mobile-sidebar"]')).toBeTruthy()
    expect(screen.getAllByLabelText("Primary").length).toBeGreaterThan(0)
  })

  it("renders command palette as an accessible dialog with disabled reasons", () => {
    const groups: CommandPaletteGroup[] = [
      {
        id: "primary",
        label: "Actions",
        items: [
          {
            id: "dashboard",
            label: "Dashboard",
            description: "Open overview",
          },
          {
            id: "billing",
            label: "Billing",
            disabled: true,
            disabledReason: "Unavailable in trial",
          },
        ],
      },
    ]

    render(<CommandPalette open onOpenChange={() => {}} groups={groups} />)

    const dialog = screen.getByRole("dialog", { name: "Command palette" })
    const searchbox = within(dialog).getByRole("textbox")
    const billingButton = within(dialog).getByRole("button", { name: /billing/i })

    expect(searchbox).toBeTruthy()
    expect(document.activeElement === searchbox).toBe(true)
    expect(billingButton.hasAttribute("disabled")).toBe(true)
    expect(within(dialog).getByText("Unavailable in trial")).toBeTruthy()
  })

  it("renders async select with expanded state and disabled option messaging", async () => {
    const defaultOptions: AsyncSelectOption[] = [
      { value: "alpha", label: "Alpha" },
      { value: "beta", label: "Beta", disabled: true, disabledReason: "Beta is locked" },
    ]

    render(
      <AsyncSelect
        defaultOptions={defaultOptions}
        loadOptions={async () => defaultOptions}
        labels={{
          placeholder: "Select an item",
          searchPlaceholder: "Search items",
        }}
      />
    )

    const trigger = screen.getByRole("button", { name: /select an item/i })
    fireEvent.click(trigger)

    expect(trigger.getAttribute("aria-expanded")).toBe("true")

    const disabledReason = await screen.findByText("Beta is locked")
    const disabledOption = disabledReason.closest("button")

    expect(disabledOption).toBeTruthy()
    expect(disabledOption?.hasAttribute("disabled")).toBe(true)
  })

  it("renders data table controls with labelled selection and pagination", () => {
    const rows: PersonRow[] = [
      { id: "1", name: "Azamat", role: "Owner" },
      { id: "2", name: "Nodir", role: "Editor" },
    ]

    const columns: ColumnDef<PersonRow>[] = [
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

    render(
      <DataTable
        columns={columns}
        data={rows}
        enableRowSelection
        rowSelection={{}}
        pagination={{
          pageIndex: 0,
          pageSize: 10,
          pageCount: 1,
          rowCount: rows.length,
          manual: false,
        }}
      />
    )

    expect(screen.getByRole("table")).toBeTruthy()
    expect(screen.getByRole("checkbox", { name: "Select all rows" })).toBeTruthy()
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeTruthy()
    expect(screen.getByRole("cell", { name: "Azamat" })).toBeTruthy()
  })

  it("renders file upload as a keyboard-friendly button and reports rejected files", () => {
    const { container } = render(
      <FileUpload
        accept=".png"
        maxSize={100}
        dropzoneAriaLabel="Upload files"
      />
    )

    const input = container.querySelector('input[type="file"]') as HTMLInputElement | null
    expect(input).toBeTruthy()
    expect(screen.getByRole("button", { name: "Upload files" })).toBeTruthy()

    const invalidFile = new File(["too-big"], "resume.pdf", { type: "application/pdf" })
    Object.defineProperty(invalidFile, "size", { value: 500 })

    fireEvent.change(input as HTMLInputElement, {
      target: {
        files: [invalidFile],
      },
    })

    expect(screen.getByText(/resume\.pdf:/i)).toBeTruthy()
  })

  it("renders resource page and form builder through accessible headings and buttons", () => {
    const rows: PersonRow[] = [{ id: "1", name: "Azamat", role: "Owner" }]
    const columns: ColumnDef<PersonRow>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
    ]

    const { container } = render(
      <div>
        <ResourcePage
          title="Team members"
          description="Manage the workspace roster."
          table={{
            columns,
            data: rows,
          }}
        />
        <FormBuilderHarness />
      </div>
    )

    expect(screen.getByRole("heading", { name: "Team members" })).toBeTruthy()
    expect(container.querySelector('[data-slot="resource-page-main"]')).toBeTruthy()
    expect(screen.getByRole("textbox", { name: "Name" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Reset" })).toBeTruthy()
  })
})
