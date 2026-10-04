import Link from "next/link"
import { ArrowLeftIcon, ArrowRightIcon, CalendarBlankIcon, MapTrifoldIcon, PathIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { PageHeading } from "@/components/shared/page-heading"
import { PreviewNotice } from "@/components/shared/preview-notice"

const TOOLS = [
  { href: "/guide-mode/itinerary", title: "Rencana kegiatan dan peta", description: "Pin, jalur, dan linimasa perjalanan.", icon: MapTrifoldIcon },
  { href: "/guide-mode/availability", title: "Jadwal keberangkatan", description: "Pola slot, kapasitas, dan hari yang ditutup.", icon: CalendarBlankIcon },
  { href: "/guide-mode/changes", title: "Perubahan trip terpesan", description: "Bandingkan versi dan jawaban wisatawan.", icon: PathIcon },
  { href: "/booking/guide-reschedule", title: "Usulkan jadwal baru", description: "Persetujuan wisatawan atau refund penuh.", icon: ClockIcon },
]
export function GuideHub() {
  return <main className="flex flex-col gap-8 px-5 py-6 pb-12">
    <Button asChild variant="ghost" className="w-fit px-0"><Link href="/account"><ArrowLeftIcon />Kembali ke akun</Link></Button>
    <PageHeading title="Susun perjalananmu" eyebrow="Mode pemandu" description="Siapkan pengalaman yang jelas, dari rencana perjalanan sampai keberangkatan." />
    <Link href="/guide-mode/listing" className="group rounded-2xl border border-primary/20 bg-primary/5 p-5 outline-none transition-colors hover:bg-primary/10 focus-visible:ring-[3px] focus-visible:ring-ring/50">
      <h2 className="font-heading text-xl font-semibold">Buat listing trip</h2><p className="mt-2 max-w-65 text-sm leading-relaxed text-muted-foreground">Informasi, foto, rencana, jadwal, dan harga dalam satu draf.</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Mulai listing contoh<ArrowRightIcon className="transition-transform motion-safe:group-hover:translate-x-1" /></span>
    </Link>
    <section><h2 className="mb-2 font-heading text-base font-semibold">Kelola persiapan</h2><nav className="divide-y divide-border" aria-label="Alat pemandu">{TOOLS.map(({ href, title, description, icon: Icon }) => <Link key={href} href={href} className="flex min-h-24 items-center gap-4 py-5 outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"><Icon className="size-6 shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{title}</span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{description}</span></span><ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" /></Link>)}</nav></section>
    <PreviewNotice>Data dan tindakan memakai contoh lokal. Belum terhubung ke akun pemandu, penugasan, atau API.</PreviewNotice>
  </main>
}
