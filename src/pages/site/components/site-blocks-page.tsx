import * as React from "react"
import { BlocksIcon, ChevronDownIcon, ExternalLinkIcon, MenuIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"
import { BlockPreview } from "@/components/preview/block-preview"

import {
  blockCards,
  blockCoverageSections,
  blockLayoutFilters,
  blockSortOptions,
  blockTabs,
  blockThemeFilters,
  featuredBlock,
  installCommand,
  primaryNav,
} from "../site-data"
import { SurfaceCard, TopNav } from "../site-shell"
import { BlockCardPreview, CopyButton, normalize, PageFrame, SearchField, useCopyFeedback } from "./site-primitives"

export function SiteBlocksPage() {
  const [activeTab, setActiveTab] = React.useState(blockTabs[0])
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState<(typeof blockSortOptions)[number]>("Popular")
  const [view, setView] = React.useState<"cards" | "compact">("cards")
  const [layoutFilter, setLayoutFilter] = React.useState<(typeof blockLayoutFilters)[number]>("All layouts")
  const [themeFilter, setThemeFilter] = React.useState<(typeof blockThemeFilters)[number]>("All themes")
  const deferredSearch = React.useDeferredValue(search)
  const { copiedKey, onCopy } = useCopyFeedback()

  const visibleCards = blockCards
    .filter((card) => activeTab === "Dashboard" || card.tags.some((tag) => normalize(tag).includes(normalize(activeTab))))
    .filter((card) => layoutFilter === "All layouts" || card.layout === layoutFilter)
    .filter((card) => themeFilter === "All themes" || card.theme === themeFilter)
    .filter((card) => {
      const haystack = normalize([card.title, card.description, ...card.tags].join(" "))
      return haystack.includes(normalize(deferredSearch))
    })
    .sort((left, right) => (sort === "A-Z" ? left.title.localeCompare(right.title) : 0))

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <main className="mx-auto max-w-[1520px] px-6 py-10">
        <section className="mb-8 grid gap-10 xl:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <Badge className="rounded-full bg-amber-50 px-3 py-1 text-amber-700 hover:bg-amber-50">BUILD FASTER</Badge>
            <div>
              <h1 className="text-6xl font-semibold tracking-tight">Blocks & Templates</h1>
              <p className="mt-4 max-w-xl text-xl leading-9 text-zinc-600">
                Production-ready blocks and templates built with Azamat UI. Copy, customize, and ship stunning interfaces in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 border-b border-zinc-200">
              {blockTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn("border-b-2 pb-4 text-lg", activeTab === tab ? "border-amber-500 text-zinc-950" : "border-transparent text-zinc-500")}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-[1.2fr_0.65fr_0.65fr]">
              <SearchField value={search} onChange={setSearch} placeholder="Search blocks..." />
              <button
                onClick={() => setLayoutFilter((current) => blockLayoutFilters[(blockLayoutFilters.indexOf(current) + 1) % blockLayoutFilters.length])}
                className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white px-4 py-3"
              >
                {layoutFilter}
                <ChevronDownIcon className="size-4 text-zinc-500" />
              </button>
              <button
                onClick={() => setThemeFilter((current) => blockThemeFilters[(blockThemeFilters.indexOf(current) + 1) % blockThemeFilters.length])}
                className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white px-4 py-3"
              >
                {themeFilter}
                <ChevronDownIcon className="size-4 text-zinc-500" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSort((current) => blockSortOptions[(blockSortOptions.indexOf(current) + 1) % blockSortOptions.length])}
                className="flex items-center gap-2 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3"
              >
                {sort}
                <ChevronDownIcon className="size-4 text-zinc-500" />
              </button>
              <button
                onClick={() => setView("cards")}
                className={cn("rounded-2xl border p-3", view === "cards" ? "border-amber-300 bg-amber-50 text-amber-600" : "border-zinc-200/80 bg-white text-zinc-500")}
              >
                <MenuIcon className="size-4" />
              </button>
              <button
                onClick={() => setView("compact")}
                className={cn("rounded-2xl border p-3", view === "compact" ? "border-amber-300 bg-amber-50 text-amber-600" : "border-zinc-200/80 bg-white text-zinc-500")}
              >
                <BlocksIcon className="size-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.22fr_1fr]">
          <SurfaceCard className="overflow-hidden p-5">
            <div className={cn("rounded-[24px] border border-zinc-200/70 bg-gradient-to-br p-5", featuredBlock.tone)}>
              <div className="mb-4 flex items-center justify-between">
                <Badge variant="outline" className="rounded-full bg-white/80">Azamat UI</Badge>
                <Badge className="rounded-full bg-amber-50 text-amber-700 hover:bg-amber-50">Featured</Badge>
              </div>
              <div className="grid gap-4 rounded-[22px] border border-white/70 bg-white/90 p-5 shadow-xl lg:grid-cols-[0.28fr_1fr]">
                <div className="space-y-3 rounded-[18px] bg-zinc-50 p-4 text-sm text-zinc-500">
                  {["Overview", "Analytics", "Customers", "Orders", "Products", "Reports", "Settings"].map((item, index) => (
                    <div key={item} className={cn("rounded-xl px-3 py-2", index === 0 && "bg-white text-zinc-950 shadow-sm")}>{item}</div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-4">
                    {["$24,780", "18,390", "1,429", "6.3%"].map((metric, index) => (
                      <div key={metric} className="rounded-2xl border border-zinc-200/70 bg-white p-4">
                        <p className="text-xs text-zinc-500">Metric {index + 1}</p>
                        <p className="mt-2 text-2xl font-semibold">{metric}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4 lg:grid-cols-[1fr_0.42fr]">
                    <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="font-medium">Revenue overview</p>
                        <span className="text-sm text-zinc-500">This month</span>
                      </div>
                      <div className="h-40 rounded-2xl bg-[linear-gradient(180deg,rgba(59,130,246,0.12),transparent),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.18),transparent_40%)]" />
                    </div>
                    <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
                      <p className="mb-4 font-medium">Top products</p>
                      <div className="space-y-3 text-sm">
                        {["Premium Plan", "Basic Plan", "Add-ons", "Consulting"].map((item) => (
                          <div key={item} className="flex items-center justify-between">
                            <span>{item}</span>
                            <span className="text-zinc-500">$2,100</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 px-3 pb-3 pt-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-4xl font-semibold tracking-tight">{featuredBlock.title}</h2>
                  <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">New</Badge>
                </div>
                <p className="text-lg text-zinc-600">{featuredBlock.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredBlock.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Link to={featuredBlock.href} className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-6")}>
                  Preview
                  <ExternalLinkIcon className="ml-2 size-4" />
                </Link>
                <CopyButton label="Copy" copied={copiedKey === "featured"} onClick={() => void onCopy("featured", `${installCommand}\n# template: ${featuredBlock.slug}`)} />
              </div>
            </div>
          </SurfaceCard>

          <div className={cn("grid gap-6", view === "cards" ? "md:grid-cols-2" : "grid-cols-1")}>
            {visibleCards.map((card) => (
              <SurfaceCard key={card.title} className="overflow-hidden p-4">
                <BlockCardPreview title={card.title} />
                <div className="space-y-3 px-2 pb-2">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight">{card.title}</h3>
                    <p className="mt-2 text-base leading-7 text-zinc-600">{card.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Link to={card.previewHref ?? card.href} className={cn(buttonVariants({ variant: "outline" }), "flex-1 rounded-2xl")}>
                      Preview
                      <ExternalLinkIcon className="ml-2 size-4" />
                    </Link>
                    <CopyButton
                      label="Copy"
                      copied={copiedKey === card.title}
                      onClick={() => void onCopy(card.title, `<TemplatePreview slug="${card.slug}" />`)}
                    />
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-2">
          <BlockPreview
            title="Dashboard shell live preview"
            description="Iframe preview is reserved for large application shells such as dashboard and sidebar layouts."
            src="/preview/blocks/dashboard-01"
            command="npx azamat-ui-kit add dashboard-01"
            code={`import { BlockPreview } from "@/components/preview/block-preview"\n\n<BlockPreview\n  title="Dashboard shell"\n  src="/preview/blocks/dashboard-01"\n  command="npx azamat-ui-kit add dashboard-01"\n/>`}
            height={760}
          />
          <SurfaceCard className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Template coverage</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">Blocks and templates should read like a real catalog</h2>
              </div>
              <Badge variant="outline" className="rounded-full">Shadcn-style</Badge>
            </div>
            <div className="grid gap-4">
              {blockCoverageSections.map((section) => (
                <div key={section.title} className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <h3 className="text-xl font-semibold text-zinc-950">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{section.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <Badge key={item} variant="outline" className="rounded-full bg-white">{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </section>
      </main>
    </PageFrame>
  )
}
