import * as React from "react"
import { ArrowRightIcon, ChevronDownIcon, CopyIcon, ExternalLinkIcon } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Badge, Input, Textarea, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import { componentCatalog, componentDocsPath, moduleFamilyCatalog, moduleFamilyExportPath, primaryNav } from "../site-data"
import { SectionLabel, SurfaceCard, TopNav } from "../site-shell"
import { defaultFamilyDemoState, familyDemoRegistry } from "./family-mocks"
import { CopyButton, DevicePreviewFrame, type DeviceMode, PageFrame, useCopyFeedback } from "./site-primitives"

export function SiteModuleFamilyPage() {
  const params = useParams<{ slug: string }>()
  const family = moduleFamilyCatalog.find((item) => item.slug === params.slug)
  const [device, setDevice] = React.useState<DeviceMode>("desktop")
  const [demoState, setDemoState] = React.useState(defaultFamilyDemoState)
  const { copiedKey, onCopy } = useCopyFeedback()

  if (!family) return <Navigate to="/components" replace />
  const demo = familyDemoRegistry[family.slug]

  const linkedCore =
    family.slug === "data-table"
      ? componentCatalog.filter((item) => ["input", "badge", "button", "card"].includes(item.slug)).slice(0, 4)
      : componentCatalog.slice(0, 4)
  const currentExport = family.exports[0]
  const exportCode = demo?.mock.code ?? `import { ${currentExport} } from "@azamat/ui"\n\nexport function Example() {\n  return <${currentExport} />\n}`

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <main className="mx-auto max-w-[1520px] px-6 py-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.32fr]">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Link to="/" className="transition hover:text-zinc-950">Home</Link>
              <ChevronDownIcon className="size-4 -rotate-90" />
              <Link to="/components" className="transition hover:text-zinc-950">Components</Link>
              <ChevronDownIcon className="size-4 -rotate-90" />
              <span className="text-zinc-950">{family.title}</span>
            </div>

            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <SectionLabel>{family.category}</SectionLabel>
                <h1 className="mt-3 text-6xl font-semibold tracking-tight">{family.title}</h1>
                <p className="mt-4 max-w-3xl text-xl leading-9 text-zinc-600">{family.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <CopyButton label="Copy import" copied={copiedKey === "import"} onClick={() => void onCopy("import", exportCode)} />
                <Link to="/components" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl px-6")}>All components</Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {(demo?.mock.metrics ?? family.features.map((feature) => ({ label: feature, value: "Ready" }))).map((item) => (
                <SurfaceCard key={item.label} className="p-5">
                  <p className="text-sm text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</p>
                </SurfaceCard>
              ))}
            </div>

            <SurfaceCard className="p-6">
              <div className="mb-5 flex flex-wrap gap-3">
                {family.exports.map((item, index) => (
                  <Link
                    key={item}
                    to={moduleFamilyExportPath(family.slug, item)}
                    className={cn("rounded-2xl border px-5 py-3 text-sm font-medium", index === 0 ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-600")}
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <DevicePreviewFrame title="Family showcase" description="Each family has its own route, exports list and working interaction area." device={device} onDeviceChange={setDevice}>
                <div className="space-y-5 rounded-[24px] border border-zinc-200 bg-white p-5">
                  {demo ? (
                    <demo.Showcase state={demoState} setState={(patch) => setDemoState((current) => ({ ...current, ...patch }))} />
                  ) : (
                    <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                      <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400">Active export</p>
                        <p className="mt-3 text-2xl font-semibold tracking-tight">{currentExport}</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-600">{family.description}</p>
                      </div>
                      <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
                        <div className="flex items-center gap-3">
                          <Input value={demoState.search} onChange={(event) => setDemoState((current) => ({ ...current, search: event.target.value }))} placeholder="Search within the family..." />
                        </div>
                        <Textarea value={demoState.notes} onChange={(event) => setDemoState((current) => ({ ...current, notes: event.target.value }))} className="mt-4 min-h-24" />
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[22px] border border-zinc-200 p-4">
                      <SectionLabel>{demo ? "Mock scenarios" : "Exports"}</SectionLabel>
                      <div className="mt-4 space-y-3">
                        {demo
                          ? demo.mock.scenarios.map((scenario) => (
                              <div key={scenario.title} className="rounded-2xl border border-zinc-100 px-4 py-3">
                                <p className="font-medium text-zinc-950">{scenario.title}</p>
                                <p className="mt-1 text-sm leading-6 text-zinc-500">{scenario.description}</p>
                              </div>
                            ))
                          : family.exports
                              .filter((item) => item.toLowerCase().includes(demoState.search.toLowerCase()))
                              .map((item) => (
                                <Link key={item} to={moduleFamilyExportPath(family.slug, item)} className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50">
                                  <span>{item}</span>
                                  <Badge variant="outline" className="rounded-full">{family.category}</Badge>
                                </Link>
                              ))}
                      </div>
                    </div>
                    <div className="rounded-[22px] border border-zinc-200 p-4">
                      <SectionLabel>{family.slug === "data-table" ? "DataTable depth" : "Actions"}</SectionLabel>
                      <div className="mt-4 space-y-3">
                        {family.slug === "data-table"
                          ? demo?.mock.highlights.map((item) => (
                              <div key={item} className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700">
                                {item}
                              </div>
                            ))
                          : null}
                        <button onClick={() => void onCopy("export", demo?.mock.code ?? exportCode)} className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50">
                          {copiedKey === "export" ? "Copied export" : "Copy current export"}
                          <CopyIcon className="size-4" />
                        </button>
                        <Link to={componentDocsPath(linkedCore[0].slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50">
                          Open related docs
                          <ExternalLinkIcon className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </DevicePreviewFrame>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Related core components</h2>
                <Badge variant="outline" className="rounded-full">{linkedCore.length} linked</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {linkedCore.map((item) => (
                  <div key={item.slug} className="rounded-[22px] border border-zinc-200 p-4">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                    <div className="mt-4 flex gap-2">
                      <Link to={componentDocsPath(item.slug)} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-xl")}>Docs</Link>
                      <Link to={`/preview/components/${item.slug}`} className={cn(buttonVariants({ size: "sm" }), "rounded-xl")}>
                        Preview
                        <ArrowRightIcon className="ml-2 size-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Everything in this family</h2>
                <Badge variant="outline" className="rounded-full">{family.exports.length} exports</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {family.exports.map((item) => (
                  <Link key={item} to={moduleFamilyExportPath(family.slug, item)} className="rounded-[22px] border border-zinc-200 p-4 transition hover:bg-zinc-50">
                    <p className="font-medium text-zinc-950">{item}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{family.title} family export route with dedicated import and linked component context.</p>
                  </Link>
                ))}
              </div>
            </SurfaceCard>
          </div>

          <aside className="space-y-6">
            <SurfaceCard className="p-5">
              <SectionLabel>Family stats</SectionLabel>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-zinc-200 px-4 py-3">
                  <p className="text-sm text-zinc-500">Exports</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">{family.exports.length}</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 px-4 py-3">
                  <p className="text-sm text-zinc-500">Status</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">{family.status}</p>
                </div>
              </div>
            </SurfaceCard>
          </aside>
        </div>
      </main>
    </PageFrame>
  )
}
