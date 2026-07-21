export const layoutDemoCodeSnippets: Record<string, string> = {
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
