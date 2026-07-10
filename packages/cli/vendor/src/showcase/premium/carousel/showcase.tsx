import * as React from "react"

import { Button, Carousel, CarouselItem } from "@/index"

const steps = [
  { title: "Onboarding", text: "Guide quickly from first login.", tone: "Launch" },
  { title: "Components", text: "Review ready-made dashboard patterns.", tone: "Library" },
  { title: "Release", text: "Publish, test, and iterate faster.", tone: "Ship" },
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
        autoplay={autoplay}
        autoplayInterval={2200}
        showPlaybackControl
        onIndexChange={(next) => setIndex(next)}
        onAutoplayChange={setPlaying}
        previousLabel="Previous slide"
        nextLabel="Next slide"
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
