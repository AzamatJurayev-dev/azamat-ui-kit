import * as React from "react"
import { ArrowRightIcon, CopyIcon, SparklesIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import {
  heroStats,
  landingArchitecture,
  landingInstallSteps,
  landingLibraryStack,
  landingProofPoints,
  landingSearchItems,
  landingTemplateHighlights,
  partnerLogos,
  primaryNav,
  valueCards,
} from "../site-data"
import { SectionLabel, SurfaceCard, TopNav } from "../site-shell"
import { defaultPlaygroundState, normalize, PageFrame, PreviewButton, type ButtonSize, type ButtonState, type ButtonVariant, useCopyFeedback } from "./site-primitives"

function HeroPanel() {
  const [heroVariant, setHeroVariant] = React.useState<ButtonVariant>("primary")
  const [heroSize, setHeroSize] = React.useState<ButtonSize>("md")
  const [heroCodeTab, setHeroCodeTab] = React.useState<"tsx" | "jsx" | "html">("tsx")
  const [heroSearch, setHeroSearch] = React.useState("")
  const [heroPage, setHeroPage] = React.useState(1)
  const deferredHeroSearch = React.useDeferredValue(heroSearch)
  const { copiedKey, onCopy } = useCopyFeedback()

  const visibleSearchItems = landingSearchItems.filter((item) => normalize(item.label).includes(normalize(deferredHeroSearch))).slice(0, 5)
  const heroProjects = [
    ["Acme Dashboard", "Live", "2h ago"],
    ["Marketing Site", "Review", "1d ago"],
    ["CRM Platform", "Draft", "3d ago"],
    ["Mobile App", "Live", "1w ago"],
  ]

  const heroPreviewState = {
    ...defaultPlaygroundState,
    variant: heroVariant,
    size: heroSize,
    state: (heroPage === 2 ? "hover" : heroPage === 3 ? "focus" : "default") as ButtonState,
  }

  const codeByTab = {
    tsx: `import { Button } from "azamat-ui"\n\nexport default function Example() {\n  return (\n    <Button variant="${heroVariant}" size="${heroSize}">\n      Build your UI\n    </Button>\n  )\n}`,
    jsx: `export default function Example() {\n  return (\n    <Button variant="${heroVariant}" size="${heroSize}">\n      Build your UI\n    </Button>\n  )\n}`,
    html: `<button data-variant="${heroVariant}" data-size="${heroSize}">\n  Build your UI\n</button>`,
  }

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-zinc-200/80 bg-white px-8 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(163,230,53,0.12),transparent_24%)]" />
      <div className="relative grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 shadow-sm">
            <span className="rounded-full bg-zinc-950 px-2 py-0.5 text-xs font-semibold text-white">New</span>
            Public docs, blocks and templates are now route-driven
            <ArrowRightIcon className="size-4" />
          </div>

          <div className="space-y-5">
            <h1 className="max-w-[620px] text-[76px] font-semibold leading-[0.94] tracking-tight text-zinc-950">
              Build your
              <br />
              interface system<span className="text-amber-400">.</span>
            </h1>
            <p className="max-w-[580px] text-[18px] leading-9 text-zinc-600">
              Azamat UI is a modern React UI library for public docs, component playgrounds and production-style templates. It combines reusable primitives, install-ready code, responsive previews and a route-first documentation flow.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/docs/components/button" className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-6")}>
              Get started
              <ArrowRightIcon className="ml-2 size-4" />
            </Link>
            <Link to="/playground/button" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl px-6")}>
              Browse components
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {heroStats.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm">
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
                <p className="text-sm text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[640px]">
          <div className="absolute left-0 top-8 w-[250px] rounded-[28px] border border-zinc-200/80 bg-white p-5 shadow-xl">
            <p className="mb-4 text-lg font-semibold">Button variants</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {(["primary", "outline", "secondary", "ghost", "destructive", "link"] as ButtonVariant[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setHeroVariant(item)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 capitalize transition",
                    item === heroVariant ? "bg-zinc-950 text-white border-zinc-950" : "border-zinc-200 bg-white text-zinc-700",
                    item === "destructive" && item !== heroVariant && "bg-red-500 text-white border-red-500"
                  )}
                >
                  {item}
                </button>
              ))}
              {(["sm", "md", "lg"] as ButtonSize[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setHeroSize(item)}
                  className={cn("rounded-2xl border px-4 py-3 uppercase", heroSize === item ? "bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700")}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute right-0 top-0 w-[310px] rounded-[28px] bg-zinc-950 p-5 text-zinc-100 shadow-2xl">
            <div className="mb-5 flex items-center justify-between text-sm text-zinc-400">
              <div className="flex gap-2">
                {(["tsx", "jsx", "html"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setHeroCodeTab(tab)}
                    className={cn("rounded-full px-3 py-1", heroCodeTab === tab ? "bg-zinc-800 text-white" : "text-zinc-400")}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button onClick={() => void onCopy("hero-code", codeByTab[heroCodeTab])} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-white/5">
                <CopyIcon className="size-4" />
                {copiedKey === "hero-code" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-hidden text-sm leading-7 text-zinc-200">{codeByTab[heroCodeTab]}</pre>
          </div>

          <div className="absolute left-10 top-[250px] w-[500px] rounded-[28px] border border-zinc-200/80 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xl font-semibold">Recent projects</p>
              <Badge variant="outline">{heroPage === 2 ? "Review" : "Live"}</Badge>
            </div>
            <div className="space-y-3 text-sm">
              {heroProjects.map(([name, status, updated]) => (
                <div key={name} className="grid grid-cols-[1.3fr_0.7fr_0.7fr] rounded-2xl border border-zinc-100 px-4 py-3">
                  <span>{name}</span>
                  <span className="text-zinc-500">{status}</span>
                  <span className="text-right text-zinc-500">{updated}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-24 right-4 w-[360px] rounded-[28px] border border-zinc-200/80 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-500">
                <SparklesIcon className="size-4 shrink-0" />
                <input
                  value={heroSearch}
                  onChange={(event) => setHeroSearch(event.target.value)}
                  placeholder="Search components, blocks..."
                  className="min-w-0 bg-transparent outline-none placeholder:text-zinc-400"
                />
              </div>
              <span className="rounded-lg border px-2 py-0.5 text-xs text-zinc-500">⌘K</span>
            </div>
            <div className="space-y-3 text-sm">
              {visibleSearchItems.map((item) => (
                <Link key={item.label} to={item.href} className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3 transition hover:border-zinc-300 hover:bg-zinc-50">
                  <div>
                    <span className="block text-zinc-950">{item.label}</span>
                    <span className="text-xs text-zinc-500">{item.group}</span>
                  </div>
                  <span className="rounded-lg bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">{item.shortcut}</span>
                </Link>
              ))}
              {!visibleSearchItems.length ? <div className="rounded-2xl border border-dashed border-zinc-200 px-4 py-6 text-center text-zinc-500">No results</div> : null}
            </div>
          </div>

          <div className="absolute bottom-0 left-28 w-[300px] rounded-[24px] border border-zinc-200/80 bg-white px-5 py-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between text-sm text-zinc-500">
              <button onClick={() => setHeroPage((current) => Math.max(1, current - 1))} className="rounded-xl border px-3 py-2">‹</button>
              <div className="flex gap-2">
                {[1, 2, 3, 8].map((page) => (
                  <button
                    key={page}
                    onClick={() => setHeroPage(page)}
                    className={cn("rounded-xl border px-4 py-2", heroPage === page ? "bg-zinc-950 text-white" : "border-zinc-200")}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button onClick={() => setHeroPage((current) => Math.min(8, current + 1))} className="rounded-xl border px-3 py-2">›</button>
            </div>
            <div className="pt-2">
              <PreviewButton playgroundState={heroPreviewState} label="Preview state" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SiteHomePage() {
  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <main className="mx-auto max-w-[1520px] px-6 py-10">
        <HeroPanel />

        <section className="grid gap-6 py-10 md:grid-cols-2 xl:grid-cols-4">
          {landingProofPoints.map((item) => {
            const Icon = item.icon
            return (
              <SurfaceCard key={item.title} className="p-7">
                <div className={cn("mb-5 inline-flex size-14 items-center justify-center rounded-2xl", item.tone)}>
                  <Icon className="size-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-600">{item.text}</p>
              </SurfaceCard>
            )
          })}
        </section>

        <section className="py-10">
          <p className="mb-6 text-center text-lg text-zinc-500">Trusted by developers building modern products</p>
          <div className="grid grid-cols-2 gap-6 text-center text-3xl font-semibold text-zinc-500 sm:grid-cols-3 xl:grid-cols-6">
            {partnerLogos.map((item) => (
              <div key={item} className="rounded-2xl border border-zinc-200/70 bg-white px-4 py-5">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-10 xl:grid-cols-[0.9fr_1.1fr]">
          <SurfaceCard className="p-8">
            <SectionLabel>Install flow</SectionLabel>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">Ship faster with a clear adoption path.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              A public UI library needs more than beautiful screenshots. Users should understand how to install, where to navigate and how the component behaves before they commit.
            </p>
            <div className="mt-8 space-y-5">
              {landingInstallSteps.map((item) => (
                <div key={item.step} className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">{item.step}</span>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-7 text-zinc-600">{item.text}</p>
                  <pre className="mt-4 overflow-x-auto rounded-2xl bg-zinc-950 px-4 py-4 text-sm leading-7 text-zinc-100">{item.code}</pre>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <div className="grid gap-6">
            <SurfaceCard className="p-8">
              <SectionLabel>Architecture</SectionLabel>
              <div className="mt-5 grid gap-4">
                {landingArchitecture.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="rounded-[24px] border border-zinc-200 p-5">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                          <Icon className="size-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="mt-2 text-base leading-7 text-zinc-600">{item.text}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.points.map((point) => (
                              <Badge key={point} variant="outline" className="rounded-full px-3 py-1 text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-8">
              <SectionLabel>Library stack</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Built on practical frontend choices.</h2>
              <div className="mt-6 grid gap-3">
                {landingLibraryStack.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3">
                    <div className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-base text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </section>

        <section className="grid gap-6 pb-10 md:grid-cols-2 xl:grid-cols-4">
          {valueCards.map((item) => {
            const Icon = item.icon
            return (
              <SurfaceCard key={item.title} className="p-7">
                <div className={cn("mb-5 inline-flex size-14 items-center justify-center rounded-2xl", item.tone)}>
                  <Icon className="size-6" />
                </div>
                <h3 className="text-3xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-600">{item.text}</p>
              </SurfaceCard>
            )
          })}
        </section>

        <section className="pb-14">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <SectionLabel>Templates</SectionLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">Production-like starting points, not empty shells.</h2>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-600">
                Templates should demonstrate how navigation, cards, tables, forms and overlays work together. This gives the library more credibility than isolated components alone.
              </p>
            </div>
            <Link to="/blocks" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl px-6")}>
              Browse blocks
            </Link>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {landingTemplateHighlights.map((item, index) => (
              <SurfaceCard key={item.title} className="overflow-hidden">
                <div
                  className={cn(
                    "h-52 border-b border-zinc-200/80 p-5",
                    index === 0 && "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_35%),linear-gradient(180deg,#ffffff,#f8fafc)]",
                    index === 1 && "bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_35%),linear-gradient(180deg,#ffffff,#f8fafc)]",
                    index === 2 && "bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.14),transparent_35%),linear-gradient(180deg,#ffffff,#fff7ed)]"
                  )}
                >
                  <div className="grid h-full gap-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-9 rounded-xl bg-white/90 shadow-sm" />
                      <div className="h-9 rounded-xl bg-white/80 shadow-sm" />
                      <div className="h-9 rounded-xl bg-white/80 shadow-sm" />
                    </div>
                    <div className="grid flex-1 gap-3">
                      <div className="rounded-2xl bg-white/85 shadow-sm" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/85 shadow-sm" />
                        <div className="rounded-2xl bg-white/85 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-600">{item.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full px-3 py-1 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </section>
      </main>
    </PageFrame>
  )
}
