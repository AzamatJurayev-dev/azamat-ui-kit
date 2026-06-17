import { useMemo, useState } from "react"
import type { ColumnDef, RowSelectionState, SortingState } from "@tanstack/react-table"
import { DatabaseIcon, EyeIcon, Loader2Icon, Settings2Icon, Table2Icon } from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComponentPreview,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  FilterBar,
  SearchInput,
  StatusBadge,
  createDataTableActionsColumn,
  createDataTableSelectColumn,
  useToast,
} from "@/index"

import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid, TokenPill } from "./playground-ui"
import { formatMoney, getStatusTone, products, Product } from "./playground-data"

export function TableSection() {
  const { addToast } = useToast()
  const [search, setSearch] = useState("")
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [tableError, setTableError] = useState(false)
  const [tableEmpty, setTableEmpty] = useState(false)
  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default")
  const [loadingVariant, setLoadingVariant] = useState<"skeleton" | "state">("skeleton")
  const [localPageSize, setLocalPageSize] = useState(10)

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase()
    if (!value) return products
    return products.filter((product) =>
      [product.name, product.sku, product.category, product.status].some((field) => field.toLowerCase().includes(value)),
    )
  }, [search])

  const displayProducts = tableEmpty ? [] : filteredProducts
  const selectedCount = Object.keys(rowSelection).length

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      createDataTableSelectColumn<Product>(),
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableSortableHeader column={column}>Name</DataTableSortableHeader>,
      },
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge tone={getStatusTone(row.original.status)} dot>
            {row.original.status}
          </StatusBadge>
        ),
      },
      {
        accessorKey: "stock",
        header: ({ column }) => <DataTableSortableHeader column={column}>Stock</DataTableSortableHeader>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => formatMoney(row.original.price),
      },
      createDataTableActionsColumn<Product>({
        getActions: (_row, product) => [
          { key: "view", label: "View", onSelect: () => { void addToast({ title: "View", description: product.name }) } },
          { key: "edit", label: "Edit", onSelect: () => { void addToast({ title: "Edit", description: product.name }) } },
          {
            key: "delete",
            label: "Delete",
            destructive: true,
            onSelect: () => {
              void addToast({ tone: "warning", title: "Delete action", description: `${product.name} removed` })
            },
          },
        ],
      }),
    ],
    [addToast],
  )

  return (
    <DemoSection
      sectionIndex={5}
      id="table"
      eyebrow="Data display"
      title="DataTable"
      description="A single table component controlled by props: density, selection, actions, skeletons, empty/error states and toolbar slots."
      action={<StatusBadge tone="info" dot>{displayProducts.length} rows</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Rows</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <DatabaseIcon className="size-5 text-primary" />
              {displayProducts.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Filtered mock data</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Selected</CardDescription>
            <CardTitle className="text-3xl">{selectedCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Bulk action source</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Density</CardDescription>
            <CardTitle className="capitalize text-2xl">{density}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Compact/default/comfortable</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>State</CardDescription>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {tableLoading && <Loader2Icon className="size-5 animate-spin" />}
              {tableError ? "Error" : tableEmpty ? "Empty" : tableLoading ? "Loading" : "Ready"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">State-driven UI</CardContent>
        </Card>
      </section>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="Feature controls" description="Toggle important props and states." badge={<Badge variant="outline">interactive</Badge>}>
          <div className="flex flex-wrap gap-2">
            {(["compact", "default", "comfortable"] as const).map((item) => (
              <Button key={item} variant={density === item ? "default" : "outline"} size="sm" onClick={() => setDensity(item)}>
                {item}
              </Button>
            ))}
            <Button variant={loadingVariant === "skeleton" ? "default" : "outline"} size="sm" onClick={() => setLoadingVariant((value) => (value === "skeleton" ? "state" : "skeleton"))}>
              Loading: {loadingVariant}
            </Button>
            <Button variant={tableLoading ? "default" : "outline"} size="sm" onClick={() => setTableLoading((value) => !value)}>
              Toggle loading
            </Button>
            <Button variant={tableError ? "default" : "outline"} size="sm" onClick={() => setTableError((value) => !value)}>
              Toggle error
            </Button>
            <Button variant={tableEmpty ? "default" : "outline"} size="sm" onClick={() => setTableEmpty((value) => !value)}>
              Toggle empty
            </Button>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Table CSS tokens" description="Visual polish is centralized." badge={<Badge variant="outline">CSS</Badge>}>
          <div className="flex flex-wrap gap-2">
            <TokenPill>--aui-table-header-bg</TokenPill>
            <TokenPill>--aui-table-row-hover-bg</TokenPill>
            <TokenPill>--aui-table-row-selected-bg</TokenPill>
            <TokenPill>data-slot="data-table-wrapper"</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">Keep one `DataTable` and change visuals with props and CSS tokens.</p>
        </PlaygroundCard>

        <PlaygroundCard title="Action model" description="Callbacks receive row data, but no API is called inside the UI kit." badge={<Badge variant="outline">callbacks</Badge>}>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/25 p-3">Row actions: view, edit, delete</div>
            <div className="rounded-lg border bg-muted/25 p-3">Bulk actions: selected rows only</div>
            <div className="rounded-lg border bg-muted/25 p-3">Toolbar slots: search, filters, actions</div>
          </div>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Interactive table"
        description="Search, selection, visibility, density, loading, errors, empty state, row actions and bulk actions in one demo."
        dependencies={["@tanstack/react-table", "DataTable", "ActionMenu", "StatusBadge"]}
        code={`<DataTable
  columns={columns}
  data={products}
  density="compact"
  striped
  bordered
  stickyHeader
  rowActions={(row) => actions}
  bulkActions={bulkActions}
/>`}
      >
        <div className="w-full min-w-0">
          <div className="mb-3 flex flex-wrap gap-2">
            <Button variant={localPageSize === 10 ? "default" : "outline"} size="sm" onClick={() => setLocalPageSize(10)}>
              Page size 10
            </Button>
            <Button variant={localPageSize === 20 ? "default" : "outline"} size="sm" onClick={() => setLocalPageSize(20)}>
              Page size 20
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setTableEmpty(false); setTableError(false); setTableLoading(false); setRowSelection({}) }}>
              Reset table
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={displayProducts}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            sorting={sorting}
            onSortingChange={setSorting}
            enableRowSelection
            density={density}
            striped
            bordered
            stickyHeader
            isLoading={tableLoading}
            isError={tableError}
            loadingVariant={loadingVariant}
            loadingState={{ label: "Loading catalog", description: "Simulated API load state." }}
            errorState={{ title: "Could not load catalog", description: "Forced error state for testing." }}
            emptyState={{
              title: tableEmpty ? "No matching records" : "No products",
              description: tableEmpty ? "You have enabled demo empty mode." : "Try clearing search input.",
            }}
            getRowDisabled={(row) => row.original.status === "draft"}
            onRowClick={(row) => addToast({ title: "Row clicked", description: row.original.name })}
            onRowDoubleClick={(row) => addToast({ tone: "success", title: "Double click", description: row.original.sku })}
            toolbarProps={(table) => ({
              title: "Products",
              description: "Reusable table with controlled mock state.",
              search: <FilterBar search={<SearchInput value={search} onValueChange={setSearch} placeholder="Search table..." />} activeCount={search ? 1 : 0} onReset={() => setSearch("")} />,
              actions: <DataTableColumnVisibilityMenu table={table} />,
              selectionActions: (
                <DataTableBulkActions
                  rows={table.getSelectedRowModel().rows.map((row) => row.original)}
                  actions={[
                    {
                      key: "delete",
                      label: "Delete selected",
                      destructive: true,
                      onSelect: (rows) => {
                        addToast({ tone: "warning", title: "Bulk action", description: `${rows.length} rows selected.` })
                        setRowSelection({})
                      },
                    },
                  ]}
                  onClearSelection={() => setRowSelection({})}
                />
              ),
            })}
            pagination={{ pageIndex: 0, pageSize: localPageSize, rowCount: displayProducts.length, pageCount: 1 }}
          />
        </div>
      </ComponentPreview>

      <PlaygroundUsage
        title="Table usage"
        items={[
          "Keep a single `DataTable` component and control behaviors with props instead of creating ProTable/SmartTable clones.",
          "Use `loadingVariant=\"state\"` for explanatory loading copy and `\"skeleton\"` for row placeholders.",
          "Pass callbacks for row actions, bulk actions, refresh and export; the UI kit must not call APIs directly.",
          "Use CSS tokens and data-slot selectors for visual polish across every dashboard table.",
        ]}
        code={`const columns = [
  createDataTableSelectColumn(),
  { accessorKey: "name", header: ({ column }) => <DataTableSortableHeader column={column}>Name</DataTableSortableHeader> },
  createDataTableActionsColumn({ getActions })
]`}
      />
    </DemoSection>
  )
}
