// playground/App.tsx
import { Button } from "../src/components/ui/button";

export default function App() {
    return (
        <div className="p-6 space-y-4">
            <Button>Default Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="destructive">Delete</Button>
        </div>
    );
}