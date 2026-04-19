"use client"

import { cn } from "@/lib/utils"
import { INTERESTS, type Interest } from "@/lib/constants/personalize"

interface Step2Props {
  interests: Interest[]
  toggleInterest: (id: Interest) => void
}

export function Step2({ interests, toggleInterest }: Step2Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="font-heading text-2xl font-extrabold leading-tight text-foreground">
          Ceritakan apa yang kamu suka
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pilih minatmu untuk membantu kami menemukan pengalaman terbaik untukmu.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {INTERESTS.map(({ id, label, icon: Icon }) => {
          const selected = interests.includes(id)
          return (
            <button
              key={id}
              onClick={() => toggleInterest(id)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-2xl border-2 px-3 py-5 transition-all",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-primary/40"
              )}
            >
              <div
                className={cn(
                  "flex size-14 items-center justify-center rounded-full transition-colors",
                  selected ? "bg-primary" : "bg-muted"
                )}
              >
                <Icon
                  size={28}
                  weight="fill"
                  className={selected ? "text-primary-foreground" : "text-muted-foreground"}
                />
              </div>
              <span className="text-center text-sm font-semibold leading-tight text-foreground">
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
