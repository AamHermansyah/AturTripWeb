import { BackpackIcon } from "@phosphor-icons/react/dist/ssr"

export function RequiredGear() {
  return (
    <div className="bg-card border border-border/40 rounded-4xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <BackpackIcon weight="fill" className="size-5 text-muted-foreground" />
        <h2 className="text-lg font-heading font-extrabold tracking-tight text-foreground">Peralatan Dibutuhkan</h2>
      </div>

      <ul className="space-y-2.5 pl-2">
        <li className="flex items-center gap-3">
          <div className="size-1.5 rounded-full bg-zinc-500 shrink-0" />
          <span className="text-[13px] font-semibold text-primary/80">Krampon & Kapak Es</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="size-1.5 rounded-full bg-zinc-500 shrink-0" />
          <span className="text-[13px] font-semibold text-primary/80">Kantong Tidur -20°C</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="size-1.5 rounded-full bg-zinc-500 shrink-0" />
          <span className="text-[13px] font-semibold text-primary/80">Sepatu Gunung</span>
        </li>
      </ul>
    </div>
  )
}
