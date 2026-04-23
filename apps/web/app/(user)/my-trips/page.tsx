import { PaymentBanner } from './_components/payment-banner'
import { ReviewLastTrip } from './_components/review-last-trip'
import EmptyBooking from './_components/empty-booking'
import Upcoming from './_components/upcoming'
import OnGoing from './_components/ongoing'
import Completed from './_components/completed'

function TripsPage() {
  return (
    <div className="px-5 space-y-6">
      <ReviewLastTrip />
      <OnGoing />
      <Upcoming />
      <Completed />
      <EmptyBooking />
      <PaymentBanner />
    </div>
  )
}

export default TripsPage