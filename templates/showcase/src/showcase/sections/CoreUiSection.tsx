import { ChevronRightIcon, CommandIcon, SearchIcon, SparklesIcon } from "lucide-react"

import { AvatarGroup } from "@/components/display/avatar"
import { Progress } from "@/components/display/progress"
import { Tag, TagGroup } from "@/components/display/tag"
import { Alert } from "@/components/feedback/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { registryGroups } from "@/showcase/data/registry"

export function CoreUiSection() {
  return (
    <div className="grid items-start gap-4 xl:grid-cols-[1.35fr_0.65fr]">
      <Card>
        <CardHeader>
          <CardTitle>UI controls and variants</CardTitle>
          <CardDescription>Button, Badge, Card, Input, Select, Checkbox, Switch, Tabs, Textarea.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="flex flex-wrap gap-2">
            <Button leftIcon={<SparklesIcon className="size-4" />}>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="destructive">Destructive</Button>
            <Button iconOnly aria-label="Command"><CommandIcon className="size-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge label="default" />
            <Badge label="info" status="info" />
            <Badge label="success" status="success" />
            <Badge label="warning" status="warning" />
            <Badge label="danger" status="danger" removable />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Input kind="search" placeholder="Search components" searchIcon={<SearchIcon className="size-4" />} />
            <Input kind="password" placeholder="Password input" />
            <Select
              placeholder="Pick category"
              searchable
              clearable
              options={registryGroups.slice(0, 8).map((group) => ({
                label: group.name,
                value: group.name,
                description: `${group.components.length} components`,
              }))}
            />
          </div>
          <div className="grid items-start gap-4 md:grid-cols-2">
            <Textarea defaultValue="Textarea with helper text, counter and Tembro theme." helperText="Textarea helper text" maxLength={140} showCharacterCount />
            <div className="grid content-start gap-4 rounded-lg border bg-muted/25 p-4">
              <Switch defaultChecked label="Enable preview" description="Switch with label and description" />
              <div className="flex items-center gap-3">
                <Checkbox defaultChecked />
                <span className="text-sm">Checkbox selected state</span>
              </div>
              <AvatarGroup
                items={[
                  { key: "az", name: "Azamat Jurayev", status: "online" },
                  { key: "qa", name: "QA Tester", status: "busy" },
                  { key: "ux", name: "UX Review", status: "away" },
                  { key: "tm", name: "Tembro Maintainer", status: "offline" },
                ]}
                max={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card
        variant="elevated"
        tone="info"
        eyebrow="Card surface props"
        title="Surface API"
        description="title, description, badge, action, content, footer props."
        badge={<Badge label="styled" status="info" />}
        action={<Button size="sm" variant="outline" rightIcon={<ChevronRightIcon className="size-4" />}>Open</Button>}
        content={
          <div className="grid gap-4">
            <Progress value={78} label="Style coverage" showValue tone="info" />
            <TagGroup>
              <Tag tone="success" selected>Selected</Tag>
              <Tag tone="info">Info</Tag>
              <Tag tone="warning" removable>Removable</Tag>
            </TagGroup>
            <Alert tone="success" title="Styled by Tembro tokens" description="This card uses copied local component code." />
          </div>
        }
        footer={<span className="text-sm text-muted-foreground">No Vite starter component here.</span>}
      />
    </div>
  )
}
