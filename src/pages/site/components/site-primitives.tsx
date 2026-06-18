import * as React from "react"
import { ArrowRightIcon, HeartIcon, LaptopMinimalIcon, SearchIcon, Settings2Icon, SmartphoneIcon, SparklesIcon, TabletSmartphoneIcon } from "lucide-react"

import { Badge, Button } from "@/index"
import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "warning"
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ButtonState = "default" | "hover" | "active" | "focus" | "disabled" | "loading"
export type ButtonIntent = "default" | "success" | "warning" | "danger"
export type IconMode = "left" | "right" | "icon-only" | "download" | "settings"
export type PreviewTab = "preview" | "code" | "api"
export type CodeTab = "TSX" | "HTML" | "CSS" | "CLI"
export type FrameworkTab = "React" | "Next.js" | "Vite"
export type DeviceMode = "desktop" | "tablet" | "mobile"

export type PlaygroundState = {
  variant: ButtonVariant
  size: ButtonSize
  state: ButtonState
  intent: ButtonIntent
  iconMode: IconMode
  iconName: "Sparkles" | "Left" | "Right"
  radius: number
  theme: "light" | "dark"
  loading: boolean
  disabled: boolean
  fullWidth: boolean
}

export const defaultPlaygroundState: PlaygroundState = {
  variant: "primary",
  size: "md",
  state: "default",
  intent: "default",
  iconMode: "left",
  iconName: "Sparkles",
  radius: 8,
  theme: "light",
  loading: false,
  disabled: false,
  fullWidth: false,
}

export const deviceModes: DeviceMode[] = ["desktop", "tablet", "mobile"]

function deviceLabel(item: DeviceMode) {
  if (item === "desktop") return "Desktop"
  if (item === "tablet") return "Tablet"
  return "Mobile"
}

function deviceIcon(item: DeviceMode) {
  if (item === "desktop") return <LaptopMinimalIcon className="size-4" />
  if (item === "tablet") return <TabletSmartphoneIcon className="size-4" />
  return <SmartphoneIcon className="size-4" />
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff_0%,#fff_50%,#fafaf9_100%)] text-zinc-950 dark:bg-[radial-gradient(circle_at_top,rgba(39,39,42,0.98)_0%,rgba(9,9,11,1)_65%,rgba(3,7,18,1)_100%)] dark:text-white">{children}</div>
}

export function useCopyFeedback() {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)

  const onCopy = React.useCallback(async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current))
      }, 1400)
    } catch {
      setCopiedKey(null)
    }
  }, [])

  return { copiedKey, onCopy }
}

export function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ").trim()
}

export function toTitle(value: string) {
  return value
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ")
}

export function iconModeFromLabel(value: string): IconMode {
  if (value === "Left Icon") return "left"
  if (value === "Right Icon") return "right"
  if (value === "Icon Only") return "icon-only"
  if (value === "Download") return "download"
  return "settings"
}

function sizeClasses(size: ButtonSize) {
  switch (size) {
    case "xs":
      return "px-3 py-1.5 text-xs"
    case "sm":
      return "px-4 py-2 text-sm"
    case "md":
      return "px-5 py-3 text-sm"
    case "lg":
      return "px-6 py-3.5 text-base"
    case "xl":
      return "px-7 py-4 text-base"
    case "2xl":
      return "px-8 py-[18px] text-lg"
  }
}

function radiusClass(radius: number) {
  if (radius <= 4) return "rounded-lg"
  if (radius <= 8) return "rounded-xl"
  if (radius <= 12) return "rounded-2xl"
  if (radius <= 16) return "rounded-[18px]"
  if (radius <= 24) return "rounded-[22px]"
  return "rounded-[28px]"
}

