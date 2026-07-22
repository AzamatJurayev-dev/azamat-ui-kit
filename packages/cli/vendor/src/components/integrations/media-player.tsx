"use client"

import * as React from "react"
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaPlayerInstance,
} from "@vidstack/react"
import {
  DefaultAudioLayout,
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default"

import "@vidstack/react/player/styles/default/theme.css"
import "@vidstack/react/player/styles/default/layouts/audio.css"
import "@vidstack/react/player/styles/default/layouts/video.css"

import { cn } from "@/lib/utils"

export type MediaTextTrack = Pick<
  React.ComponentProps<typeof Track>,
  "src" | "kind" | "language" | "label" | "default"
> & {
  id?: React.Key
}

export type MediaPlayerStateContent = {
  loading?: React.ReactNode
  error?: React.ReactNode
  empty?: React.ReactNode
}

type MediaPlayerRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof MediaPlayer>,
  "children" | "viewType"
>

type MediaPlayerCompositionProps = {
  tracks?: MediaTextTrack[]
  providerChildren?: React.ReactNode
  beforeLayout?: React.ReactNode
  afterLayout?: React.ReactNode
  layout?: React.ReactNode | false
  overlay?: React.ReactNode
  overlayClassName?: string
  showStateOverlay?: boolean
  stateContent?: MediaPlayerStateContent
  providerClassName?: string
}

export type VideoPlayerProps = MediaPlayerRootProps &
  MediaPlayerCompositionProps & {
    poster?: string
    posterAlt?: string
    thumbnails?: string
    aspectRatio?: React.CSSProperties["aspectRatio"]
    layoutProps?: React.ComponentProps<typeof DefaultVideoLayout>
    posterClassName?: string
  }

export type AudioPlayerProps = MediaPlayerRootProps &
  MediaPlayerCompositionProps & {
    layoutProps?: React.ComponentProps<typeof DefaultAudioLayout>
  }

function hasMediaSource(src: MediaPlayerRootProps["src"]) {
  if (src == null) return false
  if (typeof src === "string") return src.trim().length > 0
  if (Array.isArray(src)) return src.length > 0
  return true
}

function renderTracks(tracks: MediaTextTrack[]) {
  return tracks.map((track) => (
    <Track
      key={track.id ?? `${track.kind}-${track.language ?? track.label ?? track.src}`}
      src={track.src}
      kind={track.kind}
      language={track.language}
      label={track.label}
      default={track.default}
    />
  ))
}

function DefaultLoadingState({ tone }: { tone: "video" | "audio" }) {
  return (
    <div className="flex items-center gap-3" role="status" aria-live="polite">
      <span
        className={cn(
          "size-5 animate-spin rounded-full border-2 border-current border-r-transparent",
          tone === "video" ? "text-white" : "text-foreground"
        )}
        aria-hidden="true"
      />
      <span className="text-sm font-medium">Loading media…</span>
    </div>
  )
}

function DefaultErrorState({ tone }: { tone: "video" | "audio" }) {
  return (
    <div className="max-w-sm text-center" role="alert">
      <p className="text-sm font-semibold">Media could not be loaded</p>
      <p className={cn("mt-1 text-xs", tone === "video" ? "text-white/70" : "text-muted-foreground")}>
        Check the source, network connection, provider configuration, and CORS headers.
      </p>
    </div>
  )
}

function DefaultEmptyState({ tone }: { tone: "video" | "audio" }) {
  return (
    <div className="max-w-sm text-center" role="status">
      <p className="text-sm font-semibold">No media source</p>
      <p className={cn("mt-1 text-xs", tone === "video" ? "text-white/70" : "text-muted-foreground")}>
        Pass a valid source or source collection to render the player.
      </p>
    </div>
  )
}

function PlayerStateOverlay({
  hasSource,
  tone,
  content,
  showLoading,
}: {
  hasSource: boolean
  tone: "video" | "audio"
  content?: MediaPlayerStateContent
  showLoading: boolean
}) {
  const surfaceClass = tone === "video" ? "bg-black/55 text-white" : "bg-background/95 text-foreground"

  if (!hasSource) {
    return (
      <div
        data-slot="media-player-empty-state"
        className={cn("absolute inset-0 z-30 grid place-items-center p-6 backdrop-blur-sm", surfaceClass)}
      >
        {content?.empty ?? <DefaultEmptyState tone={tone} />}
      </div>
    )
  }

  return (
    <>
      {showLoading ? (
        <div
          data-slot="media-player-loading-state"
          className={cn(
            "pointer-events-none absolute inset-0 z-20 grid place-items-center p-6 backdrop-blur-[2px] transition-[opacity,visibility] duration-200",
            "group-data-[can-play]/media:invisible group-data-[can-play]/media:opacity-0 group-data-[error]/media:hidden",
            surfaceClass
          )}
        >
          {content?.loading ?? <DefaultLoadingState tone={tone} />}
        </div>
      ) : null}

      <div
        data-slot="media-player-error-state"
        className={cn(
          "absolute inset-0 z-30 hidden items-center justify-center p-6 backdrop-blur-sm group-data-[error]/media:flex",
          surfaceClass
        )}
      >
        {content?.error ?? <DefaultErrorState tone={tone} />}
      </div>
    </>
  )
}

const VideoPlayer = React.forwardRef<MediaPlayerInstance, VideoPlayerProps>(function VideoPlayer(
  {
    poster,
    posterAlt = "Video poster",
    thumbnails,
    tracks = [],
    layoutProps,
    providerChildren,
    beforeLayout,
    afterLayout,
    layout,
    overlay,
    overlayClassName,
    showStateOverlay = true,
    stateContent,
    className,
    providerClassName,
    posterClassName,
    aspectRatio = "16 / 9",
    playsInline = true,
    load = "visible",
    src,
    title,
    style,
    "aria-label": ariaLabel,
    ...props
  },
  ref
) {
  const hasSource = hasMediaSource(src)
  const {
    icons = defaultLayoutIcons,
    thumbnails: layoutThumbnails,
    ...resolvedLayoutProps
  } = layoutProps ?? {}

  return (
    <MediaPlayer
      ref={ref}
      data-slot="video-player"
      data-has-source={hasSource ? "true" : "false"}
      viewType="video"
      src={src}
      title={title}
      aria-label={ariaLabel ?? title ?? posterAlt}
      playsInline={playsInline}
      load={load}
      style={{ aspectRatio, ...style }}
      className={cn(
        "group/media relative isolate w-full overflow-hidden rounded-xl bg-black text-white shadow-sm ring-1 ring-black/10",
        className
      )}
      {...props}
    >
      <MediaProvider className={cn("h-full w-full", providerClassName)}>
        {poster ? (
          <Poster
            src={poster}
            alt={posterAlt}
            className={cn("vds-poster absolute inset-0 h-full w-full object-cover", posterClassName)}
          />
        ) : null}
        {renderTracks(tracks)}
        {providerChildren}
      </MediaProvider>

      {overlay ? (
        <div
          data-slot="media-player-overlay"
          className={cn("absolute inset-0 z-10", overlayClassName)}
        >
          {overlay}
        </div>
      ) : null}

      {showStateOverlay ? (
        <PlayerStateOverlay
          hasSource={hasSource}
          tone="video"
          content={stateContent}
          showLoading={load !== "play"}
        />
      ) : null}

      {beforeLayout}
      {layout === false
        ? null
        : layout ?? (
            <DefaultVideoLayout
              icons={icons}
              thumbnails={thumbnails ?? layoutThumbnails}
              {...resolvedLayoutProps}
            />
          )}
      {afterLayout}
    </MediaPlayer>
  )
})

VideoPlayer.displayName = "VideoPlayer"

const AudioPlayer = React.forwardRef<MediaPlayerInstance, AudioPlayerProps>(function AudioPlayer(
  {
    tracks = [],
    layoutProps,
    providerChildren,
    beforeLayout,
    afterLayout,
    layout,
    overlay,
    overlayClassName,
    showStateOverlay = true,
    stateContent,
    className,
    providerClassName,
    load = "visible",
    src,
    title,
    "aria-label": ariaLabel,
    ...props
  },
  ref
) {
  const hasSource = hasMediaSource(src)
  const { icons = defaultLayoutIcons, ...resolvedLayoutProps } = layoutProps ?? {}

  return (
    <MediaPlayer
      ref={ref}
      data-slot="audio-player"
      data-has-source={hasSource ? "true" : "false"}
      viewType="audio"
      src={src}
      title={title}
      aria-label={ariaLabel ?? title ?? "Audio player"}
      load={load}
      className={cn(
        "group/media relative isolate w-full overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-sm",
        className
      )}
      {...props}
    >
      <MediaProvider className={providerClassName}>
        {renderTracks(tracks)}
        {providerChildren}
      </MediaProvider>

      {overlay ? (
        <div
          data-slot="media-player-overlay"
          className={cn("absolute inset-0 z-10", overlayClassName)}
        >
          {overlay}
        </div>
      ) : null}

      {showStateOverlay ? (
        <PlayerStateOverlay
          hasSource={hasSource}
          tone="audio"
          content={stateContent}
          showLoading={load !== "play"}
        />
      ) : null}

      {beforeLayout}
      {layout === false
        ? null
        : layout ?? <DefaultAudioLayout icons={icons} {...resolvedLayoutProps} />}
      {afterLayout}
    </MediaPlayer>
  )
})

AudioPlayer.displayName = "AudioPlayer"

export { AudioPlayer, VideoPlayer }
export type { MediaPlayerInstance }
