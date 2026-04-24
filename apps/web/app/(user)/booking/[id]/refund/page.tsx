'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  AirplaneTiltIcon,
  CalendarBlankIcon,
  CheckCircleIcon,
  CircleIcon,
  CloudIcon,
  DotsThreeIcon,
  InfoIcon,
  ReceiptIcon,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

// Mock data — ganti dengan data dari API
const MOCK_BOOKING = {
  trip: {
    title: 'Urban Heritage Exploration',
    date: 'Besok, 09:00 WIB',
    guide: 'Alex Riverstone',
    imageSrc:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop',
  },
  refund: {
    eligible: true,
    eligibilityLabel: '100% Dapat Dikembalikan',
    eligibilityNote:
      'Pembatalan gratis hingga pukul 08:00 WIB besok. Setelah itu, biaya 50% akan dikenakan.',
    bookingTotal: 'Rp957.500',
    serviceFee: 'Rp0',
    totalRefund: 'Rp957.500',
  },
}

const CANCELLATION_REASONS = [
  { id: 'change-of-plans', label: 'Perubahan rencana', icon: CalendarBlankIcon },
  { id: 'weather', label: 'Kondisi cuaca', icon: CloudIcon },
  { id: 'travel-issues', label: 'Masalah perjalanan', icon: AirplaneTiltIcon },
  { id: 'other', label: 'Lainnya', icon: DotsThreeIcon },
]

export default function BookingCancelPage() {
  const router = useRouter()
  const { id: bookingId } = useParams<{ id: string }>()

  const [reason, setReason] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')

  const { trip, refund } = MOCK_BOOKING

  return (
    <div className="px-5 space-y-5">

      {/* Judul */}
      <div>
        <h1 className="font-heading text-lg font-extrabold">Batalkan Pemesanan</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tinjau kebijakan refund sebelum melanjutkan pembatalan.
        </p>
      </div>

      {/* Info trip + kelayakan refund */}
      <div className="rounded-2xl border bg-card p-4 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={trip.imageSrc}
            alt={trip.title}
            className="size-14 rounded-xl object-cover shrink-0 bg-muted"
          />
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">{trip.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{trip.date}</p>
            <p className="text-xs text-muted-foreground">bersama {trip.guide}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Kelayakan Refund
            </span>
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-bold',
                refund.eligible
                  ? 'bg-success/15 text-success'
                  : 'bg-destructive/15 text-destructive'
              )}
            >
              {refund.eligibilityLabel}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {refund.eligibilityNote}
          </p>
        </div>
      </div>

      {/* Alasan pembatalan */}
      <div className="space-y-3">
        <h2 className="font-heading text-sm font-semibold">Alasan Pembatalan</h2>
        <div className="rounded-2xl border bg-card overflow-hidden divide-y divide-border/60">
          {CANCELLATION_REASONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setReason(id)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40 active:bg-muted/60"
            >
              <Icon weight="duotone" className="size-5 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">{label}</span>
              {reason === id ? (
                <CheckCircleIcon weight="fill" className="size-5 shrink-0 text-success" />
              ) : (
                <CircleIcon weight="regular" className="size-5 shrink-0 text-muted-foreground/40" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masukan tambahan */}
      <div className="space-y-2">
        <h2 className="font-heading text-sm font-semibold">Masukan Tambahan</h2>
        <Textarea
          placeholder="Ceritakan lebih lanjut alasan kamu membatalkan pemesanan ini..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          className="text-sm resize-none min-h-24"
        />
      </div>

      {/* Detail refund */}
      <div className="space-y-3">
        <h2 className="font-heading text-sm font-semibold flex items-center gap-1.5">
          <ReceiptIcon weight="fill" className="size-4 text-muted-foreground" />
          Detail Refund
        </h2>
        <div className="rounded-2xl border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Pemesanan</span>
            <span className="text-sm font-medium">{refund.bookingTotal}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Biaya Layanan{' '}
              <span className="text-xs">(Tidak dapat dikembalikan)</span>
            </span>
            <span className="text-sm font-medium shrink-0">{refund.serviceFee}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Total Refund</span>
            <span className="text-base font-black text-success">{refund.totalRefund}</span>
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
            <InfoIcon weight="fill" className="size-3.5 shrink-0 text-muted-foreground mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dana akan dikembalikan ke dompet Atur-Trip kamu segera setelah pembatalan dikonfirmasi.
            </p>
          </div>
        </div>
      </div>

      {/* Tombol aksi */}
      <div className="space-y-2 flex flex-col">
        <Button
          variant="destructive"
          onClick={() => router.push(`/booking/${bookingId}`)}
        >
          Konfirmasi Pembatalan
        </Button>
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-primary text-primary"
          onClick={() => router.back()}
        >
          Kembali
        </Button>
      </div>
    </div>
  )
}
