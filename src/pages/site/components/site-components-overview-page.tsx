import * as React from "react"
import { ArrowRightIcon, SearchIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import { componentCatalog, moduleFamilyCatalog, primaryNav } from "../site-data"
import { SectionLabel, SurfaceCard, TopNav } from "../site-shell"
import { normalize, PageFrame } from "./site-primitives"

export function SiteComponentsOverviewPage() {
  const [search, setSearch] = React.useState("")
  const deferredSearch = React.useDeferredValue(search)

  const visibleComponents = componentCatalog
    .filter((item) => item.slug !== "table")
    .filter((item) => normalize([item.title, item.description, ...item.features].join(" ")).includes(normalize(deferredSearch)))
  const visibleFamilies = moduleFamilyCatalog.filter((item) => normalize([item.title, item.description, ...item.exports].join(" ")).includes(normalize(deferredSearch)))
  const featuredFamily = moduleFamilyCatalog.find((item) => item.slug === "data-table") ?? moduleFamilyCatalog[0]
  const FeaturedIcon = featuredFamily.icon

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <main className="mx-auto max-w-[1520px] px-6 py-10">
        <section className="rounded-[36px] border border-zinc-200/80 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
          <SectionLabel>Component catalog</SectionLabel>
          <div className="mt-4 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="text-6xl font-semibold tracking-tight">Explore every component family.</h1>
              <p className="mt-4 max-w-3xl text-xl leading-9 text-zinc-600">
                Core UI primitives and higher-level product modules are separated clearly so every route has its own purpose and preview.
              </p>
            </div>
            <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-500">
              <SearchIcon className="size-4" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search components or families..." className="w-full bg-transparent outline-none placeholder:text-zinc-400" />
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mb-6">
            <SectionLabel>Primary reusable system</SectionLabel>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Start with DataTable, not the primitive table.</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600">
              This library should lead with your composed systems. `DataTable` is the main reusable data component, with selection, toolbar, presets, row actions and real product-level behavior.
            </p>
          </div>
          <SurfaceCard className="mb-10 overflow-hidden p-6">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-5">
                <div className="inline-flex size-16 items-center justify-center rounded-3xl bg-amber-400 text-zinc-950">
                  <FeaturedIcon className="size-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-4xl font-semibold tracking-tight">{featuredFamily.title}</h3>
                    <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">{featuredFamily.status}</Badge>
                  </div>
                  <p className="mt-3 text-lg leading-8 text-zinc-600">{featuredFamily.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredFamily.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="rounded-full">{feature}</Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Link to={featuredFamily.href} className={cn(buttonVariants({ size: "default" }), "rounded-2xl px-6")}>
                    Open `components/data-table`
                    <ArrowRightIcon className="ml-2 size-4" />
                  </Link>
                </div>
              </div>
              <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-5">
                <div className="grid gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Selection</Badge>
                    <Badge variant="outline">Bulk actions</Badge>
                    <Badge variant="outline">View presets</Badge>
                    <Badge variant="outline">Toolbar</Badge>
                  </div>
                  <div className="rounded-[24px] border border-zinc-200 bg-white p-4">
                    <div className="grid grid-cols-[0.7fr_1fr_0.8fr_0.8fr_0.8fr] gap-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                      <div>Pick</div>
                      <div>Invoice</div>
                      <div>Status</div>
                      <div>Owner</div>
                      <div>Amount</div>
                    </div>
                    <div className="mt-3 space-y-3">
                      {[
                        ["On", "INV-001", "Paid", "Azamat", "$2,400"],
                        ["Off", "INV-002", "Review", "Malika", "$1,280"],
                        ["On", "INV-005", "Overdue", "Asadbek", "$860"],
                      ].map((row) => (
                        <div key={row[1]} className="grid grid-cols-[0.7fr_1fr_0.8fr_0.8fr_0.8fr] items-center gap-3 rounded-2xl border border-zinc-100 px-3 py-3 text-sm text-zinc-700">
                          <span className={row[0] === "On" ? "rounded-lg bg-zinc-950 px-2 py-1 text-center text-xs text-white" : "rounded-lg border border-zinc-200 px-2 py-1 text-center text-xs text-zinc-500"}>{row[0]}</span>
                          <span className="font-medium text-zinc-950">{row[1]}</span>
                          <span>{row[2]}</span>
                          <span>{row[3]}</span>
                          <span className="text-right">{row[4]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      ["10 exports", "Reusable finance and admin flows."],
                      ["6+ live features", "Density, row click, presets and more."],
                      ["One API", "No clone table components needed."],
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-4">
                        <p className="font-medium text-zinc-950">{title}</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SurfaceCard>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <SectionLabel>Core UI</SectionLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">Base components with live docs and playgrounds.</h2>
            </div>
            <Badge variant="outline" className="rounded-full px-3 py-1">{visibleComponents.length} components</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleComponents.map((item) => {
              const Icon = item.icon
              return (
                <SurfaceCard key={item.slug} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                      <Icon className="size-6" />
                    </div>
                    <Badge className={cn("rounded-full", item.status === "Stable" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" : "bg-amber-50 text-amber-700 hover:bg-amber-50")}>
                      {item.status}
                    </Badge>
                  </div>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-600">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="rounded-full">{feature}</Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link to={`/docs/components/${item.slug}`} className={cn(buttonVariants({ variant: "outline" }), "flex-1 rounded-2xl")}>Docs</Link>
                    <Link to={`/playground/${item.slug}`} className={cn(buttonVariants({ size: "default" }), "flex-1 rounded-2xl")}>
                      Preview
                      <ArrowRightIcon className="ml-2 size-4" />
                    </Link>
                  </div>
                </SurfaceCard>
              )
            })}
          </div>
        </section>

        <section className="pb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <SectionLabel>Module families</SectionLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">Product-level building blocks and composed systems.</h2>
            </div>
            <Badge variant="outline" className="rounded-full px-3 py-1">{visibleFamilies.length} families</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleFamilies.map((item) => {
              const Icon = item.icon
              return (
                <SurfaceCard key={item.slug} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-amber-400 text-zinc-950">
                      <Icon className="size-6" />
                    </div>
                    <Badge className={cn("rounded-full", item.status === "Stable" ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" : "bg-amber-50 text-amber-700 hover:bg-amber-50")}>
                      {item.status}
                    </Badge>
                  </div>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-600">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="rounded-full">{feature}</Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-zinc-500">{item.exports.length} exports in this family</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.exports.slice(0, 6).map((exportName) => (
                      <Badge key={exportName} variant="secondary" className="rounded-full">{exportName}</Badge>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to={item.href} className={cn(buttonVariants({ size: "default" }), "w-full rounded-2xl")}>
                      Open family
                      <ArrowRightIcon className="ml-2 size-4" />
                    </Link>
                  </div>
                </SurfaceCard>
              )
            })}
          </div>
        </section>

        <section className="pb-12">
          <div className="mb-6">
            <SectionLabel>Full library surface</SectionLabel>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">Everything visible in the public library UI.</h2>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600">
              Base components, shell/layout systems, forms, workflows and deep module families are listed here so the showcase does not stop at a few demo routes.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <SurfaceCard className="p-6">
              <h3 className="text-2xl font-semibold tracking-tight">Core components</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {componentCatalog.filter((item) => item.slug !== "table").map((item) => (
                  <Link key={item.slug} to={`/playground/${item.slug}`} className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50">
                    {item.title}
                  </Link>
                ))}
              </div>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <h3 className="text-2xl font-semibold tracking-tight">Shells, forms, workflows</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {moduleFamilyCatalog.map((item) => (
                  <Link key={item.slug} to={item.href} className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50">
                    {item.title}
                  </Link>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}
