import { component, createShowcaseDemoRegistry } from "@/showcase/create-demo"

export const uploadShowcaseDemoRegistry = createShowcaseDemoRegistry([
  component("file-upload", "FileUpload", "upload", "Full file upload surface with dropzone, action button and helper text."),
  component("image-upload", "ImageUpload", "upload", "Image upload pattern with preview-oriented copy.", "ImageUpload"),
  component("file-dropzone", "FileDropzone", "upload", "Lightweight file dropzone primitive for custom upload flows."),
])
