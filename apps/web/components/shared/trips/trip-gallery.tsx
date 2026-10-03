'use client'

import Link from "next/link"

const MOCK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    alt: "Jalur Puncak Berkabut",
  },
  {
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=800&auto=format&fit=crop",
    alt: "Pemandangan Puncak",
  },
  {
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=800&auto=format&fit=crop",
    alt: "Kawah Danau",
  },
  {
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop",
    alt: "Panorama Lembah",
  },
  {
    src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=800&auto=format&fit=crop",
    alt: "Jalur Pendakian",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    alt: "Sunrise di Puncak",
  },
]

interface TripGalleryProps {
  images?: { src: string; alt: string }[]
  href: string;
  caption?: string
}

export function TripGallery({ images = MOCK_IMAGES, href, caption }: TripGalleryProps) {
  const [main, second, third, ...rest] = images
  const hiddenCount = rest.length
  if (!main) return <p className="text-sm text-muted-foreground">Belum ada foto perjalanan.</p>

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-extrabold text-lg">Galeri Trip</h3>
        <Link href={href} className="text-xs font-semibold text-primary underline-offset-2 hover:underline">
          Lihat semua
        </Link>
      </div>

      {/* Mosaic layout */}
      <div className="flex gap-2 h-52">
        {/* Main image — left, takes ~60% width */}
        <Link href={href} aria-label="Buka galeri perjalanan" className="flex-3 rounded-2xl overflow-hidden relative cursor-pointer group">
          <img
            src={main.src}
            alt={main.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Right column — 2 stacked images */}
        {second && <div className="flex-2 flex flex-col gap-2">
          {/* Second image */}
          <Link href={href} aria-label="Buka foto kedua di galeri" className="flex-1 rounded-2xl overflow-hidden relative cursor-pointer group">
            <img
              src={second.src}
              alt={second.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Third image + overflow count */}
          {third && <Link href={href} aria-label={`Buka galeri, ${images.length} foto`} className="flex-1 rounded-2xl overflow-hidden relative cursor-pointer group">
            <img
              src={third.src}
              alt={third.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {hiddenCount > 0 && (
                <span className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-0.5 backdrop-blur-[1px]">
                  <span className="text-white font-bold text-xl leading-none">+{hiddenCount}</span>
                  <span className="text-white/80 text-[11px] font-medium">foto lainnya</span>
                </span>
            )}
          </Link>}
        </div>}
      </div>

      {/* Upload tag */}
      <p className="text-[11px] text-muted-foreground">
        {caption ?? "Foto contoh dari pemandu"}
      </p>
    </div>
  )
}
