'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  CalendarBlankIcon,
  CheckCircleIcon,
  ClockIcon,
  MinusIcon,
  PlusIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import { differenceInCalendarDays, format, startOfDay } from 'date-fns'
import { id } from 'date-fns/locale'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { DateAvailability, DUMMY_BY_HOURS } from '@/components/shared/date-availability'
import type { AvailabilityType, TripDate } from '@/components/shared/date-availability'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { formatDuration, cn } from '@/lib/utils'
import { useRouter, useParams } from 'next/navigation'

// Ganti ke 'by_hours' dan DUMMY_BY_HOURS untuk test mode jam
const AVAILABILITY_TYPE: AvailabilityType = 'by_hours'
const TRIP_DATES: TripDate[] = DUMMY_BY_HOURS

const PRICE_PER_PERSON = 1_750_000
const SERVICE_FEE_RATE = 0.05
const MAX_CAPACITY = 10
const TRIP_DURATION_MINUTES = 60 // 4 jam 30 menit — durasi untuk mode by_hours
const DP_RATE = 0.5

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

type BookingDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingDrawer({ open, onOpenChange }: BookingDrawerProps) {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const [quantity, setQuantity] = useState(1)
  const [paymentType, setPaymentType] = useState<'full' | 'dp'>('full')

  const now = new Date()
  const today = startOfDay(now)

  // Durasi perjalanan
  const daysDuration =
    selectedRange?.from && selectedRange?.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from) + 1
      : selectedRange?.from
        ? 1
        : null

  // Warning short notice
  let showShortNoticeWarning = true
  // if (AVAILABILITY_TYPE === 'by_days' && selectedRange?.from) {
  //   showShortNoticeWarning = differenceInCalendarDays(selectedRange.from, today) <= 1
  // } else if (AVAILABILITY_TYPE === 'by_hours' && selectedDate && selectedTimeSlot) {
  //   const [h, m] = selectedTimeSlot.split(':').map(Number)
  //   const slotTime = new Date(selectedDate)
  //   slotTime.setHours(h, m, 0, 0)
  //   showShortNoticeWarning = slotTime.getTime() - now.getTime() <= 2 * 60 * 60 * 1000
  // }

  const subtotal = PRICE_PER_PERSON * quantity
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE)
  const total = subtotal + serviceFee
  const dpAmount = Math.round(total * DP_RATE)

  const isConfirmEnabled =
    AVAILABILITY_TYPE === 'by_hours'
      ? selectedDate !== undefined && selectedTimeSlot !== undefined
      : selectedRange?.from !== undefined && selectedRange?.to !== undefined

  function handleDateSelect(date: Date | undefined) {
    setSelectedDate(date)
    setSelectedTimeSlot(undefined)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setSelectedDate(undefined)
      setSelectedRange(undefined)
      setSelectedTimeSlot(undefined)
      setQuantity(1)
      setPaymentType('full')
    }
    onOpenChange(nextOpen)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[90vh]">
        <DrawerHeader className="pb-2 text-left">
          <DrawerTitle className="text-base font-bold">
            Konfirmasi Tanggal & Peserta
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 px-4 pb-2 space-y-5 overflow-y-auto">
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

          {/* Quantity */}
          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold">Jumlah Peserta</h3>
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl border border-border/60">
              <div>
                <p className="text-sm font-medium">Total Orang</p>
                <p className="text-xs text-muted-foreground">Tersedia 4 slot lagi</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="size-8 rounded-full border border-border flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
                >
                  <MinusIcon weight="bold" className="size-3.5" />
                </button>
                <span className="text-base font-bold w-6 text-center tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(MAX_CAPACITY, quantity + 1))}
                  disabled={quantity >= MAX_CAPACITY}
                  className="size-8 rounded-full bg-success flex items-center justify-center text-white disabled:opacity-30 active:scale-95 transition-transform"
                >
                  <PlusIcon weight="bold" className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Short notice warning */}
          {showShortNoticeWarning && (
            <Alert variant="info-fill">
              <WarningCircleIcon className="size-4 text-amber-500" weight="fill" />
              <AlertTitle className="text-xs font-semibold">
                Perhatian — Jadwal Mendekati
              </AlertTitle>
              <AlertDescription className="text-xs">
                {AVAILABILITY_TYPE === 'by_days'
                  ? 'Tanggal perjalanan sangat dekat. Pastikan kamu sudah mengonfirmasi ketersediaan guide terlebih dahulu.'
                  : 'Waktu perjalanan kurang dari 2 jam lagi. Pastikan kamu sudah mengonfirmasi ketersediaan guide terlebih dahulu.'}
              </AlertDescription>
            </Alert>
          )}

          {/* Rincian perjalanan */}
          {(AVAILABILITY_TYPE === 'by_days' ? selectedRange?.from : selectedDate) && (
            <div className="space-y-2">
              <h3 className="font-heading text-sm font-semibold">Rincian Perjalanan</h3>
              <div className="rounded-2xl border border-border/60 p-4 space-y-3">
                {AVAILABILITY_TYPE === 'by_days' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tanggal mulai</span>
                      <span className="text-sm font-medium">
                        {format(selectedRange!.from!, 'd MMM yyyy', { locale: id })}
                      </span>
                    </div>
                    {selectedRange?.to && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tanggal selesai</span>
                        <span className="text-sm font-medium">
                          {format(selectedRange.to, 'd MMM yyyy', { locale: id })}
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <CalendarBlankIcon weight="fill" className="size-3.5" />
                        Durasi
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {daysDuration ? `${daysDuration} hari` : '—'}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tanggal</span>
                      <span className="text-sm font-medium">
                        {format(selectedDate!, 'd MMM yyyy', { locale: id })}
                      </span>
                    </div>
                    {selectedTimeSlot && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Jam mulai</span>
                        <span className="text-sm font-medium">{selectedTimeSlot}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <ClockIcon weight="fill" className="size-3.5" />
                        Durasi
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {formatDuration(TRIP_DURATION_MINUTES)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Rincian Pembayaran */}
          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold">Rincian Pembayaran</h3>
            <div className="rounded-2xl border border-border/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Harga per orang</span>
                <span className="text-sm font-medium">{formatCurrency(PRICE_PER_PERSON)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Jumlah peserta</span>
                <span className="text-sm font-medium">{quantity} orang</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Biaya layanan (5%)</span>
                <span className="text-sm font-medium">{formatCurrency(serviceFee)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Total Pembayaran</span>
                <span className="text-base font-black text-success">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Opsi Pembayaran */}
          <div className="space-y-2">
            <h3 className="font-heading text-sm font-semibold">Opsi Pembayaran</h3>
            <RadioGroup
              value={paymentType}
              onValueChange={(value: 'full' | 'dp') => setPaymentType(value)}
              className="grid grid-cols-2 gap-3"
            >
              <label
                htmlFor="payment-full"
                className={cn(
                  'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 px-2 py-2 text-center transition-all active:scale-95',
                  paymentType === 'full'
                    ? 'border-success bg-success/10'
                    : 'border-border/60 bg-background'
                )}
              >
                <RadioGroupItem value="full" id="payment-full" className="absolute sr-only" />
                {paymentType === 'full' && (
                  <CheckCircleIcon weight="fill" className="absolute right-2.5 top-2.5 size-4 text-success" />
                )}
                <span className="text-sm font-bold">Bayar Penuh</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{formatCurrency(total)}</span>
              </label>

              <label
                htmlFor="payment-dp"
                className={cn(
                  'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 px-2 py-2 text-center transition-all active:scale-95',
                  paymentType === 'dp'
                    ? 'border-success bg-success/10'
                    : 'border-border/60 bg-background'
                )}
              >
                <RadioGroupItem value="dp" id="payment-dp" className="absolute sr-only" />
                {paymentType === 'dp' && (
                  <CheckCircleIcon weight="fill" className="absolute right-2.5 top-2.5 size-4 text-success" />
                )}
                <span className="text-sm font-bold">DP Dulu</span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  Bayar {formatCurrency(dpAmount)} sekarang
                </span>
              </label>
            </RadioGroup>

            {paymentType === 'dp' && (
              <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5">
                <WarningCircleIcon weight="fill" className="size-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Sisa pembayaran sebesar{' '}
                  <span className="font-semibold">{formatCurrency(total - dpAmount)}</span> akan
                  dibayarkan langsung kepada guide saat kegiatan berlangsung atau selesai.
                </p>
              </div>
            )}
          </div>

          <DrawerFooter className="p-0 pb-3">
            <Button
              disabled={!isConfirmEnabled}
              size="sm"
              onClick={() => router.push('/booking/1/input')}
            >
              Konfirmasi Pemesanan
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
