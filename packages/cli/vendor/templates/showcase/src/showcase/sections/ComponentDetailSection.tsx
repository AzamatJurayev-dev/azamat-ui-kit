import { FolderOpenIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getModuleLabel, getModuleSourcePath, type RegistryComponent, type RegistryGroup } from "@/showcase/data/registry"
import { ComponentLivePreview } from "@/showcase/sections/ComponentLivePreview"

type ComponentDetailSectionProps = {
  group: RegistryGroup
  component: RegistryComponent
}

export function ComponentDetailSection({ group, component }: ComponentDetailSectionProps) {
  const sourcePath = getModuleSourcePath(component)

  return (
    <section className="grid gap-5">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>{getModuleLabel(component.name)}</CardTitle>
              <CardDescription>Tanlangan registry component test paneli.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge label={group.name} status="info" />
              <Badge label={component.status} status={component.status === "stable" ? "success" : "info"} />
              <Badge label="local source" status="success" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
            <FolderOpenIcon className="size-4 text-muted-foreground" />
            <code className="min-w-0 break-all">{sourcePath}</code>
          </div>
          <p className="text-muted-foreground">
            Sidebar orqali har bir registry component alohida tanlanadi. Quyidagi preview shu component tegishli category test surfaceini ko‘rsatadi.
          </p>
        </CardContent>
      </Card>

      <ComponentLivePreview group={group} component={component} />
    </section>
  )
}
