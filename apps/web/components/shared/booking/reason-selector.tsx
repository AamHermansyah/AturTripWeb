'use client'

import { CheckCircleIcon, CircleIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

export type Reason = {
  id: string
  label: string
  icon: Icon
}

type ReasonSelectorProps = {
  reasons: Reason[]
  selected: string | null
  onSelect: (id: string) => void
}

export function ReasonSelector({ reasons, selected, onSelect }: ReasonSelectorProps) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden divide-y divide-border/60">
      {reasons.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40 active:bg-muted/60"
        >
          <Icon weight="duotone" className="size-5 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-sm font-medium">{label}</span>
          {selected === id ? (
            <CheckCircleIcon weight="fill" className="size-5 shrink-0 text-success" />
          ) : (
            <CircleIcon weight="regular" className="size-5 shrink-0 text-muted-foreground/40" />
          )}
        </button>
      ))}
    </div>
  )
}
