import type { ComponentDemoMock } from "../types"

export const avatarMock: ComponentDemoMock = {
  code: `import { Avatar, AvatarGroup } from "@/index"

export function Example() {
  return (
    <div className="space-y-4">
      <Avatar name="Azamat Jurayev" status="online" />
      <AvatarGroup
        items={[
          { key: "az", name: "Azamat Jurayev", status: "online" },
          { key: "su", name: "Suhrob Karimov", status: "busy" },
          { key: "na", name: "Nargiza Saidova", status: "away" },
        ]}
      />
    </div>
  )
}`,
  cliCommand: "npx tembro add avatar",
  highlights: [
    "Single avatar plus stacked group export",
    "Fallback initials, shape, size, and status dot support",
    "Useful in tables, comments, assignee chips, and team headers",
  ],
  scenarios: [
    { title: "Assignee", description: "Show the current owner with initials fallback and live status." },
    { title: "Team rail", description: "Stack a small team summary without creating a full user card." },
    { title: "Review feed", description: "Attach person identity to comments or event rows." },
  ],
}
