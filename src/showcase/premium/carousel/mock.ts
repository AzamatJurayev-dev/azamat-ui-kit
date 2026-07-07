import type { ComponentDemoMock } from "../types"

export const carouselMock: ComponentDemoMock = {
  code: `import { Carousel, CarouselItem } from "@/index"

export function Example() {
  return (
    <Carousel defaultIndex={0} showDots showArrows>
      <CarouselItem><div className="rounded-xl bg-card p-4">Card 1</div></CarouselItem>
      <CarouselItem><div className="rounded-xl bg-card p-4">Card 2</div></CarouselItem>
      <CarouselItem><div className="rounded-xl bg-card p-4">Card 3</div></CarouselItem>
    </Carousel>
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add carousel",
  highlights: [
    "Keyboard and control-aware slider",
    "Works with any slide content",
    "Useful for onboarding and feature snippets",
  ],
  scenarios: [
    { title: "Feature tour", description: "Move users through short product highlights." },
    { title: "Feature cards", description: "Show a compact stack of feature cards without heavy tabs." },
    { title: "Promo strip", description: "Rotate content in dashboard marketing blocks." },
  ],
}
