import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  ActionMenu,
  ActivityFeed,
  AsyncSelect,
  Badge,
  Button,
  Calendar,
  ChatComposer,
  ChatMessage,
  Checkbox,
  CommandPalette,
  DataState,
  DataTable,
  DatePicker,
  FileUpload,
  InfoCard,
  Input,
  LoadingState,
  Pagination,
  Rating,
  RangeSlider,
  Slider,
  ToastProvider,
  Wizard,
} from "../../src"
import { ResourceDetailPage, ResourcePage, ResourcePageSection } from "../../src/components/patterns/public"

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

export const smokeElements = [
  <Button key="button">Save</Button>,
  <Input key="input" aria-label="Name" />,
  <Checkbox key="checkbox" aria-label="Accept" />,
  <Input key="search" kind="search" value="" onValueChange={noop} />,
  <Pagination key="pagination" page={1} pageCount={3} onPageChange={noop} />,
  <Badge key="status" tone="success" dot>Active</Badge>,
  <DataState key="empty" status="empty" title="No data" />,
  <LoadingState key="loading" label="Loading" />,
  <InfoCard key="info-card" title="Info">Content</InfoCard>,
  <ActivityFeed key="activity-feed" items={[{ id: "1", title: "Created", time: "now" }]} />,
  <ChatMessage key="chat-message" outgoing status="read">Ready</ChatMessage>,
  <ChatComposer key="chat-composer" onSend={noop} />,
  <ActionMenu key="action-menu" actions={[{ key: "edit", label: "Edit", onSelect: noop }]} />,
  <DataTable key="table" columns={columns} data={products} getRowId={(row: Product) => row.id} />,
  <AsyncSelect key="async-select" loadOptions={async () => []} />,
  <Calendar key="calendar" value="2026-01-01" onValueChange={noop} />,
  <DatePicker key="date-picker" value="2026-01-01" onValueChange={noop} />,
  <FileUpload key="file-upload" files={[]} onFilesChange={noop} />,
  <Slider key="slider" value={40} onValueChange={noop} />,
  <RangeSlider key="range-slider" value={[20, 80]} onValueChange={noop} />,
  <Rating key="rating" value={4} onValueChange={noop} />,
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
]

export function SmokeComponent() {
  return <>{smokeElements}</>
}
