import { useMemo, useState } from "react"
import type { ColumnDef, RowSelectionState, SortingState } from "@tanstack/react-table"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

import { DemoSection, PlaygroundUsage } from "./playground-ui"
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
      title="DataTable"
      description="Density, selection, actions, skeletons, empty state, error state and pagination controls."
    >
      <Card>
        <CardHeader>
          <CardTitle>Products table</CardTitle>
          <CardDescription>Try search, density, loading skeleton/state, errors and empty mode.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex flex-wrap gap-2">
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
            <Button variant={localPageSize === 10 ? "default" : "outline"} size="sm" onClick={() => setLocalPageSize(10)}>
              Page size 10
            </Button>
            <Button variant={localPageSize === 20 ? "default" : "outline"} size="sm" onClick={() => setLocalPageSize(20)}>
              Page size 20
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
        </CardContent>
      </Card>

      <PlaygroundUsage
        title="Table usage"
        items={[
          "Enable `selection` only for actionable data sets and keep bulk actions in `selectionActions`.",
          "Use `loadingVariant=\"state\"` if you want explicit loading copy and `\"skeleton\"` if you want row placeholders.",
          "Control `emptyState`, `errorState` and `loadingState` for production-ready parity with API data flows.",
        ]}
        code={`const columns = [createDataTableSelectColumn(), ..., createDataTableActionsColumn({...})]`}
      />
    </DemoSection>
  )
}
