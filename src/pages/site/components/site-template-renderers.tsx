import { Badge } from "@/index"
import { cn } from "@/lib/utils"

import type { BlockCard, TemplatePreviewTone, TemplateRecord, TemplateSection } from "../site-data"

function toneBackground(tone: TemplatePreviewTone) {
  switch (tone) {
    case "crm":
      return "bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_35%),linear-gradient(180deg,#fff,#f8fafc)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.94),rgba(24,24,27,0.98))]"
    case "auth":
      return "bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_35%),linear-gradient(180deg,#fff,#fff7ed)] dark:bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.94),rgba(24,24,27,0.98))]"
    case "table":
      return "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_35%),linear-gradient(180deg,#fff,#eff6ff)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.94),rgba(24,24,27,0.98))]"
    case "pricing":
      return "bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_35%),linear-gradient(180deg,#fff,#fff7ed)] dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.94),rgba(24,24,27,0.98))]"
    case "settings":
      return "bg-[radial-gradient(circle_at_top_left,rgba(113,113,122,0.16),transparent_35%),linear-gradient(180deg,#fff,#fafaf9)] dark:bg-[radial-gradient(circle_at_top_left,rgba(161,161,170,0.12),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.94),rgba(24,24,27,0.98))]"
    case "product":
      return "bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.14),transparent_35%),linear-gradient(180deg,#fff,#fff1f2)] dark:bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.14),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.94),rgba(24,24,27,0.98))]"
    default:
      return "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_35%),linear-gradient(180deg,#fff,#f8fafc)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.94),rgba(24,24,27,0.98))]"
  }
}

function navActiveBackground(tone: TemplatePreviewTone) {
  switch (tone) {
    case "crm":
      return "bg-sky-500 text-white"
    case "auth":
      return "bg-amber-500 text-zinc-950"
    case "table":
      return "bg-blue-600 text-white"
    case "pricing":
      return "bg-orange-500 text-white"
    case "settings":
      return "bg-zinc-800 text-white"
    case "product":
      return "bg-rose-500 text-white"
    default:
      return "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
  }
}

function supportStatusTone(tone: TemplatePreviewTone) {
  switch (tone) {
    case "crm":
      return "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
    case "auth":
    case "pricing":
      return "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
    case "product":
      return "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
    default:
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
  }
}

export function TemplateCardPreview({ tone }: { tone: BlockCard["previewTone"] }) {
  return (
    <div className={cn("mb-4 h-44 rounded-[22px] border border-zinc-200/70 p-4 dark:border-white/10", toneBackground(tone))}>
      <div className="grid h-full gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className={cn("h-8 rounded-xl shadow-sm", navActiveBackground(tone))} />
          <div className="h-8 rounded-xl bg-white/80 shadow-sm dark:bg-white/8" />
          <div className="h-8 rounded-xl bg-white/80 shadow-sm dark:bg-white/8" />
        </div>
        <div className="grid flex-1 gap-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/90 shadow-sm dark:bg-white/10" />
            <div className="rounded-2xl bg-white/85 shadow-sm dark:bg-white/10" />
            <div className="rounded-2xl bg-white/85 shadow-sm dark:bg-white/10" />
          </div>
          <div className="grid flex-1 grid-cols-[1.1fr_0.7fr] gap-3">
            <div className="rounded-2xl bg-white/85 shadow-sm dark:bg-white/10" />
            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/85 shadow-sm dark:bg-white/10" />
              <div className="rounded-2xl bg-white/85 shadow-sm dark:bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TemplateHeroPreview({ template }: { template: TemplateRecord }) {
  return (
    <div className={cn("rounded-[24px] border border-zinc-200/70 p-5 dark:border-white/10", toneBackground(template.previewTone))}>
      <div className="mb-4 flex items-center justify-between">
        <Badge variant="outline" className="rounded-full bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200">Azamat UI</Badge>
        <Badge className={cn("rounded-full", supportStatusTone(template.previewTone))}>{template.status}</Badge>
      </div>
      <div className="grid gap-4 rounded-[22px] border border-white/70 bg-white/90 p-5 shadow-xl dark:border-white/10 dark:bg-zinc-950/60 lg:grid-cols-[0.28fr_1fr]">
        <div className="space-y-3 rounded-[18px] bg-zinc-50 p-4 text-sm text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
          {template.navItems.map((item, index) => (
            <div key={item} className={cn("rounded-xl px-3 py-2", index === 0 ? navActiveBackground(template.previewTone) : "bg-white text-zinc-600 shadow-sm dark:bg-white/5 dark:text-zinc-300")}>
              {item}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            {template.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-300">{metric.delta}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_0.42fr]">
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-medium">Primary surface</p>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{template.sections[0].label}</span>
              </div>
              <div className="h-40 rounded-2xl bg-[linear-gradient(180deg,rgba(59,130,246,0.12),transparent),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.18),transparent_40%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_45%)]" />
            </div>
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <p className="mb-4 font-medium">Coverage</p>
              <div className="space-y-3 text-sm">
                {template.sections[0].bullets.map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <span>{item}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">Ready</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TemplateCanvas({
  template,
  section,
}: {
  template: TemplateRecord
  section: TemplateSection
}) {
  return (
    <div className={cn("rounded-[28px] border border-zinc-200 p-5 dark:border-white/10", toneBackground(template.previewTone))}>
      <div className="grid gap-5 xl:grid-cols-[0.26fr_1fr]">
        <div className="space-y-3 rounded-[22px] border border-zinc-200 bg-white/85 p-4 dark:border-white/10 dark:bg-zinc-950/55">
          {template.sections.map((item, index) => (
            <div
              key={item.key}
              className={cn(
                "rounded-2xl px-3 py-2.5 text-sm",
                item.key === section.key
                  ? navActiveBackground(template.previewTone)
                  : index === 0
                    ? "bg-zinc-50 text-zinc-700 dark:bg-white/5 dark:text-zinc-300"
                    : "bg-white text-zinc-600 dark:bg-white/5 dark:text-zinc-400"
              )}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_0.34fr]">
            <div className="rounded-[22px] border border-zinc-200 bg-white/90 p-5 dark:border-white/10 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold">{section.title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{section.description}</p>
                </div>
                <Badge className={cn("rounded-full", supportStatusTone(template.previewTone))}>{template.status}</Badge>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {section.statCards.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/5">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</p>
                    <p className="mt-2 text-xl font-semibold">{item.value}</p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{item.meta}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-40 rounded-2xl bg-[linear-gradient(180deg,rgba(59,130,246,0.12),transparent),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.18),transparent_40%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_45%)]" />
            </div>

            <div className="rounded-[22px] border border-zinc-200 bg-white/90 p-5 dark:border-white/10 dark:bg-zinc-950/60">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">Contains</p>
              <div className="mt-4 space-y-3">
                {section.bullets.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className={cn("size-2 rounded-full", template.previewTone === "crm" ? "bg-sky-500" : template.previewTone === "product" ? "bg-rose-500" : "bg-emerald-500")} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {section.supportCards.map((card) => (
              <div key={card.title} className="rounded-[22px] border border-zinc-200 bg-white/90 p-4 dark:border-white/10 dark:bg-zinc-950/60">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-zinc-950 dark:text-white">{card.title}</p>
                  <Badge className={cn("rounded-full", supportStatusTone(template.previewTone))}>{card.status}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
