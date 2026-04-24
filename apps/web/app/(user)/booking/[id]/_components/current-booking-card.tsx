import { CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

interface CurrentBookingCardProps {
  imageSrc: string
  title: string
  date: string
}

export function CurrentBookingCard({ imageSrc, title, date }: CurrentBookingCardProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Pemesanan Saat Ini
      </p>

      <div className="flex items-center gap-3 rounded-4xl border bg-card p-3 shadow-sm">
        {/* Trip Image */}
        <div className="size-16 shrink-0 overflow-hidden rounded-2xl">
          <img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Trip Info */}
        <div className="flex flex-col gap-1.5">
          <Link href="/trips/1">
            <h3 className="font-heading text-[15px] font-extrabold leading-tight tracking-tight text-foreground hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarBlankIcon weight="regular" className="size-3.5 shrink-0" />
            <span className="text-xs font-medium">{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
