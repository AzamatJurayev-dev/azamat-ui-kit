import * as React from "react"

import { Button, Carousel, CarouselItem } from "@/index"
import { cn } from "@/lib/utils"

const steps = [
  { title: "Onboarding", text: "Guide quickly from first login.", tone: "Launch", detail: "Hero slider for product onboarding and release tours." },
  { title: "Components", text: "Review ready-made dashboard patterns.", tone: "Library", detail: "Card rail, docs previews, and swipe-ready gallery states." },
  { title: "Release", text: "Publish, test, and iterate faster.", tone: "Ship", detail: "Active slide details stay below the main frame for context." },
]

export function CarouselShowcase() {
  const [showArrows, setShowArrows] = React.useState(true)
  const [showDots, setShowDots] = React.useState(true)
  const [autoplay, setAutoplay] = React.useState(false)
  const [index, setIndex] = React.useState(0)
  const [playing, setPlaying] = React.useState(false)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Button size="sm" variant={showArrows ? "default" : "outline"} onClick={() => setShowArrows((value) => !value)}>
          {showArrows ? "Hide" : "Show"} arrows
        </Button>
        <Button size="sm" variant={showDots ? "default" : "outline"} onClick={() => setShowDots((value) => !value)}>
          {showDots ? "Hide" : "Show"} dots
        </Button>
        <Button size="sm" variant={autoplay ? "default" : "outline"} onClick={() => setAutoplay((value) => !value)}>
          {autoplay ? "Stop" : "Start"} autoplay
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step, slideIndex) => (
          <Button
            key={step.title}
            type="button"
            variant={index === slideIndex ? "default" : "outline"}
            className="justify-start"
            onClick={() => setIndex(slideIndex)}
          >
            {slideIndex + 1}. {step.title}
          </Button>
        ))}
      </div>

      <Carousel
        index={index}
        loop
        showArrows={showArrows}
        showDots={showDots}
        showStatus
        showThumbnails
        autoplay={autoplay}
        autoplayInterval={2200}
        showPlaybackControl
        aspectRatio="16 / 9"
        onIndexChange={(next) => setIndex(next)}
        onAutoplayChange={setPlaying}
        previousLabel="Previous slide"
        nextLabel="Next slide"
        renderThumbnail={(_, itemIndex, active) => (
          <div className={cn("grid gap-1 p-3", active && "bg-primary/5")}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">0{itemIndex + 1}</div>
            <div className="text-sm font-medium text-foreground">{steps[itemIndex]?.title}</div>
          </div>
        )}
        renderActiveDetail={(_, activeIndex) => (
          <div className="rounded-[20px] border border-border/70 bg-card/80 p-4">
            <p className="text-sm font-semibold text-foreground">{steps[activeIndex]?.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{steps[activeIndex]?.detail}</p>
          </div>
        )}
      >
        {steps.map((step, slideIndex) => (
          <CarouselItem key={step.title}>
            <div className="min-h-56 rounded-xl border border-border bg-card p-8">
              <div className="flex items-start justify-between gap-3">
                <div className="grid gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{step.tone}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{`Slide ${slideIndex + 1}`}</p>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
                <div className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                  {slideIndex + 1}/{steps.length}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
      <div className="text-sm text-muted-foreground">Playback: {playing || autoplay ? "active" : "paused"}</div>
    </div>
  )
}
