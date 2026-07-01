import * as React from "react"

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function DropdownMenuShowcase({ mode }: ComponentDemoProps) {
  const [status, setStatus] = React.useState("private")
  const [notifications, setNotifications] = React.useState(true)

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Dropdown menu</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Secondary actions belong here</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Use one trigger for quick actions, tiny settings, and destructive follow-ups.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Status</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{status === "public" ? "Public" : "Private"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Notifications</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{notifications ? "On" : "Off"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Route</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{mode === "playground" ? "Interactive" : "Docs"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Live menu</p>
            <h4 className="mt-2 text-xl font-semibold tracking-tight aui-text-strong">Open and verify small state changes</h4>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Workspace actions</DropdownMenuLabel>
              <DropdownMenuItem>Open workspace</DropdownMenuItem>
              <DropdownMenuItem disabled>Delete from archive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={notifications} onCheckedChange={(value) => setNotifications(Boolean(value))}>
                Notification access
              </DropdownMenuCheckboxItem>
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup value={status} onValueChange={(value) => setStatus(value)}>
                  <DropdownMenuRadioItem value="public">Public</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="private">Private</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                Remove workspace
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      <section className={panelClass}>
        <div className="border-y border-[color:var(--aui-divider)]">
          {[
            "Keep the main CTA outside the menu.",
            "Use radio and checkbox items only for very small settings.",
            "Destructive items should still be explicit and easy to notice.",
          ].map((item) => (
            <div key={item} className="border-b border-[color:var(--aui-divider)] py-3 text-sm leading-6 aui-text-muted last:border-b-0">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
