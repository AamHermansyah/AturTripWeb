"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DiscoverIllustration } from "./_components/discover-illustration"
import { VerifiedIllustration } from "./_components/verified-illustration"
import { JourneyIllustration } from "./_components/journey-illustration"

const slides = [
  {
    key: "discover",
    illustration: <DiscoverIllustration />,
    title: "Temukan Pemandu Terpercaya",
    description:
      "Jelajahi pengalaman terkurasi untuk gunung, sungai, wisata kota, dan destinasi lokal tersembunyi.",
  },
  {
    key: "verified",
    illustration: <VerifiedIllustration />,
    title: "Pemandu Terverifikasi",
    description:
      "Setiap pemandu telah melalui verifikasi identitas dan memiliki rekam jejak trip yang transparan.",
  },
  {
    key: "journey",
    illustration: <JourneyIllustration />,
    title: "Kenali Perjalananmu",
    description:
      "Lihat timeline kegiatan dan rute perjalanan interaktif sebelum booking. Transparansi penuh untuk setiap petualangan.",
  },
]

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()

  const isLast = current === slides.length - 1

  const handleNext = () => {
    if (!isLast) setCurrent((c) => c + 1)
    else router.push("/login")
  }

  const handleSkip = () => router.push("/login")

  return (
    <div className="flex h-dvh flex-col overflow-x-clip">
      {/* Slide track */}
      <div className="relative w-full min-h-0 flex-1 overflow-x-clip pt-6">
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${(current / slides.length) * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <ScrollArea
              key={slide.key}
              className="flex h-full flex-col justify-evenly overflow-y-auto px-6"
              style={{ width: `${100 / slides.length}%` }}
            >
              <div className="mb-5 shrink-0">{slide.illustration}</div>
              <div className="flex shrink-0 flex-col items-center">
                <h2 className="font-heading text-center text-[1.6rem] font-extrabold leading-tight text-foreground">
                  {slide.title}
                </h2>
                <p className="mt-3 text-center text-base leading-relaxed text-muted-foreground">
                  {slide.description}
                </p>
              </div>
            </ScrollArea>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 flex-col items-center gap-5 px-6 pb-10 pt-5">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full bg-primary transition-all duration-300",
                i === current ? "w-7" : "w-2 opacity-25"
              )}
            />
          ))}
        </div>

        {/* Skip + CTA */}
        <div className="flex w-full flex-col gap-2">
          <Button onClick={handleNext} size="lg" className="w-full font-semibold">
            {isLast ? "Mulai Sekarang" : "Lanjut"}
          </Button>
          {!isLast && (
            <Button variant="ghost" size="lg" onClick={handleSkip} className="w-full text-muted-foreground">
              Lewati
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
