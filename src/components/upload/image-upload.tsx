import * as React from "react"

import { FileUpload, type FileUploadProps } from "@/components/upload/file-upload"

export type ImageUploadProps = Omit<FileUploadProps, "accept"> & {
  accept?: string
}

function ImageUpload({ accept = "image/*", buttonLabel = "Choose image", ...props }: ImageUploadProps) {
  return <FileUpload accept={accept} buttonLabel={buttonLabel} {...props} />
}

export { ImageUpload }
