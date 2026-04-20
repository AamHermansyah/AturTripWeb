import { CalendarBlankIcon, UsersIcon, LockKeyIcon, TrendUpIcon } from "@phosphor-icons/react/dist/ssr"

export function TripStats() {
  return (
    <div className="bg-card rounded-4xl shadow-sm border border-border/80 overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="p-4 sm:p-5 border-b border-r border-border/80 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CalendarBlankIcon weight="fill" className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">Durasi</p>
              <p className="text-[14px] font-extrabold text-foreground leading-none">12 Hari</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-b border-border/80 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <UsersIcon weight="fill" className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">Peserta</p>
              <p className="text-[14px] font-extrabold text-foreground leading-none">4 Orang</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-r border-border/80 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <LockKeyIcon weight="fill" className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">Tipe</p>
              <p className="text-[14px] font-extrabold text-foreground leading-none">Privat</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <TrendUpIcon weight="bold" className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">Kesulitan</p>
              <p className="text-[14px] font-extrabold text-foreground leading-none">Lanjutan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
