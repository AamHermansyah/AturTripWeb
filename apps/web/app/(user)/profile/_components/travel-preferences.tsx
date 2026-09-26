'use client'

import { useState } from "react"
import { CheckCircleIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import {
  INTERESTS,
  TRAVEL_WITH,
  EXPERIENCE_LEVELS,
  type Interest,
  type TravelWith,
  type ExperienceLevel,
} from "@/lib/constants/personalize"

export function TravelPreferences() {
  const [interests, setInterests] = useState<Interest[]>(["hiking", "camping", "culture"])
  const [travelWith, setTravelWith] = useState<TravelWith>("group")
  const [experience, setExperience] = useState<ExperienceLevel>("enthusiast")

  const toggleInterest = (id: Interest) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )

  return (
    <div className="flex flex-col gap-5">
      {/* Minat */}
      <div className="space-y-2.5">
        <div>
          <p className="text-sm font-bold">Minat Perjalanan</p>
          <p className="text-xs text-muted-foreground">
            Kami pakai ini untuk merekomendasikan trip yang cocok.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(({ id, label, icon: Icon }) => {
            const isActive = interests.includes(id)

            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleInterest(id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95",
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                )}
              >
                <Icon weight={isActive ? "fill" : "regular"} className="size-3.5" />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bepergian dengan */}
      <div className="space-y-2.5">
        <p className="text-sm font-bold">Biasanya Bepergian Dengan</p>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_WITH.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTravelWith(id)}
              className={cn(
                "rounded-xl border px-4 py-1.5 text-sm font-medium transition-all active:scale-95",
                travelWith === id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Level pengalaman */}
      <div className="space-y-2.5">
        <p className="text-sm font-bold">Level Pengalaman</p>
        <div className="flex flex-col gap-2">
          {EXPERIENCE_LEVELS.map(({ id, label, subtitle, icon: Icon }) => {
            const isActive = experience === id

            return (
              <button
                key={id}
                type="button"
                onClick={() => setExperience(id)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left transition-all active:scale-[0.99]",
                  isActive ? "border-primary bg-primary/5" : "border-border/60 bg-background"
                )}
              >
                <Icon
                  weight="fill"
                  className={cn(
                    "size-5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight">{label}</p>
                  <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
                </div>
                {isActive && (
                  <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-primary" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
