"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Progress } from "@/components/ui/progress"
import Logo from "./shared/logo"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Simulate realistic multi-stage loading
    const stages = [
      { target: 28, intervalMs: 10 },
      { target: 55, intervalMs: 15 },
      { target: 78, intervalMs: 20 },
      { target: 92, intervalMs: 30 },
      { target: 100, intervalMs: 15 },
    ]

    let currentProgress = 0
    let stageIndex = 0
    let intervalId: ReturnType<typeof setInterval> | null = null

    const runStage = () => {
      if (stageIndex >= stages.length) return

      const { target, intervalMs } = stages[stageIndex]

      intervalId = setInterval(() => {
        currentProgress += 1
        setProgress(currentProgress)

        if (currentProgress >= target) {
          clearInterval(intervalId!)
          stageIndex++

          if (stageIndex < stages.length) {
            // Small pause between stages for realism
            setTimeout(runStage, 50)
          } else {
            setTimeout(() => {
              setFadeOut(true)
              setTimeout(() => setVisible(false), 400)
            }, 150)
          }
        }
      }, intervalMs)
    }

    runStage()

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 px-6 max-w-sm mx-auto transition-opacity duration-500",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/splash.webp"
          alt="AturTrip splash"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60" />
      </div>

      <div className="h-full flex flex-col justify-evenly gap-6 py-10">
        <div className="flex-1 relative flex flex-col items-center justify-center gap-6">
          <Logo className="size-24 bg-white/50" />

          <div>
            {/* Brand name */}
            <h1 className="font-heading text-center text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
              Atur<span className="text-emerald-500">Trip</span>
            </h1>

            {/* Tagline */}
            <p className="text-center text-lg leading-relaxed text-white/90 drop-shadow-sm">
              Temukan pemandu terbaik untuk setiap perjalananmu
            </p>
          </div>
        </div>

        <div className="relative space-y-3">
          <div className="flex items-end justify-between px-1">
            <p className="text-sm font-medium uppercase tracking-wide text-white/80">
              Memuat Pengalaman
            </p>
            <p className="text-sm font-bold text-primary">{progress}%</p>
          </div>

          <Progress
            value={progress}
            className="h-1.5 bg-white/20"
          />
        </div>
      </div>
    </div>
  )
}
