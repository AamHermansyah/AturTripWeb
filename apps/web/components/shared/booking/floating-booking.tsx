'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { BookingDrawer } from './booking-drawer'
import type { BookingPreview } from '@/lib/booking-preview'

interface FloatingBookingProps {
  /** Harga ditampilkan di tombol; default mengikuti trip contoh. */
  price?: number
  packageType?: 'per person' | 'per group'
  booking?: BookingPreview
  selectedSlotId?: string
  onSlotChange?: (id: string) => void
}

function FloatingBooking({ price = 1750000, packageType = 'per person', booking, selectedSlotId, onSlotChange }: FloatingBookingProps) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const canBook = !!booking?.slots.some(slot => slot.status === 'available' && slot.remaining > 0)

  return (
    <>
      <BookingDrawer open={openDrawer} onOpenChange={setOpenDrawer} booking={booking} selectedSlotId={selectedSlotId} onSlotChange={onSlotChange} />

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-sm border-t border-border bg-card px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0"><p className="text-base font-bold tabular-nums">Rp {price.toLocaleString('id-ID')}</p><p className="text-xs text-muted-foreground">{packageType === 'per person' ? 'per orang' : 'per grup'}</p></div>
            <Button size="lg" className="shrink-0"
              disabled={!canBook}
              onClick={() => setOpenDrawer(true)}
            >
                <span>{canBook ? 'Pilih slot' : 'Belum tersedia'}</span>
                <ArrowRightIcon weight="bold" className="size-4" />
            </Button>
        </div>
      </div>
    </>
  )
}

export default FloatingBooking
