import { ArrowRightIcon, ChevronDownIcon, CopyIcon, ExternalLinkIcon } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Badge, Button, buttonVariants } from "@/index"
import { BlockPreview } from "@/components/preview/block-preview"
import { cn } from "@/lib/utils"

import { blockCards, componentCatalog, componentDocsPath, componentPlaygroundPath, moduleFamilyCatalog, moduleFamilyExportPath, moduleFamilyExportSlug, primaryNav } from "../site-data"
import { SectionLabel, SurfaceCard, TopNav } from "../site-shell"
import { familyDemoRegistry } from "./family-mocks"
import { PageFrame, useCopyFeedback } from "./site-primitives"

function exportPreviewSrc(familySlug: string) {
  if (familySlug === "data-table") return "/preview/blocks/table-01"
  if (familySlug === "layout" || familySlug === "navigation" || familySlug === "patterns") return "/preview/blocks/dashboard-01"
  if (familySlug === "overlay" || familySlug === "form" || familySlug === "inputs") return "/preview/blocks/auth-01"
  if (familySlug === "display") return "/preview/blocks/product-01"
  return "/preview/components/button"
}

export function SiteModuleExportPage() {
  const params = useParams<{ slug: string; exportSlug: string }>()
  const family = moduleFamilyCatalog.find((item) => item.slug === params.slug)
  const exportName = family?.exports.find((item) => moduleFamilyExportSlug(item) === params.exportSlug)
  const demo = family ? familyDemoRegistry[family.slug] : undefined
  const { copiedKey, onCopy } = useCopyFeedback()

  if (!family || !exportName) {
    return <Navigate to="/components" replace />
  }

  const linkedCore = componentCatalog.slice(0, 3)
  const importCode = `import { ${exportName} } from "@azamat/ui"\n\nexport function Example() {\n  return <${exportName} />\n}`
  const relatedComponents = componentCatalog.filter((item) =>
    family.features.some((feature) => item.features.some((itemFeature) => feature.toLowerCase().includes(itemFeature.toLowerCase()) || itemFeature.toLowerCase().includes(feature.toLowerCase())))
    || exportName.toLowerCase().includes(item.title.toLowerCase())
    || family.category === "Forms" && item.category === "Forms"
    || family.category === "Overlay" && item.category === "Overlay"
    || family.category === "Data" && item.category === "Data Display"
  ).slice(0, 6)
  const relatedBlocks = blockCards.filter((card) =>
    card.tags.some((tag) => family.features.some((feature) => tag.toLowerCase().includes(feature.toLowerCase()) || feature.toLowerCase().includes(tag.toLowerCase())))
  ).slice(0, 4)

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
              <Link to={family.href} className="transition hover:text-zinc-950">{family.title}</Link>
              <ChevronDownIcon className="size-4 -rotate-90" />
              <span className="text-zinc-950">{exportName}</span>
            </div>

            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <SectionLabel>{family.title} export</SectionLabel>
                <h1 className="mt-3 text-6xl font-semibold tracking-tight">{exportName}</h1>
                <p className="mt-4 max-w-3xl text-xl leading-9 text-zinc-600">
                  This deep route isolates one export from the {family.title} family so it has a clear URL, copyable import, linked routes and dedicated scenario context.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-2xl" onClick={() => void onCopy("import", importCode)}>
                  <CopyIcon className="mr-2 size-4" />
                  {copiedKey === "import" ? "Copied" : "Copy import"}
                </Button>
                <Link to={family.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl px-6")}>
                  Back to family
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <SurfaceCard className="p-5">
                <p className="text-sm text-zinc-500">Family</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">{family.title}</p>
              </SurfaceCard>
              <SurfaceCard className="p-5">
                <p className="text-sm text-zinc-500">Export status</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">{family.status}</p>
              </SurfaceCard>
              <SurfaceCard className="p-5">
                <p className="text-sm text-zinc-500">Route mode</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">Deep</p>
              </SurfaceCard>
            </div>

            <SurfaceCard className="p-6">
              <SectionLabel>IMPORT</SectionLabel>
              <pre className="mt-4 overflow-x-auto rounded-[24px] bg-zinc-950 px-5 py-4 text-sm leading-8 text-zinc-100">{importCode}</pre>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <SectionLabel>SCENARIOS</SectionLabel>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {(demo?.mock.scenarios ?? []).map((scenario) => (
                  <div key={scenario.title} className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
                    <p className="font-medium text-zinc-950">{scenario.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Export coverage</h2>
                <Badge variant="outline" className="rounded-full">{(demo?.mock.highlights.length ?? 0) + (demo?.mock.metrics.length ?? 0)} signals</Badge>
              </div>
              <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>HIGHLIGHTS</SectionLabel>
                  <div className="mt-4 space-y-3">
                    {(demo?.mock.highlights ?? family.features).map((item) => (
                      <div key={item} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">{item}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>FAMILY METRICS</SectionLabel>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {(demo?.mock.metrics ?? []).map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-zinc-200 bg-white px-4 py-4">
                        <p className="text-sm text-zinc-500">{metric.label}</p>
                        <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Related exports</h2>
                <Badge variant="outline" className="rounded-full">{family.exports.length} total</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {family.exports.map((item) => (
                  <Link key={item} to={moduleFamilyExportPath(family.slug, item)} className={cn("flex items-center justify-between rounded-[22px] border border-zinc-200 px-4 py-4 text-sm text-zinc-700 transition hover:bg-zinc-50", item === exportName && "border-zinc-950 bg-zinc-950 text-white")}>
                    <span>{item}</span>
                    <ArrowRightIcon className="size-4" />
                  </Link>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Used across library</h2>
                <Badge variant="outline" className="rounded-full">{relatedComponents.length + relatedBlocks.length + 1} links</Badge>
              </div>
              <div className="grid gap-4 xl:grid-cols-3">
                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>FAMILY ROUTES</SectionLabel>
                  <div className="mt-4 space-y-3">
                    <Link to={family.href} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                      <span>{family.title} family</span>
                      <ExternalLinkIcon className="size-4 text-zinc-500" />
                    </Link>
                    <Link to="/components" className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                      <span>Components hub</span>
                      <ExternalLinkIcon className="size-4 text-zinc-500" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>RELATED COMPONENTS</SectionLabel>
                  <div className="mt-4 space-y-3">
                    {relatedComponents.map((item) => (
                      <Link key={item.slug} to={componentDocsPath(item.slug)} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                        <span>{item.title}</span>
                        <ExternalLinkIcon className="size-4 text-zinc-500" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                  <SectionLabel>RELATED BLOCKS</SectionLabel>
                  <div className="mt-4 space-y-3">
                    {relatedBlocks.map((block) => (
                      <Link key={block.slug} to={block.href} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-100">
                        <span>{block.title}</span>
                        <ExternalLinkIcon className="size-4 text-zinc-500" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <BlockPreview
              title={`${exportName} live preview`}
              description="Export-level preview connected to a real route so users can inspect the surface in isolation."
              src={exportPreviewSrc(family.slug)}
              command={`npx azamat-ui-kit add ${exportName}`}
              code={importCode}
              height={family.slug === "data-table" ? 760 : 640}
            />
          </div>

          <aside className="space-y-6">
            <SurfaceCard className="p-5">
              <SectionLabel>LINKED CORE</SectionLabel>
              <div className="mt-4 space-y-3">
                {(relatedComponents.length ? relatedComponents : linkedCore).map((item) => (
                  <div key={item.slug} className="rounded-2xl border border-zinc-200 p-4">
                    <p className="font-medium text-zinc-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{item.description}</p>
                    <div className="mt-4 flex gap-2">
                      <Link to={componentDocsPath(item.slug)} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-xl")}>Docs</Link>
                      <Link to={componentPlaygroundPath(item.slug)} className={cn(buttonVariants({ size: "sm" }), "rounded-xl")}>
                        Preview
                        <ExternalLinkIcon className="ml-2 size-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </aside>
        </div>
      </main>
    </PageFrame>
  )
}
