import * as React from "react"
import { RocketIcon, SettingsIcon, SparklesIcon, CheckCircle2Icon } from "lucide-react"
import {
  Badge,
  Button,
  ComponentPreview,
  StatusBadge,
  StatCard,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, TokenPill } from "./playground-ui"

export function FoundationSection() {
  const [radius, setRadius] = React.useState("md")

  React.useEffect(() => {
    document.documentElement.dataset.radius = radius
  }, [radius])

  return (
    <>
      <DemoSection
        sectionIndex={2}
        id="foundation"
        title="Foundation"
        description="Primitive UI, badges, cards, status tones and CSS token switches."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <PlaygroundCard
            title="Button variants"
            description="All common variants and sizes."
            footer={<span className="text-xs text-muted-foreground">CSS token: --aui-control-radius</span>}
          >
            <ComponentPreview
              code={`import { Button } from "@/components/ui/button"\nimport { RocketIcon } from "lucide-react"\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-col gap-4">\n      <div className="flex flex-wrap gap-2">\n        <Button>Default</Button>\n        <Button variant="secondary">Secondary</Button>\n        <Button variant="outline">Outline</Button>\n        <Button variant="ghost">Ghost</Button>\n        <Button variant="destructive">Destructive</Button>\n        <Button variant="link">Link</Button>\n      </div>\n      <div className="flex flex-wrap items-center gap-2">\n        <Button size="xs">XS</Button>\n        <Button size="sm">SM</Button>\n        <Button>Default</Button>\n        <Button size="lg">LG</Button>\n        <Button size="icon-sm"><RocketIcon /></Button>\n      </div>\n    </div>\n  )\n}`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs">XS</Button>
                  <Button size="sm">SM</Button>
                  <Button>Default</Button>
                  <Button size="lg">LG</Button>
                  <Button size="icon-sm"><RocketIcon /></Button>
                </div>
              </div>
            </ComponentPreview>
          </PlaygroundCard>

          <PlaygroundCard title="Badges and status" description="Generic badge variants and status tones.">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <StatusBadge tone="success" dot>Success</StatusBadge>
              <StatusBadge tone="warning" dot>Warning</StatusBadge>
              <StatusBadge tone="danger" dot>Danger</StatusBadge>
              <StatusBadge tone="info" dot>Info</StatusBadge>
              <StatusBadge tone="muted" dot>Muted</StatusBadge>
            </div>
          </PlaygroundCard>

          <PlaygroundCard title="Button feedback matrix">
            <div className="grid gap-2">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="icon" variant="ghost">
                  <RocketIcon />
                </Button>
                <Button variant="link">Link style</Button>
                <Button size="lg">Large</Button>
                <Button size="sm">Small</Button>
              </div>
            </div>
          </PlaygroundCard>

          <PlaygroundCard title="CSS tokens" description="Radius and dark/light are CSS controlled.">
            <div className="flex flex-wrap gap-2">
              {['none', 'sm', 'md', 'lg', 'xl'].map((item) => (
                <Button key={item} variant={radius === item ? "default" : "outline"} size="sm" onClick={() => setRadius(item)}>
                  {item}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <TokenPill>--aui-card-radius</TokenPill>
              <TokenPill>--aui-card-shadow</TokenPill>
              <TokenPill>--aui-table-header-bg</TokenPill>
            </div>
          </PlaygroundCard>
        </div>
      </DemoSection>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard title="Components" value="80+" icon={<SparklesIcon />} trend={{ value: "+polished", tone: "success" }} description="Reusable UI coverage" />
        <StatCard title="Theming" value="CSS-first" icon={<SettingsIcon />} description="data-slot + variables" />
        <StatCard title="QA" value="Playground" icon={<CheckCircle2Icon />} description="Manual visual checks" />
      </section>

      <PlaygroundUsage
        title="Foundation usage"
        items={[
          "Use `DemoSection` and `PlaygroundCard` to keep consistent spacing and section rhythm.",
          "Keep color accents in cards and status badges consistent across dashboards and settings screens.",
          "Switch radius from `--aui-control-radius` only in one place and show the visual impact.",
        ]}
        code={`// Foundation pattern\nimport { Button, StatusBadge, TokenPill } from "@...";`}
      />
    </>
  )
}

