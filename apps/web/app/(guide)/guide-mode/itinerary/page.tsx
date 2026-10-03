import { getEditorPlanPreview } from "@/lib/server/trip-preview"
import { PlanEditor } from "@/components/shared/guide/plan-editor"

export default function ItineraryEditorPage() {
  return <PlanEditor initial={getEditorPlanPreview()} />
}
