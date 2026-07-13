import type { ComponentDemoMock } from "../types"

export const qrCodeMock: ComponentDemoMock = {
  code: `import { QRCode } from "tembro"

export function Example() {
  return <QRCode value="https://example.com/invoices/INV-2048" errorCorrectionLevel="H" size={180} />
}`,
  cliCommand: "npx tembro add qr-code",
  highlights: ["Real standards-compliant QR encoding", "SVG output with configurable error correction and colors"],
  scenarios: [
    { title: "Payment links", description: "Encode checkout or invoice URLs into scan-ready symbols." },
    { title: "Device pairing", description: "Share connection payloads with stronger error correction." },
  ],
}
