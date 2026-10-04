import { TripChangePreview } from "@/components/shared/booking/trip-change-preview"
import { getTripChangePreview } from "@/lib/server/trip-change-preview"

export default function GuideChangesPage() {
  return <TripChangePreview preview={getTripChangePreview()} initialRole="guide" />
}
