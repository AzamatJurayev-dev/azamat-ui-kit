import * as React from "react"
import { ArrowRightIcon, ChevronDownIcon, CopyIcon, ExternalLinkIcon } from "lucide-react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Badge, Button, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import { primaryNav, templatePath } from "../site-data"
import { templateRecords } from "../template-data"
import { SectionLabel, SurfaceCard, TopNav } from "../site-shell"
import { CopyButton, PageFrame, useCopyFeedback } from "./site-primitives"
import { TemplateCanvas } from "./site-template-renderers"

export function SiteTemplateDetailPage() {
  const params = useParams<{ slug: string }>()
  const template = templateRecords.find((item) => item.slug === params.slug) ?? templateRecords[0]
  const [activeSection, setActiveSection] = React.useState(template.sections[0].key)
  const [notesOpen, setNotesOpen] = React.useState(true)
  const { copiedKey, onCopy } = useCopyFeedback()

  React.useEffect(() => {
    setActiveSection(template.sections[0].key)
  }, [template.slug])

  if (!params.slug) {
    return <Navigate to="/blocks" replace />
  }

  const currentSection = template.sections.find((item) => item.key === activeSection) ?? template.sections[0]
  const installSnippet = `npx azamat-ui@latest add button\n# template: ${template.slug}\n# route: ${templatePath(template.slug)}`

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <main className="mx-auto max-w-[1520px] px-6 py-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.32fr]">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Link to="/" className="transition hover:text-zinc-950">Home</Link>
              <ChevronDownIcon className="size-4 -rotate-90" />
              <Link to="/blocks" className="transition hover:text-zinc-950">Templates</Link>
              <ChevronDownIcon className="size-4 -rotate-90" />
              <span className="text-zinc-950">{template.title}</span>
            </div>

            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <SectionLabel>{template.eyebrow}</SectionLabel>
                <h1 className="mt-3 text-6xl font-semibold tracking-tight">{template.title}</h1>
                <p className="mt-4 max-w-3xl text-xl leading-9 text-zinc-600">{template.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/docs/components/button" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-2xl px-6")}>
                  Open docs
                </Link>
                <Link to="/playground/button" className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-6")}>
                  Open playground
                  <ArrowRightIcon className="ml-2 size-4" />
                </Link>
                <CopyButton label="Copy install" copied={copiedKey === "install"} onClick={() => void onCopy("install", installSnippet)} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {template.metrics.map((item) => (
                <SurfaceCard key={item.label} className="p-5">
                  <p className="text-sm text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</p>
                  <p className="mt-2 text-sm text-emerald-600">{item.delta}</p>
                </SurfaceCard>
              ))}
            </div>

            <SurfaceCard className="p-6">
              <div className="flex flex-wrap gap-3">
                {template.sections.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={cn(
                      "rounded-2xl border px-5 py-3 text-sm font-medium transition",
                      activeSection === item.key ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-600"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <TemplateCanvas template={template} section={currentSection} />
              </div>
            </SurfaceCard>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <SurfaceCard className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">Linked modules</h2>
                  <Badge variant="outline" className="rounded-full">Reusable</Badge>
                </div>
                <div className="space-y-3">
                  {template.modules.map((item) => (
                    <Link key={item.label} to={item.href} className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-4 transition hover:bg-zinc-50">
                      <span className="text-zinc-700">{item.label}</span>
                      <ExternalLinkIcon className="size-4 text-zinc-500" />
                    </Link>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">Template notes</h2>
                  <Button variant="outline" className="rounded-2xl" onClick={() => setNotesOpen((current) => !current)}>
                    {notesOpen ? "Hide" : "Show"}
                  </Button>
                </div>
                {notesOpen ? (
                  <div className="space-y-4 text-base leading-7 text-zinc-600">
                    {template.notes.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">Notes are hidden.</p>
                )}
              </SurfaceCard>
            </div>
          </div>

          <aside className="space-y-6">
            <SurfaceCard className="p-5">
              <SectionLabel>Navigate</SectionLabel>
              <div className="mt-4 space-y-2">
                {template.sections.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition",
                      activeSection === item.key ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    {item.label}
                    <ArrowRightIcon className="size-4" />
                  </button>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <SectionLabel>Quick actions</SectionLabel>
              <div className="mt-4 space-y-3">
                <Link to="/blocks" className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-2xl justify-between")}>
                  All templates
                  <ArrowRightIcon className="size-4" />
                </Link>
                <Link to="/playground/button" className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-2xl justify-between")}>
                  Inspect button
                  <ArrowRightIcon className="size-4" />
                </Link>
                <button
                  onClick={() => void onCopy("jsx", `<TemplatePreview slug="${template.slug}" section="${activeSection}" />`)}
                  className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50"
                >
                  {copiedKey === "jsx" ? "Copied JSX" : "Copy JSX"}
                  <CopyIcon className="size-4" />
                </button>
              </div>
            </SurfaceCard>
          </aside>
        </div>
      </main>
    </PageFrame>
  )
}
