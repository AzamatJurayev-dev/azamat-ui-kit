import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { CommandPalette, useCommandPaletteShortcut } from "@/components/command/command-palette"
import { ConfirmDialog } from "@/components/overlay/confirm-dialog"
import { Drawer } from "@/components/overlay/drawer"
import { NavTabs } from "@/components/navigation/nav-tabs"
import { PageTabs } from "@/components/navigation/page-tabs"
import { Pagination } from "@/components/navigation/pagination"

function CommandShortcutHarness({
  onSelect,
}: {
  onSelect: () => void
}) {
  const [open, setOpen] = React.useState(false)
  useCommandPaletteShortcut(setOpen)

  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      groups={[
        {
          id: "actions",
          label: "Actions",
          items: [
            {
              id: "create",
              label: "Create project",
              description: "Make a new project",
              onSelect,
            },
            {
              id: "locked",
              label: "Locked route",
              disabled: true,
              disabledReason: "Only admins can access this route",
            },
          ],
        },
        {
          id: "async",
          label: "Remote",
          loadingLabel: "Loading remote actions",
          loadItems: async () =>
            new Promise((resolve) => {
              window.setTimeout(() => resolve([{ id: "sync", label: "Sync docs" }]), 40)
            }),
        },
      ]}
    />
  )
}

function ConfirmDialogHarness({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open confirm</button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete item"
        description="This cannot be undone."
        cancelText="Stay here"
        confirmText="Delete now"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  )
}

describe("overlay, command and navigation interactions", () => {
  it("opens confirm dialogs from a trigger and handles cancel and confirm actions", async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    const onConfirm = vi.fn()

    render(<ConfirmDialogHarness onCancel={onCancel} onConfirm={onConfirm} />)

    await user.click(screen.getByRole("button", { name: "Open confirm" }))
    expect(screen.getByRole("heading", { name: "Delete item" })).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Stay here" }))
    expect(onCancel).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Delete item" })).toBeNull()
    })

    await user.click(screen.getByRole("button", { name: "Open confirm" }))
    await user.click(screen.getByRole("button", { name: "Delete now" }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it("opens drawers from a trigger and closes through the shared dialog close control", async () => {
    const user = userEvent.setup()

    render(
      <Drawer
        trigger={<button type="button">Open drawer</button>}
        title="Filters"
        description="Tune the current view"
      >
        Drawer body
      </Drawer>
    )

    await user.click(screen.getByRole("button", { name: "Open drawer" }))
    expect(screen.getByText("Drawer body")).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Close" }))

    await waitFor(() => {
      expect(screen.queryByText("Drawer body")).toBeNull()
    })
  })

  it("opens the command palette from the shared keyboard shortcut and selects commands", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(<CommandShortcutHarness onSelect={onSelect} />)

    fireEvent.keyDown(window, { key: "k", ctrlKey: true })

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy()
    })

    expect(screen.getByText("Only admins can access this route")).toBeTruthy()

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Sync docs" })).toBeTruthy()
    })

    await user.click(screen.getByRole("button", { name: "Create projectMake a new project" }))
    expect(onSelect).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull()
    })
  })

  it("emits navigation changes for pagination, nav tabs and page tabs", async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    const onNavChange = vi.fn()
    const onPageTabChange = vi.fn()

    render(
      <>
        <Pagination page={2} pageCount={5} onPageChange={onPageChange} />
        <NavTabs
          value="overview"
          onValueChange={onNavChange}
          items={[
            { value: "overview", label: "Overview" },
            { value: "components", label: "Components" },
          ]}
        />
        <PageTabs
          value="docs"
          onValueChange={onPageTabChange}
          items={[
            { value: "docs", label: "Docs" },
            { value: "examples", label: "Examples", badge: "3" },
            { value: "hidden", label: "Hidden", hidden: true },
          ]}
        />
      </>
    )

    await user.click(screen.getByRole("button", { name: "Next page" }))
    await user.click(screen.getByRole("button", { name: "Page 5" }))
    await user.click(screen.getByRole("button", { name: "Components" }))
    await user.click(screen.getByRole("button", { name: "Examples3" }))

    expect(onPageChange).toHaveBeenCalledWith(3)
    expect(onPageChange).toHaveBeenCalledWith(5)
    expect(onNavChange).toHaveBeenCalledWith("components")
    expect(onPageTabChange).toHaveBeenCalledWith("examples", expect.objectContaining({ value: "examples" }))
    expect(screen.queryByRole("button", { name: "Hidden" })).toBeNull()
  })
})
