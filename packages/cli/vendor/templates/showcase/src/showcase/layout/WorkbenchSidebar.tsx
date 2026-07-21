import {
  CalendarDaysIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FolderKanbanIcon,
  Layers3Icon,
  LayoutDashboardIcon,
  SparklesIcon,
  UploadCloudIcon,
  WandSparklesIcon,
} from "lucide-react"

import { Sidebar } from "@/components/layout/sidebar"
import { Badge } from "@/components/ui/badge"
import { getCategoryKey, getModuleKey, getModuleLabel, moduleCount, registryGroups } from "@/showcase/data/registry"

type WorkbenchSidebarProps = {
  selectedKey: string
  onSelect: (key: string) => void
}

export function WorkbenchSidebar({ selectedKey, onSelect }: WorkbenchSidebarProps) {
  return (
    <aside className="border-r bg-sidebar p-3 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <Sidebar
        width="100%"
        header={
          <div className="flex items-center gap-3 rounded-xl border bg-card p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <WandSparklesIcon className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-semibold">Tembro Workbench</div>
              <div className="text-xs text-muted-foreground">local copied components</div>
            </div>
          </div>
        }
        items={[
          { key: "overview", label: "Overview", icon: <LayoutDashboardIcon className="size-4" />, active: selectedKey === "overview", badge: <Badge label="live" status="success" />, onSelect: () => onSelect("overview") },
          ...registryGroups.map((group) => {
            const categoryKey = getCategoryKey(group.name)
            return {
              key: categoryKey,
              label: group.name,
              icon: group.name === "ui"
                ? <SparklesIcon className="size-4" />
                : group.name === "data-table"
                  ? <DatabaseIcon className="size-4" />
                  : group.name === "display"
                    ? <FolderKanbanIcon className="size-4" />
                    : group.name === "calendar"
                      ? <CalendarDaysIcon className="size-4" />
                      : group.name === "overlay"
                        ? <Layers3Icon className="size-4" />
                        : group.name === "upload"
                          ? <UploadCloudIcon className="size-4" />
                          : <ClipboardListIcon className="size-4" />,
              active: selectedKey === categoryKey || selectedKey.startsWith(`component:${group.name}/`),
              badge: <Badge label={group.components.length} variant="secondary" />,
              defaultExpanded: ["ui", "display", "data-table", "inputs", "layout", "overlay"].includes(group.name),
              onSelect: () => onSelect(categoryKey),
              items: group.components.map((component) => {
                const moduleKey = getModuleKey(group.name, component.name)
                return {
                  key: moduleKey,
                  label: getModuleLabel(component.name),
                  active: selectedKey === moduleKey,
                  onSelect: () => onSelect(moduleKey),
                }
              }),
            }
          }),
        ]}
        footerAccount={{
          label: "tembro@6.1.1",
          description: `${moduleCount} registry components`,
        }}
        activeIndicator="bar"
      />
    </aside>
  )
}

