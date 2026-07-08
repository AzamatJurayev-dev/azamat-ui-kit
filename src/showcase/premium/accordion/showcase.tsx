import * as React from "react"

import { Accordion, Badge } from "@/index"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

const docsItems = [
  {
    key: "tokens",
    title: "Theme tokens stay in one place",
    description: "Radius, color and shadow should not be redefined per route.",
    content: "Use shared CSS tokens so consumers can adapt the system without fighting deeply nested component styles.",
  },
  {
    key: "surface",
    title: "One canonical public surface",
    description: "Teach one entry point before helper members.",
    content: "Start with Input, Select, DataTable, Card and Badge. Move aliases and advanced members lower in the docs hierarchy.",
  },
  {
    key: "demo",
    title: "Real demos beat placeholder previews",
    description: "Each route should prove the actual component behavior.",
    content: "A docs page should show the real installed component with interactive state, not a generic substitute card.",
  },
] as const

const releaseItems = [
  {
    key: "docs",
    title: "Docs updated",
    description: "Public route and CLI snippet verified",
    content: "Component detail page, API notes, and install snippet were reviewed together before release.",
  },
  {
    key: "tokens",
    title: "Visual tokens synced",
    description: "No stray radius, border, or surface overrides",
    content: "The route uses package tokens directly so the result matches what consumers install.",
  },
  {
    key: "qa",
    title: "QA preview checked",
    description: "Build and interactive preview passed",
    content: "The component was verified with type-check and production build before push.",
  },
] as const

export function AccordionShowcase() {
  const [singleValue, setSingleValue] = React.useState<string | string[]>("surface")
  const [multiValue, setMultiValue] = React.useState<string | string[]>(["docs"])
  const [variant, setVariant] = React.useState<"default" | "soft" | "ghost">("soft")

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed primitive</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Accordion keeps dense guidance readable</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 aui-text-muted">
          This route uses the exported accordion surface directly. The page adds only spacing and explanation around it.
        </p>
      </section>

      <section className={panelClass}>
        <div className="mb-5 flex flex-wrap gap-2">
          {(["soft", "default", "ghost"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${variant === item ? "border-primary bg-primary/10 text-foreground" : "border-[color:var(--aui-divider)] text-muted-foreground"}`}
              onClick={() => setVariant(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Documentation flow</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              Single-open mode keeps the user focused on one explanation at a time.
            </p>
            <Accordion className="mt-5" type="single" variant={variant} size="lg" value={singleValue} onValueChange={setSingleValue} items={[...docsItems]} />
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold aui-text-strong">Current open item</p>
                <p className="mt-1 text-xs aui-text-muted">Controlled state mirrors route-level docs navigation.</p>
              </div>
              <Badge variant="secondary">{Array.isArray(singleValue) ? singleValue.join(", ") : singleValue || "none"}</Badge>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Use this mode on component detail pages, FAQs, or policy explanations where only one answer should dominate the layout.</p>
              <p>The trigger keeps title and helper description together, so content stays understandable even before expansion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-lg font-semibold aui-text-strong">Operational checklist</p>
            <p className="mt-2 max-w-xl text-sm leading-6 aui-text-muted">
              Multiple-open mode works better when teams compare several readiness items together.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(Array.isArray(multiValue) ? multiValue : []).map((item) => (
                <Badge key={item} variant="outline">{item}</Badge>
              ))}
            </div>
          </div>

          <Accordion className="xl:mt-8" type="multiple" variant={variant} value={multiValue} onValueChange={setMultiValue} items={[...releaseItems]} />
        </div>
      </section>
    </div>
  )
}
