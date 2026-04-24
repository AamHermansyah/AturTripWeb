'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useParams, useRouter } from 'next/navigation'
import { DateAvailability, DUMMY_BY_HOURS } from '@/components/shared/date-availability'
import type { AvailabilityType, TripDate } from '@/components/shared/date-availability'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ReasonSelector } from '@/components/shared/booking/reason-selector'
import {
  AirplaneTiltIcon,
  CalendarBlankIcon,
  ClockIcon,
  CloudIcon,
  DotsThreeIcon,
  LightningIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import type { DateRange } from 'react-day-picker'

// Prototype — ganti dengan data dari API saat integrasi
const AVAILABILITY_TYPE: AvailabilityType = 'by_hours'
const TRIP_DATES: TripDate[] = DUMMY_BY_HOURS

const CURRENT_SCHEDULE = {
  date: '10 Mei 2026',
  time: '09:00 WIB',
}

const RESCHEDULE_REASONS = [
  { id: 'change-of-plans', label: 'Perubahan rencana', icon: CalendarBlankIcon },
  { id: 'weather', label: 'Kondisi cuaca', icon: CloudIcon },
  { id: 'travel-issues', label: 'Masalah perjalanan', icon: AirplaneTiltIcon },
  { id: 'urgent', label: 'Ada keperluan mendadak', icon: LightningIcon },
  { id: 'other', label: 'Lainnya', icon: DotsThreeIcon },
]

export default function BookingReschedulePage() {
  const router = useRouter()
  const { id: bookingId } = useParams<{ id: string }>()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const [reason, setReason] = useState<string | null>(null)
  const [description, setDescription] = useState('')

  const isDateSelected =
    AVAILABILITY_TYPE === 'by_hours'
      ? selectedDate !== undefined && selectedTimeSlot !== undefined
      : selectedRange?.from !== undefined && selectedRange?.to !== undefined

  const isConfirmEnabled = isDateSelected && reason !== null

  function handleDateSelect(date: Date | undefined) {
    setSelectedDate(date)
    setSelectedTimeSlot(undefined)
  }

  return (
    <div className="px-5 space-y-6">
      {/* Judul */}
      <div>
        <h1 className="font-heading text-lg font-extrabold">Ubah Jadwal</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pilih tanggal dan jam baru untuk perjalananmu.
        </p>
      </div>

      {/* Jadwal saat ini */}
      <div className="space-y-2">
        <h2 className="font-heading text-sm font-semibold">Jadwal Saat Ini</h2>
        <div className="rounded-2xl border bg-card p-4 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <CalendarBlankIcon weight="fill" className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium">{CURRENT_SCHEDULE.date}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ClockIcon weight="fill" className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium">{CURRENT_SCHEDULE.time}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Pilih jadwal baru */}
      <div className="space-y-3">
        <h2 className="font-heading text-sm font-semibold">Pilih Jadwal Baru</h2>
        <DateAvailability
          type={AVAILABILITY_TYPE}
          dates={TRIP_DATES}
          selectedDate={selectedDate}
          selectedRange={selectedRange}
          selectedTimeSlot={selectedTimeSlot}
          onDateSelect={handleDateSelect}
          onRangeSelect={setSelectedRange}
          onTimeSlotSelect={setSelectedTimeSlot}
        />
      </div>

      {/* Alasan perubahan jadwal */}
      <div className="space-y-3">
        <h2 className="font-heading text-sm font-semibold">Alasan Perubahan Jadwal</h2>
        <ReasonSelector
          reasons={RESCHEDULE_REASONS}
          selected={reason}
          onSelect={setReason}
        />
      </div>

      {/* Deskripsi tambahan */}
      <div className="space-y-2">
        <h2 className="font-heading text-sm font-semibold">
          Deskripsi <span className="text-muted-foreground font-normal">(opsional)</span>
        </h2>
        <Textarea
          placeholder="Ceritakan lebih lanjut alasan kamu mengubah jadwal ini..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="text-sm resize-none min-h-20"
        />
      </div>

      {/* Info kebijakan reschedule */}
      <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5">
        <WarningCircleIcon weight="fill" className="size-4 text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">
          Perubahan jadwal hanya dapat dilakukan <span className="font-semibold">maksimal 1x</span> dan
          paling lambat <span className="font-semibold">24 jam</span> sebelum jadwal perjalanan.
        </p>
      </div>

      <Button
        className="w-full"
        disabled={!isConfirmEnabled}
        onClick={() => router.push(`/booking/${bookingId}`)}
      >
        Konfirmasi Perubahan Jadwal
      </Button>
    </div>
  )
}
