'use client'

import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { addMonths, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns'
import { id } from 'date-fns/locale'
import { getDefaultClassNames, type DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'

export type AvailabilityType = 'by_hours' | 'by_days'
export type DayStatus = 'available' | 'full'

export type TimeSlot = {
  time: string
  status: 'available' | 'full'
}

export type TripDate = {
  date: Date
  status: DayStatus
  timeSlots?: TimeSlot[]
}

export type DateAvailabilityProps = {
  type: AvailabilityType
  dates: TripDate[]
  selectedDate?: Date
  selectedTimeSlot?: string
  onDateSelect?: (date: Date | undefined) => void
  onTimeSlotSelect?: (time: string) => void
  selectedRange?: DateRange
  onRangeSelect?: (range: DateRange | undefined) => void
}

// Preset slot agar daftar tanggal tetap ringkas dan gampang diubah.
const SLOTS_FULL_DAY: TimeSlot[] = [
  { time: '08:00', status: 'available' },
  { time: '09:00', status: 'available' },
  { time: '10:00', status: 'available' },
  { time: '11:00', status: 'available' },
  { time: '13:00', status: 'available' },
  { time: '14:00', status: 'available' },
  { time: '15:00', status: 'available' },
]

const SLOTS_MOSTLY_BOOKED: TimeSlot[] = [
  { time: '08:00', status: 'full' },
  { time: '09:00', status: 'available' },
  { time: '10:00', status: 'full' },
  { time: '11:00', status: 'full' },
  { time: '13:00', status: 'available' },
  { time: '14:00', status: 'full' },
]

const SLOTS_MORNING_ONLY: TimeSlot[] = [
  { time: '06:00', status: 'available' },
  { time: '07:00', status: 'available' },
  { time: '08:00', status: 'full' },
  { time: '09:00', status: 'available' },
]

const SLOTS_ALL_FULL: TimeSlot[] = [
  { time: '08:00', status: 'full' },
  { time: '09:00', status: 'full' },
  { time: '10:00', status: 'full' },
  { time: '11:00', status: 'full' },
  { time: '13:00', status: 'full' },
]

// Bulan 7 = Agustus, 8 = September (index bulan JS dimulai dari 0).
export const DUMMY_BY_HOURS: TripDate[] = [
  // ── Agustus 2026 ──
  { date: new Date(2026, 7, 24), status: 'available', timeSlots: SLOTS_MORNING_ONLY },
  { date: new Date(2026, 7, 25), status: 'available', timeSlots: SLOTS_MOSTLY_BOOKED },
  { date: new Date(2026, 7, 26), status: 'available', timeSlots: SLOTS_FULL_DAY },
  { date: new Date(2026, 7, 27), status: 'full', timeSlots: SLOTS_ALL_FULL },
  { date: new Date(2026, 7, 28), status: 'available', timeSlots: SLOTS_MOSTLY_BOOKED },
  { date: new Date(2026, 7, 29), status: 'available', timeSlots: SLOTS_FULL_DAY },
  { date: new Date(2026, 7, 30), status: 'available', timeSlots: SLOTS_MORNING_ONLY },
  { date: new Date(2026, 7, 31), status: 'full', timeSlots: SLOTS_ALL_FULL },

  // ── September 2026 ──
  { date: new Date(2026, 8, 2), status: 'available', timeSlots: SLOTS_FULL_DAY },
  { date: new Date(2026, 8, 3), status: 'available', timeSlots: SLOTS_MOSTLY_BOOKED },
  { date: new Date(2026, 8, 5), status: 'available', timeSlots: SLOTS_FULL_DAY },
  { date: new Date(2026, 8, 6), status: 'available', timeSlots: SLOTS_MORNING_ONLY },
  { date: new Date(2026, 8, 9), status: 'full', timeSlots: SLOTS_ALL_FULL },
  { date: new Date(2026, 8, 10), status: 'available', timeSlots: SLOTS_MOSTLY_BOOKED },
  { date: new Date(2026, 8, 12), status: 'available', timeSlots: SLOTS_FULL_DAY },
  { date: new Date(2026, 8, 13), status: 'available', timeSlots: SLOTS_MORNING_ONLY },
  { date: new Date(2026, 8, 16), status: 'available', timeSlots: SLOTS_MOSTLY_BOOKED },
  { date: new Date(2026, 8, 19), status: 'available', timeSlots: SLOTS_FULL_DAY },
  { date: new Date(2026, 8, 20), status: 'full', timeSlots: SLOTS_ALL_FULL },
  { date: new Date(2026, 8, 23), status: 'available', timeSlots: SLOTS_MOSTLY_BOOKED },
  { date: new Date(2026, 8, 26), status: 'available', timeSlots: SLOTS_FULL_DAY },
  { date: new Date(2026, 8, 27), status: 'available', timeSlots: SLOTS_MORNING_ONLY },
  { date: new Date(2026, 8, 30), status: 'available', timeSlots: SLOTS_MOSTLY_BOOKED },
]

export const DUMMY_BY_DAYS: TripDate[] = [
  // ── Agustus 2026 ──
  { date: new Date(2026, 7, 24), status: 'available' },
  { date: new Date(2026, 7, 25), status: 'available' },
  { date: new Date(2026, 7, 26), status: 'available' },
  { date: new Date(2026, 7, 27), status: 'full' },
  { date: new Date(2026, 7, 28), status: 'available' },
  { date: new Date(2026, 7, 29), status: 'available' },
  { date: new Date(2026, 7, 30), status: 'available' },
  { date: new Date(2026, 7, 31), status: 'full' },

  // ── September 2026 ──
  { date: new Date(2026, 8, 2), status: 'available' },
  { date: new Date(2026, 8, 3), status: 'available' },
  { date: new Date(2026, 8, 5), status: 'available' },
  { date: new Date(2026, 8, 6), status: 'available' },
  { date: new Date(2026, 8, 9), status: 'full' },
  { date: new Date(2026, 8, 10), status: 'available' },
  { date: new Date(2026, 8, 12), status: 'available' },
  { date: new Date(2026, 8, 13), status: 'available' },
  { date: new Date(2026, 8, 16), status: 'available' },
  { date: new Date(2026, 8, 19), status: 'available' },
  { date: new Date(2026, 8, 20), status: 'full' },
  { date: new Date(2026, 8, 23), status: 'available' },
  { date: new Date(2026, 8, 26), status: 'available' },
  { date: new Date(2026, 8, 27), status: 'available' },
  { date: new Date(2026, 8, 30), status: 'available' },
]

function CalendarLegend() {
  return (
    <div className="flex items-center justify-center gap-5 py-2.5 border-t border-border/40">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-success inline-block shrink-0" />
        <span className="text-xs text-muted-foreground">Tersedia</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-destructive inline-block shrink-0" />
        <span className="text-xs text-muted-foreground">Penuh</span>
      </div>
    </div>
  )
}

const dayPickerClassNames = getDefaultClassNames()

// Sel kalender default menempel rapat, sehingga ring pada tanggal tersedia/penuh
// yang bersebelahan saling bersentuhan. Gap dipasang di baris minggu DAN di baris
// nama hari — kalau hanya salah satu, kolom headernya jadi tidak lurus.
const SPACED_CLASS_NAMES = {
  weekdays: cn('flex gap-1', dayPickerClassNames.weekdays),
  week: cn('mt-2 flex w-full gap-1', dayPickerClassNames.week),
}

export function DateAvailability({
  type,
  dates,
  selectedDate,
  selectedTimeSlot,
  onDateSelect,
  onTimeSlotSelect,
  selectedRange,
  onRangeSelect,
}: DateAvailabilityProps) {
  const availableDates = dates.filter((d) => d.status === 'available').map((d) => d.date)
  const fullDates = dates.filter((d) => d.status === 'full').map((d) => d.date)

  const today = startOfDay(new Date())
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const maxDate = addMonths(today, 6)
  const maxMonthStart = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)

  const isOutOfRange = (date: Date) => isBefore(date, today) || isAfter(date, maxDate)

  const isDisabled = (date: Date) => {
    if (isOutOfRange(date)) return true
    const entry = dates.find((d) => isSameDay(d.date, date))
    if (!entry) return true
    if (entry.status === 'full') return true
    return false
  }

  const activeSlots = selectedDate
    ? (dates.find((d) => isSameDay(d.date, selectedDate))?.timeSlots ?? [])
    : []

  const modifiersClassNames = {
    available:
      'font-bold text-success bg-success/10 [&>button]:hover:text-primary-foreground dark:[&>button]:hover:text-primary-foreground [&>button]:hover:bg-success/80 dark:[&>button]:hover:bg-success/80 ring-1 ring-success/40 rounded-[var(--cell-radius)]',
    full:
      'font-bold text-white! bg-destructive/50 opacity-100! [&>button]:opacity-100! cursor-not-allowed! ring-1 ring-destructive rounded-[var(--cell-radius)] line-through',
  }

  return (
    <div className="space-y-2">
      <div className="rounded-2xl border bg-card overflow-hidden">
        {type === 'by_hours' ? (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => onDateSelect?.(date)}
            disabled={isDisabled}
            hidden={isOutOfRange}
            startMonth={currentMonthStart}
            endMonth={maxMonthStart}
            modifiers={{ available: availableDates, full: fullDates }}
            modifiersClassNames={modifiersClassNames}
            classNames={SPACED_CLASS_NAMES}
            defaultMonth={dates[0]?.date}
            locale={id}
            className="w-full bg-card"
          />
        ) : (
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={(range) => onRangeSelect?.(range)}
            disabled={isDisabled}
            hidden={isOutOfRange}
            startMonth={currentMonthStart}
            endMonth={maxMonthStart}
            modifiers={{ available: availableDates, full: fullDates }}
            modifiersClassNames={modifiersClassNames}
            classNames={SPACED_CLASS_NAMES}
            defaultMonth={dates[0]?.date}
            locale={id}
            className="w-full bg-card"
            resetOnSelect
          />
        )}
        <CalendarLegend />
      </div>

      {/* by_hours: time slots */}
      {type === 'by_hours' && selectedDate && (
        <div className="space-y-2 pt-2">
          <h3 className="font-heading text-sm font-semibold">Pilih Jam</h3>
          <div className="flex flex-wrap gap-2">
            {activeSlots.map((slot) => (
              <Button
                key={slot.time}
                disabled={slot.status === 'full'}
                onClick={() => onTimeSlotSelect?.(slot.time)}
                size="xs"
                variant={
                  slot.status === 'full'
                    ? 'destructive'
                    : selectedTimeSlot === slot.time
                      ? 'default'
                      : 'outline'
                }
              >
                {slot.time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
