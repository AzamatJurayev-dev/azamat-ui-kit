import type { ComponentDemoMock } from "../types"

export const fileUploadMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { FileUpload } from "tembro"

export function Example() {
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})

  return (
    <FileUpload
      files={files}
      onFilesChange={setFiles}
      accept=".pdf,.docx,.png"
      maxFiles={4}
      maxSize={4 * 1024 * 1024}
      progress={progress}
      status={files.length ? "uploading" : "idle"}
      helperText="Supports PDF, DOCX and PNG up to 4 MB."
      validateFile={(file) => file.name.includes("private") ? "Private files are not allowed." : null}
      onRetryFile={(file) => setProgress((value) => ({ ...value, [file.name]: 0 }))}
    />
  )
}`,
  cliCommand: "npx tembro add file-upload",
  highlights: [
    "Reusable dropzone and file list",
    "Rejected state support",
    "Nested clear/remove interactions",
    "Controlled files, progress and status API",
    "Custom validation and rejection messages",
  ],
  scenarios: [
    { title: "Admin attachments", description: "Upload contracts, invoices and internal release assets." },
    { title: "Controlled state", description: "Keep file state in the parent route or form container." },
    { title: "Validation", description: "Constrain type, size and count at the component boundary." },
  ],
  capabilityNotes: [
    "Use FileUpload when the route needs a production dropzone rather than a decorative input.",
    "The remove and clear actions are isolated from the parent click surface.",
    "Keep validation rules close to the component so every route behaves consistently.",
  ],
}
