import { ProgressCard } from "@/components/display/progress"
import { StateView } from "@/components/feedback/state-view"
import { Rating } from "@/components/inputs/rating"
import { RangeSlider, Slider } from "@/components/inputs/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FormsSection() {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Advanced inputs</CardTitle>
          <CardDescription>Rating and sliders.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <Rating defaultValue={4} />
          <Slider defaultValue={72} label="Quality" showValue formatValue={(value) => `${value}%`} />
          <RangeSlider defaultValue={[20, 80]} label="Range" showValue />
        </CardContent>
      </Card>
      <ProgressCard title="Form completeness" description="input, select, switch, textarea" value={86} tone="success" footer={<Badge label="forms" status="success" />} />
      <StateView status="loading" title="Loading state" description="Spinner/skeleton/progress state component." />
    </div>
  )
}
