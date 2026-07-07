import * as React from "react"

import { Button, Section } from "@/index"

export function SectionShowcase() {
  return (
    <div className="space-y-4">
      <Section
        title="Team workspace"
        description="Keep each block self-explanatory and easy to scan."
        bordered
        actions={<Button size="sm">Edit settings</Button>}
      >
        <p className="text-sm text-muted-foreground">Use bordered sections for dashboards with many clusters.</p>
      </Section>

      <Section
        title="No header mode"
        padded={false}
      >
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm text-foreground">You can also use it as a simple content wrapper.</p>
        </div>
      </Section>
    </div>
  )
}
