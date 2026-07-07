export type ComponentSnippetTab = "tsx" | "cli"
export type ComponentSnippetVariant =
  | "basic"
  | "form"
  | "async"
  | "advanced"
  | "migration"
  | "cli"

export type ComponentSnippetExample = {
  component: string
  title: string
  description: string
  language: ComponentSnippetTab
  variant: ComponentSnippetVariant
  code: string
}

export const componentSnippetExamples: ComponentSnippetExample[] = [
  {
    component: "Input",
    title: "Basic text field",
    description: "Start with Input first and enable behavior through props before moving into presets.",
    language: "tsx",
    variant: "basic",
    code: `import { Input } from "@azamatjurayevdev/azix-ui"

<Input placeholder="Email address" />`,
  },
  {
    component: "Input",
    title: "Clearable primary field",
    description: "Input can own the clear behavior directly when you do not need a separate preset import.",
    language: "tsx",
    variant: "advanced",
    code: `import { Input } from "@azamatjurayevdev/azix-ui"

<Input
  value={query}
  onValueChange={setQuery}
  placeholder="Search customers..."
  clearable
  trailingAction={<span className="text-xs text-muted-foreground">12 results</span>}
/>`,
  },
  {
    component: "Textarea",
    title: "Multi-line notes",
    description: "Use Textarea when the same input family needs longer freeform content.",
    language: "tsx",
    variant: "basic",
    code: `import { Textarea } from "@azamatjurayevdev/azix-ui"

<Textarea placeholder="Write release notes or internal guidance..." rows={5} />`,
  },
  {
    component: "SearchInput",
    title: "Search filter",
    description: "Use the search preset when the base Input needs result-count or shortcut chrome out of the box.",
    language: "tsx",
    variant: "basic",
    code: `import { SearchInput } from "@azamatjurayevdev/azix-ui"

<SearchInput value={query} onValueChange={setQuery} placeholder="Search products..." />`,
  },
  {
    component: "ClearableInput",
    title: "Clearable field",
    description: "Use the clearable preset when teams want the Input clear action packaged as one helper.",
    language: "tsx",
    variant: "basic",
    code: `import { ClearableInput } from "@azamatjurayevdev/azix-ui"

<ClearableInput value={keyword} onValueChange={setKeyword} placeholder="Keyword" />`,
  },
  {
    component: "PasswordInput",
    title: "Password field",
    description: "Use the password preset when Input needs a reveal toggle and password-safe defaults.",
    language: "tsx",
    variant: "basic",
    code: `import { PasswordInput } from "@azamatjurayevdev/azix-ui"

<PasswordInput value={password} onValueChange={setPassword} placeholder="Password" />`,
  },
  {
    component: "NumberInput",
    title: "Parsed numeric value",
    description: "Keep both raw entry and parsed number when needed.",
    language: "tsx",
    variant: "basic",
    code: `import { NumberInput } from "@azamatjurayevdev/azix-ui"

<NumberInput
  min={0}
  step={1}
  value={quantity}
  onNumberChange={setQuantity}
  placeholder="Quantity"
/>`,
  },
  {
    component: "Slider",
    title: "Single-value slider",
    description: "Use the slider when a bounded numeric value should be adjusted visually instead of typed.",
    language: "tsx",
    variant: "basic",
    code: `import { Slider } from "@azamatjurayevdev/azix-ui"

<Slider
  label="Density"
  description="Tune content density."
  min={0}
  max={100}
  defaultValue={64}
  showValue
/>`,
  },
  {
    component: "RangeSlider",
    title: "Range slider",
    description: "Use the range slider when one surface should control a min and max bound together.",
    language: "tsx",
    variant: "basic",
    code: `import { RangeSlider } from "@azamatjurayevdev/azix-ui"

<RangeSlider
  label="Revenue range"
  description="Filter between two values."
  min={0}
  max={100}
  defaultValue={[20, 80]}
  showValue
/>`,
  },
  {
    component: "Rating",
    title: "Rating input",
    description: "Use rating for compact sentiment, score, or review capture.",
    language: "tsx",
    variant: "basic",
    code: `import { Rating } from "@azamatjurayevdev/azix-ui"

<Rating defaultValue={4} labels={{ clear: "Reset" }} />`,
  },
  {
    component: "MaskedInput",
    title: "Custom mask",
    description: "MaskedInput is for custom displayed formatting over a raw string value.",
    language: "tsx",
    variant: "advanced",
    code: `import { MaskedInput } from "@azamatjurayevdev/azix-ui"

<MaskedInput
  value={invoiceCode}
  onValueChange={(masked) => setInvoiceCode(masked)}
  mask={(value) => value.toUpperCase()}
/>`,
  },
  {
    component: "PhoneInput",
    title: "Formatted phone entry",
    description: "Phone input keeps visible formatting while emitting a normalized value.",
    language: "tsx",
    variant: "basic",
    code: `import { PhoneInput } from "@azamatjurayevdev/azix-ui"

<PhoneInput value={phone} onValueChange={(masked) => setPhone(masked)} />`,
  },
  {
    component: "MoneyInput",
    title: "Price field",
    description: "Prefix and suffix keep financial context in the field chrome.",
    language: "tsx",
    variant: "basic",
    code: `import { MoneyInput } from "@azamatjurayevdev/azix-ui"

<MoneyInput
  prefix="$"
  value={price}
  onValueChange={(amount) => setPrice(amount)}
  placeholder="0.00"
/>`,
  },
  {
    component: "QuantityInput",
    title: "Stepper quantity field",
    description: "Use quantity input when typing and step controls should live together.",
    language: "tsx",
    variant: "basic",
    code: `import { QuantityInput } from "@azamatjurayevdev/azix-ui"

<QuantityInput value={count} min={1} max={20} onValueChange={setCount} />`,
  },
  {
    component: "QuantityStepper",
    title: "Stepper-only control",
    description: "Use the stepper when free typing should be avoided entirely.",
    language: "tsx",
    variant: "advanced",
    code: `import { QuantityStepper } from "@azamatjurayevdev/azix-ui"

<QuantityStepper value={count} min={1} max={10} onValueChange={setCount} />`,
  },
  {
    component: "OtpInput",
    title: "Verification code",
    description: "OtpInput handles per-cell focus and paste behavior for short codes.",
    language: "tsx",
    variant: "basic",
    code: `import { OtpInput } from "@azamatjurayevdev/azix-ui"

<OtpInput value={otp} onValueChange={setOtp} length={6} />`,
  },
  {
    component: "ColorInput",
    title: "Native color picker",
    description: "Use the color preset when browser-native selection is sufficient.",
    language: "tsx",
    variant: "basic",
    code: `import { ColorInput } from "@azamatjurayevdev/azix-ui"

<ColorInput value={brandColor} onValueChange={setBrandColor} />`,
  },
  {
    component: "DateInput",
    title: "Simple date capture",
    description: "Use the native wrapper when a full date picker is unnecessary.",
    language: "tsx",
    variant: "basic",
    code: `import { DateInput } from "@azamatjurayevdev/azix-ui"

<DateInput value={startDate} onValueChange={setStartDate} />`,
  },
  {
    component: "DateRangeInput",
    title: "From and to range",
    description: "Use the range preset for lightweight report and filter intervals.",
    language: "tsx",
    variant: "basic",
    code: `import { DateRangeInput } from "@azamatjurayevdev/azix-ui"

<DateRangeInput value={range} onValueChange={setRange} />`,
  },
  {
    component: "FormInput",
    title: "Form field wrapper",
    description: "Use the universal RHF wrapper when field framing and validation should stay consistent.",
    language: "tsx",
    variant: "form",
    code: `import { FormInput } from "@azamatjurayevdev/azix-ui"

<FormInput control={control} name="email" label="Email" placeholder="Email address" />`,
  },
  {
    component: "FormInput",
    title: "Universal search wrapper",
    description: "Use kind switching instead of separate wrapper names for common field variants.",
    language: "tsx",
    variant: "form",
    code: `import { FormInput } from "@azamatjurayevdev/azix-ui"

<FormInput control={control} name="query" kind="search" label="Search" placeholder="Search products..." />`,
  },
  {
    component: "FormInput",
    title: "Universal number wrapper",
    description: "Parsed numeric form state can stay behind the same wrapper contract.",
    language: "tsx",
    variant: "form",
    code: `import { FormInput } from "@azamatjurayevdev/azix-ui"

    <FormInput control={control} name="quantity" kind="number" label="Quantity" min={0} />`,
  },
  {
    component: "FormSearchInput",
    title: "Search alias migration",
    description: "Keep this only while migrating old forms to the universal FormInput entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormSearchInput } from "@azamatjurayevdev/azix-ui"

<FormSearchInput control={control} name="query" label="Search" />

// New work:
// <FormInput control={control} name="query" kind="search" label="Search" />`,
  },
  {
    component: "FormPasswordInput",
    title: "Password alias migration",
    description: "Keep this only while migrating old forms to the universal FormInput entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormPasswordInput } from "@azamatjurayevdev/azix-ui"

<FormPasswordInput control={control} name="password" label="Password" />

// New work:
// <FormInput control={control} name="password" kind="password" label="Password" />`,
  },
  {
    component: "FormNumberInput",
    title: "Number alias migration",
    description: "Keep this only while migrating old forms to the universal FormInput entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormNumberInput } from "@azamatjurayevdev/azix-ui"

<FormNumberInput control={control} name="quantity" label="Quantity" min={0} />

// New work:
// <FormInput control={control} name="quantity" kind="number" label="Quantity" min={0} />`,
  },
  {
    component: "FormPhoneInput",
    title: "Phone alias migration",
    description: "Keep this only while migrating old forms to the universal FormInput entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormPhoneInput } from "@azamatjurayevdev/azix-ui"

<FormPhoneInput control={control} name="phone" label="Phone" />

// New work:
// <FormInput control={control} name="phone" kind="phone" label="Phone" />`,
  },
  {
    component: "FormDateInput",
    title: "Date alias migration",
    description: "Keep this only while migrating old forms to the universal FormInput entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormDateInput } from "@azamatjurayevdev/azix-ui"

<FormDateInput control={control} name="startDate" label="Start date" />

// New work:
// <FormInput control={control} name="startDate" kind="date" label="Start date" />`,
  },
  {
    component: "FormDateRangeInput",
    title: "Form date range",
    description: "Use the plain range wrapper for submitted from/to date objects.",
    language: "tsx",
    variant: "form",
    code: `import { FormDateRangeInput } from "@azamatjurayevdev/azix-ui"

<FormDateRangeInput control={control} name="period" label="Period" />`,
  },
  {
    component: "TagInput",
    title: "Freeform tokens",
    description: "Only reach for TagInput when repeated freeform values are truly required.",
    language: "tsx",
    variant: "advanced",
    code: `import { TagInput } from "@azamatjurayevdev/azix-ui"

<TagInput value={tags} onValueChange={setTags} placeholder="Add tag" />`,
  },

  {
    component: "Select",
    title: "Base select",
    description: "Start with Select first and move into members only when option loading or interaction model changes.",
    language: "tsx",
    variant: "basic",
    code: `import { Select } from "@azamatjurayevdev/azix-ui"

<Select
  value={status}
  onValueChange={setStatus}
  options={[
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" },
  ]}
/>`,
  },
  {
    component: "Select",
    title: "Searchable primary select",
    description: "Keep local filtering on the main Select surface before reaching for AsyncSelect or Combobox.",
    language: "tsx",
    variant: "advanced",
    code: `import { Select } from "@azamatjurayevdev/azix-ui"

<Select
  value={owner}
  onValueChange={setOwner}
  searchable
  placeholder="Choose owner"
  options={ownerOptions}
/>`,
  },
  {
    component: "SimpleSelect",
    title: "Static options",
    description: "Use the static-options helper when teams want a thinner wrapper around the main Select mental model.",
    language: "tsx",
    variant: "basic",
    code: `import { SimpleSelect } from "@azamatjurayevdev/azix-ui"

<SimpleSelect value={role} onValueChange={setRole} options={roleOptions} />`,
  },
  {
    component: "AsyncSelect",
    title: "Remote search",
    description: "Use the remote member when the main Select surface needs server-backed option loading.",
    language: "tsx",
    variant: "async",
    code: `import { AsyncSelect } from "@azamatjurayevdev/azix-ui"

<AsyncSelect
  value={userId}
  loadOptions={loadUsers}
  onValueChange={setUserId}
  placeholder="Search users..."
/>`,
  },
  {
    component: "AsyncMultiSelect",
    title: "Remote multi select",
    description: "Use the remote multi member when selected tags and async loading should live in one selection flow.",
    language: "tsx",
    variant: "async",
    code: `import { AsyncMultiSelect } from "@azamatjurayevdev/azix-ui"

<AsyncMultiSelect
  value={assigneeIds}
  loadOptions={loadUsers}
  onValueChange={setAssigneeIds}
/>`,
  },
  {
    component: "Combobox",
    title: "Keyboard-first selection",
    description: "Use Combobox only when fast local filtering matters more than the default Select trigger pattern.",
    language: "tsx",
    variant: "basic",
    code: `import { Combobox } from "@azamatjurayevdev/azix-ui"

<Combobox value={country} onValueChange={setCountry} options={countryOptions} />`,
  },
  {
    component: "FormSelect",
    title: "Form select wrapper",
    description: "Use the universal RHF wrapper when select state belongs to submitted form data.",
    language: "tsx",
    variant: "form",
    code: `import { FormSelect } from "@azamatjurayevdev/azix-ui"

<FormSelect control={control} name="role" label="Role" options={roleOptions} />`,
  },
  {
    component: "FormSelect",
    title: "Universal async wrapper",
    description: "Remote option loading can stay behind the same FormSelect contract instead of teaching a new wrapper name first.",
    language: "tsx",
    variant: "form",
    code: `import { FormSelect } from "@azamatjurayevdev/azix-ui"

<FormSelect control={control} name="ownerId" kind="async" label="Owner" loadOptions={loadUsers} />`,
  },
  {
    component: "FormAsyncSelect",
    title: "Async alias migration",
    description: "Keep this only while migrating old forms to the universal FormSelect entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormAsyncSelect } from "@azamatjurayevdev/azix-ui"

<FormAsyncSelect control={control} name="ownerId" label="Owner" loadOptions={loadUsers} />

// New work:
// <FormSelect control={control} name="ownerId" kind="async" label="Owner" loadOptions={loadUsers} />`,
  },

  {
    component: "Card",
    title: "Base card",
    description: "Use the base card when you need one ready surface with token-driven styling and minimal markup.",
    language: "tsx",
    variant: "basic",
    code: `import { Card } from "@azamatjurayevdev/azix-ui"

<Card
  title="Overview"
  description="Weekly revenue summary"
  content="Revenue summary content"
  footer="Updated just now"
/>`,
  },
  {
    component: "InfoCard",
    title: "Metric summary",
    description: "InfoCard is the faster default when the content is already card-shaped.",
    language: "tsx",
    variant: "basic",
    code: `import { InfoCard } from "@azamatjurayevdev/azix-ui"

<InfoCard title="Revenue" description="Current month" content="$48,000" />`,
  },
  {
    component: "StatCard",
    title: "Legacy KPI tile",
    description: "StatCard still works for migration, but new dashboard surfaces should prefer StatisticCard or InfoCard.",
    language: "tsx",
    variant: "migration",
    code: `import { StatCard } from "@azamatjurayevdev/azix-ui"

<StatCard title="Active users" value="1,284" change="+12%" /> // prefer StatisticCard for new work`,
  },
  {
    component: "StatisticCard",
    title: "Structured metric tile",
    description: "Use statistic cards when the metric needs label, value, and support context together.",
    language: "tsx",
    variant: "basic",
    code: `import { StatisticCard } from "@azamatjurayevdev/azix-ui"

<StatisticCard title="Conversion" value="4.8%" description="Last 30 days" />`,
  },
  {
    component: "EntityCard",
    title: "Entity summary",
    description: "Entity cards work well for compact user and record previews.",
    language: "tsx",
    variant: "basic",
    code: `import { EntityCard } from "@azamatjurayevdev/azix-ui"

<EntityCard title="Azamat Jurayev" description="Admin user" />`,
  },
  {
    component: "FileCard",
    title: "Attachment preview",
    description: "Use file cards for uploads and attached resources.",
    language: "tsx",
    variant: "basic",
    code: `import { FileCard } from "@azamatjurayevdev/azix-ui"

<FileCard name="invoice.pdf" size="2.4 MB" />`,
  },
  {
    component: "SmartCard",
    title: "Migration example",
    description: "This exists for legacy migration and should not lead new docs.",
    language: "tsx",
    variant: "migration",
    code: `import { SmartCard } from "@azamatjurayevdev/azix-ui"

<SmartCard title="Legacy surface" description="Prefer InfoCard for new work." />`,
  },

  {
    component: "Badge",
    title: "Status through props",
    description: "Use Badge props instead of a separate status component.",
    language: "tsx",
    variant: "basic",
    code: `import { Badge } from "@azamatjurayevdev/azix-ui"

<Badge tone="success" dot>Active</Badge>`,
  },
  {
    component: "Dialog",
    title: "Blocking task dialog",
    description: "Use Dialog when focus should stay inside the modal task.",
    language: "tsx",
    variant: "basic",
    code: `import { Dialog, DialogContent, DialogTitle, DialogTrigger, Button } from "@azamatjurayevdev/azix-ui"

<Dialog>
  <DialogTrigger render={<Button>Edit</Button>} />
  <DialogContent>
    <DialogTitle>Edit customer</DialogTitle>
  </DialogContent>
</Dialog>`,
  },
  {
    component: "Popover",
    title: "Anchored content",
    description: "Use Popover for rich contextual content attached to a trigger.",
    language: "tsx",
    variant: "basic",
    code: `import { Popover, PopoverContent, PopoverTrigger, Button } from "@azamatjurayevdev/azix-ui"

<Popover>
  <PopoverTrigger render={<Button variant="outline">Filters</Button>} />
  <PopoverContent>Filter controls</PopoverContent>
</Popover>`,
  },
  {
    component: "DropdownMenu",
    title: "Action menu",
    description: "Use DropdownMenu for command lists and compact actions.",
    language: "tsx",
    variant: "basic",
    code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Button } from "@azamatjurayevdev/azix-ui"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  {
    component: "Tooltip",
    title: "Short helper text",
    description: "Use Tooltip only for brief supporting copy.",
    language: "tsx",
    variant: "basic",
    code: `import { Tooltip, Button } from "@azamatjurayevdev/azix-ui"

<Tooltip content="Export selected rows">
  <Button>Export</Button>
</Tooltip>`,
  },
  {
    component: "HoverCard",
    title: "Rich hover preview",
    description: "Use HoverCard when hover or focus should reveal richer preview content than a tooltip.",
    language: "tsx",
    variant: "basic",
    code: `import { HoverCard, Button } from "@azamatjurayevdev/azix-ui"

<HoverCard
  content={
    <div className="space-y-1">
      <p className="font-medium">Azamat UI</p>
      <p className="text-sm text-muted-foreground">Dashboard-focused React component library.</p>
    </div>
  }
>
  <Button variant="outline">Preview package</Button>
</HoverCard>`,
  },
  {
    component: "RightClickMenu",
    title: "Context menu",
    description: "Use right-click menus as secondary shortcuts.",
    language: "tsx",
    variant: "basic",
    code: `import { RightClickMenu } from "@azamatjurayevdev/azix-ui"

<RightClickMenu items={[{ key: "copy", label: "Copy" }]}>
  <div>Right click this row</div>
</RightClickMenu>`,
  },
  {
    component: "AlertDialog",
    title: "Destructive confirmation",
    description: "Use AlertDialog for high-risk confirmation flows.",
    language: "tsx",
    variant: "basic",
    code: `import { AlertDialog, Button } from "@azamatjurayevdev/azix-ui"

<AlertDialog title="Delete project?" actionLabel="Delete">
  <Button variant="destructive">Delete</Button>
</AlertDialog>`,
  },
  {
    component: "ConfirmDialog",
    title: "Confirm action",
    description: "Use ConfirmDialog for reusable approval and submit confirmations.",
    language: "tsx",
    variant: "basic",
    code: `import { ConfirmDialog, Button } from "@azamatjurayevdev/azix-ui"

<ConfirmDialog title="Publish changes?" confirmLabel="Publish">
  <Button>Publish</Button>
</ConfirmDialog>`,
  },
  {
    component: "ModalShell",
    title: "Structured modal",
    description: "Use ModalShell when repeated modals need title, body and footer slots.",
    language: "tsx",
    variant: "basic",
    code: `import { ModalShell, Button } from "@azamatjurayevdev/azix-ui"

<ModalShell title="Invite member" trigger={<Button>Invite</Button>}>
  Invite form
</ModalShell>`,
  },
  {
    component: "SheetShell",
    title: "Side sheet",
    description: "Use SheetShell for edge-attached contextual workflows.",
    language: "tsx",
    variant: "basic",
    code: `import { SheetShell, Button } from "@azamatjurayevdev/azix-ui"

<SheetShell side="right" title="Filters" trigger={<Button>Open filters</Button>}>
  Filter controls
</SheetShell>`,
  },
  {
    component: "Drawer",
    title: "Detail drawer",
    description: "Use Drawer for record details without leaving the page.",
    language: "tsx",
    variant: "basic",
    code: `import { Drawer, Button } from "@azamatjurayevdev/azix-ui"

<Drawer title="Customer" trigger={<Button>Open customer</Button>}>
  Customer details
</Drawer>`,
  },
  {
    component: "DialogActions",
    title: "Footer actions",
    description: "Use DialogActions to keep modal footers aligned.",
    language: "tsx",
    variant: "basic",
    code: `import { DialogActions, Button } from "@azamatjurayevdev/azix-ui"

<DialogActions>
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</DialogActions>`,
  },
  {
    component: "FormFieldShell",
    title: "Custom field shell",
    description: "Use the shell when you are composing a custom control by hand.",
    language: "tsx",
    variant: "basic",
    code: `import { FormFieldShell, Input } from "@azamatjurayevdev/azix-ui"

<FormFieldShell label="Workspace name" description="Shown across the admin panel.">
  <Input placeholder="Acme HQ" />
</FormFieldShell>`,
  },
  {
    component: "FormTextarea",
    title: "Textarea wrapper",
    description: "Textarea wrapper keeps validation and copy aligned with other fields.",
    language: "tsx",
    variant: "form",
    code: `import { FormTextarea } from "@azamatjurayevdev/azix-ui"

<FormTextarea control={control} name="notes" label="Notes" rows={4} />`,
  },
  {
    component: "FormSwitch",
    title: "Boolean field",
    description: "Switch wrappers keep label and description wiring aligned with other form fields.",
    language: "tsx",
    variant: "form",
    code: `import { FormSwitch } from "@azamatjurayevdev/azix-ui"

<FormSwitch control={control} name="isActive" label="Active" />`,
  },
  {
    component: "FormDatePicker",
    title: "Calendar date field",
    description: "Use the calendar wrapper when native date input is too limited.",
    language: "tsx",
    variant: "form",
    code: `import { FormDatePicker } from "@azamatjurayevdev/azix-ui"

<FormDatePicker control={control} name="birthday" label="Birthday" />`,
  },
  {
    component: "FormDateRangePicker",
    title: "Calendar range field",
    description: "Use the range picker wrapper for visual date interval selection.",
    language: "tsx",
    variant: "form",
    code: `import { FormDateRangePicker } from "@azamatjurayevdev/azix-ui"

<FormDateRangePicker control={control} name="reportingRange" label="Reporting range" />`,
  },
  {
    component: "FormBuilder",
    title: "Higher-level form builder",
    description: "FormBuilder is for repeated internal patterns, not simple one-off forms.",
    language: "tsx",
    variant: "advanced",
    code: `import { FormBuilder } from "@azamatjurayevdev/azix-ui"

<FormBuilder
  control={control}
  fields={[{ name: "email", type: "input", label: "Email" }]}
/>`,
  },
  {
    component: "DataTable",
    title: "Canonical table",
    description: "DataTable owns the main grid surface and table orchestration.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTable } from "@azamatjurayevdev/azix-ui"

<DataTable columns={columns} data={rows} />`,
  },
  {
    component: "DataTableToolbar",
    title: "Toolbar composition",
    description: "Use the toolbar helper for consistent filters and actions around the grid.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTableToolbar, SearchInput } from "@azamatjurayevdev/azix-ui"

<DataTableToolbar title="Orders" search={<SearchInput placeholder="Search orders..." />} />`,
  },
  {
    component: "DataTablePagination",
    title: "Pagination controls",
    description: "Use the shared pagination helper to keep table paging UI consistent.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTablePagination } from "@azamatjurayevdev/azix-ui"

<DataTablePagination pageIndex={pageIndex} pageCount={pageCount} onPageChange={setPageIndex} />`,
  },
  {
    component: "DataTableColumnVisibilityMenu",
    title: "Hide and show columns",
    description: "Column visibility helpers keep personalization aligned with the table system.",
    language: "tsx",
    variant: "advanced",
    code: `import { DataTableColumnVisibilityMenu } from "@azamatjurayevdev/azix-ui"

<DataTableColumnVisibilityMenu table={table} />`,
  },
  {
    component: "DataTableSortableHeader",
    title: "Sortable header",
    description: "Use the shared header helper instead of custom sort indicator plumbing.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTableSortableHeader } from "@azamatjurayevdev/azix-ui"

header: ({ column }) => <DataTableSortableHeader column={column}>Name</DataTableSortableHeader>`,
  },
  {
    component: "DataTableRowActions",
    title: "Row actions menu",
    description: "Use shared row actions when each record needs contextual operations.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTableRowActions } from "@azamatjurayevdev/azix-ui"

<DataTableRowActions actions={[{ key: "edit", label: "Edit", onSelect: openEdit }]} />`,
  },
  {
    component: "DataTableBulkActions",
    title: "Bulk actions bar",
    description: "Bulk actions should appear only when a selection exists.",
    language: "tsx",
    variant: "advanced",
    code: `import { DataTableBulkActions } from "@azamatjurayevdev/azix-ui"

<DataTableBulkActions rows={selectedRows} actions={[{ key: "delete", label: "Delete selected", onSelect: removeMany }]} />`,
  },
  {
    component: "DataTableViewPresets",
    title: "Preset views",
    description: "Use view presets when users switch between saved table perspectives.",
    language: "tsx",
    variant: "advanced",
    code: `import { DataTableViewPresets } from "@azamatjurayevdev/azix-ui"

<DataTableViewPresets presets={presets} value={activePreset} onValueChange={setActivePreset} />`,
  },
  {
    component: "createDataTableSelectColumn",
    title: "Selection column factory",
    description: "Use the factory to keep row-selection behavior standardized.",
    language: "tsx",
    variant: "advanced",
    code: `import { createDataTableSelectColumn } from "@azamatjurayevdev/azix-ui"

const selectColumn = createDataTableSelectColumn()`,
  },
  {
    component: "createDataTableActionsColumn",
    title: "Shared actions column",
    description: "Column factories reduce repeated row action boilerplate.",
    language: "tsx",
    variant: "advanced",
    code: `import { createDataTableActionsColumn } from "@azamatjurayevdev/azix-ui"

const actionsColumn = createDataTableActionsColumn({
  getActions: (_row, order) => [{ key: "open", label: "Open", onSelect: () => openOrder(order) }],
})`,
  },
  {
    component: "TableExportMenu",
    title: "Advanced export flow",
    description: "Keep export helpers secondary to the core table experience.",
    language: "tsx",
    variant: "advanced",
    code: `import { TableExportMenu } from "@azamatjurayevdev/azix-ui"

<TableExportMenu options={[{ key: "csv", label: "Export CSV", onSelect: exportCsv }]} />`,
  },
  {
    component: "TableImportButton",
    title: "Import trigger",
    description: "Keep import controls secondary to the main grid experience.",
    language: "tsx",
    variant: "advanced",
    code: `import { TableImportButton } from "@azamatjurayevdev/azix-ui"

<TableImportButton onFilesSelect={handleImport} />`,
  },
  {
    component: "Input",
    title: "CLI add",
    description: "Copy the input source into your app.",
    language: "cli",
    variant: "cli",
    code: `npx @azamatjurayevdev/azix-ui add input`,
  },
  {
    component: "InlineEditable",
    title: "Inline edit field",
    description: "Click-to-edit inline text. Commits on Enter or blur, cancels on Escape.",
    language: "tsx",
    variant: "basic",
    code: `import { InlineEditable } from "@azamatjurayevdev/azix-ui"

<InlineEditable value={name} onValueChange={setName} placeholder="Click to edit" />`,
  },
  {
    component: "TrendCard",
    title: "Metric with sparkline",
    description: "Dashboard metric card showing trend direction and optional sparkline.",
    language: "tsx",
    variant: "basic",
    code: `import { TrendCard } from "@azamatjurayevdev/azix-ui"

<TrendCard title="Revenue" value="$45,231" change="+12.5%" trend="up" sparkline={[10, 20, 15, 25, 30]} />`,
  },
  {
    component: "ComparisonCard",
    title: "Side-by-side metrics",
    description: "Compare multiple related metrics in one card.",
    language: "tsx",
    variant: "basic",
    code: `import { ComparisonCard } from "@azamatjurayevdev/azix-ui"

<ComparisonCard
  title="Q1 vs Q2"
  items={[
    { label: "Revenue", value: "$45k", change: "+12%", trend: "up" },
    { label: "Expenses", value: "$32k", change: "-3%", trend: "down" },
  ]}
/>`,
  },
  {
    component: "DeltaBadge",
    title: "Inline trend badge",
    description: "Show positive or negative change inline.",
    language: "tsx",
    variant: "basic",
    code: `import { DeltaBadge } from "@azamatjurayevdev/azix-ui"

<DeltaBadge value="+12.5%" trend="up" />
<DeltaBadge value="-3.2%" trend="down" />`,
  },
  {
    component: "RepeaterField",
    title: "Dynamic form array",
    description: "Add and remove repeated field groups in a form.",
    language: "tsx",
    variant: "basic",
    code: `import { RepeaterField } from "@azamatjurayevdev/azix-ui"

<RepeaterField
  value={items}
  onValueChange={setItems}
  createItem={() => ({ name: "" })}
  renderItem={(item, i, { remove, update }) => (
    <div className="flex gap-2">
      <input value={item.name} onChange={e => update({ name: e.target.value })} />
      <button onClick={remove}>Remove</button>
    </div>
  )}
/>`,
  },
  {
    component: "Button",
    title: "Primary action",
    description: "Use Button as the first action surface before reaching for grouped or menu patterns.",
    language: "tsx",
    variant: "basic",
    code: `import { Button } from "@azamatjurayevdev/azix-ui"

<Button>Save changes</Button>`,
  },
  {
    component: "ActionMenu",
    title: "Compact actions",
    description: "Group several actions behind one trigger when the surface should stay compact.",
    language: "tsx",
    variant: "basic",
    code: `import { ActionMenu } from "@azamatjurayevdev/azix-ui"

<ActionMenu
  actions={[
    { key: "edit", label: "Edit", onSelect: () => console.log("edit") },
    { key: "archive", label: "Archive", onSelect: () => console.log("archive") },
  ]}
/>`,
  },
  {
    component: "CopyButton",
    title: "Copy action",
    description: "Use CopyButton for IDs, links, and tokens that need one-tap copy feedback.",
    language: "tsx",
    variant: "basic",
    code: `import { CopyButton } from "@azamatjurayevdev/azix-ui"

<CopyButton value="inv_2481" copyLabel="Copy invoice id" />`,
  },
  {
    component: "ButtonGroup",
    title: "Grouped actions",
    description: "Keep related actions visually aligned without inventing a new primary trigger.",
    language: "tsx",
    variant: "basic",
    code: `import { Button, ButtonGroup } from "@azamatjurayevdev/azix-ui"

<ButtonGroup>
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</ButtonGroup>`,
  },
  {
    component: "CopyField",
    title: "Copy row",
    description: "Show a visible value and copy affordance in one compact pattern.",
    language: "tsx",
    variant: "basic",
    code: `import { CopyField } from "@azamatjurayevdev/azix-ui"

<CopyField label="API key" value="sk_live_xxx" />`,
  },
  {
    component: "QuickActionGrid",
    title: "Shortcut board",
    description: "Use a quick grid when several small actions should stay visible together.",
    language: "tsx",
    variant: "basic",
    code: `import { QuickActionGrid } from "@azamatjurayevdev/azix-ui"

<QuickActionGrid
  actions={[
    { key: "invite", label: "Invite" },
    { key: "export", label: "Export" },
    { key: "archive", label: "Archive" },
  ]}
/>`,
  },
  {
    component: "Alert",
    title: "Inline status",
    description: "Use Alert for information, success, warning, or error states inside the page flow.",
    language: "tsx",
    variant: "basic",
    code: `import { Alert } from "@azamatjurayevdev/azix-ui"

<Alert tone="warning" title="Unsaved changes" description="Save before leaving this page." />`,
  },
  {
    component: "EmptyState",
    title: "No data state",
    description: "Use EmptyState when a view needs a stronger zero-data message than a plain paragraph.",
    language: "tsx",
    variant: "basic",
    code: `import { EmptyState } from "@azamatjurayevdev/azix-ui"

<EmptyState title="No customers yet" description="Add your first customer to start tracking revenue." />`,
  },
  {
    component: "LoadingState",
    title: "Structured loading",
    description: "Prefer LoadingState when loading should include context, not only motion.",
    language: "tsx",
    variant: "basic",
    code: `import { LoadingState } from "@azamatjurayevdev/azix-ui"

<LoadingState label="Loading revenue report..." description="Gathering the latest month-to-date numbers." />`,
  },
  {
    component: "Progress",
    title: "Completion bar",
    description: "Use Progress for visible task, upload, or rollout completion.",
    language: "tsx",
    variant: "basic",
    code: `import { Progress } from "@azamatjurayevdev/azix-ui"

<Progress value={72} label="Upload progress" />`,
  },
  {
    component: "ToastProvider",
    title: "Notification host",
    description: "Mount the provider once near the app root so features can dispatch toast feedback.",
    language: "tsx",
    variant: "basic",
    code: `import { ToastProvider } from "@azamatjurayevdev/azix-ui"

<ToastProvider position="top-right">
  <App />
</ToastProvider>`,
  },
  {
    component: "InlineState",
    title: "Compact feedback row",
    description: "Use InlineState when a card or side panel needs a smaller status treatment.",
    language: "tsx",
    variant: "basic",
    code: `import { InlineState } from "@azamatjurayevdev/azix-ui"

<InlineState tone="info" title="Syncing changes" description="This may take a few seconds." />`,
  },
  {
    component: "LoadingOverlay",
    title: "Blocking local loading",
    description: "Keep the surface visible while preventing interaction during a local loading phase.",
    language: "tsx",
    variant: "basic",
    code: `import { LoadingOverlay } from "@azamatjurayevdev/azix-ui"

<LoadingOverlay loading label="Saving changes...">
  <section>Form content</section>
</LoadingOverlay>`,
  },
  {
    component: "Spinner",
    title: "Minimal loading",
    description: "Use Spinner only when a tiny loading affordance is enough.",
    language: "tsx",
    variant: "basic",
    code: `import { Spinner } from "@azamatjurayevdev/azix-ui"

<Spinner label="Loading invoices" />`,
  },
  {
    component: "Skeleton",
    title: "Loading placeholder",
    description: "Keep structure visible while data is loading.",
    language: "tsx",
    variant: "basic",
    code: `import { Skeleton } from "@azamatjurayevdev/azix-ui"

<Skeleton className="h-10 w-full" />`,
  },
  {
    component: "useToast",
    title: "Dispatch a toast",
    description: "Use the hook after ToastProvider is mounted to trigger transient feedback.",
    language: "tsx",
    variant: "advanced",
    code: `import { Button, useToast } from "@azamatjurayevdev/azix-ui"

function SaveButton() {
  const { push } = useToast()

  return <Button onClick={() => push({ title: "Saved", description: "Your changes are live." })}>Save</Button>
}`,
  },
  {
    component: "BarChart",
    title: "Category comparison",
    description: "Use a bar chart when categories should be scanned and compared quickly.",
    language: "tsx",
    variant: "basic",
    code: `import { BarChart } from "@azamatjurayevdev/azix-ui"

<BarChart data={[{ label: "Jan", value: 12 }, { label: "Feb", value: 18 }, { label: "Mar", value: 15 }]} />`,
  },
  {
    component: "LineChart",
    title: "Trend line",
    description: "Use a line chart for ordered values or time-series movement.",
    language: "tsx",
    variant: "basic",
    code: `import { LineChart } from "@azamatjurayevdev/azix-ui"

<LineChart values={[12, 16, 18, 15, 22, 24]} showArea />`,
  },
  {
    component: "DonutChart",
    title: "Part to whole",
    description: "Use a donut chart when a compact proportional split needs one central summary.",
    language: "tsx",
    variant: "basic",
    code: `import { DonutChart } from "@azamatjurayevdev/azix-ui"

<DonutChart
  data={[
    { label: "Paid", value: 72, color: "var(--chart-1)" },
    { label: "Pending", value: 18, color: "var(--chart-2)" },
    { label: "Refunded", value: 10, color: "var(--chart-3)" },
  ]}
  centerLabel="Orders"
  centerValue="248"
/>`,
  },
  {
    component: "MetricGrid",
    title: "KPI grid",
    description: "Use MetricGrid to keep related KPIs aligned in one responsive surface.",
    language: "tsx",
    variant: "basic",
    code: `import { MetricGrid } from "@azamatjurayevdev/azix-ui"

<MetricGrid columns={3}>
  <div>Revenue</div>
  <div>MRR</div>
  <div>Churn</div>
</MetricGrid>`,
  },
  {
    component: "ChartFrame",
    title: "Chart shell",
    description: "Frame chart content with consistent heading and action chrome.",
    language: "tsx",
    variant: "basic",
    code: `import { BarChart, ChartFrame } from "@azamatjurayevdev/azix-ui"

<ChartFrame title="Revenue by month" description="Last 6 months">
  <BarChart data={[{ label: "Jan", value: 12 }, { label: "Feb", value: 18 }]} />
</ChartFrame>`,
  },
  {
    component: "ChartLegend",
    title: "Series legend",
    description: "Explicitly map series names to colors when the chart needs a legend.",
    language: "tsx",
    variant: "basic",
    code: `import { ChartLegend } from "@azamatjurayevdev/azix-ui"

<ChartLegend
  data={[
    { label: "Paid", color: "var(--chart-1)" },
    { label: "Pending", color: "var(--chart-2)" },
  ]}
/>`,
  },
  {
    component: "Sparkline",
    title: "Micro trend",
    description: "Use Sparkline when a small historical hint should sit beside a KPI.",
    language: "tsx",
    variant: "basic",
    code: `import { Sparkline } from "@azamatjurayevdev/azix-ui"

<Sparkline values={[5, 8, 7, 12, 11, 15]} />`,
  },
  {
    component: "MetricTrend",
    title: "Metric with movement",
    description: "Bundle current value, delta, and mini-trend in one metric block.",
    language: "tsx",
    variant: "basic",
    code: `import { MetricTrend } from "@azamatjurayevdev/azix-ui"

<MetricTrend label="MRR" value="$24,880" change="+8.1%" values={[14, 16, 17, 19, 21, 24]} />`,
  },
  {
    component: "Statistic",
    title: "Single statistic",
    description: "Use Statistic for one structured KPI readout with support text.",
    language: "tsx",
    variant: "basic",
    code: `import { Statistic } from "@azamatjurayevdev/azix-ui"

<Statistic label="Active accounts" value="1,248" description="Compared to last week" />`,
  },
  {
    component: "StatisticGrid",
    title: "Statistics grid",
    description: "Align several structured statistics in one grouped layout.",
    language: "tsx",
    variant: "basic",
    code: `import { StatisticGrid } from "@azamatjurayevdev/azix-ui"

<StatisticGrid items={[{ label: "MRR", value: "$18k" }, { label: "Churn", value: "2.1%" }]} />`,
  },
  {
    component: "Sidebar",
    title: "Primary app navigation",
    description: "Use Sidebar for persistent workspace navigation and nested sections.",
    language: "tsx",
    variant: "basic",
    code: `import { Sidebar } from "@azamatjurayevdev/azix-ui"

<Sidebar
  items={[
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Customers", href: "/customers" },
  ]}
/>`,
  },
  {
    component: "PageContainer",
    title: "Page width rhythm",
    description: "Use PageContainer to keep horizontal page spacing consistent.",
    language: "tsx",
    variant: "basic",
    code: `import { PageContainer } from "@azamatjurayevdev/azix-ui"

<PageContainer size="lg">
  <section>Page content</section>
</PageContainer>`,
  },
  {
    component: "Tabs",
    title: "Section switcher",
    description: "Use Tabs for a small set of peer views without leaving the page.",
    language: "tsx",
    variant: "basic",
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@azamatjurayevdev/azix-ui"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
</Tabs>`,
  },
  {
    component: "Pagination",
    title: "Paged results",
    description: "Move through indexed result sets with one reusable pagination surface.",
    language: "tsx",
    variant: "basic",
    code: `import { Pagination } from "@azamatjurayevdev/azix-ui"

<Pagination page={2} totalPages={12} onPageChange={setPage} />`,
  },
  {
    component: "Breadcrumbs",
    title: "Location trail",
    description: "Show the current nested path back through the app structure.",
    language: "tsx",
    variant: "basic",
    code: `import { Breadcrumbs } from "@azamatjurayevdev/azix-ui"

<Breadcrumbs items={[{ label: "Workspace", href: "/" }, { label: "Customers", href: "/customers" }, { label: "Acme Corp" }]} />`,
  },
  {
    component: "Wizard",
    title: "Multi-step flow",
    description: "Use Wizard when the product needs a guided, step-by-step completion flow.",
    language: "tsx",
    variant: "basic",
    code: `import { Wizard } from "@azamatjurayevdev/azix-ui"

<Wizard steps={[{ id: "account", label: "Account" }, { id: "billing", label: "Billing" }]} currentStep={0} />`,
  },
  {
    component: "Section",
    title: "Page subsection",
    description: "Group related page content without promoting it to a primary route.",
    language: "tsx",
    variant: "basic",
    code: `import { Section } from "@azamatjurayevdev/azix-ui"

<Section title="Billing" description="Manage invoice and payment settings.">
  Billing content
</Section>`,
  },
  {
    component: "AnchorNav",
    title: "In-page sections",
    description: "Jump between sections inside a long detail page.",
    language: "tsx",
    variant: "basic",
    code: `import { AnchorNav } from "@azamatjurayevdev/azix-ui"

<AnchorNav items={[{ id: "overview", label: "Overview" }, { id: "activity", label: "Activity" }]} />`,
  },
  {
    component: "Stepper",
    title: "Step progress",
    description: "Use Stepper when the UI needs visible progress without the full Wizard shell.",
    language: "tsx",
    variant: "basic",
    code: `import { Stepper } from "@azamatjurayevdev/azix-ui"

<Stepper steps={[{ id: "account", label: "Account" }, { id: "billing", label: "Billing" }]} currentStep={1} />`,
  },
  {
    component: "StepperTabs",
    title: "Step tabs",
    description: "Use StepperTabs when sections read like steps but still switch like tabs.",
    language: "tsx",
    variant: "basic",
    code: `import { StepperTabs } from "@azamatjurayevdev/azix-ui"

<StepperTabs items={[{ value: "profile", label: "Profile" }, { value: "security", label: "Security" }]} value="profile" />`,
  },
  {
    component: "SegmentedControl",
    title: "Compact switcher",
    description: "Use SegmentedControl for very small mutually exclusive sets.",
    language: "tsx",
    variant: "basic",
    code: `import { SegmentedControl } from "@azamatjurayevdev/azix-ui"

<SegmentedControl options={[{ label: "Day", value: "day" }, { label: "Week", value: "week" }]} value="week" />`,
  },
  {
    component: "FileUpload",
    title: "Generic file flow",
    description: "Use FileUpload when users should add, review, and remove uploaded files in one place.",
    language: "tsx",
    variant: "basic",
    code: `import { FileUpload } from "@azamatjurayevdev/azix-ui"

<FileUpload multiple maxFiles={5} />`,
  },
  {
    component: "ImageUpload",
    title: "Image-specific upload",
    description: "Use ImageUpload when previews and image-oriented UX matter.",
    language: "tsx",
    variant: "basic",
    code: `import { ImageUpload } from "@azamatjurayevdev/azix-ui"

<ImageUpload maxFiles={1} />`,
  },
  {
    component: "Checkbox",
    title: "Binary selection",
    description: "Use Checkbox for explicit checked and indeterminate selection states.",
    language: "tsx",
    variant: "basic",
    code: `import { Checkbox } from "@azamatjurayevdev/azix-ui"

<Checkbox checked={selected} onCheckedChange={setSelected} />`,
  },
  {
    component: "RadioGroup",
    title: "Single choice set",
    description: "Use RadioGroup when exactly one visible option should be selected.",
    language: "tsx",
    variant: "basic",
    code: `import { RadioGroup } from "@azamatjurayevdev/azix-ui"

<RadioGroup value="monthly" onValueChange={setBillingCycle} options={[{ label: "Monthly", value: "monthly" }, { label: "Yearly", value: "yearly" }]} />`,
  },
  {
    component: "Switch",
    title: "Immediate toggle",
    description: "Use Switch when turning a setting on or off should feel direct and lightweight.",
    language: "tsx",
    variant: "basic",
    code: `import { Switch } from "@azamatjurayevdev/azix-ui"

<Switch checked={enabled} onCheckedChange={setEnabled} />`,
  },
  {
    component: "Table",
    title: "Base table",
    description: "Use Table when rows are simple enough that a full DataTable would be too heavy.",
    language: "tsx",
    variant: "basic",
    code: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@azamatjurayevdev/azix-ui"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Acme</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  {
    component: "Accordion",
    title: "Expandable sections",
    description: "Use Accordion when stacked content should reveal details inline.",
    language: "tsx",
    variant: "basic",
    code: `import { Accordion } from "@azamatjurayevdev/azix-ui"

<Accordion items={[{ value: "shipping", title: "Shipping", content: "2-3 business days" }]} />`,
  },
  {
    component: "Collapse",
    title: "Low-level disclosure",
    description: "Use Collapse when you need raw expand and collapse behavior without Accordion’s higher-level API.",
    language: "tsx",
    variant: "basic",
    code: `import { Collapse, CollapseContent, CollapseTrigger } from "@azamatjurayevdev/azix-ui"

<Collapse>
  <CollapseTrigger>Toggle details</CollapseTrigger>
  <CollapseContent>Hidden content</CollapseContent>
</Collapse>`,
  },
  {
    component: "Calendar",
    title: "Raw calendar",
    description: "Use Calendar when a custom date surface needs the primitive calendar control.",
    language: "tsx",
    variant: "basic",
    code: `import { Calendar } from "@azamatjurayevdev/azix-ui"

<Calendar mode="single" selected={date} onSelect={setDate} />`,
  },
  {
    component: "Divider",
    title: "Section separator",
    description: "Use Divider when content groups need a subtle visual boundary.",
    language: "tsx",
    variant: "basic",
    code: `import { Divider } from "@azamatjurayevdev/azix-ui"

<Divider />`,
  },
  {
    component: "Kbd",
    title: "Shortcut token",
    description: "Show keyboard shortcuts with one consistent keycap style.",
    language: "tsx",
    variant: "basic",
    code: `import { Kbd } from "@azamatjurayevdev/azix-ui"

<Kbd>Ctrl</Kbd>`,
  },
  {
    component: "ScrollBox",
    title: "Local scroll area",
    description: "Use ScrollBox when a panel should scroll internally instead of growing the whole page.",
    language: "tsx",
    variant: "basic",
    code: `import { ScrollBox } from "@azamatjurayevdev/azix-ui"

<ScrollBox maxHeight={280}>
  <div>Scrollable content</div>
</ScrollBox>`,
  },
] as const

