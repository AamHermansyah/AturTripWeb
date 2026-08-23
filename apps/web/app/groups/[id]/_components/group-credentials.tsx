import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr"
import type { GroupCredential } from "@/lib/constants/group"

export function GroupCredentials({ credentials }: { credentials: GroupCredential[] }) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-lg font-extrabold tracking-tight">Legalitas & Sertifikasi</h2>

      <div className="flex flex-col gap-2">
        {credentials.map(({ icon: Icon, label, issuer }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-success/20 bg-success/5 p-3"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-success/15">
              <Icon weight="fill" className="size-5 text-success" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight">{label}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{issuer}</p>
            </div>

            <CheckCircleIcon weight="fill" className="size-5 shrink-0 text-success" />
          </div>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Dokumen di atas sudah diverifikasi tim AturTrip. Laporkan bila kamu menemukan
        ketidaksesuaian di lapangan.
      </p>
    </div>
  )
}
