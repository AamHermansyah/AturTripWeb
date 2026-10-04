import type { ReactNode } from "react"
import { CaretDownIcon, InfoIcon } from "@phosphor-icons/react/dist/ssr"

/** Catatan lingkungan contoh tetap tersedia tanpa mendominasi alur utama. */
export function PreviewNotice({ children }: { children: ReactNode }) {
  return <details className="group rounded-xl border border-border/70 bg-secondary/40 text-xs text-muted-foreground">
    <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 px-3 py-2 font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden"><InfoIcon className="size-4 shrink-0" />Pratinjau interaktif<CaretDownIcon className="ml-auto size-3.5 shrink-0 transition-transform group-open:rotate-180" /></summary>
    <p className="px-3 pb-3 leading-relaxed">{children}</p>
  </details>
}
