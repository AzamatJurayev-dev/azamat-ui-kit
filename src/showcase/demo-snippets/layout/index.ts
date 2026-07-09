export const layoutDemoCodeSnippets: Record<string, string> = {
  "filter-bar": `import { Button, FilterBar, Input } from "tembro"

export function Demo() {
  return (
    <FilterBar
      search={<Input type="search" value="" placeholder="Search rows..." readOnly />}
      chips={[
        { key: "status", label: "Status", value: "Active", tone: "success" },
        { key: "owner", label: "Owner", value: "Azamat" },
      ]}
      filters={<Button variant="outline">Status</Button>}
      actions={<Button>Export</Button>}
      onReset={() => undefined}
    />
  )
}`,
  "description-list": `import { DescriptionList } from "tembro"

export function Demo() {
  return (
    <DescriptionList
      title="Invoice details"
      items={[
        { key: "id", label: "Invoice", value: "#4821" },
        { key: "amount", label: "Amount", value: "$12,420" },
        { key: "status", label: "Status", value: "Paid" },
      ]}
    />
  )
}`,
  "stat-card": `import { StatCard } from "tembro"

export function Demo() {
  return (
    <StatCard
      title="Revenue"
      value="$84.2k"
      description="Compared with last month"
      trend={{ value: "+12.4%", tone: "success" }}
      helperText="Updated just now"
    />
  )
}`,
  pagination: `import { Pagination } from "tembro"

export function Demo() {
  return <Pagination page={3} pageCount={9} onPageChange={(page) => console.log(page)} />
}`,
}
