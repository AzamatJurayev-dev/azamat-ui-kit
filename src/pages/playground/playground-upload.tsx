import { useMemo, useState } from "react"
import { Button, FileUpload, ImageUpload } from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage } from "./playground-ui"

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
      title="Upload"
      description="Drag/drop, validation, rejected files, mock progress and action trails."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => setUploadDisabled((value) => !value)}>
          {uploadDisabled ? "Enable upload" : "Disable upload"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setSimulateError((value) => !value)}>
          {simulateError ? "Disable error mode" : "Enable error mode"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={runMockUpload} disabled={uploadLoading}>
          {uploadLoading ? "Upload running..." : "Run mock upload"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={resetProgress}>
          Reset progress
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setUploadProgress((value) => (value >= 100 ? 0 : value + 25))}>
          Manual progress: {uploadProgress}%
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setSingleImageMode((value) => !value)}>
          {singleImageMode ? "Allow multiple images" : "Single image mode"}
        </Button>
        <Button
          type="button"
          variant={appendImageMode ? "secondary" : "outline"}
          size="sm"
          onClick={() => setAppendImageMode((value) => !value)}
        >
          Append images: {appendImageMode ? "ON" : "OFF"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={clearAllFiles}>
          Clear all staged files
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PlaygroundCard
          title="FileUpload"
          description="Client-side validation only; app owns real upload logic."
        >
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
          <p className="mt-3 text-xs text-muted-foreground">
            File slot usage: {fileSlotUsage}
          </p>
        </PlaygroundCard>

        <PlaygroundCard
          title="ImageUpload"
          description="Image previews use object URLs and cleanup in component internals."
        >
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
          <p className="mt-3 text-xs text-muted-foreground">Image slot usage: {imageSlotUsage}</p>
        </PlaygroundCard>

        <PlaygroundCard title="Upload health" description="Mock status and upload telemetry">
          <div className="grid gap-2 text-xs text-muted-foreground">
            <p>Mode: {uploadLoading ? "Uploading..." : simulateError ? "Error simulation enabled" : "Idle"} </p>
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

      <PlaygroundUsage
        title="Upload usage"
        items={[
          "Keep upload logic in application layer; UI owns only file staging and status states.",
          "Pass `rejectedFiles` for meaningful error messaging (size/type) before actual API upload.",
          "Expose `progress` and action logs to parent to connect with real upload APIs (S3, tus, presigned URLs).",
          "Use append mode for progressive galleries and replace mode for strict one-per-field policies.",
        ]}
        code={`const onUpload = async () => {\n  addToast({ title: \"Upload started\" })\n  setLoading(true)\n  // wire progress + error states to transport callbacks\n}`}
      />
    </DemoSection>
  )
}
