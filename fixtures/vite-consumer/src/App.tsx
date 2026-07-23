import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function App() {
  return (
    <main className="mx-auto grid min-h-screen max-w-xl content-center gap-4 p-6">
      <h1 className="text-3xl font-semibold">Tembro Vite consumer</h1>
      <p className="text-sm opacity-70">This app imports only CLI-copied local component source.</p>
      <Input aria-label="Workspace name" placeholder="Workspace name" />
      <Button>Create workspace</Button>
    </main>
  )
}
