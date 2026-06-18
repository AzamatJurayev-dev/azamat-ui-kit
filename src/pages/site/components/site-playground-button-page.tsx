import * as React from "react"
import { ChevronDownIcon, ExternalLinkIcon, StarIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge, Button, buttonVariants } from "@/index"
import { cn } from "@/lib/utils"

import { accessibilityChecks, inspectorChecks, playgroundSidebar, primaryNav } from "../site-data"
import { SectionLabel, Sidebar, SurfaceCard, TopNav } from "../site-shell"
import {
  buildPlaygroundCode,
  defaultPlaygroundState,
  DevicePreviewFrame,
  type DeviceMode,
  iconModeFromLabel,
  InspectorControl,
  InspectorRow,
  PageFrame,
  PassBadge,
  PreviewButton,
  type ButtonIntent,
  type ButtonSize,
  type ButtonState,
  type ButtonVariant,
  type CodeTab,
  type FrameworkTab,
  type PlaygroundState,
  toTitle,
  useCopyFeedback,
} from "./site-primitives"

export function SitePlaygroundButtonPage() {
  const [playgroundState, setPlaygroundState] = React.useState<PlaygroundState>(defaultPlaygroundState)
  const [codeTab, setCodeTab] = React.useState<CodeTab>("TSX")
  const [framework, setFramework] = React.useState<FrameworkTab>("React")
  const [previewDevice, setPreviewDevice] = React.useState<DeviceMode>("desktop")
  const { copiedKey, onCopy } = useCopyFeedback()

  const updateState = <K extends keyof PlaygroundState>(key: K, value: PlaygroundState[K]) => {
    setPlaygroundState((current) => ({ ...current, [key]: value }))
  }

  const currentCode = buildPlaygroundCode(playgroundState, codeTab, framework)

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <div className="mx-auto flex max-w-[1680px]">
        <Sidebar title="Search components..." description="" groups={playgroundSidebar} />

        <main className="min-w-0 flex-1 border-r border-zinc-200/80 px-10 py-8">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Link to="/blocks" className="transition hover:text-zinc-950">Components</Link>
              <ChevronDownIcon className="size-4 -rotate-90" />
              <span className="text-zinc-950">Button</span>
            </div>

            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-5xl font-semibold tracking-tight">Button Playground</h1>
                <p className="mt-3 max-w-3xl text-xl leading-9 text-zinc-600">
                  Build delightful, accessible and performant buttons. Customize every detail and copy production-ready code.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-2xl"><StarIcon className="mr-2 size-4" />1.2k</Button>
                <Button variant="outline" className="rounded-2xl"><ExternalLinkIcon className="mr-2 size-4" />Share</Button>
                <Link to="/docs/components/button" className={cn(buttonVariants({ variant: "outline" }), "rounded-2xl")}>
                  Docs
                  <ChevronDownIcon className="ml-2 size-4" />
                </Link>
              </div>
            </div>

            <SurfaceCard className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-3xl font-semibold tracking-tight">Live Preview</h2>
                <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Live</Badge>
              </div>
              <div className="space-y-8">
                <InspectorRow label="Variants" items={["Primary", "Secondary", "Outline", "Ghost", "Link", "Destructive", "Warning"]} active={toTitle(playgroundState.variant)} onSelect={(value) => updateState("variant", value.toLowerCase() as ButtonVariant)} />
                <InspectorRow label="Sizes" items={["xs", "sm", "md", "lg", "xl", "2xl"]} active={playgroundState.size} onSelect={(value) => updateState("size", value as ButtonSize)} />
                <InspectorRow label="With Icon" items={["Left Icon", "Right Icon", "Icon Only", "Download", "Settings"]} active={toTitle(playgroundState.iconMode).replace("-", " ")} onSelect={(value) => updateState("iconMode", iconModeFromLabel(value))} />
                <InspectorRow
                  label="States"
                  items={["Default", "Hover", "Active", "Focus", "Disabled", "Loading"]}
                  active={toTitle(playgroundState.state)}
                  onSelect={(value) => {
                    const next = value.toLowerCase() as ButtonState
                    updateState("state", next)
                    updateState("disabled", next === "disabled")
                    updateState("loading", next === "loading")
                  }}
                />
              </div>

              <div className="mt-8">
                <DevicePreviewFrame
                  title="Interactive viewport preview"
                  description="Bir xil komponentni turli device container ichida jonli sinab ko‘ring."
                  device={previewDevice}
                  onDeviceChange={setPreviewDevice}
                >
                  <div className={cn("space-y-5 rounded-[24px] border p-5 transition", playgroundState.theme === "dark" ? "border-zinc-800 bg-zinc-950 text-white" : "border-zinc-200 bg-white")}>
                    <div className="flex flex-wrap items-center gap-3">
                      <PreviewButton playgroundState={playgroundState} />
                      <PreviewButton playgroundState={{ ...playgroundState, variant: "secondary", fullWidth: false }} label="Secondary" />
                      <PreviewButton playgroundState={{ ...playgroundState, variant: "outline", iconMode: "right", fullWidth: false }} label="Details" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className={cn("rounded-[20px] border p-4", playgroundState.theme === "dark" ? "border-zinc-800 bg-white/5" : "border-zinc-200 bg-zinc-50")}>
                        <SectionLabel>INSTALL</SectionLabel>
                        <code className="mt-3 block text-sm leading-7">npx azamat-ui add button</code>
                      </div>
                      <div className={cn("rounded-[20px] border p-4", playgroundState.theme === "dark" ? "border-zinc-800 bg-white/5" : "border-zinc-200 bg-zinc-50")}>
                        <SectionLabel>LIBRARY</SectionLabel>
                        <p className="mt-3 text-sm leading-7 text-zinc-500 dark:text-zinc-300">React Router, Tailwind CSS, TypeScript va token-based button variants.</p>
                      </div>
                    </div>
                    <PreviewButton playgroundState={{ ...playgroundState, fullWidth: true }} className="w-full" label="Stretch action" />
                  </div>
                </DevicePreviewFrame>
              </div>
            </SurfaceCard>

            <SurfaceCard className="overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
                <div className="flex gap-6 text-sm">
                  {(["TSX", "HTML", "CSS", "CLI"] as CodeTab[]).map((tab) => (
                    <button key={tab} onClick={() => setCodeTab(tab)} className={cn("border-b-2 pb-3", codeTab === tab ? "border-zinc-950 text-zinc-950" : "border-transparent text-zinc-500")}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFramework((current) => (current === "React" ? "Next.js" : current === "Next.js" ? "Vite" : "React"))}
                    className="rounded-xl border border-zinc-200 px-4 py-2 text-sm"
                  >
                    {framework}
                  </button>
                  <Button className="rounded-xl" onClick={() => void onCopy("code", currentCode)}>
                    {copiedKey === "code" ? "Copied" : "Copy code"}
                  </Button>
                </div>
              </div>
              <pre className="overflow-x-auto px-6 py-5 text-sm leading-8 text-zinc-700">{currentCode}</pre>
            </SurfaceCard>
          </div>
        </main>

        <aside className="w-[390px] shrink-0 px-6 py-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight">Inspector</h2>
              <Button variant="outline" className="rounded-2xl" onClick={() => setPlaygroundState(defaultPlaygroundState)}>Reset</Button>
            </div>

            <SurfaceCard className="p-5">
              <InspectorControl title="Variant" options={["Primary", "Secondary", "Outline", "Ghost", "Destructive", "Warning", "Link"]} active={toTitle(playgroundState.variant)} onSelect={(value) => updateState("variant", value.toLowerCase() as ButtonVariant)} />
              <InspectorControl title="Size" options={["xs", "sm", "md", "lg", "xl", "2xl"]} active={playgroundState.size} onSelect={(value) => updateState("size", value as ButtonSize)} />
              <div>
                <SectionLabel>Radius</SectionLabel>
                <div className="mt-4">
                  <input type="range" min={0} max={32} step={4} value={playgroundState.radius} onChange={(event) => updateState("radius", Number(event.target.value))} className="w-full accent-zinc-950" />
                  <div className="mt-2 flex justify-between text-sm text-zinc-500">
                    {["0", "4", "8", "12", "16", "24", "32"].map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              <InspectorControl title="Icon" options={["Sparkles", "Left", "Right"]} active={playgroundState.iconName} onSelect={(value) => updateState("iconName", value as PlaygroundState["iconName"])} />
              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  onClick={() => {
                    updateState("loading", !playgroundState.loading)
                    updateState("state", !playgroundState.loading ? "loading" : "default")
                  }}
                  className={cn("rounded-2xl border px-4 py-3 text-sm", playgroundState.loading ? "bg-zinc-950 text-white" : "border-zinc-200 text-zinc-600")}
                >
                  Loading
                </button>
                <button
                  onClick={() => {
                    updateState("disabled", !playgroundState.disabled)
                    updateState("state", !playgroundState.disabled ? "disabled" : "default")
                  }}
                  className={cn("rounded-2xl border px-4 py-3 text-sm", playgroundState.disabled ? "bg-zinc-950 text-white" : "border-zinc-200 text-zinc-600")}
                >
                  Disabled
                </button>
                <button onClick={() => updateState("fullWidth", !playgroundState.fullWidth)} className={cn("rounded-2xl border px-4 py-3 text-sm", playgroundState.fullWidth ? "bg-zinc-950 text-white" : "border-zinc-200 text-zinc-600")}>
                  Full width
                </button>
              </div>
              <InspectorControl title="Intent" options={["Default", "Success", "Warning", "Danger"]} active={toTitle(playgroundState.intent)} onSelect={(value) => updateState("intent", value.toLowerCase() as ButtonIntent)} />
              <InspectorControl title="Theme" options={["Light", "Dark"]} active={toTitle(playgroundState.theme)} onSelect={(value) => updateState("theme", value.toLowerCase() as PlaygroundState["theme"])} />
              <div className={cn("rounded-[24px] border p-4", playgroundState.theme === "dark" ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-zinc-50")}>
                <PreviewButton playgroundState={playgroundState} className={playgroundState.fullWidth ? "w-full" : ""} />
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-5">
              <h3 className="text-xl font-semibold">Keyboard & Focus</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  {["Button", "Button", "Button", "Button"].map((item, index) => (
                    <span key={`${item}-${index}`} className={cn("rounded-xl border px-4 py-2 text-sm", index === 1 && "border-amber-400 text-zinc-950")}>{item}</span>
                  ))}
                </div>
                <div className="space-y-2">
                  {inspectorChecks.map((item) => (
                    <div key={item} className="flex items-center justify-between text-sm text-zinc-600">
                      <span>{item}</span>
                      <PassBadge />
                    </div>
                  ))}
                </div>
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
          </div>
        </aside>
      </div>
    </PageFrame>
  )
}
