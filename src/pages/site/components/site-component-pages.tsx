import * as React from "react"
import { CheckIcon, ChevronDownIcon, ExternalLinkIcon, MinusIcon, PlusIcon, StarIcon } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Badge, Button, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import { accessibilityChecks, blockCards, componentCatalog, componentDocsPath, componentPlaygroundPath, docsSidebar, inspectorChecks, moduleFamilyCatalog, moduleFamilyPath, primaryNav, playgroundSidebar } from "../site-data"
import { SectionLabel, Sidebar, SurfaceCard, TopNav } from "../site-shell"
import { CopyButton, DevicePreviewFrame, type DeviceMode, PageFrame, PassBadge, useCopyFeedback } from "./site-primitives"
import { componentDemoRegistry, defaultComponentDemoState } from "./component-mocks"

type PreviewTab = "preview" | "code" | "api"
type PlaygroundTab = "TSX" | "HTML" | "CLI"

function ComponentHeader({ item, mode }: { item: (typeof componentCatalog)[number]; mode: "docs" | "playground" }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <Link to="/" className="transition hover:text-zinc-950">{mode === "docs" ? "Docs" : "Components"}</Link>
          <ChevronDownIcon className="size-4 -rotate-90" />
          <span>{item.category}</span>
          <ChevronDownIcon className="size-4 -rotate-90" />
          <span className="text-zinc-950">{item.title}</span>
        </div>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight">{mode === "docs" ? item.title : `${item.title} Playground`}</h1>
        <p className="mt-3 max-w-3xl text-xl leading-9 text-zinc-600">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-zinc-500">
          <span className="flex items-center gap-2"><CheckIcon className="size-4 text-emerald-600" />{item.status}</span>
          <span>{item.features.length} feature groups</span>
          <span>TypeScript</span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="rounded-2xl"><StarIcon className="mr-2 size-4" />1.2k</Button>
        <Link to={mode === "docs" ? componentPlaygroundPath(item.slug) : componentDocsPath(item.slug)} className={cn(buttonVariants({ variant: "outline" }), "rounded-2xl")}>
          {mode === "docs" ? "Playground" : "Docs"}
          <ExternalLinkIcon className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  )
}

function getCatalogItem(slug?: string) {
  return componentCatalog.find((item) => item.slug === slug)
}

