"use client"

import * as React from "react"
import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react"
import {
  DefaultAudioLayout,
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default"

import "@vidstack/react/player/styles/default/theme.css"
import "@vidstack/react/player/styles/default/layouts/audio.css"
import "@vidstack/react/player/styles/default/layouts/video.css"

import { cn } from "@/lib/utils"

export type MediaTextTrack = {
  src: string
  kind: "subtitles" | "captions" | "chapters" | "descriptions" | "metadata"
  language?: string
  label?: string
  default?: boolean
}

export type VideoPlayerProps = Omit<React.ComponentProps<typeof MediaPlayer>, "children"> & {
  poster?: string
  posterAlt?: string
  thumbnails?: string
  tracks?: MediaTextTrack[]
  layoutProps?: Omit<React.ComponentProps<typeof DefaultVideoLayout>, "icons" | "thumbnails">
  providerChildren?: React.ReactNode
  className?: string
  providerClassName?: string
  posterClassName?: string
}

function VideoPlayer({
  poster,
  posterAlt = "Video poster",
  thumbnails,
  tracks = [],
  layoutProps,
  providerChildren,
  className,
  providerClassName,
  posterClassName,
  playsInline = true,
  load = "visible",
  ...props
}: VideoPlayerProps) {
  return (
    <MediaPlayer
      data-slot="video-player"
      playsInline={playsInline}
      load={load}
      className={cn(
        "aspect-video w-full overflow-hidden rounded-lg bg-black text-white shadow-sm",
        className
      )}
      {...props}
    >
      <MediaProvider className={providerClassName}>
        {poster ? (
          <Poster
            src={poster}
            alt={posterAlt}
            className={cn("vds-poster h-full w-full object-cover", posterClassName)}
          />
        ) : null}
        {tracks.map((track) => (
          <Track
            key={`${track.kind}-${track.language ?? track.label ?? track.src}`}
            src={track.src}
            kind={track.kind}
            language={track.language}
            label={track.label}
            default={track.default}
          />
        ))}
        {providerChildren}
      </MediaProvider>
      <DefaultVideoLayout
        thumbnails={thumbnails}
        icons={defaultLayoutIcons}
        {...layoutProps}
      />
    </MediaPlayer>
  )
}

export type AudioPlayerProps = Omit<React.ComponentProps<typeof MediaPlayer>, "children"> & {
  tracks?: MediaTextTrack[]
  layoutProps?: Omit<React.ComponentProps<typeof DefaultAudioLayout>, "icons">
  providerChildren?: React.ReactNode
  className?: string
  providerClassName?: string
}

function AudioPlayer({
  tracks = [],
  layoutProps,
  providerChildren,
  className,
  providerClassName,
  load = "visible",
  ...props
}: AudioPlayerProps) {
  return (
    <MediaPlayer
      data-slot="audio-player"
      load={load}
      className={cn("w-full overflow-hidden rounded-lg border bg-background shadow-sm", className)}
      {...props}
    >
      <MediaProvider className={providerClassName}>
        {tracks.map((track) => (
          <Track
            key={`${track.kind}-${track.language ?? track.label ?? track.src}`}
            src={track.src}
            kind={track.kind}
            language={track.language}
            label={track.label}
            default={track.default}
          />
        ))}
        {providerChildren}
      </MediaProvider>
      <DefaultAudioLayout icons={defaultLayoutIcons} {...layoutProps} />
    </MediaPlayer>
  )
}

export { AudioPlayer, VideoPlayer }
