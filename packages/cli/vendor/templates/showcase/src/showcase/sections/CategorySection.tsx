import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getModuleKey, getModuleLabel, getModuleSourcePath, type RegistryGroup } from "@/showcase/data/registry"

type CategorySectionProps = {
  group: RegistryGroup
  onSelect: (key: string) => void
}

export function CategorySection({ group, onSelect }: CategorySectionProps) {
  return (
    <section className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.components.length} registry component. Sidebar ichidan bittasini tanlab alohida test qilasiz.</CardDescription>
            </div>
            <Badge label={`${group.components.length} components`} variant="secondary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {group.components.map((component) => (
              <button
                key={component.name}
                type="button"
                className="rounded-lg border bg-card p-4 text-left transition hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => onSelect(getModuleKey(group.name, component.name))}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{getModuleLabel(component.name)}</div>
                  <Badge label={component.status} status={component.status === "stable" ? "success" : "info"} variant="soft" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{getModuleSourcePath(component)}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => onSelect("overview")}>Back to overview</Button>
      </div>
    </section>
  )
}
