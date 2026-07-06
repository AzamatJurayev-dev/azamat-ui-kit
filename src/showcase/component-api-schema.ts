export type ComponentApiProp = {
  name: string
  type: string
  defaultValue: string
  required?: boolean
  description: string
  example?: string
  notes?: string
}

export type ComponentApiSchema = {
  slug: string
  source: "metadata" | "manual-fallback"
  summary: string
  props: ComponentApiProp[]
  examples?: Array<{
    title: string
    code: string
  }>
  accessibility?: string[]
}

export const componentApiSchemas: Record<string, ComponentApiSchema> = {
  button: {
    slug: "button",
    source: "metadata",
    summary: "Action component for submit, secondary, destructive, warning, loading, icon and navigation-like flows. Verify every state in light and dark mode before shipping.",
    props: [
      { name: "variant", type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'warning' | 'link'", defaultValue: "'default'", description: "Controls visual hierarchy and action tone.", example: "variant=\"destructive\"" },
      { name: "size", type: "'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'", defaultValue: "'default'", description: "Controls height, spacing and icon-only sizing.", example: "size=\"icon-sm\"" },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Shows the spinner, disables interaction and communicates pending state.", example: "loading={isSaving}" },
      { name: "loadingLabel", type: "string", defaultValue: "'Loading'", description: "Accessible label displayed while the button is loading.", example: "loadingLabel=\"Saving\"" },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the action and removes it from normal interaction.", example: "disabled={!canSubmit}" },
      { name: "leftIcon", type: "ReactNode", defaultValue: "-", description: "Icon rendered before the label. Use for primary verbs and scan-friendly actions." },
      { name: "rightIcon", type: "ReactNode", defaultValue: "-", description: "Icon rendered after the label. Use for forward navigation or external transitions." },
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Renders the visual button style on a child element for link or router composition.", example: "asChild" },
      { name: "className", type: "string", defaultValue: "-", description: "Optional class override for spacing or layout composition." },
      { name: "children", type: "ReactNode", defaultValue: "-", required: true, description: "Button label or icon content. Icon-only buttons must still provide an accessible name." },
      { name: "aria-label", type: "string", defaultValue: "-", description: "Required for icon-only buttons so the action is announced correctly.", notes: "Use when children are only icons." },
    ],
    examples: [
      { title: "Primary action", code: "<Button>Save changes</Button>" },
      { title: "Loading action", code: "<Button loading loadingLabel=\"Saving\">Save changes</Button>" },
      { title: "Destructive action", code: "<Button variant=\"destructive\">Delete</Button>" },
      { title: "Icon-only action", code: "<Button size=\"icon-sm\" aria-label=\"Open actions\">...</Button>" },
    ],
    accessibility: ["Keep visible focus states.", "Use aria-label for icon-only buttons.", "Loading buttons should keep a readable label.", "Do not use disabled buttons for navigation links."],
  },
  input: {
    slug: "input",
    source: "metadata",
    summary: "Primary typed-value surface. Start with Input and move into presets only when behavior requires it.",
    props: [
      { name: "value", type: "string | number", defaultValue: "-", description: "Controlled input value.", example: "value={name}" },
      { name: "defaultValue", type: "string | number", defaultValue: "-", description: "Uncontrolled initial value." },
      { name: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Native change handler for value updates.", example: "onChange={(event) => setValue(event.target.value)}" },
      { name: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: "Direct text callback for controlled string flows.", example: "onValueChange={setQuery}" },
      { name: "type", type: "HTMLInputTypeAttribute", defaultValue: "'text'", description: "Native input type. Prefer presets only when formatting or masking is required." },
      { name: "placeholder", type: "string", defaultValue: "-", description: "Short hint for empty input state." },
      { name: "clearable", type: "boolean", defaultValue: "false", description: "Shows the built-in clear action when a value exists.", example: "clearable" },
      { name: "onClear", type: "() => void", defaultValue: "-", description: "Called after the built-in clear action resets the field." },
      { name: "trailingAction", type: "ReactNode", defaultValue: "-", description: "Interactive trailing slot for counters, shortcuts, or toggle actions.", example: "trailingAction={<span>12 results</span>}" },
      { name: "replaceTrailingWhenClear", type: "boolean", defaultValue: "true", description: "Controls whether clear replaces trailing content or sits beside it." },
      { name: "clearOnEscape", type: "boolean", defaultValue: "false", description: "Clears the value on Escape when clearable mode is active." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables editing and interaction." },
      { name: "required", type: "boolean", defaultValue: "false", description: "Marks the input as required for native validation." },
      { name: "name", type: "string", defaultValue: "-", description: "Form field name used during submission." },
      { name: "id", type: "string", defaultValue: "-", description: "Connects input to label and help text." },
      { name: "aria-invalid", type: "boolean", defaultValue: "false", description: "Communicates validation state to assistive technology." },
    ],
    examples: [
      { title: "Controlled text", code: "<Input value={value} onValueChange={setValue} />" },
      { title: "Clearable primary field", code: "<Input value={query} onValueChange={setQuery} clearable trailingAction={<span>12 results</span>} />" },
      { title: "Search preset direction", code: "// Prefer Input first; use SearchInput only when shortcut/result behavior is required." },
    ],
    accessibility: ["Always pair form inputs with labels.", "Use aria-describedby for helper/error text.", "Keep disabled and read-only states visually distinct."],
  },
  select: {
    slug: "select",
    source: "metadata",
    summary: "Primary selection surface. Start with Select and move into members only when async loading, multi-selection, or command-style filtering is required.",
    props: [
      { name: "value", type: "string | string[]", defaultValue: "-", description: "Controlled selected value. Multi-select uses an array." },
      { name: "defaultValue", type: "string | string[]", defaultValue: "-", description: "Uncontrolled initial selected value." },
      { name: "onValueChange", type: "(value: string | string[]) => void", defaultValue: "-", description: "Called when the selected value changes.", example: "onValueChange={setStatus}" },
      { name: "options", type: "Array<{ label: string; value: string; disabled?: boolean }>", defaultValue: "[]", required: true, description: "Selectable option list." },
      { name: "placeholder", type: "string", defaultValue: "-", description: "Text shown when no value is selected." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the control and option selection." },
      { name: "searchable", type: "boolean", defaultValue: "false", description: "Enables local filtering on the main Select surface." },
      { name: "multiple", type: "boolean", defaultValue: "false", description: "Allows multiple values when the active member supports it." },
    ],
    examples: [
      { title: "Primary select", code: "<Select value={status} onValueChange={setStatus} options={statusOptions} />" },
      { title: "Searchable primary select", code: "<Select value={owner} onValueChange={setOwner} searchable options={ownerOptions} />" },
      { title: "Async member direction", code: "// Prefer Select first; use AsyncSelect only when remote loading is required." },
    ],
    accessibility: ["Use clear option labels.", "Keep disabled options visible but not selectable.", "Do not replace long forms with hidden select menus."],
  },
  "data-table": {
    slug: "data-table",
    source: "metadata",
    summary: "Operational grid for dense product data. Keep `columns`, `data`, `getRowId`, toolbar wiring, and pagination explicit so search, selection, row actions, loading, and server-mode behavior stay predictable.",
    props: [
      { name: "columns", type: "ColumnDef<RowData>[]", defaultValue: "-", required: true, description: "Column definitions for visible table structure.", example: "columns={invoiceColumns}" },
      { name: "data", type: "RowData[]", defaultValue: "[]", required: true, description: "Rows for the current client or server page.", example: "data={rows}" },
      { name: "getRowId", type: "(row: RowData, index: number) => string", defaultValue: "-", description: "Stable row id for selection, row actions, and refresh updates.", example: "getRowId={(row) => row.id}" },
      { name: "title", type: "ReactNode", defaultValue: "-", description: "Toolbar title when you want the table to explain itself without extra wrapper markup." },
      { name: "description", type: "ReactNode", defaultValue: "-", description: "Short supporting line for operators using the table." },
      { name: "search", type: "DataTableSearchConfig", defaultValue: "-", description: "Controlled search input config for the built-in toolbar.", example: "search={{ value, onValueChange: setValue, placeholder: \"Search invoices...\" }}" },
      { name: "toolbarProps", type: "DataTableToolbarProps | (table) => DataTableToolbarProps", defaultValue: "-", description: "Inject search, filters, actions, and selection affordances into the default toolbar.", notes: "Use this when you want one canonical toolbar instead of composing a separate header card." },
      { name: "toolbar", type: "ReactNode | (table) => ReactNode", defaultValue: "-", description: "Replace the default toolbar entirely when the route needs a custom control layout." },
      { name: "features", type: "DataTableFeatureConfig", defaultValue: "-", description: "Turn default search, column visibility, row actions, bulk actions, refresh, or export behavior on and off." },
      { name: "toolbarActions", type: "ReactNode | (context) => ReactNode", defaultValue: "-", description: "Extra action cluster rendered beside visibility / refresh / export controls." },
      { name: "bulkActions", type: "DataTableBulkAction<RowData>[]", defaultValue: "-", description: "Bulk actions shown when selected rows exist." },
      { name: "rowActions", type: "(row, original) => DataTableRowAction<RowData>[]", defaultValue: "-", description: "Declarative row menu items appended as an actions column." },
      { name: "sorting", type: "SortingState", defaultValue: "[]", description: "Controlled sorting state.", example: "sorting={sorting}" },
      { name: "onSortingChange", type: "OnChangeFn<SortingState>", defaultValue: "-", description: "Called when sorting changes.", example: "onSortingChange={setSorting}" },
      { name: "columnVisibility", type: "VisibilityState", defaultValue: "{}", description: "Controlled column visibility map." },
      { name: "onColumnVisibilityChange", type: "OnChangeFn<VisibilityState>", defaultValue: "-", description: "Called when visible columns change." },
      { name: "rowSelection", type: "RowSelectionState", defaultValue: "{}", description: "Controlled row selection state." },
      { name: "onRowSelectionChange", type: "OnChangeFn<RowSelectionState>", defaultValue: "-", description: "Called when row selection changes." },
      { name: "enableRowSelection", type: "boolean | ((row) => boolean)", defaultValue: "false", description: "Enables checkbox or row selection behavior per row or for the whole grid." },
      { name: "pagination", type: "DataTablePaginationConfig | false", defaultValue: "-", description: "Page index, page size, totals, labels, and pagination handlers.", notes: "Pass `manual: true` when server data already arrives sliced by page." },
      { name: "renderMobileCard", type: "(row) => ReactNode", defaultValue: "-", description: "Optional mobile card renderer when the table must collapse into stacked records." },
      { name: "onRowClick", type: "(row) => void", defaultValue: "-", description: "Optional single-click row activation handler." },
      { name: "onRowDoubleClick", type: "(row) => void", defaultValue: "-", description: "Optional double-click activation handler for denser operator workflows." },
      { name: "getRowDisabled", type: "(row) => boolean", defaultValue: "-", description: "Disable specific rows without removing them from the result set." },
      { name: "density", type: "'compact' | 'default' | 'comfortable'", defaultValue: "'default'", description: "Controls header and cell spacing.", example: "density=\"comfortable\"" },
      { name: "striped", type: "boolean", defaultValue: "false", description: "Adds zebra striping for long operational lists." },
      { name: "bordered", type: "boolean", defaultValue: "false", description: "Adds stronger cell and table borders." },
      { name: "stickyHeader", type: "boolean", defaultValue: "false", description: "Keeps headers pinned while the table scrolls." },
      { name: "isLoading", type: "boolean", defaultValue: "false", description: "Shows loading state." },
      { name: "loadingVariant", type: "'skeleton' | 'state'", defaultValue: "'skeleton'", description: "Choose between skeleton rows or a dedicated loading state block." },
      { name: "loadingState", type: "LoadingStateProps", defaultValue: "-", description: "Customizes the loading state when `loadingVariant=\"state\"`." },
      { name: "isError", type: "boolean", defaultValue: "false", description: "Switches the grid into an error fallback state." },
      { name: "emptyState", type: "EmptyStateProps", defaultValue: "-", description: "Fallback when there are no rows." },
      { name: "errorState", type: "EmptyStateProps", defaultValue: "-", description: "Fallback when the data request fails." },
      { name: "skeletonRows", type: "number", defaultValue: "6", description: "How many skeleton rows to render during loading." },
      { name: "cellFallback", type: "ReactNode", defaultValue: "\"-\"", description: "Value rendered when a cell returns empty content." },
    ],
    accessibility: ["Keep column headers readable and sortable targets large enough for pointer and keyboard use.", "Provide clear labels for row action menus, visibility controls, and bulk actions.", "When mobile cards replace the table, preserve the same row meaning and action availability."],
  },
  dialog: {
    slug: "dialog",
    source: "metadata",
    summary: "Focused overlay for short decisions, confirmations and contained edit flows.",
    props: [
      { name: "open", type: "boolean", defaultValue: "-", description: "Controlled open state." },
      { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial uncontrolled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-", description: "Called when the dialog opens or closes." },
      { name: "title", type: "ReactNode", defaultValue: "-", required: true, description: "Accessible dialog title." },
      { name: "description", type: "ReactNode", defaultValue: "-", description: "Supporting description for context." },
      { name: "children", type: "ReactNode", defaultValue: "-", description: "Dialog body content." },
      { name: "footer", type: "ReactNode", defaultValue: "-", description: "Action row for confirm/cancel buttons." },
    ],
    accessibility: ["Every dialog needs a title.", "Return focus to the trigger after close.", "Do not put long multi-step workflows in a small dialog."],
  },
  "date-picker": {
    slug: "date-picker",
    source: "metadata",
    summary: "Date and range selection surface for reporting, scheduling and form flows.",
    props: [
      { name: "value", type: "Date | string | null", defaultValue: "null", description: "Controlled selected date." },
      { name: "onValueChange", type: "(value: Date | string | null) => void", defaultValue: "-", description: "Called when the selected date changes." },
      { name: "mode", type: "'single' | 'range'", defaultValue: "'single'", description: "Selection mode." },
      { name: "minDate", type: "Date | string", defaultValue: "-", description: "Earliest selectable date." },
      { name: "maxDate", type: "Date | string", defaultValue: "-", description: "Latest selectable date." },
      { name: "disabledDates", type: "Date[] | ((date: Date) => boolean)", defaultValue: "-", description: "Dates that cannot be selected." },
      { name: "placeholder", type: "string", defaultValue: "-", description: "Text shown before selection." },
    ],
    accessibility: ["Clarify date format near text inputs.", "Disable unavailable dates rather than hiding them.", "Define timezone assumptions before submitting values."],
  },
  "form-input": {
    slug: "form-input",
    source: "metadata",
    summary: "React Hook Form wrapper for Input with label, helper text, validation and error display.",
    props: [
      { name: "control", type: "Control<TFieldValues>", defaultValue: "-", required: true, description: "RHF control instance from useForm()." },
      { name: "name", type: "FieldPath<TFieldValues>", defaultValue: "-", required: true, description: "Field path used for registration and value lookup." },
      { name: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
      { name: "description", type: "ReactNode", defaultValue: "-", description: "Helper text shown under the field." },
      { name: "rules", type: "UseControllerProps['rules']", defaultValue: "-", description: "Validation rules passed to RHF controller." },
      { name: "required", type: "boolean | '*'", defaultValue: "false", description: "Marks the field as required in the UI." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the field and prevents editing." },
      { name: "error", type: "string | FieldError | null", defaultValue: "-", description: "Optional error override." },
    ],
    accessibility: ["Label must remain visible.", "Error text should be connected to the field.", "Required state should be visual and semantic."],
  },
}

export function getComponentApiSchema(slug: string): ComponentApiSchema | undefined {
  return componentApiSchemas[slug]
}