function variantClasses(variant: ButtonVariant, intent: ButtonIntent) {
  if (variant === "primary") {
    if (intent === "success") return "bg-emerald-600 text-white border-emerald-600"
    if (intent === "warning") return "bg-amber-500 text-zinc-950 border-amber-500"
    if (intent === "danger") return "bg-red-500 text-white border-red-500"
    return "bg-zinc-950 text-white border-zinc-950"
  }
  if (variant === "secondary") return "bg-zinc-100 text-zinc-950 border-zinc-100"
  if (variant === "outline") return "bg-white text-zinc-950 border-zinc-200"
  if (variant === "ghost") return "bg-transparent text-zinc-700 border-transparent"
  if (variant === "link") return "bg-transparent text-zinc-950 border-transparent underline-offset-4 hover:underline"
  if (variant === "destructive") return "bg-red-500 text-white border-red-500"
  return "bg-white text-amber-700 border-amber-300"
}

function stateClasses(state: ButtonState) {
  if (state === "hover") return "shadow-lg shadow-zinc-950/10 -translate-y-0.5"
  if (state === "active") return "scale-[0.98]"
  if (state === "focus") return "ring-4 ring-amber-200 ring-offset-2"
  if (state === "disabled") return "opacity-45 pointer-events-none"
  if (state === "loading") return "opacity-80"
  return ""
}

export function buttonLabelFromState(playgroundState: PlaygroundState) {
  if (playgroundState.loading || playgroundState.state === "loading") return "Loading"
  if (playgroundState.iconMode === "download") return "Download"
  if (playgroundState.iconMode === "settings") return "Settings"
  if (playgroundState.iconMode === "icon-only") return ""
  return "Button"
}

export function PreviewButton({
  playgroundState,
  label,
  className,
}: {
  playgroundState: PlaygroundState
  label?: string
  className?: string
}) {
  const actualState =
    playgroundState.disabled ? "disabled" : playgroundState.loading ? "loading" : playgroundState.state
  const showLeftIcon = playgroundState.iconMode === "left" || playgroundState.iconMode === "download" || playgroundState.iconMode === "settings"
  const showRightIcon = playgroundState.iconMode === "right"
  const icon = playgroundState.iconName === "Sparkles" ? <SparklesIcon className="size-4" /> : <ArrowRightIcon className="size-4" />

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 border font-medium transition",
        sizeClasses(playgroundState.size),
        radiusClass(playgroundState.radius),
        variantClasses(playgroundState.variant, playgroundState.intent),
        stateClasses(actualState),
        playgroundState.fullWidth && "w-full",
        className
      )}
    >
      {showLeftIcon ? icon : null}
      {label ?? buttonLabelFromState(playgroundState)}
      {showRightIcon ? <ArrowRightIcon className="size-4" /> : null}
      {playgroundState.iconMode === "icon-only" ? <SparklesIcon className="size-4" /> : null}
    </button>
  )
}

