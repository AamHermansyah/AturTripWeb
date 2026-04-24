'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CancelBookingDialog } from '@/components/shared/booking/cancel-booking-dialog'
import Link from 'next/link'

export function BookingActionButtons() {
  const [cancelOpen, setCancelOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <Link href="/booking/1/reschedule">
          <Button variant="ghost" className="w-36 hover:bg-transparent">
            Reschedule
          </Button>
        </Link>
        <Separator orientation="vertical" />
        <Button
          variant="ghost"
          className="w-36 hover:bg-transparent text-destructive hover:text-destructive/80"
          onClick={() => setCancelOpen(true)}
        >
          Batalkan Pesanan
        </Button>
      </div>

      <CancelBookingDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
      />
    </>
  )
}
