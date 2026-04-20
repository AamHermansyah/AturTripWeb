import { FolderOpenIcon } from "@phosphor-icons/react/dist/ssr"

export function RequiredDocuments() {
  return (
    <div className="bg-card border border-border/40 rounded-4xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <FolderOpenIcon weight="fill" className="size-5 text-primary" />
        <h2 className="text-lg font-heading font-extrabold tracking-tight text-foreground">Dokumen Administratif</h2>
      </div>
      
      <ul className="space-y-2.5 pl-2">
        <li className="flex items-center gap-3">
          <div className="size-1.5 rounded-full bg-primary/60 shrink-0" />
          <span className="text-[13px] font-medium text-foreground">Kartu Identitas (KTP / Paspor) Asli & Fotokopi</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="size-1.5 rounded-full bg-primary/60 shrink-0" />
          <span className="text-[13px] font-medium text-foreground">Surat Keterangan Sehat dari Dokter</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="size-1.5 rounded-full bg-primary/60 shrink-0" />
          <span className="text-[13px] font-medium text-foreground">Surat Izin Masuk Kawasan Konservasi (SIMAKSI)</span>
        </li>
      </ul>
    </div>
  )
}
