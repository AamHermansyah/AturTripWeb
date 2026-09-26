'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type BookingHistoryStatus = 'LUNAS' | 'LUNAS_DP' | 'MENUNGGU' | 'KEDALUWARSA'

const STATUS_CONFIG: Record<
  BookingHistoryStatus,
  { label: string; variant: 'success' | 'info' | 'destructive' }
> = {
  LUNAS: { label: 'LUNAS', variant: 'success' },
  LUNAS_DP: { label: 'LUNAS DP', variant: 'success' },
  MENUNGGU: { label: 'MENUNGGU', variant: 'info' },
  KEDALUWARSA: { label: 'KEDALUWARSA', variant: 'destructive' },
}

interface CardHistoryProps {
  imageSrc: string
  date: string
  time?: string
  title: string
  status: BookingHistoryStatus
  price: string
}

export default function CardHistory({ imageSrc, date, time, title, status, price }: CardHistoryProps) {
  const { label, variant } = STATUS_CONFIG[status]
  const isPaid = status === 'LUNAS' || status === 'LUNAS_DP'

  return (
    <div className="flex flex-col gap-3 p-3 rounded-4xl border border-border/50 bg-muted/20 active:scale-[0.98] transition-transform cursor-pointer">
      <Link href="/booking/1" className="block">
        <div className="flex gap-4">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-[1.2rem]">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col flex-1 justify-center">
            <p className="text-xs font-semibold text-primary mb-1.5">
              {date}{time && `, ${time}`}
            </p>
            <h3 className="font-heading text-[15px] font-extrabold leading-tight mb-2 tracking-tight">
              {title}
            </h3>

            <div className="flex items-center justify-between mt-0.5">
              <Badge variant={variant} className="text-[10px]">
                {label}
              </Badge>

              <span className="text-[13px] font-extrabold text-foreground">{price}</span>
            </div>
          </div>
        </div>
      </Link>

      {isPaid && (
        <div className="px-1 pb-1">
          <Link href="/booking/1/refund">
            <Button variant="info" size="xs" className="w-full">
              Ajukan Refund
            </Button>
          </Link>
        </div>
      )}

      {status === 'MENUNGGU' && (
        <Button size="xs" className="w-full">
          Bayar
        </Button>
      )}
    </div>
  )
}
