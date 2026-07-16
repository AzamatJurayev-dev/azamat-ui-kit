import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag } from "@/components/display/tag"
import { registryGroups } from "@/showcase/data/registry"
import { SectionTitle } from "@/showcase/shared/SectionTitle"

export function InventorySection() {
  return (
    <section>
      <SectionTitle
        title="Complete Registry Component Inventory"
        description="Bu yerda `tembro add <name>` bilan chaqiriladigan aniq component nomlari ko‘rinadi."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {registryGroups.map((group) => (
          <Card key={group.name} variant="outline" className="min-w-0">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{group.name}</CardTitle>
                <Badge label={group.components.length} variant="secondary" />
              </div>
              <CardDescription>src/components/{group.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {group.components.map((component) => (
                  <Tag key={component.name} size="sm" tone="neutral">
                    {component.name}
                  </Tag>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
