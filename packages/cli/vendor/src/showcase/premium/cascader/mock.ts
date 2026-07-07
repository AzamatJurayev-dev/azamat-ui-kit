import type { ComponentDemoMock } from "../types"

export const cascaderMock: ComponentDemoMock = {
  code: `import { Cascader } from "@/index"

const options = [{ value: "eu", label: "Europe", children: [{ value: "uk", label: "United Kingdom", children: [{ value: "london", label: "London" }] }] }]

export function Example() {
  const [value, setValue] = useState<string[]>([])

  return <Cascader options={options} value={value} onValueChange={setValue} />
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add cascader",
  highlights: [
    "Three-level dependency selects",
    "Controlled by string path value",
    "Disabled states for unavailable levels",
  ],
  scenarios: [
    { title: "Location selector", description: "Choose region / country / city in one compact control." },
    { title: "Category trees", description: "Pick nested taxonomy in forms." },
  ],
}

