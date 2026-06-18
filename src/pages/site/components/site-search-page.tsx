import * as React from "react"
import { ArrowRightIcon, CornerDownLeftIcon, SearchIcon, SparklesIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import { globalSearchItems, primaryNav } from "../site-data"
import { SectionLabel, SurfaceCard, TopNav } from "../site-shell"
import { normalize, PageFrame } from "./site-primitives"

const groupOrder: Array<(typeof globalSearchItems)[number]["group"]> = ["Component", "Docs", "Playground", "Family", "Export", "Template"]

export function SiteSearchPage() {
  const [query, setQuery] = React.useState("")
  const deferredQuery = React.useDeferredValue(query)

  const visibleItems = globalSearchItems.filter((item) => {
    const haystack = normalize([item.title, item.description, item.group].join(" "))
    return haystack.includes(normalize(deferredQuery))
  })

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <main className="mx-auto max-w-[1520px] px-6 py-10">
        <section className="relative overflow-hidden rounded-[40px] border border-zinc-200/80 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.10),transparent_25%),linear-gradient(180deg,#ffffff,#fafaf9)] px-6 py-10 shadow-[0_40px_100px_rgba(15,23,42,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_30%)]" />
          <div className="relative mx-auto max-w-[1120px]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <SectionLabel>Command palette</SectionLabel>
                <h1 className="mt-3 text-5xl font-semibold tracking-tight">Search routes like a real UI command menu.</h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600">
                  Components, playgrounds, module families, export pages and templates are indexed in one floating command surface.
                </p>
              </div>
              <Badge className="rounded-full bg-zinc-950 text-white hover:bg-zinc-950">⌘K</Badge>
            </div>

            <div className="rounded-[32px] border border-zinc-200/80 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
              <div className="flex items-center gap-4 border-b border-zinc-200 px-5 py-4">
                <SearchIcon className="size-5 text-zinc-500" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search button, app shell, command palette, dashboard starter..."
                  className="w-full bg-transparent text-base outline-none placeholder:text-zinc-400"
                />
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-500">↑↓</span>
                  <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-500">↵</span>
                </div>
              </div>

              <div className="grid gap-0 xl:grid-cols-[0.28fr_1fr]">
                <aside className="border-b border-zinc-200 p-5 xl:border-b-0 xl:border-r">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Quick actions</p>
                  <div className="space-y-3">
                    <Link to="/components" className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50">
                      Browse components
                      <ArrowRightIcon className="size-4" />
                    </Link>
                    <Link to="/blocks" className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50">
                      Browse templates
                      <ArrowRightIcon className="size-4" />
                    </Link>
                    <Link to="/docs/components/button" className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50">
                      Open button docs
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </div>

                  <p className="mb-4 mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Groups</p>
                  <div className="space-y-2">
                    {groupOrder.map((group) => {
                      const count = visibleItems.filter((item) => item.group === group).length
                      return (
                        <div key={group} className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700">
                          <span>{group}</span>
                          <Badge variant="outline" className="rounded-full">{count}</Badge>
                        </div>
                      )
                    })}
                  </div>
                </aside>

                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <div className="flex items-center gap-3 text-sm text-zinc-600">
                      <SparklesIcon className="size-4" />
                      <span>{visibleItems.length} routes ready to open</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CornerDownLeftIcon className="size-3.5" />
                      <span>Press enter to open</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {groupOrder.map((group) => {
                      const groupItems = visibleItems.filter((item) => item.group === group).slice(0, 6)
                      if (!groupItems.length) return null

                      return (
                        <div key={group}>
                          <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400">{group}</h2>
                            <Badge variant="outline" className="rounded-full">{groupItems.length}</Badge>
                          </div>
                          <div className="space-y-3">
                            {groupItems.map((item, index) => (
                              <Link
                                key={`${group}-${item.title}-${item.href}`}
                                to={item.href}
                                className={cn(
                                  "flex items-center justify-between rounded-[22px] border px-4 py-4 transition",
                                  index === 0 ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:bg-zinc-50"
                                )}
                              >
                                <div className="min-w-0">
                                  <p className={cn("text-base font-semibold", index === 0 ? "text-white" : "text-zinc-950")}>{item.title}</p>
                                  <p className={cn("mt-1 text-sm leading-6", index === 0 ? "text-white/70" : "text-zinc-500")}>{item.description}</p>
                                </div>
                                <div className="ml-4 flex shrink-0 items-center gap-3">
                                  <Badge variant={index === 0 ? "secondary" : "outline"}>{item.shortcut}</Badge>
                                  <ArrowRightIcon className="size-4" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    })}

                    {!visibleItems.length ? (
                      <SurfaceCard className="p-8 text-center">
                        <p className="text-2xl font-semibold tracking-tight">No results</p>
                        <p className="mt-3 text-zinc-500">Try searching by component name, family export, or template title.</p>
                        <div className="mt-6">
                          <Link to="/components" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl px-6")}>
                            Browse components
                          </Link>
                        </div>
                      </SurfaceCard>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}
