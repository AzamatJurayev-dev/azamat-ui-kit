import type { ComponentDemoMock } from "../types"

export const imageUploadMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { ImageUpload } from "@/index"

export function Example() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <ImageUpload
      files={files}
      onFilesChange={setFiles}
      maxFiles={3}
      helperText="Upload hero illustrations or block thumbnails."
    />
  )
}`,
  cliCommand: "npx azamat-ui-kit-cli add image-upload",
  highlights: [
    "Image preview support",
    "Reusable remove action behavior",
    "Controlled file array API",
    "Preview-first upload route",
  ],
  scenarios: [
    { title: "Template thumbnails", description: "Preview uploaded images before attaching them to a template." },
    { title: "Marketing assets", description: "Use for screenshots, gallery items and hero illustrations." },
    { title: "Media field", description: "Keep image upload inside a controlled route or form." },
  ],
  capabilityNotes: [
    "Use ImageUpload when visual confirmation is more important than a generic file list.",
    "Preview and remove behavior come from the same reusable component surface.",
    "Keep image routes consistent across docs, templates and CMS-like forms.",
  ],
}
