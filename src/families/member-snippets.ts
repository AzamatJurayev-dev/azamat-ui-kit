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
    description: "Start with the base input before reaching for presets.",
    language: "tsx",
    variant: "basic",
    code: `import { Input } from "azamat-ui-kit"

<Input placeholder="Email address" />`,
  },
  {
    component: "SearchInput",
    title: "Search filter",
    description: "Use the search preset for list and table filtering.",
    language: "tsx",
    variant: "basic",
    code: `import { SearchInput } from "azamat-ui-kit"

<SearchInput value={query} onValueChange={setQuery} placeholder="Search products..." />`,
  },
  {
    component: "ClearableInput",
    title: "Clearable field",
    description: "Use the clearable preset when reset should stay inside the input chrome.",
    language: "tsx",
    variant: "basic",
    code: `import { ClearableInput } from "azamat-ui-kit"

<ClearableInput value={keyword} onValueChange={setKeyword} placeholder="Keyword" />`,
  },
  {
    component: "PasswordInput",
    title: "Password field",
    description: "Use the password preset when reveal and hide behavior matters.",
    language: "tsx",
    variant: "basic",
    code: `import { PasswordInput } from "azamat-ui-kit"

<PasswordInput value={password} onValueChange={setPassword} placeholder="Password" />`,
  },
  {
    component: "NumberInput",
    title: "Parsed numeric value",
    description: "Keep both raw entry and parsed number when needed.",
    language: "tsx",
    variant: "basic",
    code: `import { NumberInput } from "azamat-ui-kit"

<NumberInput
  min={0}
  step={1}
  value={quantity}
  onNumberChange={setQuantity}
  placeholder="Quantity"
/>`,
  },
  {
    component: "MaskedInput",
    title: "Custom mask",
    description: "MaskedInput is for custom displayed formatting over a raw string value.",
    language: "tsx",
    variant: "advanced",
    code: `import { MaskedInput } from "azamat-ui-kit"

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
    code: `import { PhoneInput } from "azamat-ui-kit"

<PhoneInput value={phone} onValueChange={(masked) => setPhone(masked)} />`,
  },
  {
    component: "MoneyInput",
    title: "Price field",
    description: "Prefix and suffix keep financial context in the field chrome.",
    language: "tsx",
    variant: "basic",
    code: `import { MoneyInput } from "azamat-ui-kit"

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
    code: `import { QuantityInput } from "azamat-ui-kit"

<QuantityInput value={count} min={1} max={20} onValueChange={setCount} />`,
  },
  {
    component: "QuantityStepper",
    title: "Stepper-only control",
    description: "Use the stepper when free typing should be avoided entirely.",
    language: "tsx",
    variant: "advanced",
    code: `import { QuantityStepper } from "azamat-ui-kit"

<QuantityStepper value={count} min={1} max={10} onValueChange={setCount} />`,
  },
  {
    component: "OtpInput",
    title: "Verification code",
    description: "OtpInput handles per-cell focus and paste behavior for short codes.",
    language: "tsx",
    variant: "basic",
    code: `import { OtpInput } from "azamat-ui-kit"

<OtpInput value={otp} onValueChange={setOtp} length={6} />`,
  },
  {
    component: "ColorInput",
    title: "Native color picker",
    description: "Use the color preset when browser-native selection is sufficient.",
    language: "tsx",
    variant: "basic",
    code: `import { ColorInput } from "azamat-ui-kit"

<ColorInput value={brandColor} onValueChange={setBrandColor} />`,
  },
  {
    component: "DateInput",
    title: "Simple date capture",
    description: "Use the native wrapper when a full date picker is unnecessary.",
    language: "tsx",
    variant: "basic",
    code: `import { DateInput } from "azamat-ui-kit"

<DateInput value={startDate} onValueChange={setStartDate} />`,
  },
  {
    component: "DateRangeInput",
    title: "From and to range",
    description: "Use the range preset for lightweight report and filter intervals.",
    language: "tsx",
    variant: "basic",
    code: `import { DateRangeInput } from "azamat-ui-kit"

<DateRangeInput value={range} onValueChange={setRange} />`,
  },
  {
    component: "FormInput",
    title: "Form field wrapper",
    description: "Use the universal RHF wrapper when field framing and validation should stay consistent.",
    language: "tsx",
    variant: "form",
    code: `import { FormInput } from "azamat-ui-kit"

<FormInput control={control} name="email" label="Email" placeholder="Email address" />`,
  },
  {
    component: "FormInput",
    title: "Universal search wrapper",
    description: "Use kind switching instead of separate wrapper names for common field variants.",
    language: "tsx",
    variant: "form",
    code: `import { FormInput } from "azamat-ui-kit"

<FormInput control={control} name="query" kind="search" label="Search" placeholder="Search products..." />`,
  },
  {
    component: "FormInput",
    title: "Universal number wrapper",
    description: "Parsed numeric form state can stay behind the same wrapper contract.",
    language: "tsx",
    variant: "form",
    code: `import { FormInput } from "azamat-ui-kit"

    <FormInput control={control} name="quantity" kind="number" label="Quantity" min={0} />`,
  },
  {
    component: "FormSearchInput",
    title: "Search alias migration",
    description: "Keep this only while migrating old forms to the universal FormInput entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormSearchInput } from "azamat-ui-kit"

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
    code: `import { FormPasswordInput } from "azamat-ui-kit"

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
    code: `import { FormNumberInput } from "azamat-ui-kit"

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
    code: `import { FormPhoneInput } from "azamat-ui-kit"

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
    code: `import { FormDateInput } from "azamat-ui-kit"

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
    code: `import { FormDateRangeInput } from "azamat-ui-kit"

<FormDateRangeInput control={control} name="period" label="Period" />`,
  },
  {
    component: "TagInput",
    title: "Freeform tokens",
    description: "Only reach for TagInput when repeated freeform values are truly required.",
    language: "tsx",
    variant: "advanced",
    code: `import { TagInput } from "azamat-ui-kit"

<TagInput value={tags} onValueChange={setTags} placeholder="Add tag" />`,
  },

  {
    component: "Select",
    title: "Base select",
    description: "Start with the primitive select for standard single-choice flows.",
    language: "tsx",
    variant: "basic",
    code: `import { Select } from "azamat-ui-kit"

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
    component: "SimpleSelect",
    title: "Static options",
    description: "Use the simple preset for compact static option lists.",
    language: "tsx",
    variant: "basic",
    code: `import { SimpleSelect } from "azamat-ui-kit"

<SimpleSelect value={role} onValueChange={setRole} options={roleOptions} />`,
  },
  {
    component: "AsyncSelect",
    title: "Remote search",
    description: "AsyncSelect should own the remote option loading flow.",
    language: "tsx",
    variant: "async",
    code: `import { AsyncSelect } from "azamat-ui-kit"

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
    description: "Use the async multi preset when selected tags should stay visible.",
    language: "tsx",
    variant: "async",
    code: `import { AsyncMultiSelect } from "azamat-ui-kit"

<AsyncMultiSelect
  value={assigneeIds}
  loadOptions={loadUsers}
  onValueChange={setAssigneeIds}
/>`,
  },
  {
    component: "Combobox",
    title: "Keyboard-first selection",
    description: "Combobox is useful when fast filtering matters more than strict select semantics.",
    language: "tsx",
    variant: "basic",
    code: `import { Combobox } from "azamat-ui-kit"

<Combobox value={country} onValueChange={setCountry} options={countryOptions} />`,
  },
  {
    component: "FormSelect",
    title: "Form select wrapper",
    description: "Use the universal RHF wrapper when select state belongs to submitted form data.",
    language: "tsx",
    variant: "form",
    code: `import { FormSelect } from "azamat-ui-kit"

<FormSelect control={control} name="role" label="Role" options={roleOptions} />`,
  },
  {
    component: "FormSelect",
    title: "Universal async wrapper",
    description: "Remote option loading can stay behind the same select wrapper contract.",
    language: "tsx",
    variant: "form",
    code: `import { FormSelect } from "azamat-ui-kit"

<FormSelect control={control} name="ownerId" kind="async" label="Owner" loadOptions={loadUsers} />`,
  },
  {
    component: "FormAsyncSelect",
    title: "Async alias migration",
    description: "Keep this only while migrating old forms to the universal FormSelect entry.",
    language: "tsx",
    variant: "migration",
    code: `import { FormAsyncSelect } from "azamat-ui-kit"

<FormAsyncSelect control={control} name="ownerId" label="Owner" loadOptions={loadUsers} />

// New work:
// <FormSelect control={control} name="ownerId" kind="async" label="Owner" loadOptions={loadUsers} />`,
  },

  {
    component: "Card",
    title: "Base card",
    description: "Use the base card when you need neutral composition freedom.",
    language: "tsx",
    variant: "basic",
    code: `import { Card, CardContent, CardHeader, CardTitle } from "azamat-ui-kit"

<Card>
  <CardHeader>
    <CardTitle>Overview</CardTitle>
  </CardHeader>
  <CardContent>Revenue summary content</CardContent>
</Card>`,
  },
  {
    component: "InfoCard",
    title: "Metric summary",
    description: "InfoCard is the faster default when the content is already card-shaped.",
    language: "tsx",
    variant: "basic",
    code: `import { InfoCard } from "azamat-ui-kit"

<InfoCard title="Revenue" description="Current month" content="$48,000" />`,
  },
  {
    component: "StatCard",
    title: "Legacy KPI tile",
    description: "StatCard still works for migration, but new dashboard surfaces should prefer StatisticCard or InfoCard.",
    language: "tsx",
    variant: "migration",
    code: `import { StatCard } from "azamat-ui-kit"

<StatCard title="Active users" value="1,284" change="+12%" /> // prefer StatisticCard for new work`,
  },
  {
    component: "StatisticCard",
    title: "Structured metric tile",
    description: "Use statistic cards when the metric needs label, value, and support context together.",
    language: "tsx",
    variant: "basic",
    code: `import { StatisticCard } from "azamat-ui-kit"

<StatisticCard title="Conversion" value="4.8%" description="Last 30 days" />`,
  },
  {
    component: "EntityCard",
    title: "Entity summary",
    description: "Entity cards work well for compact user and record previews.",
    language: "tsx",
    variant: "basic",
    code: `import { EntityCard } from "azamat-ui-kit"

<EntityCard title="Azamat Jurayev" description="Admin user" />`,
  },
  {
    component: "FileCard",
    title: "Attachment preview",
    description: "Use file cards for uploads and attached resources.",
    language: "tsx",
    variant: "basic",
    code: `import { FileCard } from "azamat-ui-kit"

<FileCard name="invoice.pdf" size="2.4 MB" />`,
  },
  {
    component: "SmartCard",
    title: "Migration example",
    description: "This exists for legacy migration and should not lead new docs.",
    language: "tsx",
    variant: "migration",
    code: `import { SmartCard } from "azamat-ui-kit"

<SmartCard title="Legacy surface" description="Prefer InfoCard for new work." />`,
  },

  {
    component: "Badge",
    title: "Status through props",
    description: "Use Badge props instead of a separate status component.",
    language: "tsx",
    variant: "basic",
    code: `import { Badge } from "azamat-ui-kit"

<Badge tone="success" dot>Active</Badge>`,
  },
  {
    component: "Dialog",
    title: "Blocking task dialog",
    description: "Use Dialog when focus should stay inside the modal task.",
    language: "tsx",
    variant: "basic",
    code: `import { Dialog, DialogContent, DialogTitle, DialogTrigger, Button } from "azamat-ui-kit"

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
    code: `import { Popover, PopoverContent, PopoverTrigger, Button } from "azamat-ui-kit"

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
    code: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Button } from "azamat-ui-kit"

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
    code: `import { Tooltip, Button } from "azamat-ui-kit"

<Tooltip content="Export selected rows">
  <Button>Export</Button>
</Tooltip>`,
  },
  {
    component: "RightClickMenu",
    title: "Context menu",
    description: "Use right-click menus as secondary shortcuts.",
    language: "tsx",
    variant: "basic",
    code: `import { RightClickMenu } from "azamat-ui-kit"

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
    code: `import { AlertDialog, Button } from "azamat-ui-kit"

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
    code: `import { ConfirmDialog, Button } from "azamat-ui-kit"

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
    code: `import { ModalShell, Button } from "azamat-ui-kit"

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
    code: `import { SheetShell, Button } from "azamat-ui-kit"

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
    code: `import { Drawer, Button } from "azamat-ui-kit"

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
    code: `import { DialogActions, Button } from "azamat-ui-kit"

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
    code: `import { FormFieldShell, Input } from "azamat-ui-kit"

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
    code: `import { FormTextarea } from "azamat-ui-kit"

<FormTextarea control={control} name="notes" label="Notes" rows={4} />`,
  },
  {
    component: "FormSwitch",
    title: "Boolean field",
    description: "Switch wrappers keep label and description wiring aligned with other form fields.",
    language: "tsx",
    variant: "form",
    code: `import { FormSwitch } from "azamat-ui-kit"

<FormSwitch control={control} name="isActive" label="Active" />`,
  },
  {
    component: "FormDatePicker",
    title: "Calendar date field",
    description: "Use the calendar wrapper when native date input is too limited.",
    language: "tsx",
    variant: "form",
    code: `import { FormDatePicker } from "azamat-ui-kit"

<FormDatePicker control={control} name="birthday" label="Birthday" />`,
  },
  {
    component: "FormDateRangePicker",
    title: "Calendar range field",
    description: "Use the range picker wrapper for visual date interval selection.",
    language: "tsx",
    variant: "form",
    code: `import { FormDateRangePicker } from "azamat-ui-kit"

<FormDateRangePicker control={control} name="reportingRange" label="Reporting range" />`,
  },
  {
    component: "FormBuilder",
    title: "Higher-level form builder",
    description: "FormBuilder is for repeated internal patterns, not simple one-off forms.",
    language: "tsx",
    variant: "advanced",
    code: `import { FormBuilder } from "azamat-ui-kit"

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
    code: `import { DataTable } from "azamat-ui-kit"

<DataTable columns={columns} data={rows} />`,
  },
  {
    component: "DataTableToolbar",
    title: "Toolbar composition",
    description: "Use the toolbar helper for consistent filters and actions around the grid.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTableToolbar, SearchInput } from "azamat-ui-kit"

<DataTableToolbar title="Orders" search={<SearchInput placeholder="Search orders..." />} />`,
  },
  {
    component: "DataTablePagination",
    title: "Pagination controls",
    description: "Use the shared pagination helper to keep table paging UI consistent.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTablePagination } from "azamat-ui-kit"

<DataTablePagination pageIndex={pageIndex} pageCount={pageCount} onPageChange={setPageIndex} />`,
  },
  {
    component: "DataTableColumnVisibilityMenu",
    title: "Hide and show columns",
    description: "Column visibility helpers keep personalization aligned with the table system.",
    language: "tsx",
    variant: "advanced",
    code: `import { DataTableColumnVisibilityMenu } from "azamat-ui-kit"

<DataTableColumnVisibilityMenu table={table} />`,
  },
  {
    component: "DataTableSortableHeader",
    title: "Sortable header",
    description: "Use the shared header helper instead of custom sort indicator plumbing.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTableSortableHeader } from "azamat-ui-kit"

header: ({ column }) => <DataTableSortableHeader column={column}>Name</DataTableSortableHeader>`,
  },
  {
    component: "DataTableRowActions",
    title: "Row actions menu",
    description: "Use shared row actions when each record needs contextual operations.",
    language: "tsx",
    variant: "basic",
    code: `import { DataTableRowActions } from "azamat-ui-kit"

<DataTableRowActions actions={[{ key: "edit", label: "Edit", onSelect: openEdit }]} />`,
  },
  {
    component: "DataTableBulkActions",
    title: "Bulk actions bar",
    description: "Bulk actions should appear only when a selection exists.",
    language: "tsx",
    variant: "advanced",
    code: `import { DataTableBulkActions } from "azamat-ui-kit"

<DataTableBulkActions rows={selectedRows} actions={[{ key: "delete", label: "Delete selected", onSelect: removeMany }]} />`,
  },
  {
    component: "DataTableViewPresets",
    title: "Preset views",
    description: "Use view presets when users switch between saved table perspectives.",
    language: "tsx",
    variant: "advanced",
    code: `import { DataTableViewPresets } from "azamat-ui-kit"

<DataTableViewPresets presets={presets} value={activePreset} onValueChange={setActivePreset} />`,
  },
  {
    component: "createDataTableSelectColumn",
    title: "Selection column factory",
    description: "Use the factory to keep row-selection behavior standardized.",
    language: "tsx",
    variant: "advanced",
    code: `import { createDataTableSelectColumn } from "azamat-ui-kit"

const selectColumn = createDataTableSelectColumn()`,
  },
  {
    component: "createDataTableActionsColumn",
    title: "Shared actions column",
    description: "Column factories reduce repeated row action boilerplate.",
    language: "tsx",
    variant: "advanced",
    code: `import { createDataTableActionsColumn } from "azamat-ui-kit"

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
    code: `import { TableExportMenu } from "azamat-ui-kit"

<TableExportMenu options={[{ key: "csv", label: "Export CSV", onSelect: exportCsv }]} />`,
  },
  {
    component: "TableImportButton",
    title: "Import trigger",
    description: "Keep import controls secondary to the main grid experience.",
    language: "tsx",
    variant: "advanced",
    code: `import { TableImportButton } from "azamat-ui-kit"

<TableImportButton onFilesSelect={handleImport} />`,
  },
  {
    component: "Input",
    title: "CLI add",
    description: "Copy the input source into your app.",
    language: "cli",
    variant: "cli",
    code: `npx azamat-ui-kit-cli add input`,
  },
  {
    component: "InlineEditable",
    title: "Inline edit field",
    description: "Click-to-edit inline text. Commits on Enter or blur, cancels on Escape.",
    language: "tsx",
    variant: "basic",
    code: `import { InlineEditable } from "azamat-ui-kit"

<InlineEditable value={name} onValueChange={setName} placeholder="Click to edit" />`,
  },
  {
    component: "TrendCard",
    title: "Metric with sparkline",
    description: "Dashboard metric card showing trend direction and optional sparkline.",
    language: "tsx",
    variant: "basic",
    code: `import { TrendCard } from "azamat-ui-kit"

<TrendCard title="Revenue" value="$45,231" change="+12.5%" trend="up" sparkline={[10, 20, 15, 25, 30]} />`,
  },
  {
    component: "ComparisonCard",
    title: "Side-by-side metrics",
    description: "Compare multiple related metrics in one card.",
    language: "tsx",
    variant: "basic",
    code: `import { ComparisonCard } from "azamat-ui-kit"

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
    code: `import { DeltaBadge } from "azamat-ui-kit"

<DeltaBadge value="+12.5%" trend="up" />
<DeltaBadge value="-3.2%" trend="down" />`,
  },
  {
    component: "RepeaterField",
    title: "Dynamic form array",
    description: "Add and remove repeated field groups in a form.",
    language: "tsx",
    variant: "basic",
    code: `import { RepeaterField } from "azamat-ui-kit"

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
] as const
