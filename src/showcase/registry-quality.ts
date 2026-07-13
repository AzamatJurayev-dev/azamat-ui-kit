import { component, createShowcaseDemoRegistry } from "./create-demo"

export const registryQualityDemoRegistry = createShowcaseDemoRegistry([
  component("button", "Button", "actions", "Primary action surface for clicks, submit, and quick triggers in dashboard workflows."),
  component("input", "Input", "inputs", "Single-line text input for quick edits, queries, and form fields."),
  component("select", "Select", "inputs", "Select component with menu-driven single choice workflows."),
  component("dialog", "Dialog", "overlay", "Modal surface for confirmation, forms, and contextual workflows."),
  component("data-table", "DataTable", "data-table", "High density table with search, filters, rows, actions and pagination context."),
  component("date-picker", "DatePicker", "calendar", "Date picker surface for period and event selection."),
  component("form-input", "FormInput", "form", "Input wrapper with RHF-ready metadata and helper text."),
  component("form-select", "FormSelect", "form", "Select wrapper for controlled local and async choice fields."),
  component("form-textarea", "FormTextarea", "form", "Textarea wrapper with helper, validation and consistent spacing."),
  component("form-switch", "FormSwitch", "form", "Boolean form control with shell-level label and hint handling."),
  component("form-date-picker", "FormDatePicker", "form", "Popover date picker wrapper with RHF integration."),
  component("form-date-range-picker", "FormDateRangePicker", "form", "Range date picker wrapper for planning and reporting flows."),
  component("alert-dialog", "AlertDialog", "overlay", "Destructive confirmation dialog with loading-ready action states."),
  component("drawer", "Drawer", "overlay", "Side panel for contextual details without leaving the page."),

  component("pagination", "Pagination", "navigation", "Controlled page navigation with edge buttons and active state."),
  component("async-select", "AsyncSelect", "inputs", "Remote-loaded select for large server-backed option sets."),
  component("slider", "Slider", "inputs", "Single value range control for density, threshold, and score tuning."),
  component("range-slider", "RangeSlider", "inputs", "Two-handle slider for min/max filtering."),
  component("rating", "Rating", "inputs", "Compact score input for feedback and review flows."),
  component("otp-input", "OtpInput", "inputs", "One-time code entry with fixed-length slots."),
  component("inline-editable", "InlineEditable", "inputs", "Inline editing primitive for dense tables and configuration rows."),
  component("tag-input", "TagInput", "inputs", "Tokenized text input for labels, skills, and quick filters."),

  component("progress", "Progress", "display", "Linear progress with label, value formatter, tone and indeterminate state."),
  component("timeline", "Timeline", "display", "Vertical or horizontal event stream for workflow history."),
  component("status-dot", "StatusDot", "display", "Tiny live status indicator with optional pulse animation."),
  component("notification-center", "NotificationCenter", "display", "Compact activity and notifications stream."),
  component("status-legend", "StatusLegend", "display", "Explain status meaning and counts in a compact legend."),

  component("action-menu", "ActionMenu", "actions", "Compact dropdown action menu for rows and cards."),
  component("button-group", "ButtonGroup", "actions", "Grouped action buttons for view switching and compact controls."),
  component("quick-action-grid", "QuickActionGrid", "actions", "Action launcher grid for dense dashboard shortcuts."),
  component("filter-bar", "FilterBar", "actions", "Search, filters, active-count and reset actions in one toolbar."),

  component("alert", "Alert", "feedback", "Inline feedback banner for success, warning, info, and error states."),
  component("page-state", "PageState", "feedback", "Full-page completion or blocked state with next actions."),
  component("empty-state", "EmptyState", "patterns", "Focused empty and error state with clear next actions."),

  component("calendar", "Calendar", "calendar", "Single month calendar surface for date picker and scheduling flows."),

  component("file-upload", "FileUpload", "upload", "Full file upload surface with dropzone, action button and helper text."),
  component("image-upload", "ImageUpload", "upload", "Image upload pattern with preview-oriented copy."),

  component("stepper", "Stepper", "wizard", "Clickable step navigation for multi-step forms."),
  component("wizard", "Wizard", "wizard", "Stepper, content and footer controls combined into one workflow."),

  component("resource-page", "ResourcePage", "patterns", "Full resource index page shell for admin dashboards."),
  component("resource-detail-page", "ResourceDetailPage", "patterns", "Detail page shell with title, metadata and sections."),
  component("page-toolbar", "PageToolbar", "patterns", "Reusable page toolbar for search, filters, view controls and actions."),
  component("data-view", "DataView", "patterns", "Data view shell that combines toolbar, table, loading, error and empty states."),
])
