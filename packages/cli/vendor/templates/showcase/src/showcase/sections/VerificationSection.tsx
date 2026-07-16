import { CheckCircle2Icon, Layers3Icon, ShieldCheckIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { moduleCount, registryGroups } from "@/showcase/data/registry"
import { SectionTitle } from "@/showcase/shared/SectionTitle"

export function VerificationSection() {
  return (
    <section>
      <SectionTitle title="Verification" description="Package va project setup holati." />
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-start gap-3 pt-6">
            <CheckCircle2Icon className="mt-1 size-5 text-emerald-600" />
            <div>
              <div className="font-medium">Doctor passed</div>
              <p className="text-sm text-muted-foreground">Tembro theme tokens recognized.</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-3 pt-6">
            <Layers3Icon className="mt-1 size-5 text-blue-600" />
            <div>
              <div className="font-medium">All categories listed</div>
              <p className="text-sm text-muted-foreground">{registryGroups.length} groups and {moduleCount} registry components.</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-3 pt-6">
            <ShieldCheckIcon className="mt-1 size-5 text-amber-600" />
            <div>
              <div className="font-medium">Build checked</div>
              <p className="text-sm text-muted-foreground">Vite starter screen removed.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
