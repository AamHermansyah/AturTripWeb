import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CardHistoryProps {
  imageSrc: string
  date: string
  time?: string
  title: string
  status: string
  price: string
}

export default function CardHistory({ imageSrc, date, time, title, status, price }: CardHistoryProps) {
  return (
    <div className="flex flex-col gap-3 p-3 rounded-4xl border border-border/50 bg-muted/20 active:scale-[0.98] transition-transform cursor-pointer">
      <div className="flex gap-4">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-[1.2rem]">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 justify-center">
          <p className="text-[10px] font-bold text-primary/80 uppercase tracking-widest mb-1.5">
            {date}{time && `, ${time}`}
          </p>
          <h3 className="font-heading text-[15px] font-extrabold leading-tight mb-2 tracking-tight">
            {title}
          </h3>

          <div className="flex items-center justify-between mt-0.5">
            <div className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase",
              status === 'LUNAS' || status === 'LUNAS DP'
                ? "bg-primary/20 text-primary"
                : status === 'EXPIRED'
                  ? "bg-destructive/10 text-destructive"
                  : "bg-info text-info-foreground"
            )}>
              {status}
            </div>

            <span className="text-[13px] font-extrabold text-foreground">{price}</span>
          </div>
        </div>
      </div>

      {(status === 'LUNAS' || status === 'LUNAS DP') && (
        <div className="px-1 pb-1">
          <Button variant="info" size="xs" className="w-full">
            Ajukan Refund
          </Button>
        </div>
      )}
    </div>
  )
}
