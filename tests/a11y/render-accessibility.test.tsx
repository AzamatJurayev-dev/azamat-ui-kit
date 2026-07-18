import * as React from "react"
import { act, fireEvent, render, screen, within } from "@testing-library/react"
import { useForm } from "react-hook-form"
import { describe, expect, it } from "vitest"
import type { ColumnDef } from "@tanstack/react-table"
import axe from "axe-core"

import { CommandPalette, type CommandPaletteGroup } from "@/components/command/command-palette"
import { AsyncSelect, type AsyncSelectOption } from "@/components/inputs/async-select"
import { DataTable } from "@/components/data-table/data-table"
import { createDataTableSelectColumn } from "@/components/data-table/data-table-select-column"
import { FileUpload } from "@/components/upload/file-upload"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarProvider, SidebarTrigger, WorkspaceContent, WorkspaceHeader, WorkspaceLayout, WorkspaceMain } from "@/components/layout"
import { StateView } from "@/components/feedback/state-view"
import { CalendarScheduler } from "@/components/modern/calendar-scheduler"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function expectNoAxeViolations(container: HTMLElement) {
  const result = await axe.run(container, { rules: { "color-contrast": { enabled: false } } })
  expect(result.violations.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([])
}

type PersonRow = {
  id: string
  name: string
  role: string
}

function FormHarness() {
  const { control } = useForm({
    defaultValues: {
      name: "Azamat",
    },
  })

  return (
    <form>
      <FormInput control={control} name="name" label="Name" />
      <Button type="submit">Save</Button>
      <Button type="reset" variant="outline">Reset</Button>
    </form>
  )
}

describe("render-based accessibility coverage", () => {
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

  it("renders form fields through accessible labels and buttons", () => {
    const { container } = render(
      <div>
        <FormHarness />
      </div>
    )

    expect(screen.getByRole("textbox", { name: "Name" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Reset" })).toBeTruthy()
    expect(container.querySelector("[data-slot='form-field-shell']")).toBeTruthy()
  })

  it("passes automated checks for workspace navigation and main scrolling", async () => {
    const { container } = render(
      <SidebarProvider>
        <WorkspaceLayout>
          <Sidebar navigationLabel="Workspace" items={[{ key: "overview", label: "Overview", active: true }]} />
          <WorkspaceContent>
            <WorkspaceHeader left={<SidebarTrigger />} />
            <WorkspaceMain><h1>Overview</h1></WorkspaceMain>
          </WorkspaceContent>
        </WorkspaceLayout>
      </SidebarProvider>
    )
    await act(async () => expectNoAxeViolations(container))
  })

  it("announces canonical loading and error states", async () => {
    const { container, rerender } = render(<StateView status="loading" title="Loading invoices" />)
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true")
    await expectNoAxeViolations(container)

    rerender(<StateView status="error" title="Invoices failed" onRetry={() => undefined} />)
    expect(screen.getByRole("alert")).toBeTruthy()
    await expectNoAxeViolations(container)
  })

  it("keeps tabs keyboard semantics valid", async () => {
    const { container } = render(
      <Tabs defaultValue="overview">
        <TabsList aria-label="Report views">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview report</TabsContent>
        <TabsContent value="activity">Activity report</TabsContent>
      </Tabs>
    )
    await act(async () => expectNoAxeViolations(container))
  })

  it("exposes scheduler events as selectable controls", async () => {
    const { container } = render(
      <CalendarScheduler
        title="Team schedule"
        variant="agenda"
        days={["2026-07-20"]}
        events={[{ id: "review", date: "2026-07-20", time: "10:00", title: "Release review", description: "Product room" }]}
      />
    )
    expect(screen.getByRole("button", { name: /release review/i })).toBeTruthy()
    await expectNoAxeViolations(container)
  })
})
