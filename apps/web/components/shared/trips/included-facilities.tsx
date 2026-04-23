import { UserIcon, TentIcon, ForkKnifeIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr"

export function IncludedFacilities() {
  return (
    <div className="bg-success/10 border border-success/20 rounded-4xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircleIcon weight="fill" className="size-5 text-success" />
        <h2 className="text-lg font-heading font-extrabold tracking-tight text-foreground">Fasilitas Termasuk</h2>
      </div>

      <ul className="space-y-3 pl-1">
        <li className="flex items-center gap-3">
          <UserIcon weight="fill" className="size-4 text-success/80" />
          <span className="text-[13px] font-semibold text-success/90">Pemandu Profesional</span>
        </li>
        <li className="flex items-center gap-3">
          <TentIcon weight="fill" className="size-4 text-success/80" />
          <span className="text-[13px] font-semibold text-success/90">Tenda & Peralatan Kemah</span>
        </li>
        <li className="flex items-center gap-3">
          <ForkKnifeIcon weight="fill" className="size-4 text-success/80" />
          <span className="text-[13px] font-semibold text-success/90">Semua Makanan Tersedia</span>
        </li>
      </ul>
    </div>
  )
}
