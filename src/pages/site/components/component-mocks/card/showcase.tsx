import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/index"

import type { ComponentDemoProps } from "../types"

import { cardDemoProjects } from "./data"

const badgeVariants = ["secondary", "outline", "destructive"] as const

export function CardShowcase({ state }: ComponentDemoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cardDemoProjects.map((project, index) => (
        <Card key={project.title} size={index === 0 ? (state.cardCompact ? "sm" : "default") : "sm"}>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {index === 0 ? (
              <div className="grid gap-3">
                {project.metrics.map((metric) => (
                  <div key={metric} className="rounded-xl bg-muted p-4">{metric}</div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((metric, metricIndex) => (
                  <Badge key={metric} variant={badgeVariants[metricIndex]}>{metric}</Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>{project.footer}</CardFooter>
        </Card>
      ))}
    </div>
  )
}
