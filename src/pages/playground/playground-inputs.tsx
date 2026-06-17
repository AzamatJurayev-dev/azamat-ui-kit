import { useState } from "react"
import {
  AsyncMultiSelect,
  AsyncSelect,
  Button,
  Checkbox,
  ClearableInput,
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
  Switch,
  Textarea,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage } from "./playground-ui"
import { customerOptions, tagOptions } from "./playground-data"

type MockTag = {
  value: string
  label: string
  description: string
}

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

  return (
    <DemoSection
      sectionIndex={3}
      id="inputs"
      title="Inputs and selects"
      description="Standalone data-entry components with controlled mock state and async patterns."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Button
          type="button"
          variant={asyncError ? "secondary" : "outline"}
          size="sm"
          onClick={() => setAsyncError((value) => !value)}
        >
          {asyncError ? "Mock error OFF" : "Mock error ON"}
        </Button>
        <Button
          type="button"
          variant={mockLatency === 250 ? "default" : "outline"}
          size="sm"
          onClick={() => setMockLatency(250)}
        >
          Latency 250ms
        </Button>
        <Button
          type="button"
          variant={mockLatency === 650 ? "default" : "outline"}
          size="sm"
          onClick={() => setMockLatency(650)}
        >
          Latency 650ms
        </Button>
        <Button
          type="button"
          variant={mockLatency === 1200 ? "default" : "outline"}
          size="sm"
          onClick={() => setMockLatency(1200)}
        >
          Latency 1200ms
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PlaygroundCard title="Text inputs">
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
          <Input
            value={simpleSearch}
            onChange={(event) => setSimpleSearch(event.target.value)}
            placeholder="Controlled input (onChange)"
          />
        </PlaygroundCard>

        <PlaygroundCard title="Numeric and phone inputs">
          <PhoneInput value={phone} onValueChange={setPhone} />
          <DateInput value={dateValue} onValueChange={setDateValue} />
          <NumberInput value={numberValue} min={0} max={100} onNumberChange={setNumberValue} />
          <MoneyInput value={moneyRaw} prefix="UZS" onValueChange={(_value, raw) => setMoneyRaw(raw)} />
          <QuantityInput value={quantity} min={0} max={10} onValueChange={setQuantity} />
          <DateRangeInput value={dateRange} onValueChange={(value) => setDateRange({ from: value.from ?? "", to: value.to ?? "" })} />
        </PlaygroundCard>

        <PlaygroundCard title="Selects and booleans">
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
              return values
                .map((value) => liveTags.find((tag) => tag.value === value))
                .filter((tag): tag is MockTag => Boolean(tag))
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Checkbox checked={checkbox} onCheckedChange={setCheckbox} disabled />
            Disabled checkbox
          </div>
          <Input value="Disabled text field" disabled placeholder="Disabled field" />
          <p className="text-xs text-muted-foreground">Disabled state pattern</p>
        </PlaygroundCard>

        <PlaygroundCard title="State showcase" className="lg:col-span-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <SearchInput
              value={simpleSearch}
              onValueChange={(value) => setSimpleSearch(value)}
              placeholder="Async-ready search"
            />
            <Textarea value="Readonly text" readOnly />
            <div className="space-y-2 rounded-lg border border-border/80 bg-muted/30 p-2">
              <p className="text-xs font-medium">Controlled error summary</p>
              <Input
                value={search}
                onChange={(event) => {
                  const next = event.target.value
                  setSearch(next)
                  setSearchError(next.length > 0 && next.length < 2)
                }}
                className={searchError ? "border-destructive" : ""}
                placeholder="Error boundary demo"
              />
              <p className="text-xs text-muted-foreground">{searchError ? "Search is invalid now" : "Value is valid"}</p>
            </div>
            <div className="rounded-lg border border-border/80 bg-muted/30 p-2">
              <p className="mb-2 text-xs font-medium">Mock option fallback</p>
              <AsyncSelect
                value={asyncValue}
                onValueChange={setAsyncValue}
                selectedOption={customerOptions.find((item) => item.value === asyncValue)}
                minSearchLength={0}
                cacheTtl={60_000}
                defaultOptions={customerOptions}
                loadOptions={loadCustomers}
                labels={{
                  placeholder: "Async customer",
                  loading: "Loading fallback list...",
                  error: asyncError ? "Service down" : "No results",
                  empty: "No matches",
                }}
                disabled={false}
              />
            </div>
          </div>
        </PlaygroundCard>
      </div>

      <PlaygroundUsage
        title="Inputs usage"
        items={[
          "Use dedicated wrappers (`SearchInput`, `ClearableInput`) where clearability or quick controls are expected.",
          "Use `AsyncSelect`/`AsyncMultiSelect` for lookup-style components with `minSearchLength`, `loading`, `error`, and `empty` states.",
          "Keep numeric and file-like inputs near helper text so users immediately see invalid ranges and current state.",
        ]}
        code={`// Inputs stack\n<SearchInput value={query} onValueChange={setQuery} />\n<AsyncSelect ... onCreateOption ... />`}
      />
    </DemoSection>
  )
}
