import type { ComponentDemoMock } from "../types"

export const mediaPlayerMock: ComponentDemoMock = {
  code: `import { MediaPlayer } from "tembro"

export function Example() {
  return (
    <MediaPlayer
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      title="Release walkthrough"
      description="Custom controls, progress, volume and fullscreen."
    />
  )
}`,
  cliCommand: "npx tembro add media-player",
  highlights: [
    "Custom play, seek, volume, mute and fullscreen controls",
    "Poster, tracks, metadata and action slot support",
    "Progress and volume callbacks for product analytics",
  ],
  scenarios: [
    { title: "Training portal", description: "Play course videos with consistent dashboard chrome." },
    { title: "Support review", description: "Attach recorded product walkthroughs to tickets and notes." },
  ],
}
