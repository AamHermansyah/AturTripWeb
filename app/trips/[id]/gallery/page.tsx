'use client'

import Masonry from 'react-masonry-css'
import { HomeHeader } from "@/components/shared/home-header"
import { useState } from "react"
import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react"
import ImageZoom from '@/components/core/image-zoom'

const MOCK_IMAGES = [
  // Portrait (tall)
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&h=900&auto=format&fit=crop",
    alt: "Jalur Puncak Berkabut",
  },
  // Landscape (wide)
  {
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=900&h=600&auto=format&fit=crop",
    alt: "Pemandangan Puncak",
  },
  // Square
  {
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=700&h=700&auto=format&fit=crop",
    alt: "Kawah Danau",
  },
  // Very tall
  {
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&h=1000&auto=format&fit=crop",
    alt: "Panorama Lembah",
  },
  // Landscape
  {
    src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=900&h=550&auto=format&fit=crop",
    alt: "Jalur Pendakian",
  },
  // Portrait
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&h=850&auto=format&fit=crop",
    alt: "Sunrise di Puncak",
  },
  // Wide landscape
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&h=600&auto=format&fit=crop",
    alt: "Pegunungan Berselimut Awan",
  },
  // Square-ish
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=700&h=680&auto=format&fit=crop",
    alt: "Lembah Hijau",
  },
  // Very tall portrait
  {
    src: "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=550&h=1050&auto=format&fit=crop",
    alt: "Danau di Ketinggian",
  },
  // Landscape
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=850&h=600&auto=format&fit=crop",
    alt: "Tenda Kemah",
  },
  // Portrait
  {
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&h=820&auto=format&fit=crop",
    alt: "Pendakian Malam",
  },
  // Wide
  {
    src: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=900&h=500&auto=format&fit=crop",
    alt: "Cakrawala Senja",
  },
]

type GalleryImage = typeof MOCK_IMAGES[number]

export default function TripGalleryPage() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <div className="relative h-dvh w-full pb-5 overflow-y-auto">
      <HomeHeader />

      {/* Title */}
      <div className="px-5 pb-3 flex items-baseline justify-between">
        <h1 className="font-heading font-extrabold text-lg">Galeri Trip</h1>
        <span className="text-xs text-muted-foreground">{MOCK_IMAGES.length} foto dari guide</span>
      </div>

      {/* Masonry Grid — always 2 columns */}
      <Masonry
        breakpointCols={2}
        className="flex gap-2 px-5"
        columnClassName="flex flex-col gap-2"
      >
        {MOCK_IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img)}
            className="group relative w-full rounded-2xl overflow-hidden focus:outline-none"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto object-cover duration-300 group-hover:scale-105 group-hover:brightness-50 transition"
            />
            <MagnifyingGlassPlusIcon className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
          </button>
        ))}
      </Masonry>

      <ImageZoom
        image={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
