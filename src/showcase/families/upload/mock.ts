import type { FamilyDemoMock } from "../types"

export const uploadFamilyMock: FamilyDemoMock = {
  code: `import { FileUpload, ImageUpload } from "azix"\n\nexport function Example() {\n  return <FileUpload />\n}`,
  highlights: ["File upload", "Image upload", "Attachment counts", "Media-ready flows"],
  scenarios: [
    { title: "Asset manager", description: "Collect multiple files and preview uploaded media." },
    { title: "Profile image flow", description: "Use image upload in account and brand settings." },
    { title: "Document attachments", description: "Attach release notes, invoices or briefs inline." },
  ],
  metrics: [
    { label: "Exports", value: "2" },
    { label: "Files", value: "12" },
    { label: "Status", value: "Preview" },
  ],
}

