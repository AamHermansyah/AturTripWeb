'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon, ChatTeardropTextIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { BookingDrawer } from './booking-drawer'
import Link from 'next/link'

function FloatingBooking() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
      <BookingDrawer open={openDrawer} onOpenChange={setOpenDrawer} />

      <div className="fixed max-w-sm mx-auto bottom-0 left-0 right-0 pl-2 pr-5 py-2 bg-background/80 backdrop-blur-xl border-t border-border/50 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between gap-2">
          <Link href="/conversations">
            <Button
              variant="outline"
              className="bg-transparent border-none flex gap-0 flex-col items-center justify-center shrink-0 hover:bg-transparent"
            >
              <ChatTeardropTextIcon weight="fill" className="size-6 text-foreground/70 mb-0.5" />
              <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest">
                Hubungi
              </span>
            </Button>
          </Link>

          <div className="flex-1">
            <button
              className="w-full py-2 bg-success rounded-full flex items-center justify-between pl-6 pr-3 text-white shadow-lg shadow-success/40 transition-transform active:scale-[0.98] cursor-pointer hover:-translate-y-0.5"
              onClick={() => setOpenDrawer(true)}
            >
              <div className="flex flex-col items-start gap-px">
                <span className="text-[10px] font-bold text-white/80 lowercase">per orang</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black leading-none">Rp 1.750.000</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold">Book Now</span>
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
