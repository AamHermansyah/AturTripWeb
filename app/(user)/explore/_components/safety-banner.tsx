import { ShieldCheckIcon, MapPinAreaIcon } from "@phosphor-icons/react/dist/ssr"

export function SafetyBanner() {
  return (
    <div className="mx-5 mb-5 overflow-hidden rounded-4xl bg-primary px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheckIcon weight="fill" className="text-primary-foreground/80" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground/80">
              Keamanan Utama
            </span>
          </div>
          <p className="font-heading text-xl font-extrabold text-primary-foreground leading-tight">
            Transparansi Rute
          </p>
          <p className="mt-1 text-xs text-primary-foreground leading-relaxed">
            Lihat jadwal lengkap, titik pemberhentian, dan kontak darurat sebelum memesan.
          </p>
        </div>

        {/* Icon illustration */}
        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15">
          <MapPinAreaIcon size={32} weight="duotone" className="text-primary-foreground" />
        </div>
      </div>
    </div>
  )
}
