import { useMemo, useState } from "react"
import { AlertTriangleIcon, ImageIcon, UploadCloudIcon } from "lucide-react"

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ComponentPreview, FileUpload, ImageUpload, StatusBadge } from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid, TokenPill } from "./playground-ui"

type UploadEvent = {
  message: string
  type: "system" | "success" | "warning"
}

export function UploadSection() {
  const rejectedFiles = useMemo(
    () => [
      {
        file: new File(["demo"], "too-large-demo.pdf", { type: "application/pdf" }),
        reason: "max-size" as const,
        message: "File is larger than 2 MB.",
      },
      {
        file: new File(["demo"], "restricted.txt", { type: "text/plain" }),
        reason: "type" as const,
        message: "TXT files are disabled in mock rule-set.",
      },
    ],
    [],
  )

  const baseFileLimit = 3
  const baseImageLimit = 4

  const [files, setFiles] = useState<File[]>([])
  const [images, setImages] = useState<File[]>([])
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadDisabled, setUploadDisabled] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [singleImageMode, setSingleImageMode] = useState(false)
  const [appendImageMode, setAppendImageMode] = useState(true)
  const [simulateError, setSimulateError] = useState(false)
  const [uploadHistory, setUploadHistory] = useState<UploadEvent[]>([
    { type: "system", message: "Upload workspace initialized." },
    { type: "system", message: "Max file size: 2MB, max docs: 3." },
  ])

  const addHistory = (type: UploadEvent["type"], message: string) => {
    setUploadHistory((items) => [{ type, message }, ...items].slice(0, 8))
  }

  const handleFilesChange = (nextFiles: File[]) => {
    setFiles(nextFiles)
    addHistory("system", `FileUpload updated: ${nextFiles.length} file(s) staged.`)
  }

  const handleImagesChange = (nextImages: File[]) => {
    setImages(nextImages)
    addHistory("system", `ImageUpload updated: ${nextImages.length} image(s) staged.`)
  }

  const runMockUpload = () => {
    if (uploadLoading) return
    setUploadLoading(true)
    addHistory("system", "Upload started: progressing in mock mode.")

    const stepInterval = setInterval(() => {
      setUploadProgress((value) => {
        if (value >= 100) {
          clearInterval(stepInterval)
          return 100
        }
        return value + 8
      })
    }, 120)

    setTimeout(() => {
      clearInterval(stepInterval)
      const shouldFail = simulateError
      setUploadLoading(false)

      if (shouldFail) {
        addHistory("warning", "Mock upload failed with network error. Retry required.")
      } else {
        setUploadProgress(100)
        addHistory("success", "Upload completed and persisted to mock backend.")
      }
    }, 2200)
  }

  const resetProgress = () => {
    setUploadLoading(false)
    setUploadProgress(0)
    addHistory("system", "Progress reset to 0.")
  }

  const clearAllFiles = () => {
    setFiles([])
    setImages([])
    addHistory("system", "All staged files cleared.")
  }

  const fileSlotUsage = `${files.length}/${baseFileLimit}`
  const imageSlotUsage = `${images.length}/${singleImageMode ? 1 : baseImageLimit}`

  return (
    <DemoSection
      sectionIndex={6}
      id="upload"
      eyebrow="File handling"
      title="Upload"
      description="Drag/drop, validation, rejected files, mock progress, previews and parent-controlled upload state."
      action={<StatusBadge tone={uploadLoading ? "info" : simulateError ? "warning" : "success"} dot>{uploadLoading ? "Uploading" : simulateError ? "Error mode" : "Ready"}</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Files</CardDescription>
            <CardTitle className="text-3xl">{fileSlotUsage}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Document slots</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Images</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl"><ImageIcon className="size-5 text-primary" />{imageSlotUsage}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Preview slots</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Progress</CardDescription>
            <CardTitle className="text-3xl">{uploadProgress}%</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Controlled by parent</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Rejected</CardDescription>
            <CardTitle className="flex items-center gap-2 text-3xl"><AlertTriangleIcon className="size-5 text-amber-500" />{rejectedFiles.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Validation demos</CardContent>
        </Card>
      </section>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="Upload controls" description="Toggle transport-like states without real API calls." badge={<Badge variant="outline">state</Badge>}>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant={uploadDisabled ? "default" : "outline"} size="sm" onClick={() => setUploadDisabled((value) => !value)}>
              {uploadDisabled ? "Enable upload" : "Disable upload"}
            </Button>
            <Button type="button" variant={simulateError ? "default" : "outline"} size="sm" onClick={() => setSimulateError((value) => !value)}>
              {simulateError ? "Disable error" : "Enable error"}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={runMockUpload} disabled={uploadLoading}>
              {uploadLoading ? "Upload running..." : "Run mock upload"}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={resetProgress}>Reset progress</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setUploadProgress((value) => (value >= 100 ? 0 : value + 25))}>
              Manual +25%
            </Button>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Image policy" description="Preview mode, append mode and single-file policies." badge={<Badge variant="outline">image</Badge>}>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant={singleImageMode ? "default" : "outline"} size="sm" onClick={() => setSingleImageMode((value) => !value)}>
              {singleImageMode ? "Single image" : "Multi image"}
            </Button>
            <Button type="button" variant={appendImageMode ? "default" : "outline"} size="sm" onClick={() => setAppendImageMode((value) => !value)}>
              Append: {appendImageMode ? "ON" : "OFF"}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={clearAllFiles}>Clear all</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <TokenPill>accept="image/*"</TokenPill>
            <TokenPill>maxFiles</TokenPill>
            <TokenPill>appendFiles</TokenPill>
            <TokenPill>preview</TokenPill>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Upload rules" description="UI only stages files; app owns transport." badge={<Badge variant="outline">API-free</Badge>}>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/25 p-3">R2/S3/presigned logic stays in the app.</div>
            <div className="rounded-lg border bg-muted/25 p-3">Client validation helps UX, but backend must still validate.</div>
            <div className="rounded-lg border bg-muted/25 p-3">Progress is a controlled prop from upload transport callbacks.</div>
          </div>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Upload workspace"
        description="File upload, image preview, validation messages and progress in one interactive mock surface."
        dependencies={["FileUpload", "ImageUpload", "File[]", "progress"]}
        code={`<FileUpload
  files={files}
  onFilesChange={setFiles}
  accept=".pdf,.xlsx,image/*"
  maxFiles={3}
  maxSize={2 * 1024 * 1024}
  progress={progress}
/>

<ImageUpload files={images} onFilesChange={setImages} preview />`}
      >
        <div className="grid w-full gap-4 lg:grid-cols-3">
          <PlaygroundCard title="FileUpload" description="Client-side validation only; app owns real upload logic.">
            <FileUpload
              files={files}
              onFilesChange={handleFilesChange}
              rejectedFiles={rejectedFiles}
              accept=".pdf,.xlsx,image/*"
              maxFiles={baseFileLimit}
              maxSize={2 * 1024 * 1024}
              progress={uploadProgress}
              disabled={uploadDisabled}
              loading={uploadLoading}
              dropzoneDescription="Accepts PDF, Excel and images. Max 3 files."
              helperText="Try uploading restricted extension to see rejected list."
            />
          </PlaygroundCard>

          <PlaygroundCard title="ImageUpload" description="Preview URLs are created and revoked internally.">
            <ImageUpload
              files={images}
              onFilesChange={handleImagesChange}
              maxFiles={singleImageMode ? 1 : baseImageLimit}
              appendFiles={appendImageMode}
              maxSize={2 * 1024 * 1024}
              disabled={uploadDisabled}
              loading={uploadLoading}
              progress={uploadProgress}
              helperText={singleImageMode ? "Single image only mode" : "Max files 4"}
            />
          </PlaygroundCard>

          <PlaygroundCard title="Upload health" description="Mock status and upload telemetry">
            <div className="grid gap-2 text-xs text-muted-foreground">
              <p>Mode: {uploadLoading ? "Uploading..." : simulateError ? "Error simulation enabled" : "Idle"}</p>
              <p>Progress: {uploadProgress}%</p>
              <p>Files staged: {files.length}</p>
              <p>Images staged: {images.length}</p>
              <p>Network simulation: {simulateError ? "WARN" : "Stable"}</p>
            </div>
            <div className="mt-2 space-y-1">
              {uploadHistory.map((item) => (
                <p
                  key={`${item.type}-${item.message}`}
                  className={`rounded border px-2 py-1 ${
                    item.type === "success"
                      ? "border-emerald-400/50 bg-emerald-500/10"
                      : item.type === "warning"
                        ? "border-rose-500/40 bg-rose-500/10"
                        : "border-border bg-muted/30"
                  }`}
                >
                  {item.message}
                </p>
              ))}
            </div>
          </PlaygroundCard>
        </div>
      </ComponentPreview>

      <PlaygroundUsage
        title="Upload usage"
        items={[
          "Keep upload logic in the application layer; UI owns only file staging, validation display and status states.",
          "Pass rejected files for meaningful size/type messages before actual API upload starts.",
          "Expose progress and action logs from parent state to connect with real upload APIs or presigned URLs.",
          "Use append mode for galleries and replace mode for strict one-per-field upload policies.",
        ]}
        code={`const onUpload = async () => {
  setLoading(true)
  // wire progress + error states to transport callbacks
}

<FileUpload files={files} onFilesChange={setFiles} progress={progress} />`}
      />
    </DemoSection>
  )
}
