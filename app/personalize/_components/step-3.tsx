"use client"

import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  TRAVEL_WITH,
  EXPERIENCE_LEVELS,
  type TravelWith,
  type ExperienceLevel,
} from "@/lib/constants/personalize"

interface Step3Props {
  travelWith: TravelWith
  setTravelWith: (v: TravelWith) => void
  experience: ExperienceLevel
  setExperience: (v: ExperienceLevel) => void
}

export function Step3({ travelWith, setTravelWith, experience, setExperience }: Step3Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold leading-tight text-foreground">
          Personalisasi Perjalananmu
        </h1>
      </div>

      {/* Travel with */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-foreground">Kamu bepergian dengan siapa?</p>
        <RadioGroup
          value={travelWith}
          onValueChange={(v) => setTravelWith(v as TravelWith)}
          className="flex flex-row gap-2"
        >
          {TRAVEL_WITH.map(({ id, label }) => (
            <div key={id}>
              <RadioGroupItem value={id} id={`tw-${id}`} className="sr-only" />
              <label
                htmlFor={`tw-${id}`}
                className={cn(
                  "cursor-pointer rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all",
                  travelWith === id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                )}
              >
                {label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Experience level */}
      <div className="flex flex-col pt-3">
        <p className="font-semibold text-foreground">Tingkat Pengalamanmu</p>
        <RadioGroup
          value={experience}
          onValueChange={(v) => setExperience(v as ExperienceLevel)}
          className="flex flex-col gap-0"
        >
          {EXPERIENCE_LEVELS.map(({ id, label, subtitle, icon: Icon }) => (
            <div key={id}>
              <RadioGroupItem value={id} id={`exp-${id}`} className="sr-only" />
              <label
                htmlFor={`exp-${id}`}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all",
                  experience === id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/40"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors",
                    experience === id ? "bg-primary" : "bg-muted"
                  )}
                >
                  <Icon
                    size={20}
                    weight="fill"
                    className={experience === id ? "text-primary-foreground" : "text-muted-foreground"}
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
