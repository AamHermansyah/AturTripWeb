'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapPinIcon, ShareNetworkIcon, HeartIcon, ArrowLeftIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

interface HeroSectionProps {
  backButton?: boolean
}

export function HeroSection({ backButton }: HeroSectionProps) {
  const router = useRouter()

  return (
    <div className="relative h-65 w-full">
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
        alt="Jalur Puncak Berkabut"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

      {/* Action Buttons Top Right */}
      <div className={cn(
        'absolute top-0 inset-x-0 px-5 py-2 pt-4 flex items-center gap-3 z-10',
        backButton ? 'justify-between' : 'justify-end'
      )}>
        {backButton && (
          <Button
            variant="outline"
            size="icon-sm"
            className="text-white border-none bg-black/40 hover:bg-black/60 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon weight="bold" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-sm" className="text-white border-none bg-black/40 hover:bg-black/60 hover:text-white">
            <ShareNetworkIcon weight="bold" />
          </Button>
          <Button variant="outline" size="icon-sm" className="text-rose-500 border-none bg-white/40 hover:bg-white/60 hover:text-rose-500">
            <HeartIcon weight="fill" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 w-full px-5 flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-1.5 bg-zinc-800/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full w-fit text-white">
          <MapPinIcon weight="fill" className="size-4 text-zinc-300" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-200">
            Nusa Tenggara Barat, Indonesia
          </span>
        </div>
        <h1 className="font-heading text-white text-2xl font-bold leading-[1.2] tracking-tight">
          Pendakian Gunung Rinjani dan Danau Segara Anak
        </h1>
      </div>
    </div>
  )
}
