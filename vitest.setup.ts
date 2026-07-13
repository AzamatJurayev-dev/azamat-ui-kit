import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  })
}

if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverMock implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.ResizeObserver = ResizeObserverMock
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  class IntersectionObserverMock implements IntersectionObserver {
    readonly root = null
    readonly rootMargin = "0px"
    readonly thresholds = [0]
    disconnect() {}
    observe() {}
    takeRecords() { return [] }
    unobserve() {}
  }

  globalThis.IntersectionObserver = IntersectionObserverMock
}

if (typeof document.getAnimations !== "function") {
  document.getAnimations = () => []
}

if (typeof document.elementFromPoint !== "function") {
  document.elementFromPoint = () => null
}

if (typeof Range.prototype.getBoundingClientRect !== "function") {
  Range.prototype.getBoundingClientRect = () => new DOMRect(0, 0, 0, 0)
}

if (typeof Range.prototype.getClientRects !== "function") {
  Range.prototype.getClientRects = () => ({
    length: 0,
    item: () => null,
    [Symbol.iterator]: function* () {},
  }) as DOMRectList
}

if (typeof Element.prototype.getAnimations !== "function") {
  Element.prototype.getAnimations = () => []
}

if (typeof Element.prototype.animate !== "function") {
  Element.prototype.animate = () => ({
    cancel() {},
    finish() {},
    play() {},
    pause() {},
    reverse() {},
    updatePlaybackRate() {},
    persist() {},
    commitStyles() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => true,
    finished: Promise.resolve(undefined),
    ready: Promise.resolve(undefined),
    currentTime: 0,
    effect: null,
    id: "",
    oncancel: null,
    onfinish: null,
    onremove: null,
    pending: false,
    playState: "finished",
    playbackRate: 1,
    replaceState: "active",
    startTime: 0,
    timeline: null,
  })
}

afterEach(() => {
  cleanup()
})
