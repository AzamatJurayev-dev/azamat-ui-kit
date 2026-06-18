import type { CardDemoProject } from "./types"

export const cardDemoProjects: CardDemoProject[] = [
  {
    title: "Project rollout",
    description: "Track release readiness across modules and teams.",
    metrics: ["Design review: Passed", "QA coverage: 84%"],
    badges: ["secondary", "outline"],
    footer: "Updated 12 minutes ago",
  },
  {
    title: "Publish queue",
    description: "3 items waiting for review",
    metrics: ["Docs", "QA", "Blocking"],
    badges: ["secondary", "outline", "destructive"],
    footer: "Escalate if overdue",
  },
]
