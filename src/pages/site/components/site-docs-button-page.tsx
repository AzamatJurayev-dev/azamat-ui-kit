import * as React from "react"
import { CheckIcon, ChevronDownIcon, MinusIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge, Button } from "@/index"
import { cn } from "@/lib/utils"

import { docsSidebar, installCommand, primaryNav, propRows, tocItems } from "../site-data"
import { SectionLabel, Sidebar, SurfaceCard, TopNav } from "../site-shell"
import {
  buttonLabelFromState,
  CopyButton,
  defaultPlaygroundState,
  DevicePreviewFrame,
  type DeviceMode,
  MonitorIconMini,
  MoonIconMini,
  PageFrame,
  PreviewButton,
  type ButtonIntent,
  type ButtonSize,
  type ButtonState,
  type ButtonVariant,
  type IconMode,
  type PreviewTab,
  SunIconMini,
  useCopyFeedback,
  VariantSelector,
} from "./site-primitives"

export function SiteDocsButtonPage() {
  const [previewTab, setPreviewTab] = React.useState<PreviewTab>("preview")
  const [docsVariant, setDocsVariant] = React.useState<ButtonVariant>("primary")
  const [docsSize, setDocsSize] = React.useState<ButtonSize>("md")
  const [docsState, setDocsState] = React.useState<ButtonState>("default")
  const [docsIconMode, setDocsIconMode] = React.useState<IconMode>("download")
  const [docsFrame, setDocsFrame] = React.useState<"light" | "dark" | "system">("light")
  const [previewDevice, setPreviewDevice] = React.useState<DeviceMode>("desktop")
  const [helpful, setHelpful] = React.useState<"up" | "down" | null>(null)
  const { copiedKey, onCopy } = useCopyFeedback()

  const docsPreviewState = {
    ...defaultPlaygroundState,
    variant: docsVariant,
    size: docsSize,
    state: docsState,
    iconMode: docsIconMode,
    intent: (docsVariant === "warning" ? "warning" : docsVariant === "destructive" ? "danger" : "default") as ButtonIntent,
  }

  const docsCode = `import { Button } from "@azamat/ui"\n\nexport function Example() {\n  return (\n    <Button variant="${docsVariant}" size="${docsSize}" state="${docsState}">\n      ${buttonLabelFromState(docsPreviewState)}\n    </Button>\n  )\n}`

  return (
    <PageFrame>
      <TopNav items={primaryNav} />
      <div className="mx-auto flex max-w-[1680px]">
        <Sidebar title="Azamat UI" description="A modern React component library built with TypeScript and Tailwind CSS." groups={docsSidebar} />

        <main className="min-w-0 flex-1 px-12 py-10">
          <div className="grid gap-10 xl:grid-cols-[1fr_0.22fr]">
            <div className="space-y-10">
              <div className="grid gap-8 xl:grid-cols-[1fr_0.55fr]">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 text-sm text-zinc-500">
                    <Link to="/" className="transition hover:text-zinc-950">Docs</Link>
                    <ChevronDownIcon className="size-4 -rotate-90" />
                    <Link to="/blocks" className="transition hover:text-zinc-950">Components</Link>
                    <ChevronDownIcon className="size-4 -rotate-90" />
                    <span className="text-zinc-950">Button</span>
                  </div>
                  <Badge variant="outline" className="rounded-full">COMPONENT</Badge>
                  <div>
                    <h1 className="text-6xl font-semibold tracking-tight">Button</h1>
                    <p className="mt-4 max-w-xl text-xl leading-9 text-zinc-600">
                      A versatile button component for actions in your interface with multiple variants, sizes, and states.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
                    <span className="flex items-center gap-2"><CheckIcon className="size-4 text-emerald-600" />Stable</span>
                    <span>11 variants</span>
                    <span>TypeScript</span>
                  </div>
                </div>

                <SurfaceCard className="bg-zinc-950 p-5 text-zinc-100">
                  <SectionLabel>INSTALL</SectionLabel>
                  <div className="mt-5 rounded-[22px] border border-white/10 bg-black/30 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-zinc-400">shadcn CLI</span>
                      <CopyButton label="Copy" copied={copiedKey === "install"} onClick={() => void onCopy("install", installCommand)} dark />
                    </div>
                    <code className="block rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200">{installCommand}</code>
                  </div>
                  <button onClick={() => setPreviewTab("code")} className="mt-4 text-sm text-zinc-400 transition hover:text-amber-400">
                    or copy the component <span className="text-amber-400">manually</span>.
                  </button>
                </SurfaceCard>
              </div>

              <SurfaceCard className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-6 border-b border-zinc-200 pb-4">
                    {(["preview", "code", "api"] as PreviewTab[]).map((item) => (
                      <button
                        key={item}
                        onClick={() => setPreviewTab(item)}
                        className={cn("border-b-2 pb-4 text-sm font-medium capitalize", previewTab === item ? "border-amber-500 text-zinc-950" : "border-transparent text-zinc-500")}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon-sm" className={cn("rounded-xl", docsFrame === "light" && "bg-zinc-100")} onClick={() => setDocsFrame("light")}><SunIconMini /></Button>
                    <Button variant="ghost" size="icon-sm" className={cn("rounded-xl", docsFrame === "dark" && "bg-zinc-100")} onClick={() => setDocsFrame("dark")}><MoonIconMini /></Button>
                    <Button variant="ghost" size="icon-sm" className={cn("rounded-xl", docsFrame === "system" && "bg-zinc-100")} onClick={() => setDocsFrame("system")}><MonitorIconMini /></Button>
                  </div>
                </div>

                {previewTab === "preview" ? (
                  <div className="space-y-7">
                    <div className={cn("grid gap-7 rounded-[28px] p-3 lg:grid-cols-[1fr_0.55fr]", docsFrame === "dark" ? "bg-zinc-950 text-white" : "bg-white")}>
                      <div className="space-y-7">
                        <VariantSelector label="VARIANTS" items={["primary", "secondary", "outline", "ghost", "destructive", "warning"]} active={docsVariant} onSelect={(value) => setDocsVariant(value as ButtonVariant)} />
                        <VariantSelector label="SIZES" items={["xs", "sm", "md", "lg", "xl"]} active={docsSize} onSelect={(value) => setDocsSize(value as ButtonSize)} />
                        <VariantSelector label="STATES" items={["default", "hover", "active", "focus", "disabled"]} active={docsState} onSelect={(value) => setDocsState(value as ButtonState)} />
                      </div>
                      <div className="space-y-7">
                        <VariantSelector label="WITH ICON" items={["download", "left", "right", "icon-only"]} active={docsIconMode} onSelect={(value) => setDocsIconMode(value as IconMode)} />
                        <div>
                          <SectionLabel>BLOCK BUTTON</SectionLabel>
                          <div className="mt-4">
                            <PreviewButton playgroundState={{ ...docsPreviewState, fullWidth: true }} className="w-full" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <DevicePreviewFrame
                      title="Responsive component preview"
                      description="Desktop, tablet va mobile holatda jonli ko‘rinishni almashtiring."
                      device={previewDevice}
                      onDeviceChange={setPreviewDevice}
                    >
                      <div className={cn("space-y-5 rounded-[24px] border p-5 transition", docsFrame === "dark" ? "border-zinc-800 bg-zinc-950 text-white" : "border-zinc-200 bg-white")}>
                        <div className="flex flex-wrap items-center gap-3">
                          <PreviewButton playgroundState={docsPreviewState} />
                          <PreviewButton playgroundState={{ ...docsPreviewState, variant: "secondary", iconMode: "left" }} label="Secondary" />
                          <PreviewButton playgroundState={{ ...docsPreviewState, variant: "outline", iconMode: "right" }} label="Outline" />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className={cn("rounded-[20px] border p-4", docsFrame === "dark" ? "border-zinc-800 bg-white/5" : "border-zinc-200 bg-zinc-50")}>
                            <SectionLabel>INSTALL</SectionLabel>
                            <code className="mt-3 block text-sm leading-7">{installCommand}</code>
                          </div>
                          <div className={cn("rounded-[20px] border p-4", docsFrame === "dark" ? "border-zinc-800 bg-white/5" : "border-zinc-200 bg-zinc-50")}>
                            <SectionLabel>USAGE</SectionLabel>
                            <pre className="mt-3 overflow-x-auto text-sm leading-7">{docsCode}</pre>
                          </div>
                        </div>
                        <PreviewButton playgroundState={{ ...docsPreviewState, fullWidth: true }} className="w-full" label="Full width button" />
                      </div>
                    </DevicePreviewFrame>
                  </div>
                ) : null}

                {previewTab === "code" ? <pre className="overflow-x-auto rounded-[28px] bg-zinc-950 px-6 py-5 text-sm leading-8 text-zinc-100">{docsCode}</pre> : null}

                {previewTab === "api" ? (
                  <div className="overflow-x-auto rounded-[28px] border border-zinc-200">
                    <table className="min-w-full text-sm">
                      <thead className="text-left text-zinc-500">
                        <tr>
                          {["Name", "Type", "Default", "Description"].map((head) => (
                            <th key={head} className="px-4 py-3 font-medium">{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {propRows.map((row) => (
                          <tr key={row[0]} className="border-t border-zinc-100">
                            {row.map((cell) => (
                              <td key={cell} className="px-4 py-4 align-top text-zinc-600">{cell}</td>
                            ))}
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
                  {tocItems.map((item, index) => (
                    <div key={item} className={cn("text-base", index === (previewTab === "code" ? 7 : previewTab === "api" ? 8 : 0) ? "text-zinc-950" : "text-zinc-500")}>{item}</div>
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
            </aside>
          </div>
        </main>
      </div>
    </PageFrame>
  )
}
