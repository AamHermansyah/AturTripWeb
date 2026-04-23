'use client'

import { Calendar } from '@/components/ui/calendar'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import { addMonths, differenceInCalendarDays, format, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns'
import { id } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'

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

export const DUMMY_BY_HOURS: TripDate[] = [
  {
    date: new Date(2026, 4, 10),
    status: 'available',
    timeSlots: [
      { time: '08:00', status: 'full' },
      { time: '09:00', status: 'available' },
      { time: '10:00', status: 'available' },
      { time: '11:00', status: 'full' },
      { time: '13:00', status: 'available' },
      { time: '14:00', status: 'available' },
      { time: '15:00', status: 'full' },
    ],
  },
  {
    date: new Date(2026, 4, 14),
    status: 'available',
    timeSlots: [
      { time: '08:00', status: 'available' },
      { time: '09:00', status: 'available' },
      { time: '10:00', status: 'full' },
      { time: '11:00', status: 'full' },
      { time: '13:00', status: 'available' },
      { time: '14:00', status: 'available' },
    ],
  },
  {
    date: new Date(2026, 4, 24),
    status: 'full',
    timeSlots: [
      { time: '08:00', status: 'full' },
      { time: '09:00', status: 'full' },
      { time: '10:00', status: 'full' },
      { time: '11:00', status: 'full' },
      { time: '13:00', status: 'full' },
    ],
  },
  {
    date: new Date(2026, 5, 7),
    status: 'available',
    timeSlots: [
      { time: '09:00', status: 'available' },
      { time: '10:00', status: 'available' },
      { time: '11:00', status: 'available' },
      { time: '14:00', status: 'available' },
      { time: '15:00', status: 'full' },
    ],
  },
  {
    date: new Date(2026, 5, 14),
    status: 'available',
    timeSlots: [
      { time: '08:00', status: 'full' },
      { time: '09:00', status: 'available' },
      { time: '11:00', status: 'available' },
      { time: '13:00', status: 'full' },
      { time: '14:00', status: 'available' },
      { time: '15:00', status: 'available' },
    ],
  },
  {
    date: new Date(2026, 5, 21),
    status: 'available',
    timeSlots: [
      { time: '08:00', status: 'available' },
      { time: '09:00', status: 'available' },
      { time: '10:00', status: 'available' },
      { time: '11:00', status: 'full' },
    ],
  },
]

export const DUMMY_BY_DAYS: TripDate[] = [
  { date: new Date(2026, 4, 10), status: 'available' },
  { date: new Date(2026, 4, 17), status: 'available' },
  { date: new Date(2026, 4, 24), status: 'full' },
  { date: new Date(2026, 5, 7), status: 'available' },
  { date: new Date(2026, 5, 14), status: 'full' },
  { date: new Date(2026, 5, 21), status: 'available' },
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
      <div className="rounded-2xl border border-border/60 overflow-hidden">
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
            defaultMonth={dates[0]?.date}
            locale={id}
            className="w-full"
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
            defaultMonth={dates[0]?.date}
            locale={id}
            className="w-full"
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
                variant={slot.status === 'full'
                  ? 'destructive'
                  : selectedTimeSlot === slot.time
                    ? 'default'
                    : 'outline'}
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
