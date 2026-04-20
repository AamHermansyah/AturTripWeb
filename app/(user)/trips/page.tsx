import { PaymentBanner } from './_components/payment-banner'
import { ReviewLastTrip } from './_components/review-last-trip'
import EmptyBooking from './_components/empty-booking'
import Upcoming from './_components/upcoming'
import OnGoing from './_components/ongoing'

function TripsPage() {
  return (
    <div className="px-5 space-y-8 pt-2 pb-10">
      <ReviewLastTrip />
      <OnGoing />
      <Upcoming />
      <EmptyBooking />
      <PaymentBanner />
    </div>
  )
}

export default TripsPage