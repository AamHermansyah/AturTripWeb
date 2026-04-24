"use client"

import { ClockIcon } from "@phosphor-icons/react"

interface PaymentCountdownProps {
  /** Static display values for UI only */
  minutes?: string
  seconds?: string
}

export function PaymentCountdown({
  minutes = "23",
  seconds = "45",
}: PaymentCountdownProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-warning/30 bg-warning/5 px-4 py-3">
      <div className="flex items-center gap-2 text-warning">
        <ClockIcon weight="fill" className="size-4 shrink-0" />
        <p className="text-xs font-semibold text-warning">Selesaikan pembayaran dalam</p>
      </div>

      <span className="font-heading text-base font-extrabold tabular-nums text-warning">
        {minutes}:{seconds}
      </span>
    </div>
  )
}
