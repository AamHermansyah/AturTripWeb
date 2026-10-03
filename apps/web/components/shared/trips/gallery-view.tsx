'use client'

import { useState } from "react"
import Masonry from "react-masonry-css"
import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react"
import ImageZoom from "@/components/core/image-zoom"

export type GalleryImage = {
  src: string
  alt: string
}

// Mock data — ganti dengan data dari API saat integrasi
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&h=900&auto=format&fit=crop",
    alt: "Jalur Puncak Berkabut",
  },
  {
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=900&h=600&auto=format&fit=crop",
    alt: "Pemandangan Puncak",
  },
  {
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=700&h=700&auto=format&fit=crop",
    alt: "Kawah Danau",
  },
  {
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&h=1000&auto=format&fit=crop",
    alt: "Panorama Lembah",
  },
  {
    src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=900&h=550&auto=format&fit=crop",
    alt: "Jalur Pendakian",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&h=850&auto=format&fit=crop",
    alt: "Sunrise di Puncak",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&h=600&auto=format&fit=crop",
    alt: "Pegunungan Berselimut Awan",
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=700&h=680&auto=format&fit=crop",
    alt: "Lembah Hijau",
  },
  {
    src: "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=550&h=1050&auto=format&fit=crop",
    alt: "Danau di Ketinggian",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=850&h=600&auto=format&fit=crop",
    alt: "Tenda Kemah",
  },
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&h=820&auto=format&fit=crop",
    alt: "Pendakian Malam",
  },
  {
    src: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=900&h=500&auto=format&fit=crop",
    alt: "Cakrawala Senja",
  },
]

interface GalleryViewProps {
  images?: GalleryImage[]
  /** Keterangan sumber foto, mis. "12 foto dari guide". */
  caption?: string
}

export function GalleryView({ images = GALLERY_IMAGES, caption }: GalleryViewProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="flex items-baseline justify-between px-5 pb-3">
        <h1 className="font-heading text-lg font-extrabold">Galeri Trip</h1>
        <span className="text-xs text-muted-foreground">
          {caption ?? `${images.length} foto dari guide`}
        </span>
      </div>

      {/* Masonry — selalu 2 kolom mengikuti lebar frame mobile */}
      <Masonry
        breakpointCols={2}
        className="flex gap-2 px-5"
        columnClassName="flex flex-col gap-2"
      >
        {images.map((image, i) => (
          <button type="button"
            key={i}
            onClick={() => setSelected(image)}
            aria-label={`Perbesar ${image.alt}`}
            className="group relative w-full overflow-hidden rounded-2xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-50"
            />
            <MagnifyingGlassPlusIcon className="absolute left-[50%] top-[50%] size-6 -translate-x-[50%] -translate-y-[50%] text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100" />
          </button>
        ))}
      </Masonry>

      <ImageZoom image={selected} onClose={() => setSelected(null)} />
    </>
  )
}
