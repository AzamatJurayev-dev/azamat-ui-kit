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

  const visibleComponents = componentCatalog.filter((item) => normalize([item.title, item.description, ...item.features].join(" ")).includes(normalize(deferredSearch)))
  const visibleFamilies = moduleFamilyCatalog.filter((item) => normalize([item.title, item.description, ...item.exports].join(" ")).includes(normalize(deferredSearch)))

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
                {componentCatalog.map((item) => (
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
