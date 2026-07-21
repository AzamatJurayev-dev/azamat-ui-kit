"use client"

import * as React from "react"
import { MaximizeIcon, PauseIcon, PlayIcon, RotateCcwIcon, Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MediaTrack = {
  src: string
  kind?: React.TrackHTMLAttributes<HTMLTrackElement>["kind"]
  srcLang?: string
  label?: string
  default?: boolean
}

export type MediaPlayerProps = Omit<React.ComponentProps<"video">, "controls" | "children" | "onTimeUpdate" | "onVolumeChange"> & {
  src: string
  title?: React.ReactNode
  description?: React.ReactNode
  tracks?: MediaTrack[]
  actions?: React.ReactNode
  aspectRatio?: "video" | "square" | "wide" | string
  showMeta?: boolean
  onTimeChange?: (time: number, duration: number) => void
  onVolumeValueChange?: (volume: number, muted: boolean) => void
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const minutes = Math.floor(seconds / 60)
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0")
  return `${minutes}:${rest}`
}

function getAspectRatioClassName(value: NonNullable<MediaPlayerProps["aspectRatio"]>) {
  if (value === "video") return "aspect-video"
  if (value === "square") return "aspect-square"
  if (value === "wide") return "aspect-[21/9]"
  return ""
}

function MediaPlayer({
  src,
  title,
  description,
  tracks = [],
  actions,
  aspectRatio = "video",
  showMeta = true,
  poster,
  autoPlay,
  muted: mutedProp,
  loop,
  playsInline = true,
  preload = "metadata",
  onTimeChange,
  onVolumeValueChange,
  className,
  ...props
}: MediaPlayerProps) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = React.useState(Boolean(autoPlay))
  const [duration, setDuration] = React.useState(0)
  const [time, setTime] = React.useState(0)
  const [volume, setVolume] = React.useState(1)
  const [muted, setMuted] = React.useState(Boolean(mutedProp))
  const [ready, setReady] = React.useState(false)

  const syncFromElement = React.useCallback(() => {
    const element = ref.current
    if (!element) return
    setPlaying(!element.paused)
    setDuration(element.duration || 0)
    setTime(element.currentTime || 0)
    setVolume(element.volume)
    setMuted(element.muted)
    onTimeChange?.(element.currentTime || 0, element.duration || 0)
  }, [onTimeChange])

  const togglePlaying = async () => {
    const element = ref.current
    if (!element) return
    if (element.paused) await element.play()
    else element.pause()
    syncFromElement()
  }

  const seek = (value: number) => {
    const element = ref.current
    if (!element) return
    element.currentTime = value
    setTime(value)
    onTimeChange?.(value, duration)
  }

  const updateVolume = (nextVolume: number) => {
    const element = ref.current
    const safeVolume = Math.max(0, Math.min(1, nextVolume))
    if (element) {
      element.volume = safeVolume
      element.muted = safeVolume === 0 ? true : muted
    }
    setVolume(safeVolume)
    const nextMuted = safeVolume === 0 ? true : muted
    setMuted(nextMuted)
    onVolumeValueChange?.(safeVolume, nextMuted)
  }

  const toggleMuted = () => {
    const element = ref.current
    const nextMuted = !muted
    if (element) element.muted = nextMuted
    setMuted(nextMuted)
    onVolumeValueChange?.(volume, nextMuted)
  }

  const VolumeIcon = muted || volume === 0 ? VolumeXIcon : volume < 0.6 ? Volume1Icon : Volume2Icon

  return (
    <section data-slot="media-player" className={cn("overflow-hidden rounded-lg border bg-card shadow-sm", className)}>
      <div className={cn("relative bg-black", getAspectRatioClassName(aspectRatio))} style={!["video", "square", "wide"].includes(String(aspectRatio)) ? { aspectRatio: String(aspectRatio) } : undefined}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          className="size-full object-cover"
          onLoadedMetadata={() => { setReady(true); syncFromElement() }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={syncFromElement}
          onVolumeChange={syncFromElement}
          {...props}
        >
          {tracks.map((track) => <track key={`${track.src}-${track.srcLang ?? ""}`} {...track} />)}
        </video>
        <button type="button" aria-label={playing ? "Pause media" : "Play media"} className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition hover:bg-black/20 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => void togglePlaying()}>
          <span className="grid size-14 place-items-center rounded-full bg-black/55 backdrop-blur">{playing ? <PauseIcon className="size-6" /> : <PlayIcon className="size-6 translate-x-0.5" />}</span>
        </button>
      </div>

      <div className="grid gap-3 p-3">
        {showMeta && (title || description || actions) ? (
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              {title ? <h3 className="truncate text-sm font-semibold">{title}</h3> : null}
              {description ? <p className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
            </div>
            <div className="flex items-center gap-2">
              {!ready ? <Badge tone="muted" variant="soft">loading</Badge> : null}
              {actions}
            </div>
          </div>
        ) : null}

        <div className="grid gap-2">
          <input aria-label="Media progress" type="range" min={0} max={duration || 0} step={0.1} value={Math.min(time, duration || time)} onChange={(event) => seek(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-primary" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <Button type="button" size="icon-sm" variant="outline" iconOnly aria-label={playing ? "Pause" : "Play"} onClick={() => void togglePlaying()}>{playing ? <PauseIcon /> : <PlayIcon />}</Button>
              <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label="Restart" onClick={() => seek(0)}><RotateCcwIcon /></Button>
              <span className="min-w-20 text-xs tabular-nums text-muted-foreground">{formatTime(time)} / {formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label={muted ? "Unmute" : "Mute"} onClick={toggleMuted}><VolumeIcon /></Button>
              <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume} onChange={(event) => updateVolume(Number(event.target.value))} className="h-2 w-24 cursor-pointer accent-primary" />
              <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label="Fullscreen" onClick={() => ref.current?.requestFullscreen?.()}><MaximizeIcon /></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { MediaPlayer }
