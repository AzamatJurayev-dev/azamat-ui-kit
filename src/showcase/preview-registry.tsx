import type { ReactElement } from "react"

import { actionsShowcaseDemoRegistry } from "@/components/actions/demo"
import { calendarShowcaseDemoRegistry } from "@/components/calendar/demo"
import { dataTableShowcaseDemoRegistry } from "@/components/data-table/demo"
import { displayShowcaseDemoRegistry } from "@/components/display/demo"
import { feedbackShowcaseDemoRegistry } from "@/components/feedback/demo"
import { filtersShowcaseDemoRegistry } from "@/components/filters/demo"
import { formShowcaseDemoRegistry } from "@/components/form/demo"
import { inputsShowcaseDemoRegistry } from "@/components/inputs/demo"
import { layoutShowcaseDemoRegistry } from "@/components/layout/demo"
import { navigationShowcaseDemoRegistry } from "@/components/navigation/demo"
import { overlayShowcaseDemoRegistry } from "@/components/overlay/demo"
import { patternsShowcaseDemoRegistry } from "@/components/patterns/demo"
import { uploadShowcaseDemoRegistry } from "@/components/upload/demo"
import { wizardShowcaseDemoRegistry } from "@/components/wizard/demo"
import { Badge, Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/index"
import { defaultComponentDemoState, premiumShowcaseDemoRegistry } from "./premium"
import { registrySpecificDemoRegistry } from "./registry-specific"

import { previewSurfaceCatalog, type PreviewSurfaceTone } from "./preview-catalog"

const dashboardMetrics = [
  { label: "Revenue", value: "$24,780", delta: "+12.8%" },
  { label: "Users", value: "18,390", delta: "+7.2%" },
  { label: "Orders", value: "1,429", delta: "+6.1%" },
  { label: "Conversion", value: "6.3%", delta: "+1.1%" },
]

const dashboardRows = [
  ["AZ-001", "Acme Dashboard", "Live", "$8,240"],
  ["AZ-002", "CRM Workspace", "Review", "$5,180"],
  ["AZ-003", "Store Command", "Draft", "$3,740"],
  ["AZ-004", "Finance Dock", "Live", "$7,620"],
]

const tableRows = [
  ["INV-001", "Acme Inc.", "Paid", "$2,400"],
  ["INV-002", "Larana", "Review", "$1,280"],
  ["INV-003", "ShipFast", "Draft", "$980"],
  ["INV-004", "Toolpad", "Paid", "$4,120"],
  ["INV-005", "Pixels UI", "Paid", "$3,860"],
]

const pageSurfaceClassName = "min-h-screen bg-[var(--aui-page-bg-alt)] p-6 aui-text-strong"
const panelClassName = "border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] shadow-[var(--aui-shadow-panel)]"
const cardClassName = "border border-[color:var(--aui-divider)] bg-[color:var(--aui-surface-muted)]"
const strongSurfaceClassName = "aui-surface-strong text-[color:var(--aui-surface-strong-foreground)]"
const mutedTextClassName = "aui-text-muted"
const softWhiteTextClassName = "text-[color:color-mix(in_oklch,var(--aui-surface-strong-foreground),transparent_28%)]"
const darkChipClassName =
  "border-[color:color-mix(in_oklch,var(--aui-surface-strong-foreground),transparent_88%)] bg-[color:color-mix(in_oklch,var(--aui-surface-strong-foreground),transparent_90%)] text-[color:var(--aui-surface-strong-foreground)]"
const darkPanelClassName =
  "border-[color:color-mix(in_oklch,var(--aui-surface-strong-foreground),transparent_88%)] bg-[color:color-mix(in_oklch,var(--aui-surface-strong-foreground),transparent_95%)] text-[color:color-mix(in_oklch,var(--aui-surface-strong-foreground),transparent_18%)]"

const componentPreviewRegistry = {
  ...actionsShowcaseDemoRegistry,
  ...calendarShowcaseDemoRegistry,
  ...dataTableShowcaseDemoRegistry,
  ...displayShowcaseDemoRegistry,
  ...feedbackShowcaseDemoRegistry,
  ...filtersShowcaseDemoRegistry,
  ...formShowcaseDemoRegistry,
  ...inputsShowcaseDemoRegistry,
  ...layoutShowcaseDemoRegistry,
  ...navigationShowcaseDemoRegistry,
  ...overlayShowcaseDemoRegistry,
  ...patternsShowcaseDemoRegistry,
  ...uploadShowcaseDemoRegistry,
  ...wizardShowcaseDemoRegistry,
  ...registrySpecificDemoRegistry,
  ...premiumShowcaseDemoRegistry,
}

function PreviewLogo() {
  return (
    <div className="flex size-11 items-center justify-center rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-surface-strong)] text-sm font-semibold tracking-[0.2em] text-[color:var(--aui-surface-strong-foreground)]">
      AZ
    </div>
  )
}

function PreviewSurfaceRenderer({ tone }: { tone: PreviewSurfaceTone }) {
  if (tone === "dashboard") {
    return (
      <div className={pageSurfaceClassName}>
        <div className="grid min-h-[720px] gap-6 lg:grid-cols-[260px_1fr]">
          <aside className={`rounded-[28px] p-5 ${panelClassName}`}>
            <div className="mb-6 flex items-center gap-3">
              <PreviewLogo />
              <div>
                <p className="font-semibold">Azamat UI</p>
                <p className={`text-sm ${mutedTextClassName}`}>Dashboard shell</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {["Overview", "Analytics", "Customers", "Orders", "Finance", "Settings"].map((item, index) => (
                <div key={item} className={index === 0 ? `rounded-2xl px-4 py-3 ${strongSurfaceClassName}` : `rounded-2xl px-4 py-3 ${mutedTextClassName}`}>{item}</div>
              ))}
            </div>
          </aside>

          <main className={`space-y-6 rounded-[32px] p-6 ${panelClassName}`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className={`text-sm uppercase tracking-[0.24em] ${mutedTextClassName}`}>Overview</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight">Operations dashboard</h1>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-2xl">Route preview</Button>
                <Button className="rounded-2xl">Create report</Button>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {dashboardMetrics.map((metric) => (
                <div key={metric.label} className={`rounded-[24px] p-5 ${cardClassName}`}>
                  <p className={`text-sm ${mutedTextClassName}`}>{metric.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">{metric.value}</p>
                  <p className="mt-3 text-sm text-emerald-600">{metric.delta}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <section className={`rounded-[28px] p-5 ${cardClassName}`}>
                <h2 className="text-xl font-semibold">Revenue trend</h2>
                <p className={`mt-2 text-sm leading-6 ${mutedTextClassName}`}>Monthly performance with steady lift across product lines.</p>
                <div className="mt-5 h-72 rounded-[24px] bg-[color:var(--aui-page-bg)] [background-image:linear-gradient(180deg,color-mix(in_oklch,var(--aui-accent)_18%,transparent),transparent),radial-gradient(circle_at_bottom_left,color-mix(in_oklch,var(--aui-success)_20%,transparent),transparent_40%)]" />
              </section>

              <section className={`rounded-[28px] p-5 ${cardClassName}`}>
                <h2 className="text-xl font-semibold">Release checklist</h2>
                <p className={`mt-2 text-sm leading-6 ${mutedTextClassName}`}>Production gating before public deployment.</p>
                <div className="mt-5 space-y-3">
                  {["QA approved", "Docs updated", "Tokens synced", "Routes verified"].map((item, index) => (
                    <div key={item} className={`flex items-center justify-between rounded-2xl px-4 py-3 ${panelClassName}`}>
                      <span>{item}</span>
                      <Badge variant={index === 3 ? "outline" : "secondary"}>{index === 3 ? "Pending" : "Done"}</Badge>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className={`rounded-[28px] p-5 ${cardClassName}`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Recent workspaces</h2>
                  <p className={`mt-2 text-sm leading-6 ${mutedTextClassName}`}>Dense table preview inside a public docs frame.</p>
                </div>
                <div className="flex gap-3">
                  <Input placeholder="Filter rows..." className="w-full lg:w-64" />
                  <Button variant="outline" className="rounded-2xl">Export</Button>
                </div>
              </div>
              <div className={`mt-5 overflow-hidden rounded-[24px] ${panelClassName}`}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardRows.map(([id, name, status, revenue]) => (
                      <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell><Badge variant={status === "Live" ? "secondary" : status === "Review" ? "outline" : "destructive"}>{status}</Badge></TableCell>
                        <TableCell className="text-right">{revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }

  if (tone === "table") {
    return (
      <div className={pageSurfaceClassName}>
        <section className={`mx-auto max-w-6xl rounded-[32px] p-6 ${panelClassName}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Invoices table</h1>
              <p className={`mt-2 text-sm leading-6 ${mutedTextClassName}`}>Responsive data-table preview route with filters, states and pagination shell.</p>
            </div>
            <div className="flex gap-3">
              <Input placeholder="Search invoices..." className="w-full lg:w-64" />
              <Button variant="outline" className="rounded-2xl">Columns</Button>
              <Button className="rounded-2xl">Export CSV</Button>
            </div>
          </div>
          <div className="mt-5 space-y-5">
            <div className="flex flex-wrap gap-2">
              {["All", "Paid", "Review", "Draft"].map((item, index) => (
                <Badge key={item} variant={index === 0 ? "default" : "outline"}>{item}</Badge>
              ))}
            </div>
            <div className={`overflow-hidden rounded-[24px] ${panelClassName}`}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableRows.map(([invoice, customer, status, amount]) => (
                    <TableRow key={invoice}>
                      <TableCell>{invoice}</TableCell>
                      <TableCell>{customer}</TableCell>
                      <TableCell><Badge variant={status === "Paid" ? "secondary" : status === "Review" ? "outline" : "destructive"}>{status}</Badge></TableCell>
                      <TableCell className="text-right">{amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className={`flex items-center justify-between rounded-[24px] px-4 py-3 text-sm ${cardClassName} ${mutedTextClassName}`}>
              <span>5 rows visible</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Prev</Button>
                <Button size="sm">Next</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (tone === "auth") {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,color-mix(in_oklch,var(--aui-warning)_14%,var(--aui-page-bg-alt)),var(--aui-page-bg))] p-6 aui-text-strong">
        <div className="mx-auto grid min-h-[720px] max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between rounded-[36px] border border-[color:color-mix(in_oklch,var(--aui-warning)_40%,transparent)] bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--aui-warning)_22%,transparent),transparent_35%),var(--aui-surface-strong)] p-8 text-[color:var(--aui-surface-strong-foreground)] shadow-[var(--aui-shadow-panel)]">
            <div>
              <div className={`inline-flex items-center gap-3 rounded-full border px-3 py-2 ${darkChipClassName}`}>
                <div className="flex size-8 items-center justify-center rounded-xl border-[color:color-mix(in_oklch,var(--aui-surface-strong-foreground),transparent_88%)] bg-[color:var(--aui-page-bg)] text-xs font-semibold tracking-[0.22em] text-[color:var(--aui-page-foreground)]">
                  AZ
                </div>
                <span className="text-sm font-medium">Azamat UI</span>
              </div>
              <h1 className="mt-8 max-w-lg text-5xl font-semibold tracking-tight">Production sign in flow for modern product surfaces.</h1>
              <p className={`mt-4 max-w-md text-base leading-7 ${softWhiteTextClassName}`}>Preview a reusable auth block inside the docs system without leaving the library site.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Social login", "Password reset", "Session states"].map((item) => (
                <div key={item} className={`rounded-2xl border px-4 py-4 text-sm ${darkPanelClassName}`}>{item}</div>
              ))}
            </div>
          </div>

          <section className={`flex items-center rounded-[36px] p-8 ${panelClassName}`}>
            <div className="mx-auto w-full max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
                <p className={`text-sm leading-6 ${mutedTextClassName}`}>Sign in to continue to your workspace and preview environment.</p>
              </div>
              <Button variant="outline" className="w-full rounded-2xl">Continue with Google</Button>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium aui-text-subtle">Email</label>
                  <Input defaultValue="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium aui-text-subtle">Password</label>
                  <Input type="password" defaultValue="password123" />
                </div>
              </div>
              <Button className="w-full rounded-2xl">Sign in</Button>
              <div className={`flex items-center justify-between text-sm ${mutedTextClassName}`}>
                <span>Forgot password?</span>
                <span>Create account</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

  if (tone === "product") {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,color-mix(in_oklch,var(--aui-danger)_10%,var(--aui-page-bg-alt)),var(--aui-page-bg))] p-6 aui-text-strong">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className={`rounded-[36px] p-8 ${panelClassName}`}>
            <div className="flex h-[560px] items-center justify-center rounded-[28px] bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--aui-danger)_16%,transparent),transparent_35%),linear-gradient(180deg,var(--aui-page-bg),color-mix(in_oklch,var(--aui-danger)_8%,var(--aui-page-bg)))]">
              <div className="grid gap-6">
                <div className={`mx-auto h-72 w-56 rounded-[28px] ${panelClassName}`} />
                <div className="grid grid-cols-4 gap-3">
                  {new Array(4).fill(null).map((_, index) => (
                    <div key={index} className={`h-20 rounded-2xl ${panelClassName}`} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className={`space-y-6 rounded-[36px] p-8 ${panelClassName}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">In stock</Badge>
                <Badge variant="outline">Ships today</Badge>
              </div>
              <h1 className="text-5xl font-semibold tracking-tight">Azamat Chair</h1>
              <p className={`text-lg leading-8 ${mutedTextClassName}`}>A clean product detail surface with media gallery, pricing hierarchy and conversion controls.</p>
            </div>

            <div className={`rounded-[28px] p-6 ${cardClassName}`}>
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-sm ${mutedTextClassName}`}>Price</p>
                  <p className="mt-2 text-4xl font-semibold">$249</p>
                </div>
                <p className="text-sm text-emerald-600">Free shipping</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {["Oak", "Walnut", "Black"].map((item, index) => (
                <button key={item} className={index === 0 ? `rounded-2xl border px-4 py-3 text-sm ${strongSurfaceClassName}` : `rounded-2xl border border-[color:var(--aui-divider)] px-4 py-3 text-sm aui-text-subtle`}>{item}</button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 rounded-2xl">Add to cart</Button>
              <Button variant="outline" className="flex-1 rounded-2xl">Save</Button>
            </div>

            <div className="grid gap-3">
              {["Premium ash wood frame", "Textured linen seat", "Two-year warranty"].map((item) => (
                <div key={item} className="rounded-2xl border border-[color:var(--aui-divider)] px-4 py-3 text-sm aui-text-subtle">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (tone === "command") {
    return (
      <div className={pageSurfaceClassName}>
        <div className={`mx-auto max-w-4xl rounded-[36px] p-6 ${panelClassName}`}>
          <div className={`mx-auto max-w-3xl overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,var(--aui-page-bg),var(--aui-page-bg-alt))] ${panelClassName}`}>
            <div className="border-b border-[color:var(--aui-divider)] px-5 py-4">
              <Input defaultValue="Search components, blocks, templates..." className="border-0 px-0 text-base shadow-none focus-visible:ring-0" />
            </div>
            <div className="grid gap-6 p-5 md:grid-cols-2">
              <div>
                <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${mutedTextClassName}`}>Trending</p>
                <div className="space-y-2">
                  {["Button", "Input", "Card", "Dialog", "Data Table"].map((item, index) => (
                    <div key={item} className={index === 0 ? `flex items-center justify-between rounded-2xl px-4 py-3 text-sm ${strongSurfaceClassName}` : "flex items-center justify-between rounded-2xl px-4 py-3 text-sm aui-text-subtle"}>
                      <span>{item}</span>
                      <Badge variant={index === 0 ? "secondary" : "outline"}>{String.fromCharCode(66 + index)}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${mutedTextClassName}`}>Quick actions</p>
                <div className="space-y-2">
                  {["Open docs", "Preview template", "Copy install command", "Switch theme"].map((item) => (
                    <div key={item} className="rounded-2xl border border-[color:var(--aui-divider)] px-4 py-3 text-sm aui-text-subtle">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (tone === "calendar") {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,color-mix(in_oklch,var(--aui-accent)_10%,var(--aui-page-bg-alt)),var(--aui-page-bg))] p-6 aui-text-strong">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className={`rounded-[32px] p-6 ${panelClassName}`}>
            <h1 className="text-3xl font-semibold tracking-tight">June 2026</h1>
            <p className={`mt-2 text-sm leading-6 ${mutedTextClassName}`}>Calendar family preview with selected dates and scheduling context.</p>
            <div className="mt-5 grid grid-cols-7 gap-2 text-center text-sm">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", ...Array.from({ length: 35 }, (_, index) => `${index + 1}`)].map((item, index) => (
                <div key={`${item}-${index}`} className={index > 10 && index < 13 ? `rounded-2xl px-3 py-3 ${strongSurfaceClassName}` : "rounded-2xl border border-[color:var(--aui-divider)] px-3 py-3 aui-text-subtle"}>{item}</div>
              ))}
            </div>
          </section>
          <section className={`rounded-[32px] p-6 ${panelClassName}`}>
            <h2 className="text-2xl font-semibold tracking-tight">Schedule event</h2>
            <p className={`mt-2 text-sm leading-6 ${mutedTextClassName}`}>Pair calendar surfaces with summary cards and chosen range context.</p>
            <div className="mt-5 space-y-4">
              <div className={`rounded-[24px] p-5 ${cardClassName}`}>
                <p className={`text-sm ${mutedTextClassName}`}>Selected range</p>
                <p className="mt-2 text-2xl font-semibold">12 Jun - 18 Jun</p>
              </div>
              <div className="grid gap-3">
                {["Design review", "Prototype handoff", "Release QA"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-[color:var(--aui-divider)] px-4 py-3">
                    <span className="text-sm aui-text-subtle">{item}</span>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,color-mix(in_oklch,var(--aui-success)_8%,var(--aui-page-bg-alt)),var(--aui-page-bg))] p-6 aui-text-strong">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className={`rounded-[32px] p-6 ${panelClassName}`}>
          <h1 className="text-3xl font-semibold tracking-tight">Upload assets</h1>
          <p className={`mt-2 text-sm leading-6 ${mutedTextClassName}`}>Preview drag, status and asset-library patterns in one route.</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-dashed border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)]">
              <div className="space-y-3 text-center">
                <p className="text-lg font-semibold">Drop files here</p>
                <p className={`text-sm ${mutedTextClassName}`}>PNG, JPG, SVG, PDF up to 20MB</p>
                <Button className="rounded-2xl">Browse files</Button>
              </div>
            </div>
            <div className="space-y-3">
              {["Brand-guide.pdf", "hero-image.png", "avatar-collection.zip"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-[color:var(--aui-divider)] px-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium aui-text-strong">{item}</span>
                    <Badge variant={index === 2 ? "outline" : "secondary"}>{index === 2 ? "Uploading" : "Done"}</Badge>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[color:var(--aui-surface-muted)]">
                    <div className={index === 2 ? "h-2 w-2/3 rounded-full bg-[color:var(--aui-surface-strong)]" : "h-2 w-full rounded-full bg-emerald-500"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const previewBlockRegistry = Object.fromEntries(
  previewSurfaceCatalog.map((item) => [
    item.slug,
    {
      title: item.title,
      command: item.command,
      code: item.code,
      Render: function PreviewSurfaceRoute() {
        return <PreviewSurfaceRenderer tone={item.tone} />
      },
    },
  ])
) as Record<string, { title: string; command: string; code: string; Render: () => ReactElement }>

export function getComponentPreview(slug: string) {
  const demo = componentPreviewRegistry[slug]
  if (!demo) return null

  return {
    title: `${slug} preview`,
    command: `npx azamat-ui-kit-cli add ${slug}`,
    code: demo.mock.code,
    Render() {
      return (
        <div className={pageSurfaceClassName}>
          <div className={`mx-auto max-w-5xl space-y-6 rounded-[32px] p-6 ${panelClassName}`}>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${mutedTextClassName}`}>Component preview</span>
                <span className={`rounded-full border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${mutedTextClassName}`}>Playground route</span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight capitalize">{slug}</h1>
              <p className={`text-base leading-7 ${mutedTextClassName}`}>Direct component demo route for iframe-based docs preview.</p>
            </div>

            <div className="rounded-[28px] border border-[color:var(--aui-divider)] bg-[linear-gradient(180deg,var(--aui-page-bg),var(--aui-page-bg-alt))] p-6">
              <demo.Showcase mode="playground" state={defaultComponentDemoState} setState={() => undefined} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {demo.mock.highlights.map((item) => (
                <div key={item} className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-surface-muted)] p-4 text-sm aui-text-subtle">{item}</div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className={`rounded-[24px] p-4 ${cardClassName}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${mutedTextClassName}`}>CLI</p>
                <code className="mt-3 block text-sm aui-text-strong">{`npx azamat-ui-kit-cli add ${slug}`}</code>
              </div>
              <div className={`rounded-[24px] p-4 ${cardClassName}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${mutedTextClassName}`}>Preview note</p>
                <p className="mt-3 text-sm leading-6 aui-text-subtle">This route exists to inspect the live reusable surface in isolation before wiring it into docs, templates or application pages.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
  }
}
