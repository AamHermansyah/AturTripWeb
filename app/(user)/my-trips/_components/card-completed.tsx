import { MapPinIcon, StarIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function CardCompleted() {
  return (
    <div className="space-y-3 rounded-4xl border border-border bg-card p-4">
      <div className="flex gap-4">
        <div className="relative shrink-0 w-20 h-20 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop"
            alt="Trip"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 gap-1 min-w-0">
          <Link href="/my-trips/1">
            <h3 className="font-heading font-extrabold leading-tight tracking-tight line-clamp-2 hover:text-primary">
              Tour Guide ke Gedung Lawang Sewu
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPinIcon weight="bold" className="size-3.5 shrink-0" />
            <span className="text-xs font-medium tracking-tight truncate">Semarang, Jawa Tengah</span>
          </div>

          <div className="text-xs text-muted-foreground">15 Mar 2025</div>
        </div>
      </div>
      <Button size="xs" variant="outline" className="w-full">
        <StarIcon weight="fill" className="size-3.5 text-yellow-400" />
        Beri Ulasan
      </Button>
    </div>
  )
}

export default CardCompleted
