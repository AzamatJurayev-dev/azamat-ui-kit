import * as React from "react"

import { JsonInput } from "@/index"

export function JsonInputShowcase() {
  const [value, setValue] = React.useState(`{
  "name": "Tembro",
  "version": 1
}`)

  const [isValid, setIsValid] = React.useState(true)

  return (
    <div className="space-y-3">
      <JsonInput
        value={value}
        onValueChange={(_, __, valid) => {
          setIsValid(valid)
        }}
        onChange={(event) => setValue(event.target.value)}
      />
      <p className={`text-sm ${isValid ? "text-emerald-600" : "text-destructive"}`}>
        {isValid ? "JSON is valid" : "JSON is invalid"}
      </p>
    </div>
  )
}

