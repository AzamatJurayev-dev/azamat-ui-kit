import * as React from "react"
import {
  BadgeCheckIcon,
  CheckCircle2Icon,
  LayoutGridIcon,
  PaletteIcon,
  RocketIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  ComponentPreview,
  Input,
  StatCard,
  StatusBadge,
  Switch,
  Textarea,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, PreviewSurface, ShowcaseGrid, TokenPill } from "./playground-ui"

const foundationMetrics = [
  { title: "Primitive groups", value: "6", description: "Button, badge, card, field, boolean and status controls" },
  { title: "Button variants", value: "6", description: "Default, secondary, outline, ghost, destructive and link" },
  { title: "Token model", value: "CSS", description: "Radius, shadow and tone are managed through variables" },
  { title: "Docs surface", value: "Live", description: "Preview and code examples are shown in the playground" },
]

const tokenGroups = [
  "--aui-control-radius",
  "--aui-control-shadow",
  "--aui-card-radius",
  "--aui-card-shadow",
  "--aui-table-header-bg",
  "data-slot=\"button\"",
]

export function FoundationSection() {
  const [radius, setRadius] = React.useState("md")
  const [checked, setChecked] = React.useState(true)
  const [switchChecked, setSwitchChecked] = React.useState(true)

  React.useEffect(() => {
    document.documentElement.dataset.radius = radius
  }, [radius])

  return (
    <DemoSection
      sectionIndex={2}
      id="foundation"
      eyebrow="Design system"
      title="Foundation"
      description="Primitive UI, status tones, cards, controls and CSS-first tokens for a consistent library baseline."
      action={<StatusBadge tone="success" dot>Token controlled</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 md:grid-cols-4">
        {foundationMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{metric.description}</CardContent>
          </Card>
        ))}
      </section>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="Button system" description="All variants and sizes in one visual matrix." badge={<Badge variant="outline">controls</Badge>}>
          <PreviewSurface>
            <div className="grid gap-4">
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
                <Button size="lg">Large</Button>
                <Button size="icon-sm" variant="outline"><RocketIcon /></Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </PreviewSurface>
        </PlaygroundCard>

        <PlaygroundCard title="Status language" description="Badges and status tones for readable tables and cards." badge={<Badge variant="outline">tones</Badge>}>
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
          <p className="text-sm leading-6 text-muted-foreground">
            Status language should stay generic: apps decide labels, UI kit decides visual tone.
          </p>
        </PlaygroundCard>

        <PlaygroundCard title="Primitive fields" description="Base input controls inherit the same CSS visual rules." badge={<Badge variant="outline">fields</Badge>}>
          <Input placeholder="Primitive input" />
          <Textarea placeholder="Primitive textarea" />
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              Checkbox
            </label>
            <label className="flex items-center gap-2">
              <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
              Switch
            </label>
          </div>
          <Input disabled value="Disabled field" />
        </PlaygroundCard>

        <PlaygroundCard title="Radius controls" description="Change document radius and see every card/control update." badge={<Badge variant="outline">theme</Badge>}>
          <div className="flex flex-wrap gap-2">
            {["none", "sm", "md", "lg", "xl"].map((item) => (
              <Button key={item} variant={radius === item ? "default" : "outline"} size="sm" onClick={() => setRadius(item)}>
                {item}
              </Button>
            ))}
          </div>
          <PreviewSurface>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-[var(--aui-card-radius)] border bg-card p-3 text-sm">Card radius</div>
              <Button variant="outline">Control radius</Button>
            </div>
          </PreviewSurface>
        </PlaygroundCard>

        <PlaygroundCard title="CSS token map" description="Apps can brand components without editing source." badge={<Badge variant="outline">CSS</Badge>}>
          <div className="flex flex-wrap gap-2">
            {tokenGroups.map((token) => <TokenPill key={token}>{token}</TokenPill>)}
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Foundation components expose stable `data-slot` attributes and read from global token values.
          </p>
        </PlaygroundCard>

        <PlaygroundCard title="Library principles" description="The baseline rules that keep components reusable." badge={<Badge variant="outline">rules</Badge>}>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="flex gap-2 rounded-lg border bg-muted/25 p-3"><ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />No API/auth/tenant logic in UI kit.</div>
            <div className="flex gap-2 rounded-lg border bg-muted/25 p-3"><LayoutGridIcon className="mt-0.5 size-4 shrink-0 text-primary" />One component, many states through props.</div>
            <div className="flex gap-2 rounded-lg border bg-muted/25 p-3"><PaletteIcon className="mt-0.5 size-4 shrink-0 text-primary" />Visual polish through CSS tokens.</div>
          </div>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Foundation preview"
        description="Button variants, status tones, primitive fields and token-driven radius in one reusable demo."
        dependencies={["Button", "Badge", "StatusBadge", "Input", "Checkbox", "Switch"]}
        code={`<Button>Default</Button>
<Button variant="outline">Outline</Button>
<StatusBadge tone="success" dot>Success</StatusBadge>
<Input placeholder="Primitive input" />`}
      >
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <StatCard title="Components" value="80+" icon={<SparklesIcon />} trend={{ value: "+polished", tone: "success" }} description="Reusable UI coverage" />
          <StatCard title="Theming" value="CSS-first" icon={<SettingsIcon />} description="data-slot + variables" />
          <StatCard title="QA" value="Playground" icon={<CheckCircle2Icon />} description="Manual visual checks" />
          <div className="rounded-xl border bg-muted/25 p-4 lg:col-span-3">
            <div className="flex flex-wrap gap-2">
              <BadgeCheckIcon className="size-4 text-primary" />
              <span className="text-sm font-medium">Foundation is the shared language for every bigger component.</span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <PlaygroundUsage
        title="Foundation usage"
        items={[
          "Use primitive components for all higher-level blocks so spacing, focus, disabled and tone states stay consistent.",
          "Use status tones instead of custom colors inside business pages; apps own label text, UI kit owns tone visuals.",
          "Switch radius, card shadow and control surface from CSS tokens, not by creating duplicate components.",
          "Every new component should expose `data-slot` and reuse foundation primitives where possible.",
        ]}
        code={`:root {
  --aui-control-radius: 0.75rem;
  --aui-card-shadow: 0 12px 32px oklch(0 0 0 / 8%);
}

<Button variant="outline">Reusable action</Button>`}
      />
    </DemoSection>
  )
}
