import type * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stopInteractivePropagation(event: React.SyntheticEvent) {
  event.stopPropagation()
}
