import { BookingStatusBadge } from "./_components/booking-status-badge"
import { CurrentBookingCard } from "./_components/current-booking-card"
import { PaymentCountdown } from "../../../../components/shared/payment-countdown"
import { PaymentSummaryCard } from "./_components/payment-summary-card"
import { ParticipantsSection } from "./_components/participants-section"
import { MeetingPointSection } from "./_components/meeting-point-section"
import { BookingActionButtons } from "./_components/booking-action-buttons"

// ─── Mock data (UI only — no logic) ──────────────────────────────────────────
const MOCK_BOOKING = {
  id: "bk-001",
  status: "PENDING" as const,
  trip: {
    title: "Urban Heritage Exploration",
    date: "24 Okt, 09:00 WIB",
    imageSrc:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop",
  },
  payment: {
    items: [
      { label: "Harga trip (2 x Rp450.000)", amount: "Rp900.000" },
      { label: "Pajak & Biaya Lingkungan", amount: "Rp42.500" },
      { label: "Biaya Layanan Platform", amount: "Rp15.000" },
    ],
    totalAmount: "Rp957.500",
  },
  participants: "2 Orang",
  meetingPoint: {
    location: "Fountain Plaza Pusat",
    description: "Harap tiba 10 menit lebih awal.",
  },
}

export default function BookingDetailPage() {
  const { id, status, trip, payment, participants, meetingPoint } = MOCK_BOOKING
  const isPending = status === "PENDING"

  return (
    <div className="flex flex-col gap-5 px-5">
      {/* ── Status Badge ── */}
      <div className="flex justify-center">
        <BookingStatusBadge status={status} />
      </div>

      {/* ── Payment Countdown (only when PENDING) ── */}
      {isPending && <PaymentCountdown minutes="23" seconds="45" />}

      {/* ── Current Booking ── */}
      <CurrentBookingCard
        imageSrc={trip.imageSrc}
        title={trip.title}
        date={trip.date}
      />

      {/* ── Payment Summary ── */}
      <PaymentSummaryCard
        items={payment.items}
        totalAmount={payment.totalAmount}
        showPayButton={isPending}
      />

      {/* ── Participants ── */}
      <ParticipantsSection bookingId={id} participantSummary={participants} />

      {/* ── Meeting Point ── */}
      <MeetingPointSection
        location={meetingPoint.location}
        description={meetingPoint.description}
      />

      {/* ── Action Buttons ── */}
      <BookingActionButtons />
    </div>
  )
}
