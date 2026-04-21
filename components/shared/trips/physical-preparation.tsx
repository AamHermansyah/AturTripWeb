import { HeartbeatIcon } from "@phosphor-icons/react/dist/ssr"

export function PhysicalPreparation() {
  return (
    <div className="bg-card border border-border/40 rounded-4xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <HeartbeatIcon weight="fill" className="size-5 text-destructive" />
        <h2 className="text-lg font-heading font-extrabold tracking-tight text-foreground">Persiapan Fisik</h2>
      </div>
      
      <ul className="space-y-3 pl-2">
        <li className="flex items-start gap-3">
          <div className="size-1.5 rounded-full bg-destructive/60 mt-2 shrink-0" />
          <p className="text-[13px] font-medium leading-relaxed text-muted-foreground">
            Latihan kardiovaskular rutin (jogging/berenang) minimal 3 kali seminggu selama satu bulan sebelum keberangkatan.
          </p>
        </li>
        <li className="flex items-start gap-3">
          <div className="size-1.5 rounded-full bg-destructive/60 mt-2 shrink-0" />
          <p className="text-[13px] font-medium leading-relaxed text-muted-foreground">
            Latihan kekuatan kaki (squats/lunges) untuk mempersiapkan tanjakan dan turunan curam.
          </p>
        </li>
      </ul>
    </div>
  )
}
