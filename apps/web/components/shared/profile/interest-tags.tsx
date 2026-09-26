'use client'

import { INTERESTS, type Interest } from "@/lib/constants/personalize"

export function InterestTags({ interests }: { interests: Interest[] }) {
  const items = INTERESTS.filter((i) => interests.includes(i.id))

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Belum ada minat yang dipilih.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ id, label, icon: Icon }) => (
        <span
          key={id}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold shadow-xs"
        >
          <Icon weight="fill" className="size-3.5 text-primary" />
          {label}
        </span>
      ))}
    </div>
  )
}