export function VariantSelector({
  label,
  items,
  active,
  onSelect,
}: {
  label: string
  items: string[]
  active: string
  onSelect: (value: string) => void
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">{label}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={cn(
              "rounded-2xl border px-5 py-3 text-sm font-medium capitalize",
              active === item ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white" : "border-zinc-200 bg-white text-zinc-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200",
              item === "destructive" && active !== item && "border-red-200 bg-red-50 text-red-600",
              item === "warning" && active !== item && "border-amber-300 bg-white text-amber-700"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export function InspectorRow({
  label,
  items,
  active,
  onSelect,
}: {
  label: string
  items: string[]
  active?: string
  onSelect?: (value: string) => void
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.18fr_1fr] lg:items-center">
      <div className="text-base text-zinc-600 dark:text-zinc-400">{label}</div>
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect?.(item)}
            className={cn(
              "rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200",
              active === item && "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white",
              item === "Destructive" && active !== item && "bg-red-500 text-white border-red-500",
              item === "Warning" && active !== item && "border-amber-300 text-amber-700"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export function InspectorControl({
  title,
  options,
  active,
  onSelect,
}: {
  title: string
  options: string[]
  active?: string
  onSelect?: (value: string) => void
}) {
  return (
    <div className="space-y-4 py-2">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">{title}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((item) => (
          <button
            key={item}
            onClick={() => onSelect?.(item)}
            className={cn("rounded-2xl border border-zinc-200 px-4 py-2.5 text-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200", active === item && "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white")}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

function viewportClassName(device: DeviceMode) {
  if (device === "mobile") return "max-w-[390px]"
  if (device === "tablet") return "max-w-[820px]"
  return "max-w-full"
}

export function DevicePreviewFrame({
  title,
  description,
  device,
  onDeviceChange,
  children,
  className,
}: {
  title: string
  description: string
  device: DeviceMode
  onDeviceChange: (device: DeviceMode) => void
  children: React.ReactNode
  className?: string
}) {
  const activeIndex = deviceModes.indexOf(device)

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-zinc-950 dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-2xl border border-zinc-200 bg-white p-1 dark:border-white/10 dark:bg-zinc-900">
            {deviceModes.map((item) => (
              <button
                key={item}
                onClick={() => onDeviceChange(item)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition dark:text-zinc-300",
                  device === item ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "text-zinc-600"
                )}
              >
                {deviceIcon(item)}
                {deviceLabel(item)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onDeviceChange(deviceModes[(activeIndex - 1 + deviceModes.length) % deviceModes.length])}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
            >
              Prev
            </button>
            <button
              onClick={() => onDeviceChange(deviceModes[(activeIndex + 1) % deviceModes.length])}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
            >
              Swipe
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#fafaf9)] p-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(39,39,42,0.98),rgba(24,24,27,0.98))] dark:shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
        <div className="rounded-[26px] border border-zinc-200/80 bg-zinc-50 p-3 dark:border-white/10 dark:bg-zinc-950/80">
          <div className={cn("mx-auto transition-all duration-300", viewportClassName(device), className)}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export function buildPlaygroundCode(playgroundState: PlaygroundState, codeTab: CodeTab, framework: FrameworkTab) {
  const props = [
    `variant="${playgroundState.variant}"`,
    `size="${playgroundState.size}"`,
    `radius="${playgroundState.radius}"`,
    `intent="${playgroundState.intent}"`,
  ]

  if (playgroundState.iconMode !== "icon-only") props.push(`icon="${playgroundState.iconName}"`)
  if (playgroundState.loading) props.push("loading")
  if (playgroundState.disabled) props.push("disabled")
  if (playgroundState.fullWidth) props.push("fullWidth")

  const propString = props.join(" ")
  const label = buttonLabelFromState(playgroundState) || "Icon"

  if (codeTab === "TSX") {
    return `import { Button } from "@azamat/ui"\n\nexport function Example() {\n  return (\n    <Button ${propString}>\n      ${label}\n    </Button>\n  )\n}\n\n// Framework: ${framework}`
  }

  if (codeTab === "HTML") {
    return `<button data-variant="${playgroundState.variant}" data-size="${playgroundState.size}" data-intent="${playgroundState.intent}">\n  ${label}\n</button>`
  }

  if (codeTab === "CSS") {
    return `.button {\n  border-radius: ${playgroundState.radius}px;\n  padding: ${playgroundState.size === "xs" ? "6px 12px" : playgroundState.size === "sm" ? "8px 16px" : playgroundState.size === "md" ? "12px 20px" : "14px 24px"};\n  transition: 160ms ease;\n}\n\n.button[data-variant="${playgroundState.variant}"] {\n  /* map to design token */\n}`
  }

  return `npx azamat-ui add button\n# variant: ${playgroundState.variant}\n# size: ${playgroundState.size}\n# intent: ${playgroundState.intent}`
}

export function SunIconMini() {
  return <SparklesIcon className="size-4" />
}

export function MoonIconMini() {
  return <HeartIcon className="size-4" />
}

export function MonitorIconMini() {
  return <Settings2Icon className="size-4" />
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 text-zinc-500 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
      <SearchIcon className="size-4" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
      />
    </div>
  )
}

export function CopyButton({
  label,
  copied,
  onClick,
  dark = false,
}: {
  label: string
  copied: boolean
  onClick: () => void
  dark?: boolean
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("rounded-xl", dark && "border-white/10 bg-white/5 text-white hover:bg-white/10")}
      onClick={onClick}
    >
      {copied ? "Copied" : label}
    </Button>
  )
}

export function PassBadge() {
  return <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/15">Pass</Badge>
}
