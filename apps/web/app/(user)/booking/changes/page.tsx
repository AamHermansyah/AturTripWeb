import { TripChangePreview } from "@/components/shared/booking/trip-change-preview"
import { getTripChangePreview } from "@/lib/server/trip-change-preview"

export default function BookingChangesPage() {
  return <TripChangePreview preview={getTripChangePreview()} initialRole="traveler" />
}
