import * as React from "react"

import { Badge, NotificationCenter } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const seedItems = [
  { id: "1", title: "Invoice paid", description: "Acme Growth settled invoice #2048.", time: "2m ago", read: false, group: "Today" },
  { id: "2", title: "Deployment ready", description: "Release candidate passed checks and waits for promotion.", time: "12m ago", read: false, group: "Today" },
  { id: "3", title: "Member invited", description: "Operations workspace access was sent to Dilshod.", time: "1h ago", read: true, group: "Earlier" },
]

export function NotificationCenterShowcase({ mode }: ComponentDemoProps) {
  const [items, setItems] = React.useState(seedItems)
  const unreadCount = items.filter((item) => !item.read).length

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Header utility</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">NotificationCenter should summarize recent action without becoming a second inbox</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This control works when unread counts are honest and the list stays short, recent, and directly actionable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Unread count</Badge>
            <Badge variant="outline" className="rounded-full">Popover feed</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium aui-text-muted">Live notification trigger</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Open the bell and inspect unread items.</p>
          </div>
          <NotificationCenter
            notifications={items}
            onMarkAllRead={() => setItems((current) => current.map((item) => ({ ...item, read: true })))}
            onClearAll={() => setItems([])}
            onNotificationClick={(notification) =>
              setItems((current) => current.map((item) => (item.id === notification.id ? { ...item, read: true } : item)))
            }
          />
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Unread items</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{unreadCount}</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Usage note</p>
          <p className="mt-3 text-sm leading-6 aui-text-muted">
            Put only high-signal events here. If users need filters, threads, or archives, that usually means they need a dedicated notifications route.
          </p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Bell ichidagi itemga bosilsa read bo‘ladi, `Mark all read` esa hammasini tozalaydi.</p>
        </section>
      ) : null}
    </div>
  )
}
