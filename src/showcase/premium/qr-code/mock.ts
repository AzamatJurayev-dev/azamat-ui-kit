import type { ComponentDemoMock } from "../types"

export const qrCodeMock: ComponentDemoMock = {
  code: `import { QRCode } from "@/index"

export function Example() {
  return <QRCode value="https://azamat-ui.vercel.app" alt="Azamat UI" />
}`,
  cliCommand: "npx tembro add qr-code",
  highlights: [
    "Fallback SVG renderer if no image is provided",
    "Configurable size and module density",
    "Works with plain strings and long URLs",
  ],
  scenarios: [
    { title: "Marketing", description: "Expose links in campaigns and materials." },
    { title: "Apps", description: "Generate codes for sharing deep links in dashboards." },
  ],
}

