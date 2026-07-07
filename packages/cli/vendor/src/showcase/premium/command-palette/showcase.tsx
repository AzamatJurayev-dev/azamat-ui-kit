import * as React from "react"

import { Badge, Button, CommandPalette, Kbd } from "@/index"

import type { CommandPaletteGroup, CommandPaletteItem } from "@/components/command/command-palette"
import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export function CommandPaletteShowcase({ mode }: ComponentDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [lastAction, setLastAction] = React.useState("Nothing selected yet")

  const groups = React.useMemo<CommandPaletteGroup[]>(
    () => [
      {
        id: "routes",
        label: "Routes",
        items: [
          {
            id: "overview",
            label: "Open overview",
            description: "Jump to the workspace summary route.",
            shortcut: <Kbd>G O</Kbd>,
            onSelect: async () => {
              await wait(220)
              setLastAction("Opened overview route")
            },
          },
          {
            id: "billing",
            label: "Open billing",
            description: "Inspect invoices, methods, and workspace usage.",
            shortcut: <Kbd>G B</Kbd>,
            onSelect: async () => {
              await wait(220)
              setLastAction("Opened billing route")
            },
          },
        ],
      },
      {
        id: "actions",
        label: "Actions",
        items: [
          {
            id: "invite",
            label: "Invite teammate",
            description: "Start workspace access flow.",
            shortcut: <Kbd>⌘I</Kbd>,
            onSelect: async () => {
              await wait(220)
              setLastAction("Invite flow started")
            },
          },
          {
            id: "export",
            label: "Export report",
            description: "Download usage summary as CSV.",
            shortcut: <Kbd>⌘E</Kbd>,
            onSelect: async () => {
              await wait(220)
              setLastAction("Export requested")
            },
          },
        ],
      },
      {
        id: "workspace",
        label: "Workspace search",
        loadingLabel: "Searching workspace...",
        emptyLabel: "No matching workspace entities.",
        loadItems: async (search) => {
          await wait(260)
          const base: CommandPaletteItem[] = [
            { id: "acme", label: "Acme Growth", description: "Customer workspace", value: "acme growth customer workspace" },
            { id: "north", label: "Northwind Ops", description: "Operations team", value: "northwind ops operations team" },
            { id: "invoice", label: "Invoice 2048", description: "Billing entity", value: "invoice 2048 billing entity" },
          ]
          const normalized = search.trim().toLowerCase()
          return normalized ? base.filter((item) => String(item.value ?? item.label).toLowerCase().includes(normalized)) : base
        },
      },
    ],
    []
  )

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Global actions</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Command palette should collapse navigation and actions into one fast surface</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Good command UX combines routes, actions, and async workspace search without looking like a giant modal form.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Recent-aware</Badge>
            <Badge variant="outline" className="rounded-full">Async search</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium aui-text-muted">Try the live surface</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Open the palette, trigger route jumps, or type to load workspace entities.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setOpen(true)}>Open palette</Button>
            <Badge variant="outline" className="rounded-full"><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd></Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Last action</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{lastAction}</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">Command results should feel immediate and operational.</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Design rule</p>
          <p className="mt-3 text-sm leading-6 aui-text-muted">
            Keep command labels short, searchable, and verb-first. Async groups should behave like results, not like a second UI inside the modal.
          </p>
        </section>
      </div>

      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        placeholder="Search routes and actions..."
        groups={groups}
        recent
      />

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
              Reopen palette
            </Button>
            <Button size="sm" variant="outline" onClick={() => setLastAction("Nothing selected yet")}>
              Reset output
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
