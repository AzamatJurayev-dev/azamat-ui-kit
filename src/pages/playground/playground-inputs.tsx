import { useState } from "react"
import { CalendarIcon, HashIcon, SearchIcon, TagsIcon } from "lucide-react"

import {
  AsyncMultiSelect,
  AsyncSelect,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  ClearableInput,
  ComponentPreview,
  DateInput,
  DateRangeInput,
  Input,
  MaskedInput,
  MoneyInput,
  NumberInput,
  PasswordInput,
  PhoneInput,
  QuantityInput,
  SearchInput,
  SimpleSelect,
  StatusBadge,
  Switch,
  Textarea,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, PreviewSurface, ShowcaseGrid, TokenPill } from "./playground-ui"
import { customerOptions, tagOptions } from "./playground-data"

type MockTag = {
  value: string
  label: string
  description: string
}

const inputMetrics = [
  { title: "Text controls", value: "6+", description: "Input, textarea, search, clearable, password and masked" },
  { title: "Numeric controls", value: "4", description: "Number, money, quantity and date range" },
  { title: "Select patterns", value: "3", description: "Simple, async and multi async selection" },
  { title: "States", value: "8+", description: "loading, error, empty, disabled, min search and create" },
]

export function InputsSection() {
  const [search, setSearch] = useState("")
  const [clearable, setClearable] = useState("Clear me")
  const [masked, setMasked] = useState("AA-123")
  const [password, setPassword] = useState("secret123")
  const [phone, setPhone] = useState("+998 90 123 45 67")
  const [numberValue, setNumberValue] = useState<number | null>(42)
  const [moneyRaw, setMoneyRaw] = useState("42000")
  const [quantity, setQuantity] = useState<number | null>(3)
  const [simpleValue, setSimpleValue] = useState("active")
  const [asyncValue, setAsyncValue] = useState<string | undefined>("1")
  const [selectedTags, setSelectedTags] = useState<string[]>(["new", "popular"])
  const [dateValue, setDateValue] = useState("2026-06-17")
  const [dateRange, setDateRange] = useState({ from: "2026-06-01", to: "2026-06-30" })
  const [checkbox, setCheckbox] = useState(true)
  const [switchChecked, setSwitchChecked] = useState(true)
  const [searchError, setSearchError] = useState(false)
  const [simpleSearch, setSimpleSearch] = useState("")
  const [asyncError, setAsyncError] = useState(false)
  const [mockLatency, setMockLatency] = useState(650)
  const [liveTags, setLiveTags] = useState<MockTag[]>(tagOptions)

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const loadCustomers = async (value: string) => {
    await wait(mockLatency)

    if (asyncError) {
      throw new Error("Failed to reach customer service")
    }

    const normalized = value.trim().toLowerCase()

    return customerOptions.filter((option) => option.label.toLowerCase().includes(normalized))
  }

  const loadTagOptions = async (value: string) => {
    await wait(mockLatency)

    if (asyncError) {
      throw new Error("Tag service unavailable")
    }

    const normalized = value.trim().toLowerCase()

    return [
      {
        label: "Tags",
        options: liveTags.filter((option) => option.label.toLowerCase().includes(normalized)),
      },
    ]
  }

  const createTag = async (value: string) => {
    await wait(mockLatency)

    const normalized = value.trim().toLowerCase()
    const nextValue = `tag-${normalized.replace(/\s+/g, "-")}`

    const nextTag: MockTag = {
      value: nextValue,
      label: value,
      description: "Created in mock mode",
    }

    if (!liveTags.some((tag) => tag.value === nextValue)) {
      setLiveTags((current) => [...current, nextTag])
    }

    return nextTag
  }

  const resetInputs = () => {
    setSearch("")
    setClearable("Clear me")
    setMasked("AA-123")
    setPassword("secret123")
    setPhone("+998 90 123 45 67")
    setNumberValue(42)
    setMoneyRaw("42000")
    setQuantity(3)
    setSimpleValue("active")
    setAsyncValue("1")
    setSelectedTags(["new", "popular"])
    setDateValue("2026-06-17")
    setDateRange({ from: "2026-06-01", to: "2026-06-30" })
    setCheckbox(true)
    setSwitchChecked(true)
    setSearchError(false)
    setSimpleSearch("")
    setAsyncError(false)
    setMockLatency(650)
  }

  return (
    <DemoSection
      sectionIndex={3}
      id="inputs"
      eyebrow="Data entry"
      title="Inputs"
      description="Standalone data-entry components with controlled state, async search, creation, validation and disabled/error patterns."
      action={<StatusBadge tone={asyncError ? "warning" : "success"} dot>{asyncError ? "Mock error" : "Ready"}</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <Card className="border-primary/15 bg-background shadow-lg shadow-primary/5">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Data entry</Badge>
              <Badge variant="outline">Async lookup</Badge>
              <Badge variant="outline">Controlled state</Badge>
            </div>
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">Inputs that feel consistent across every screen.</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6">
              Text, number, select and date controls share the same visual rules, state behavior and spacing logic so app pages stay
              predictable even when the data gets dense.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Quick states</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">Loading</Badge>
                <Badge variant="outline">Error</Badge>
                <Badge variant="outline">Empty</Badge>
                <Badge variant="outline">Disabled</Badge>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Lookup speed</p>
              <div className="mt-2 grid gap-2">
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Search customer</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Create new tag</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Apply date range</div>
              </div>
              <div className="mt-3 rounded-xl border bg-background/80 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">State</p>
                  <Badge variant="outline" className="text-[11px]">Async ready</Badge>
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-lg border bg-muted/20 p-2 text-xs text-muted-foreground">Live search.</div>
                  <div className="rounded-lg border bg-muted/20 p-2 text-xs text-muted-foreground">Visible validation.</div>
                  <div className="rounded-lg border bg-muted/20 p-2 text-xs text-muted-foreground">Controlled tags.</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-muted/15">
          <CardHeader>
            <CardTitle className="text-lg">Control summary</CardTitle>
            <CardDescription>Controlled values and mock API states.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Search</p>
                <p className="mt-1 text-sm font-medium">{search || "Empty"}</p>
              </div>
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Latency</p>
                <p className="mt-1 text-sm font-medium">{mockLatency}ms</p>
              </div>
            </div>
            <PreviewSurface>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Tags</span><span>{selectedTags.length}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Async</span><span>{asyncError ? "Error" : "Ready"}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Range</span><span>{dateRange.from} → {dateRange.to}</span></div>
              </div>
            </PreviewSurface>
          </CardContent>
        </Card>
      </section>

      <section className="mb-4 grid gap-4 md:grid-cols-4">
        {inputMetrics.map((metric) => (
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
        <PlaygroundCard title="Async controls" description="Toggle network-like states for lookup components." badge={<Badge variant="outline">mock API</Badge>}>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant={asyncError ? "default" : "outline"} size="sm" onClick={() => setAsyncError((value) => !value)}>
              {asyncError ? "Mock error ON" : "Mock error OFF"}
            </Button>
            {[250, 650, 1200].map((latency) => (
              <Button key={latency} type="button" variant={mockLatency === latency ? "default" : "outline"} size="sm" onClick={() => setMockLatency(latency)}>
                {latency}ms
              </Button>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={resetInputs}>Reset inputs</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <TokenPill>minSearchLength</TokenPill>
            <TokenPill>cacheTtl</TokenPill>
            <TokenPill>onCreateOption</TokenPill>
            <TokenPill>renderError</TokenPill>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Input state summary" description="All values are controlled from local mock state." badge={<Badge variant="outline">controlled</Badge>}>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/25 p-3">Search: {search || "—"}</div>
            <div className="rounded-lg border bg-muted/25 p-3">Phone: {phone || "—"}</div>
            <div className="rounded-lg border bg-muted/25 p-3">Tags: {selectedTags.length}</div>
            <div className="rounded-lg border bg-muted/25 p-3">Date range: {dateRange.from} → {dateRange.to}</div>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="CSS controlled inputs" description="Visual polish comes from component tokens." badge={<Badge variant="outline">tokens</Badge>}>
          <div className="flex flex-wrap gap-2">
            <TokenPill>--aui-control-radius</TokenPill>
            <TokenPill>--aui-control-shadow</TokenPill>
            <TokenPill>data-slot="input"</TokenPill>
            <TokenPill>data-slot="select-trigger"</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Inputs should remain composable; app-specific formatting rules are passed through props/callbacks.
          </p>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Input and select suite"
        description="Text, numeric, date, boolean, simple select, async select and multi-select in one interactive demo."
        dependencies={["SearchInput", "AsyncSelect", "AsyncMultiSelect", "MoneyInput", "DateRangeInput"]}
        code={`<SearchInput value={search} onValueChange={setSearch} />
<AsyncSelect minSearchLength={1} cacheTtl={30000} loadOptions={loadCustomers} />
<AsyncMultiSelect showSelectAll maxSelected={4} onCreateOption={createTag} />`}
      >
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <PlaygroundCard title="Text inputs" badge={<Badge variant="outline"><SearchIcon className="mr-1 size-3" />text</Badge>}>
            <Input placeholder="Primitive input" />
            <Textarea placeholder="Primitive textarea" />
            <SearchInput
              value={search}
              onValueChange={(value) => {
                setSearch(value)
                setSearchError(value.length > 0 && value.length < 2)
              }}
              placeholder="Search products..."
              className={searchError ? "border-destructive" : undefined}
            />
            {searchError && <p className="text-xs text-destructive">At least 2 chars needed.</p>}
            <ClearableInput value={clearable} onValueChange={setClearable} placeholder="Clearable input" />
            <MaskedInput value={masked} onValueChange={(value) => setMasked(value)} mask={(value) => value.toUpperCase().slice(0, 6)} placeholder="Masked input" />
            <Input value={simpleSearch} onChange={(event) => setSimpleSearch(event.target.value)} placeholder="Controlled input (onChange)" />
          </PlaygroundCard>

          <PlaygroundCard title="Numeric and date" badge={<Badge variant="outline"><HashIcon className="mr-1 size-3" />numbers</Badge>}>
            <PhoneInput value={phone} onValueChange={setPhone} />
            <DateInput value={dateValue} onValueChange={setDateValue} />
            <NumberInput value={numberValue} min={0} max={100} onNumberChange={setNumberValue} />
            <MoneyInput value={moneyRaw} prefix="UZS" onValueChange={(_value, raw) => setMoneyRaw(raw)} />
            <QuantityInput value={quantity} min={0} max={10} onValueChange={setQuantity} />
            <DateRangeInput value={dateRange} onValueChange={(value) => setDateRange({ from: value.from ?? "", to: value.to ?? "" })} />
          </PlaygroundCard>

          <PlaygroundCard title="Selects and booleans" badge={<Badge variant="outline"><TagsIcon className="mr-1 size-3" />lookup</Badge>}>
            <PasswordInput value={password} onValueChange={setPassword} placeholder="Password" />
            <SimpleSelect
              value={simpleValue}
              onValueChange={setSimpleValue}
              options={[
                { label: "Active", value: "active", description: "Visible" },
                { label: "Inactive", value: "inactive", description: "Hidden" },
                { label: "Draft", value: "draft", disabled: true },
              ]}
            />
            <AsyncSelect
              value={asyncValue}
              onValueChange={setAsyncValue}
              selectedOption={customerOptions.find((item) => item.value === asyncValue)}
              minSearchLength={1}
              cacheTtl={30_000}
              defaultOptions={customerOptions}
              loadOptions={loadCustomers}
              labels={{
                placeholder: "Async customer",
                loading: "Loading customer list...",
                error: asyncError ? "Network error: retrying demo..." : "Could not load customers",
                minSearchLength: (count) => `Type ${count}+ character`,
                empty: "No customer found",
              }}
              onCreateOption={async (value) => ({
                value: `mock-${value.toLowerCase().replace(/\s+/g, "-")}`,
                label: value,
                description: "Created mock customer",
              })}
              createOptionLabel={(value) => `Add customer "${value}"`}
            />
            <AsyncMultiSelect
              value={selectedTags}
              onValueChange={setSelectedTags}
              defaultOptions={[{ label: "Tags", options: liveTags }]}
              loadOptions={loadTagOptions}
              maxSelected={4}
              loadSelectedOptions={async (values) => {
                await wait(mockLatency)
                return values.map((value) => liveTags.find((tag) => tag.value === value)).filter((tag): tag is MockTag => Boolean(tag))
              }}
              disabled={selectedTags.length > 3}
              showSelectAll
              minSearchLength={0}
              onCreateOption={createTag}
              createOptionLabel={(value) => `Create tag "${value}"`}
              labels={{
                placeholder: "Select tags",
                selectedCount: (count) => `${count} selected`,
                loading: "Searching tags...",
                error: asyncError ? "Tag lookup failed" : "Could not load tags",
              }}
            />
            <div className="flex items-center gap-3 text-sm">
              <Checkbox checked={checkbox} onCheckedChange={setCheckbox} /> Checkbox
              <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} /> Switch
            </div>
          </PlaygroundCard>
        </div>
      </ComponentPreview>

      <ShowcaseGrid className="mt-4 xl:grid-cols-3">
        <PlaygroundCard title="Disabled and read-only" description="Base controls should expose consistent visual states." badge={<Badge variant="outline">state</Badge>}>
          <Input value="Disabled text field" disabled placeholder="Disabled field" />
          <Textarea value="Readonly text" readOnly />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Checkbox checked={checkbox} onCheckedChange={setCheckbox} disabled /> Disabled checkbox
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Error boundary demo" description="Controlled validation state in plain inputs." badge={<Badge variant="outline">error</Badge>}>
          <Input
            value={search}
            onChange={(event) => {
              const next = event.target.value
              setSearch(next)
              setSearchError(next.length > 0 && next.length < 2)
            }}
            className={searchError ? "border-destructive" : ""}
            placeholder="Type one char to see error"
          />
          <p className="text-xs text-muted-foreground">{searchError ? "Search is invalid now" : "Value is valid"}</p>
        </PlaygroundCard>

        <PlaygroundCard title="Date and amount summary" description="Derived display from controlled input state." badge={<Badge variant="outline"><CalendarIcon className="mr-1 size-3" />summary</Badge>}>
          <PreviewSurface>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Date</span><span>{dateValue}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Range</span><span>{dateRange.from} → {dateRange.to}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Amount</span><span>{moneyRaw} UZS</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Quantity</span><span>{quantity ?? "—"}</span></div>
            </div>
          </PreviewSurface>
        </PlaygroundCard>
      </ShowcaseGrid>

      <PlaygroundUsage
        title="Inputs usage"
        items={[
          "Use dedicated wrappers (`SearchInput`, `ClearableInput`) where clearability or quick controls are expected.",
          "Use `AsyncSelect`/`AsyncMultiSelect` for lookup-style components with `minSearchLength`, `loading`, `error`, and `empty` states.",
          "Keep numeric and date inputs close to helper text so users immediately see ranges and current state.",
          "Do not create project-specific inputs in the UI kit; pass parser, formatter, loader and labels through props.",
        ]}
        code={`<SearchInput value={query} onValueChange={setQuery} />
<AsyncSelect value={customerId} loadOptions={searchCustomers} onCreateOption={createCustomer} />
<MoneyInput value={price} onValueChange={(value, raw) => setPrice(value)} />`}
      />
    </DemoSection>
  )
}






