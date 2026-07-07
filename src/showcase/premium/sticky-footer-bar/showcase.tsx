import { Button, StickyFooterBar } from "@/index"

export function StickyFooterBarShowcase() {
  return (
    <div className="relative min-h-56 rounded-lg border">
      <div className="h-40 overflow-auto p-4">
        <p className="text-sm text-muted-foreground">
          Scroll inside this panel and keep action buttons visible at the bottom. This simulates a long form or content page where save and cancel
          controls should stay accessible.
        </p>
        <div className="mt-4 space-y-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="rounded-md border px-3 py-2 text-sm">
              Row {index + 1}
            </div>
          ))}
        </div>
      </div>
      <StickyFooterBar
        start={<span className="text-sm font-medium text-muted-foreground">Unsaved changes</span>}
        end={
          <>
            <Button size="sm" variant="outline">
              Discard
            </Button>
            <Button size="sm">Save draft</Button>
          </>
        }
      />
    </div>
  )
}

