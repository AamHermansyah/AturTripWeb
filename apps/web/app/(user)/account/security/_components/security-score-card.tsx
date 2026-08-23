'use client'

import { ShieldCheckIcon, CheckCircleIcon, CircleIcon } from "@phosphor-icons/react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export type SecurityCheck = {
  label: string
  done: boolean
}

// Kelas indikator ditulis utuh — Tailwind memindai literal, bukan string hasil interpolasi.
const LEVELS = [
  {
    min: 100,
    label: "Sangat Aman",
    text: "text-success",
    bar: "[&_[data-slot=progress-indicator]]:bg-success",
  },
  {
    min: 60,
    label: "Baik",
    text: "text-success",
    bar: "[&_[data-slot=progress-indicator]]:bg-success",
  },
  {
    min: 40,
    label: "Cukup",
    text: "text-warning",
    bar: "[&_[data-slot=progress-indicator]]:bg-warning",
  },
  {
    min: 0,
    label: "Perlu Perhatian",
    text: "text-destructive",
    bar: "[&_[data-slot=progress-indicator]]:bg-destructive",
  },
]

export function SecurityScoreCard({ checks }: { checks: SecurityCheck[] }) {
  const done = checks.filter((c) => c.done).length
  const percent = Math.round((done / checks.length) * 100)
  const level = LEVELS.find((l) => percent >= l.min) ?? LEVELS[LEVELS.length - 1]

  return (
    <div className="space-y-4 rounded-4xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
          <ShieldCheckIcon weight="fill" className="size-5.5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Status Keamanan
          </p>
          <p className={cn("font-heading text-lg font-extrabold leading-tight", level.text)}>
            {level.label}
          </p>
        </div>
        <span className="font-heading text-2xl font-extrabold tabular-nums text-foreground">
          {percent}%
        </span>
      </div>

      <Progress
        value={percent}
        className={cn("h-2", level.bar)}
      />

      <div className="space-y-2">
        {checks.map(({ label, done }) => (
          <div key={label} className="flex items-center gap-2.5">
            {done ? (
              <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-success" />
            ) : (
              <CircleIcon weight="regular" className="size-4 shrink-0 text-muted-foreground/40" />
            )}
            <span
              className={cn(
                "text-[13px]",
                done ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        <span className="font-bold text-foreground">{done} dari {checks.length}</span> langkah
        keamanan sudah aktif.
      </p>
    </div>
  )
}
