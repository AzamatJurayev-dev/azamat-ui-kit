import { Badge, MediaPlayer } from "@/index"

export function MediaPlayerShowcase() {
  return (
    <MediaPlayer
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      poster="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.jpg"
      title="Release walkthrough"
      description="Playable media surface with native video underneath and custom product controls."
      actions={<Badge tone="info" variant="soft">3:02 guide</Badge>}
    />
  )
}
