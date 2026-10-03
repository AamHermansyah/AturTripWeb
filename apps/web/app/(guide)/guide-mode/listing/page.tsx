import { ListingWizard } from "@/components/shared/guide/listing-wizard"
import { getEditorPlanPreview } from "@/lib/server/trip-preview"

export default function ListingPage() {
  return <ListingWizard initialPlan={getEditorPlanPreview().plan} />
}
