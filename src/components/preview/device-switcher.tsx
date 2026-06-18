import { MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type PreviewDevice = "desktop" | "tablet" | "mobile"

export const previewDeviceWidths: Record<PreviewDevice, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
}

const previewDevices: Array<{ value: PreviewDevice; label: string; Icon: typeof MonitorIcon }> = [
  { value: "desktop", label: "Desktop", Icon: MonitorIcon },
  { value: "tablet", label: "Tablet", Icon: TabletIcon },
  { value: "mobile", label: "Mobile", Icon: SmartphoneIcon },
]

export function DeviceSwitcher({
  value,
  onChange,
}: {
  value: PreviewDevice
  onChange: (value: PreviewDevice) => void
}) {
  return (
    <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm">
      {previewDevices.map(({ value: item, label, Icon }) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
            value === item ? "bg-zinc-950 text-white" : "text-zinc-600"
          )}
        >
          <Icon className="size-4" />
          {label}
        </button>
      ))}
    </div>
  )
}
