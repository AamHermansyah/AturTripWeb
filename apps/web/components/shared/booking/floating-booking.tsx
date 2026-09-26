'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon, ChatTeardropTextIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { BookingDrawer } from './booking-drawer'
import Link from 'next/link'

interface FloatingBookingProps {
  /** Harga ditampilkan di tombol; default mengikuti trip contoh. */
  price?: number
  packageType?: 'per person' | 'per group'
}

function FloatingBooking({ price = 1750000, packageType = 'per person' }: FloatingBookingProps) {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
      <BookingDrawer open={openDrawer} onOpenChange={setOpenDrawer} />

      <div className="fixed max-w-sm mx-auto bottom-0 left-0 right-0 pl-2 pr-5 py-2 bg-background/80 backdrop-blur-xl border-t border-border/50 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between gap-2">
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-none flex gap-0 flex-col items-center justify-center shrink-0 hover:bg-transparent"
          >
            <Link href="/conversations">
              <ChatTeardropTextIcon weight="fill" className="size-6 text-foreground/70 mb-0.5" />
              <span className="text-[11px] font-semibold text-foreground/70">
                Hubungi
              </span>
            </Link>
          </Button>

          <div className="flex-1">
            <button
              className="w-full py-2 bg-primary rounded-2xl flex items-center justify-between pl-5 pr-4 text-primary-foreground shadow-lg shadow-primary/25 transition-[scale,background-color] duration-200 hover:bg-primary/90 active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onClick={() => setOpenDrawer(true)}
            >
              <div className="flex flex-col items-start gap-px">
                <span className="text-[11px] font-medium text-primary-foreground/80">
                  {packageType === 'per person' ? 'per orang' : 'per grup'}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black leading-none tabular-nums">
                    Rp {price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold">Pesan sekarang</span>
                <ArrowRightIcon weight="bold" className="size-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FloatingBooking
