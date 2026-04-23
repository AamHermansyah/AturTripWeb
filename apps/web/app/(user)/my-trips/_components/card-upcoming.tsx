import { MapPinIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

function CardUpcoming() {
  return (
    <Link href="/my-trips/1">
      <div className="relative overflow-hidden rounded-4xl w-72 flex flex-col justify-end">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
          alt="High Sierras Expedition"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/60 to-zinc-950/20" />

        <div className="relative flex flex-col gap-3 p-5">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full w-fit">
            <div className="size-2 rounded-full bg-info" />
            <span className="text-[10px] font-bold text-white uppercase">
              3 Hari Lagi
            </span>
          </div>

          <h3 className="font-heading text-white text-lg font-extrabold leading-[1.1] tracking-tight mt-1">
            Tour Guide ke Gedung Lawang Sewu
          </h3>

          <div className="flex items-center gap-1 text-white/90">
            <MapPinIcon weight="bold" className="size-4" />
            <span className="text-sm font-medium tracking-tight">Semarang, Jawa Tengah</span>
          </div>

          <div className="flex items-center mt-3">
            <div className="size-7 rounded-full bg-muted" />
            <div className="size-7 rounded-full bg-info -ml-3" />
            <div className="h-7 px-2 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white -ml-3">
              +2 Lainnya
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardUpcoming