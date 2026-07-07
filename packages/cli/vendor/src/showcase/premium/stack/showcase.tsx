import { Button, Divider, Stack } from "@/index"

export function StackShowcase() {
  return (
    <div className="space-y-4">
      <Stack gap="sm">
        <p className="text-sm text-muted-foreground">Small gap stack keeps controls close.</p>
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Secondary
        </Button>
      </Stack>

      <Divider />

      <Stack gap="xl" splitAfter={<p className="text-sm text-muted-foreground">Action barrier</p>}>
        <p className="text-sm">Large gap for grouped blocks.</p>
        <p className="text-sm">SplitAfter inserts a stable divider point without nested wrappers.</p>
      </Stack>
    </div>
  )
}
