import * as React from "react"

import { Button, Carousel, CarouselItem } from "@/index"

const steps = [
  { title: "Onboarding", text: "Guide quickly from first login." },
  { title: "Components", text: "Review ready-made dashboard patterns." },
  { title: "Release", text: "Publish, test, and iterate faster." },
]

export function CarouselShowcase() {
  const [showArrows, setShowArrows] = React.useState(true)
  const [showDots, setShowDots] = React.useState(true)
  const [index, setIndex] = React.useState(0)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Button size="sm" variant={showArrows ? "default" : "outline"} onClick={() => setShowArrows((value) => !value)}>
          {showArrows ? "Hide" : "Show"} arrows
        </Button>
        <Button size="sm" variant={showDots ? "default" : "outline"} onClick={() => setShowDots((value) => !value)}>
          {showDots ? "Hide" : "Show"} dots
        </Button>
      </div>

      <Carousel
        index={index}
        loop
        showArrows={showArrows}
        showDots={showDots}
        onIndexChange={(next) => setIndex(next)}
        previousLabel="Previous slide"
        nextLabel="Next slide"
      >
        {steps.map((step, slideIndex) => (
          <CarouselItem key={step.title}>
            <div className="rounded-xl border border-border bg-card p-8">
                <div className="flex items-start justify-between gap-3">
                <div className="grid gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{`Slide ${slideIndex + 1}`}</p>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}
