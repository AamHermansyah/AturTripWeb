'use client'

import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export type CarouselImage = {
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  className?: string
  /** Konten yang mengambang di atas gambar, mis. tombol kembali/bagikan. */
  overlay?: React.ReactNode
}

/**
 * Slider gambar full-bleed di atas Embla (shadcn Carousel) — geser jari di mobile,
 * seret dengan mouse di desktop, keduanya sudah ditangani library.
 *
 * Carousel bawaan memberi jarak antar slide (-ml-4 / pl-4) dan viewport-nya
 * setinggi konten; untuk hero kita butuh mepet tanpa celah dan setinggi wadah,
 * jadi gutter dinolkan dan tinggi diteruskan sampai ke viewport.
 */
export function ImageCarousel({ images, className, overlay }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setActive(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: images.length > 1, align: "start" }}
      className={cn(
        "relative overflow-hidden **:data-[slot=carousel-content]:h-full",
        className
      )}
    >
      <CarouselContent className="ml-0 h-full">
        {images.map((image, i) => (
          <CarouselItem key={i} className="h-full pl-0">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Gradasi tipis agar tombol & indikator tetap terbaca di atas gambar terang */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />

      {overlay}

      {images.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ke gambar ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full bg-white transition-all duration-300",
                  i === active ? "w-5" : "w-1.5 opacity-50"
                )}
              />
            ))}
          </div>

          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
            <span className="text-[10px] font-bold tabular-nums text-white">
              {active + 1}/{images.length}
            </span>
          </div>
        </>
      )}
    </Carousel>
  )
}
