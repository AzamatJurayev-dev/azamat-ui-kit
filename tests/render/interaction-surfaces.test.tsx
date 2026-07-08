import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { CommandPalette, useCommandPaletteShortcut } from "@/components/command/command-palette"
import { AlertDialog } from "@/components/overlay/alert-dialog"
import { Alert } from "@/components/feedback/alert"
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
  isLoading = false,
}: {
  onCancel: () => void
  onConfirm: () => void
  isLoading?: boolean
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
        isLoading={isLoading}
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

  it("keeps alert dialog action locked until typed confirmation matches", async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()

    render(
      <AlertDialog
        open
        onOpenChange={() => undefined}
        title="Delete workspace"
        description="This cannot be undone."
        confirmValue="DELETE"
        actionLabel="Delete workspace"
        onAction={onAction}
      />
    )

    const actionButton = screen.getByRole("button", { name: "Delete workspace" })
    expect(actionButton.getAttribute("disabled")).toBe("")

    await user.type(screen.getByRole("textbox"), "DEL")
    expect(actionButton.getAttribute("disabled")).toBe("")

    await user.clear(screen.getByRole("textbox"))
    await user.type(screen.getByRole("textbox"), "DELETE")

    expect(actionButton.getAttribute("disabled")).toBeNull()
    await user.click(actionButton)
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it("can relax confirmation case matching", async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()

    render(
      <AlertDialog
        open
        onOpenChange={() => undefined}
        title="Delete workspace"
        confirmValue="DELETE"
        confirmCaseSensitive={false}
        actionLabel="Delete workspace"
        onAction={onAction}
      />
    )

    await user.type(screen.getByRole("textbox"), "delete")
    await user.click(screen.getByRole("button", { name: "Delete workspace" }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it("shows alert dialog async error state when action throws", async () => {
    const user = userEvent.setup()
    const onActionError = vi.fn()

    render(
      <AlertDialog
        open
        onOpenChange={() => undefined}
        title="Delete workspace"
        actionLabel="Delete workspace"
        errorMessage="Delete failed"
        onActionError={onActionError}
        onAction={async () => {
          throw new Error("boom")
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: "Delete workspace" }))

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Delete failed")
    })
    expect(onActionError).toHaveBeenCalledTimes(1)
  })

  it("prevents alert dialog from closing while loading when protection is enabled", async () => {
    const onOpenChange = vi.fn()

    render(
      <AlertDialog
        open
        loading
        onOpenChange={onOpenChange}
        title="Delete workspace"
        actionLabel="Delete workspace"
      />
    )

    fireEvent.keyDown(document, { key: "Escape" })
    expect(onOpenChange).not.toHaveBeenCalledWith(false, expect.anything())
  })

  it("supports dismissible alerts", async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <Alert
        title="Review needed"
        description="One deployment needs approval."
        dismissible
        onDismiss={onDismiss}
      />
    )

    await user.click(screen.getByLabelText("Dismiss alert"))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it("keeps confirm dialog interactions safe while loading", async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    const onConfirm = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        title="Deleting item"
        description="Async operation is running."
        cancelText="Stay here"
        confirmText="Delete now"
        onCancel={onCancel}
        onConfirm={onConfirm}
        isLoading
      />
    )

    expect(screen.queryByRole("button", { name: "Close" })).toBeNull()

    const confirmButton = screen.getByRole("button", { name: "Delete now" })
    expect(confirmButton.getAttribute("disabled")).toBe("")
    await user.click(confirmButton)
    expect(onOpenChange).not.toHaveBeenCalledWith(false)
    expect(onConfirm).not.toHaveBeenCalled()

    const cancelButton = screen.getByRole("button", { name: "Stay here" })
    await user.click(cancelButton)
    expect(cancelButton.getAttribute("disabled")).toBe("")
    expect(onOpenChange).not.toHaveBeenCalledWith(false)
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
