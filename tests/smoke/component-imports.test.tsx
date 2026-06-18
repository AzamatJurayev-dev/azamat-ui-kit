import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Control, FieldValues } from "react-hook-form"

import {
  ActionMenu,
  ActivityFeed,
  AppHeader,
  AppShell,
  AsyncSelect,
  Button,
  Calendar,
  Checkbox,
  CommandPalette,
  DataTable,
  DatePicker,
  EmptyState,
  FileUpload,
  FormBuilder,
  InfoCard,
  Input,
  LoadingState,
  MetricGrid,
  ModalShell,
  Pagination,
  ResourceDetailPage,
  ResourcePage,
  ResourcePageSection,
  SearchInput,
  StatusBadge,
  ToastProvider,
  Wizard,
} from "../src"

type Product = {
  id: string
  name: string
  status: "active" | "inactive"
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
]

const products: Product[] = [
  { id: "1", name: "Keyboard", status: "active" },
]

const noop = () => undefined
const control = {} as Control<FieldValues>

export const smokeElements = [
  <Button key="button">Save</Button>,
  <Input key="input" aria-label="Name" />,
  <Checkbox key="checkbox" aria-label="Accept" />,
  <SearchInput key="search" value="" onValueChange={noop} />,
  <Pagination key="pagination" pageIndex={0} pageCount={3} onPageChange={noop} />,
  <StatusBadge key="status">Active</StatusBadge>,
  <EmptyState key="empty" title="No data" />,
  <LoadingState key="loading" label="Loading" />,
  <MetricGrid key="metrics" items={[{ key: "sales", label: "Sales", value: "$12k" }]} />,
  <InfoCard key="info-card" title="Info">Content</InfoCard>,
  <ActivityFeed key="activity-feed" items={[{ id: "1", title: "Created", time: "now" }]} />,
  <ActionMenu key="action-menu" actions={[{ key: "edit", label: "Edit", onSelect: noop }]} />,
  <ModalShell key="modal" open={false} onOpenChange={noop} title="Modal" />,
  <AppHeader key="header" left="Left" right="Right" />,
  <AppShell key="shell" header={<AppHeader left="Dashboard" />} sidebar={<div>Sidebar</div>}>
    Content
  </AppShell>,
  <DataTable key="table" columns={columns} data={products} getRowId={(row) => row.id} />,
  <AsyncSelect key="async-select" loadOptions={async () => []} />,
  <Calendar key="calendar" value="2026-01-01" onValueChange={noop} />,
  <DatePicker key="date-picker" value="2026-01-01" onValueChange={noop} />,
  <FileUpload key="file-upload" files={[]} onFilesChange={noop} />,
  <Wizard key="wizard" steps={[{ id: "one", title: "One" }]} currentStep="one" />,
  <CommandPalette key="command" open={false} onOpenChange={noop} groups={[]} />,
  <ToastProvider key="toast-provider"><div>App</div></ToastProvider>,
  <ResourcePage<Product> key="resource" title="Products" table={{ columns, data: products }} />,
  <ResourceDetailPage
    key="resource-detail"
    title="Keyboard"
    sections={[{ id: "main", title: "Main", items: [{ key: "name", label: "Name", value: "Keyboard" }] }]}
  />,
  <ResourcePageSection key="resource-section" title="Section">Content</ResourcePageSection>,
  <FormBuilder key="form-builder" control={control} fields={[]} />,
]

export function SmokeComponent() {
  return <>{smokeElements}</>
}