export function SiteGenericComponentDocsPage() {
  const params = useParams<{ slug: string }>()
  const item = getCatalogItem(params.slug)
  const demo = componentDemoRegistry[params.slug ?? "button"] ?? componentDemoRegistry.button
  const [previewTab, setPreviewTab] = React.useState<PreviewTab>("preview")
  const [device, setDevice] = React.useState<DeviceMode>("desktop")
  const [helpful, setHelpful] = React.useState<"up" | "down" | null>(null)
  const { copiedKey, onCopy } = useCopyFeedback()
  const [demoState, setDemoState] = React.useState(defaultComponentDemoState)

  if (!item) return <Navigate to={componentDocsPath("button")} replace />

  const code = demo.mock.code
  const docsCodeTabs = [
    { key: "TSX", value: demo.mock.code },
    ...(demo.mock.htmlCode ? [{ key: "HTML" as const, value: demo.mock.htmlCode }] : []),
    { key: "CLI" as const, value: demo.mock.cliCommand ?? item.installCommand },
  ]
  const relatedBlocks = (demo.mock.relatedBlockSlugs?.length
    ? blockCards.filter((card) => demo.mock.relatedBlockSlugs?.includes(card.slug))
    : blockCards.filter((card) => card.tags.some((tag) => item.features.some((feature) => tag.toLowerCase().includes(feature.toLowerCase()) || feature.toLowerCase().includes(tag.toLowerCase()))))
  ).slice(0, 3)
  const relatedFamilies = moduleFamilyCatalog.filter((family) =>
    family.features.some((feature) => item.features.some((itemFeature) => feature.toLowerCase().includes(itemFeature.toLowerCase()) || itemFeature.toLowerCase().includes(feature.toLowerCase())))
    || family.exports.some((exportName) => exportName.toLowerCase().includes(item.title.toLowerCase()))
    || family.category === "Forms" && item.category === "Forms"
    || family.category === "Overlay" && item.category === "Overlay"
    || family.category === "Data" && item.category === "Data Display"
  ).slice(0, 6)
  const siblingComponents = componentCatalog.filter((entry) => entry.category === item.category && entry.slug !== item.slug).slice(0, 6)

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <div className="mx-auto flex max-w-[1680px]">
        <Sidebar title="Azamat UI" description="Interactive component documentation with route-first previews." groups={docsSidebar} />
        <main className="min-w-0 flex-1 px-12 py-10">
          <div className="grid gap-10 xl:grid-cols-[1fr_0.22fr]">
            <div className="space-y-10">
              <ComponentHeader item={item} mode="docs" />

              <SurfaceCard className="bg-zinc-950 p-5 text-zinc-100">
                <SectionLabel>INSTALL</SectionLabel>
                <div className="mt-5 rounded-[22px] border border-white/10 bg-black/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-zinc-400">CLI</span>
                    <CopyButton label="Copy" copied={copiedKey === "install"} onClick={() => void onCopy("install", item.installCommand)} dark />
                  </div>
                  <code className="block rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200">{item.installCommand}</code>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6">
                <div className="mb-6 flex gap-6 border-b border-zinc-200 pb-4">
                  {(["preview", "code", "api"] as PreviewTab[]).map((tab) => (
                    <button key={tab} onClick={() => setPreviewTab(tab)} className={cn("border-b-2 pb-4 text-sm font-medium capitalize", previewTab === tab ? "border-amber-500 text-zinc-950" : "border-transparent text-zinc-500")}>
                      {tab}
                    </button>
                  ))}
                </div>

                {previewTab === "preview" ? (
                  <div className="space-y-7">
                    <div className="grid gap-3 md:grid-cols-3">
                      {demo.mock.highlights.map((feature) => (
                        <div key={feature} className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">{feature}</div>
                      ))}
                    </div>

                    <DevicePreviewFrame title="Live component preview" description="Har bir component haqiqiy render bilan ko‘rsatiladi." device={device} onDeviceChange={setDevice}>
                      <div className="rounded-[24px] border border-zinc-200 bg-white p-5">
                        <demo.Showcase mode="docs" state={demoState} setState={(patch) => setDemoState((current) => ({ ...current, ...patch }))} />
                      </div>
                    </DevicePreviewFrame>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                        <SectionLabel>MOCK SCENARIOS</SectionLabel>
                        <div className="mt-4 space-y-3">
                          {demo.mock.scenarios.map((scenario) => (
                            <div key={scenario.title} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                              <p className="font-medium text-zinc-950">{scenario.title}</p>
                              <p className="mt-1 text-sm leading-6 text-zinc-500">{scenario.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                        <SectionLabel>LINKED ROUTES</SectionLabel>
                        <div className="mt-4 space-y-3">
                          <Link to={componentPlaygroundPath(item.slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
                            Open playground
                            <ExternalLinkIcon className="size-4 text-zinc-500" />
                          </Link>
                          <Link to="/blocks" className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
                            Browse templates
                            <ExternalLinkIcon className="size-4 text-zinc-500" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {(demo.mock.capabilityNotes ?? item.features).slice(0, 6).map((note) => (
                        <div key={note} className="rounded-[24px] border border-zinc-200 bg-white p-4">
                          <p className="text-sm font-medium text-zinc-900">{note}</p>
                          <p className="mt-2 text-sm leading-6 text-zinc-500">This behavior is represented in the current mock and should be documented across related pages.</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                        <SectionLabel>CONNECTED FAMILIES</SectionLabel>
                        <div className="mt-4 grid gap-3">
                          {relatedFamilies.map((family) => (
                            <Link key={family.slug} to={moduleFamilyPath(family.slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                              <div>
                                <p className="font-medium text-zinc-950">{family.title}</p>
                                <p className="mt-1 text-zinc-500">{family.exports.length} exports</p>
                              </div>
                              <ExternalLinkIcon className="size-4 text-zinc-500" />
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                        <SectionLabel>SIBLING COMPONENTS</SectionLabel>
                        <div className="mt-4 grid gap-3">
                          {siblingComponents.map((entry) => (
                            <Link key={entry.slug} to={componentDocsPath(entry.slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                              <div>
                                <p className="font-medium text-zinc-950">{entry.title}</p>
                                <p className="mt-1 text-zinc-500">{entry.description}</p>
                              </div>
                              <ExternalLinkIcon className="size-4 text-zinc-500" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {previewTab === "code" ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {docsCodeTabs.map((tab) => (
                        <Badge key={tab.key} variant="outline" className="rounded-full px-3 py-1">{tab.key}</Badge>
                      ))}
                    </div>
                    <pre className="overflow-x-auto rounded-[28px] bg-zinc-950 px-6 py-5 text-sm leading-8 text-zinc-100">{code}</pre>
                  </div>
                ) : null}
                {previewTab === "api" ? (
                  <div className="overflow-x-auto rounded-[28px] border border-zinc-200">
                    <table className="min-w-full text-sm">
                      <thead className="text-left text-zinc-500">
                        <tr>{["Name", "Type", "Default", "Description"].map((head) => <th key={head} className="px-4 py-3 font-medium">{head}</th>)}</tr>
                      </thead>
                      <tbody>
                        {item.propsRows.map((row) => (
                          <tr key={row[0]} className="border-t border-zinc-100">
                            {row.map((cell) => <td key={cell} className="px-4 py-4 align-top text-zinc-600">{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </SurfaceCard>
            </div>

            <aside className="space-y-6">
              <div>
                <SectionLabel>ON THIS PAGE</SectionLabel>
                <div className="mt-5 space-y-4 border-l border-zinc-200 pl-5">
                  {["Installation", "Features", "Preview", "Interactions", "API"].map((label, index) => (
                    <div key={label} className={cn("text-base", (previewTab === "preview" && index === 2) || (previewTab === "code" && index === 3) || (previewTab === "api" && index === 4) ? "text-zinc-950" : "text-zinc-500")}>{label}</div>
                  ))}
                </div>
              </div>
              <SurfaceCard className="p-5">
                <p className="text-lg font-semibold">Was this helpful?</p>
                <div className="mt-4 flex gap-3">
                  <Button variant={helpful === "up" ? "default" : "outline"} size="icon-sm" className="rounded-xl" onClick={() => setHelpful("up")}><PlusIcon className="size-4" /></Button>
                  <Button variant={helpful === "down" ? "default" : "outline"} size="icon-sm" className="rounded-xl" onClick={() => setHelpful("down")}><MinusIcon className="size-4" /></Button>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-5">
                <p className="text-lg font-semibold">Used in blocks</p>
                <div className="mt-4 space-y-3">
                  {(relatedBlocks.length ? relatedBlocks : blockCards.slice(0, 3)).map((block) => (
                    <Link key={block.slug} to={block.href} className="block rounded-2xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50">
                      <p className="font-medium text-zinc-900">{block.title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">{block.description}</p>
                    </Link>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-5">
                <p className="text-lg font-semibold">Related families</p>
                <div className="mt-4 space-y-3">
                  {relatedFamilies.map((family) => (
                    <Link key={family.slug} to={moduleFamilyPath(family.slug)} className="block rounded-2xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50">
                      <p className="font-medium text-zinc-900">{family.title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">{family.description}</p>
                    </Link>
                  ))}
                </div>
              </SurfaceCard>
            </aside>
          </div>
        </main>
      </div>
    </PageFrame>
  )
}

export function SiteGenericComponentPlaygroundPage() {
  const params = useParams<{ slug: string }>()
  const item = getCatalogItem(params.slug)
  const demo = componentDemoRegistry[params.slug ?? "button"] ?? componentDemoRegistry.button
  const [device, setDevice] = React.useState<DeviceMode>("desktop")
  const availablePlaygroundTabs = React.useMemo(
    () =>
      [
        { key: "TSX" as const, value: demo.mock.code },
        ...(demo.mock.htmlCode ? [{ key: "HTML" as const, value: demo.mock.htmlCode }] : []),
        { key: "CLI" as const, value: demo.mock.cliCommand ?? item?.installCommand ?? "" },
      ] satisfies Array<{ key: PlaygroundTab; value: string }>,
    [demo.mock.cliCommand, demo.mock.code, demo.mock.htmlCode, item?.installCommand]
  )
  const [codeTab, setCodeTab] = React.useState<PlaygroundTab>("TSX")
  const { copiedKey, onCopy } = useCopyFeedback()
  const [demoState, setDemoState] = React.useState(defaultComponentDemoState)

  if (!item) return <Navigate to={componentPlaygroundPath("button")} replace />

  const code = availablePlaygroundTabs.find((tab) => tab.key === codeTab)?.value ?? demo.mock.code
  const relatedBlocks = (demo.mock.relatedBlockSlugs?.length
    ? blockCards.filter((card) => demo.mock.relatedBlockSlugs?.includes(card.slug))
    : blockCards.filter((card) => card.tags.some((tag) => item.features.some((feature) => tag.toLowerCase().includes(feature.toLowerCase()) || feature.toLowerCase().includes(tag.toLowerCase()))))
  ).slice(0, 3)
  const relatedFamilies = moduleFamilyCatalog.filter((family) =>
    family.features.some((feature) => item.features.some((itemFeature) => feature.toLowerCase().includes(itemFeature.toLowerCase()) || itemFeature.toLowerCase().includes(feature.toLowerCase())))
    || family.exports.some((exportName) => exportName.toLowerCase().includes(item.title.toLowerCase()))
    || family.category === "Forms" && item.category === "Forms"
    || family.category === "Overlay" && item.category === "Overlay"
    || family.category === "Data" && item.category === "Data Display"
  ).slice(0, 8)
  const siblingComponents = componentCatalog.filter((entry) => entry.category === item.category && entry.slug !== item.slug).slice(0, 8)

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <div className="mx-auto flex max-w-[1680px]">
        <Sidebar title="Component playgrounds" description="Each route exposes live controls and real preview output." groups={playgroundSidebar} />
        <main className="min-w-0 flex-1 border-r border-zinc-200/80 px-10 py-8">
          <div className="space-y-8">
            <ComponentHeader item={item} mode="playground" />

            <SurfaceCard className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-3xl font-semibold tracking-tight">Live Preview</h2>
                <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Live</Badge>
              </div>
              <DevicePreviewFrame title="Interactive component canvas" description="Inspector o‘zgarsa, preview ham shu route ichida yangilanadi." device={device} onDeviceChange={setDevice}>
                <div className="rounded-[24px] border border-zinc-200 bg-white p-5">
                  <demo.Showcase mode="playground" state={demoState} setState={(patch) => setDemoState((current) => ({ ...current, ...patch }))} />
                </div>
              </DevicePreviewFrame>
            </SurfaceCard>

            <SurfaceCard className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
                <div className="flex gap-6 text-sm">
                  {availablePlaygroundTabs.map((tab) => (
                    <button key={tab.key} onClick={() => setCodeTab(tab.key)} className={cn("border-b-2 pb-3", codeTab === tab.key ? "border-zinc-950 text-zinc-950" : "border-transparent text-zinc-500")}>{tab.key}</button>
                  ))}
                </div>
                <Button className="rounded-xl" onClick={() => void onCopy("code", code)}>{copiedKey === "code" ? "Copied" : "Copy code"}</Button>
              </div>
              <pre className="overflow-x-auto px-6 py-5 text-sm leading-8 text-zinc-700">{code}</pre>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Full capability coverage</h2>
                <Badge variant="outline" className="rounded-full">{(demo.mock.capabilityNotes ?? item.features).length} items</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {(demo.mock.capabilityNotes ?? item.features).map((note) => (
                  <div key={note} className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-sm leading-6 text-zinc-700">{note}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Scenario matrix</h2>
                <Badge variant="outline" className="rounded-full">{demo.mock.scenarios.length} states</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {demo.mock.scenarios.map((scenario, index) => (
                  <div key={scenario.title} className="rounded-[24px] border border-zinc-200 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Example {index + 1}</p>
                    <p className="mt-3 text-lg font-semibold text-zinc-950">{scenario.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Connected library routes</h2>
                <Badge variant="outline" className="rounded-full">{relatedFamilies.length + relatedBlocks.length + 2} links</Badge>
              </div>
              <div className="grid gap-4 xl:grid-cols-3">
                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>COMPONENT ROUTES</SectionLabel>
                  <div className="mt-4 space-y-3">
                    <Link to={componentDocsPath(item.slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                      <span>Docs page</span>
                      <ExternalLinkIcon className="size-4 text-zinc-500" />
                    </Link>
                    <Link to={componentPlaygroundPath(item.slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                      <span>Playground page</span>
                      <ExternalLinkIcon className="size-4 text-zinc-500" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>RELATED FAMILIES</SectionLabel>
                  <div className="mt-4 space-y-3">
                    {relatedFamilies.map((family) => (
                      <Link key={family.slug} to={moduleFamilyPath(family.slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                        <span>{family.title}</span>
                        <ExternalLinkIcon className="size-4 text-zinc-500" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>BLOCKS USING IT</SectionLabel>
                  <div className="mt-4 space-y-3">
                    {(relatedBlocks.length ? relatedBlocks : blockCards.slice(0, 3)).map((block) => (
                      <Link key={block.slug} to={block.href} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                        <span>{block.title}</span>
                        <ExternalLinkIcon className="size-4 text-zinc-500" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">More from {item.category}</h2>
                <Badge variant="outline" className="rounded-full">{siblingComponents.length} linked</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {siblingComponents.map((entry) => (
                  <Link key={entry.slug} to={componentPlaygroundPath(entry.slug)} className="rounded-[24px] border border-zinc-200 bg-white p-5 transition hover:bg-zinc-50">
                    <p className="text-lg font-semibold text-zinc-950">{entry.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{entry.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-900">
                      Open playground
                      <ExternalLinkIcon className="size-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </main>

        <aside className="w-[390px] shrink-0 px-6 py-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight">Showcase</h2>
              <Button variant="outline" className="rounded-2xl" onClick={() => setDemoState(defaultComponentDemoState)}>Reset</Button>
            </div>

            <SurfaceCard className="p-5">
              <SectionLabel>SHOWCASE CONTROLS</SectionLabel>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                  Active viewport: <span className="font-medium text-zinc-950">{device}</span>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                  Supported code tabs: <span className="font-medium text-zinc-950">{availablePlaygroundTabs.map((tab) => tab.key).join(", ")}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button onClick={() => setDemoState((current) => ({ ...current, checked: !current.checked }))} className={cn("rounded-2xl border px-4 py-3 text-sm", demoState.checked ? "bg-zinc-950 text-white" : "border-zinc-200 text-zinc-600")}>Toggle check</button>
                  <button onClick={() => setDemoState((current) => ({ ...current, switchOn: !current.switchOn }))} className={cn("rounded-2xl border px-4 py-3 text-sm", demoState.switchOn ? "bg-zinc-950 text-white" : "border-zinc-200 text-zinc-600")}>Toggle switch</button>
                  <button onClick={() => setDemoState((current) => ({ ...current, badgeVariant: current.badgeVariant === "default" ? "secondary" : current.badgeVariant === "secondary" ? "outline" : "default" }))} className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-600">Badge variant</button>
                  <button onClick={() => setDemoState((current) => ({ ...current, cardCompact: !current.cardCompact }))} className={cn("rounded-2xl border px-4 py-3 text-sm", demoState.cardCompact ? "bg-zinc-950 text-white" : "border-zinc-200 text-zinc-600")}>Card size</button>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h3 className="text-xl font-semibold">Coverage</h3>
              <div className="mt-4 space-y-3">
                {(demo.mock.capabilityNotes ?? item.features).map((note) => (
                  <div key={note} className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700">
                    {note}
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h3 className="text-xl font-semibold">Scenarios</h3>
              <div className="mt-4 space-y-3">
                {demo.mock.scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl border border-zinc-200 px-4 py-3">
                    <p className="font-medium text-zinc-900">{scenario.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h3 className="text-xl font-semibold">Keyboard & Focus</h3>
              <div className="mt-4 space-y-2">
                {inspectorChecks.map((item) => (
                  <div key={item} className="flex items-center justify-between text-sm text-zinc-600">
                    <span>{item}</span>
                    <PassBadge />
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Accessibility</h3>
                <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">100 / 100</Badge>
              </div>
              <div className="space-y-3">
                {accessibilityChecks.map((item) => (
                  <div key={item} className="flex items-center justify-between text-sm text-zinc-600">
                    <span>{item}</span>
                    <PassBadge />
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h3 className="text-xl font-semibold">Related blocks</h3>
              <div className="mt-4 space-y-3">
                {(relatedBlocks.length ? relatedBlocks : blockCards.slice(0, 3)).map((block) => (
                  <Link key={block.slug} to={block.href} className="block rounded-2xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50">
                    <p className="font-medium text-zinc-900">{block.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{block.description}</p>
                  </Link>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h3 className="text-xl font-semibold">Related families</h3>
              <div className="mt-4 space-y-3">
                {relatedFamilies.map((family) => (
                  <Link key={family.slug} to={moduleFamilyPath(family.slug)} className="block rounded-2xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50">
                    <p className="font-medium text-zinc-900">{family.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{family.description}</p>
                  </Link>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </aside>
      </div>
    </PageFrame>
  )
}

