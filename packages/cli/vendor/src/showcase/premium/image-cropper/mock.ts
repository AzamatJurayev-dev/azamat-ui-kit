import type { ComponentDemoMock } from "../types"

export const imageCropperMock: ComponentDemoMock = {
  code: `import { ImageCropper } from "tembro"

export function Example() {
  return <ImageCropper src="/profile-photo.jpg" aspect={1} cropShape="round" />
}`,
  cliCommand: "npx tembro add image-cropper",
  highlights: ["Drag, zoom, rotation, and pixel crop coordinates", "Canvas helper exports the selected area as a Blob"],
  scenarios: [
    { title: "Avatar editor", description: "Crop profile media into a consistent square or circle." },
    { title: "Asset manager", description: "Prepare upload dimensions before saving media." },
  ],
}
