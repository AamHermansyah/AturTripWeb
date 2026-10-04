"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { PreviewNotice } from "@/components/shared/preview-notice"
import Image from "next/image"
import { ArrowUpIcon, TrashIcon, PlusIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlanEditor } from "./plan-editor"
import { AvailabilityEditor } from "./availability-editor"
import { CancellationTerms } from "@/components/shared/booking/cancellation-terms"
import { PriceSummary } from "@/components/shared/booking/price-summary"
import { InteractiveItinerary } from "@/components/shared/trips/interactive-itinerary"
import { DeparturePicker } from "@/components/shared/trips/departure-picker"
import { CANCELLATION_TEMPLATES, currency, dpAvailable, previewPrice, type BookingPreview } from "@/lib/booking-preview"
import { visiblePlan, type TripPlan } from "@/lib/trip-plan"
import { listingReviewChanges, listingSubmissionError, REGION_ZONES, validateListingDraft, validateListingInfo, validateListingPricing, type IdentityPreviewState, type ListingDraft, type ListingInfo, type ListingPricing, type ListingReviewState } from "@/lib/listing-preview"
import { formatDuration } from "@/lib/utils"

const STEPS = ["Informasi", "Rencana", "Jadwal", "Harga", "Review"]
const STATUS_LABELS = { draft: "Draf lokal", pending: "Menunggu review contoh", revision: "Perlu revisi contoh", approved: "Disetujui dalam simulasi" }

function Choice({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) {
  const id = useId()
  return <Field><FieldLabel htmlFor={id}>{label}</FieldLabel><Select value={value} onValueChange={onChange}><SelectTrigger id={id} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectGroup></SelectContent></Select></Field>
}
function Problems({ errors }: { errors: string[] }) {
  return errors.length ? <Alert variant="destructive"><AlertTitle>Draf perlu dilengkapi</AlertTitle><AlertDescription><ul className="list-disc space-y-1 pl-4">{errors.map(error => <li key={error}>{error}</li>)}</ul></AlertDescription></Alert> : null
}

export function ListingWizard({ initialPlan }: { initialPlan: TripPlan }) {
  const id = useId()
  const topRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<ListingDraft>({
    info: { title: "Pendakian Rinjani contoh", location: "Sembalun, Lombok", region: "ntb", zone: "WITA", category: "Pegunungan", difficulty: "Sulit", description: "Perjalanan pendakian tiga hari bersama pemandu lokal. Rute dan seluruh informasi pada draf ini hanya contoh.", preparation: "Siapkan sepatu pendakian, pakaian hangat, perlengkapan pribadi, serta kondisi fisik yang sesuai. Cuaca dan medan dapat berubah.", included: "Pendampingan pemandu dan koordinasi kegiatan. Perlengkapan pribadi belum termasuk.", durationMinutes: 4320, photos: [] },
    plan: initialPlan,
    availability: { pattern: "day-custom", zone: "WITA", durationMinutes: 4320, capacity: 10, listingType: "Privat", bookingCutoffMinutes: 1440, startDate: "2026-10-10", endDate: "2026-10-31", weekdays: [6], excludedDates: [], dayStartTime: "05:00", customDates: ["2026-10-10", "2026-10-17"], repeatedTimes: ["05:00"], customStarts: [{ date: "2026-10-10", time: "05:00" }] },
    slots: [], pricing: { price: 2500000, minimumParticipants: 1, dpEnabled: true, dpDeadlineHours: 168, cancellation: "moderate", addons: [{ id: "photo", name: "Dokumentasi rombongan", price: 150000 }] },
  })
  const [identity, setIdentity] = useState<IdentityPreviewState>("unsubmitted")
  const [status, setStatus] = useState<ListingReviewState>("draft")
  const [submitted, setSubmitted] = useState<ListingDraft | null>(null)
  const [active, setActive] = useState<ListingDraft | null>(null)
  const [revisionReason, setRevisionReason] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [slotId, setSlotId] = useState("")
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [clock, setClock] = useState(() => Date.now())
  const objectUrls = useRef<Set<string>>(new Set())
  useEffect(() => { const urls = objectUrls.current; return () => { urls.forEach(url => URL.revokeObjectURL(url)) } }, [])
  useEffect(() => { const timer = window.setInterval(() => setClock(Date.now()), 30000); return () => window.clearInterval(timer) }, [])
  const locked = status === "pending" || status === "approved"
  const slot = draft.slots.find(slot => slot.id === slotId) ?? draft.slots.find(slot => slot.status === "available") ?? draft.slots[0]
  const booking: BookingPreview = { id: "listing-preview", title: draft.info.title, price: draft.pricing.price, packageType: draft.availability.listingType === "Privat" ? "per group" : "per person", listingType: draft.availability.listingType, zone: draft.info.zone, slots: draft.slots, minimumParticipants: draft.pricing.minimumParticipants, maximumParticipants: draft.availability.capacity, dpRate: draft.pricing.dpEnabled ? 0.5 : null, dpDeadlineHours: draft.pricing.dpDeadlineHours, cancellation: draft.pricing.cancellation, addons: draft.pricing.addons }
  const errors = validateListingDraft(draft, clock)
  const previewPayment = slot && dpAvailable(slot, booking, clock) ? "dp" : "full"
  const reviewChanges = active ? listingReviewChanges(active, draft) : []
  const needsStaffReview = !active || reviewChanges.length > 0

  function updateInfo(update: Partial<ListingInfo>) { setDraft(current => ({ ...current, info: { ...current.info, ...update } })); setMessage(null) }
  function updatePrice(update: Partial<ListingPricing>) { setDraft(current => ({ ...current, pricing: { ...current.pricing, ...update } })); setMessage(null) }
  function goStep(next: number) { setStep(next); setMessage(null); topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }) }
  function addPhotos(files: FileList | null) {
    if (!files) return
    const accepted = [...files]
    if (draft.info.photos.length + accepted.length > 8 || accepted.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024)) { setPhotoError("Untuk pratinjau, pilih maksimal 8 foto JPG/PNG/WebP, masing-masing maksimal 10 MB."); return }
    const photos = accepted.map(file => { const src = URL.createObjectURL(file); objectUrls.current.add(src); return { id: crypto.randomUUID(), src, name: file.name } })
    updateInfo({ photos: [...draft.info.photos, ...photos] }); setPhotoError(null)
  }
  function submit() {
    const error = listingSubmissionError(draft, identity, status, Date.now())
    if (error) { setMessage(error); return }
    const snapshot = structuredClone(draft)
    if (needsStaffReview) { setSubmitted(snapshot); setStatus("pending"); setMessage("Pengajuan contoh masuk antrean review. Listing baru belum dijual; versi aktif lama tetap berlaku.") }
    else { setActive(snapshot); setStatus("approved"); setMessage("Koreksi kecil diterapkan pada versi aktif contoh. Snapshot booking lama tidak berubah.") }
  }
  const infoFields: { key: "title" | "location" | "description" | "preparation" | "included"; label: string; multiline?: boolean }[] = [{ key: "title", label: "Nama trip" }, { key: "location", label: "Lokasi kegiatan" }, { key: "description", label: "Deskripsi", multiline: true }, { key: "preparation", label: "Persiapan dan risiko", multiline: true }, { key: "included", label: "Fasilitas termasuk / tidak termasuk", multiline: true }]
  return <main className="flex flex-col gap-7 px-5 py-6 pb-12">
    <div ref={topRef} aria-hidden="true" />
    <Button asChild variant="ghost" className="w-fit"><Link href="/guide-mode">Kembali ke mode pemandu</Link></Button>
    <div className="flex flex-col gap-2"><Badge variant={status === "pending" || status === "revision" ? "warning" : "secondary"} className="w-fit">{STATUS_LABELS[status]}</Badge><h1 className="font-heading text-[1.75rem] font-bold leading-[1.2]">Buat listing trip</h1><p className="text-sm text-muted-foreground">Satu draf, dari informasi hingga pengajuan review.</p></div>
    <PreviewNotice>Seluruh perubahan hanya sementara di halaman ini. Foto tidak diunggah; muat ulang menghapus draf. Persetujuan identitas dan staf di bawah adalah simulasi, bukan penerbitan listing.</PreviewNotice>
    <nav className="grid grid-cols-5 gap-1 border-b border-border pb-4" aria-label="Langkah listing">{STEPS.map((label, index) => <Button key={label} size="sm" className="min-h-11 px-1 text-xs" variant={step === index ? "default" : "outline"} aria-current={step === index ? "step" : undefined} disabled={locked && index !== 4} onClick={() => goStep(index)}>{label}</Button>)}</nav>
    {(step === 1 || step === 2) && <p className="text-xs leading-relaxed text-muted-foreground">Gunakan tombol “Gunakan ... dan lanjutkan” untuk menerapkan perubahan editor ke draf listing. Berpindah langkah sebelum menerapkan mengembalikan editor ke rencana/jadwal terakhir yang diterapkan.</p>}
    {active && <Card size="sm"><CardHeader><CardTitle className="text-sm">Versi aktif contoh</CardTitle></CardHeader><CardContent className="text-sm"><p>{active.info.title} · {currency(active.pricing.price)} · {active.availability.capacity} orang</p><p className="mt-2 text-xs text-muted-foreground">Usulan tidak mengganti versi ini sampai disetujui. Syarat booking lama tetap memakai snapshot; persetujuan peserta atas perubahan penting adalah alur terpisah.</p></CardContent></Card>}
    {step === 0 && <section className="flex flex-col gap-5"><h2 className="font-heading text-lg font-extrabold">Informasi dan foto</h2><FieldGroup>
      {infoFields.map(field => <Field key={field.key}><FieldLabel htmlFor={`${id}-${field.key}`}>{field.label}</FieldLabel>{field.multiline ? <Textarea id={`${id}-${field.key}`} maxLength={3000} value={draft.info[field.key]} onChange={event => updateInfo({ [field.key]: event.target.value })} /> : <Input id={`${id}-${field.key}`} maxLength={120} value={draft.info[field.key]} onChange={event => updateInfo({ [field.key]: event.target.value })} />}</Field>)}
      <Choice label="Wilayah contoh" value={draft.info.region} options={[{ value: "java", label: "Jawa · WIB" }, { value: "ntb", label: "Nusa Tenggara Barat · WITA" }, { value: "papua", label: "Papua · WIT" }]} onChange={value => updateInfo({ region: value as ListingInfo["region"], zone: REGION_ZONES[value as ListingInfo["region"]] })} />
      <Choice label="Periksa zona waktu lokasi" value={draft.info.zone} options={["WIB", "WITA", "WIT"].map(value => ({ value, label: value }))} onChange={value => updateInfo({ zone: value as ListingInfo["zone"] })} />
      <FieldDescription>Zona terisi dari wilayah contoh dan dapat dikoreksi. Rute awal sintetis di Lombok; periksa pin bila mengganti lokasi.</FieldDescription>
      <Choice label="Kategori" value={draft.info.category} options={["Pegunungan", "Sungai", "Kota", "Berkemah", "Pulau", "Hutan"].map(value => ({ value, label: value }))} onChange={category => updateInfo({ category })} />
      <Choice label="Tingkat kesulitan" value={draft.info.difficulty} options={["Mudah", "Sedang", "Sulit"].map(value => ({ value, label: value }))} onChange={difficulty => updateInfo({ difficulty: difficulty as ListingInfo["difficulty"] })} />
      <Field><FieldLabel htmlFor={`${id}-duration`}>Durasi (menit)</FieldLabel><Input id={`${id}-duration`} type="number" min={1} step={1} value={draft.info.durationMinutes} onChange={event => updateInfo({ durationMinutes: Number(event.target.value) })} /><FieldDescription>{formatDuration(draft.info.durationMinutes)}. Perubahan durasi perlu diterapkan ulang pada jadwal dan rencana.</FieldDescription></Field>
      <Field><FieldLabel htmlFor={`${id}-photos`}>Foto trip</FieldLabel><Input id={`${id}-photos`} type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={event => { addPhotos(event.target.files); event.target.value = "" }} /><FieldDescription>Foto pertama menjadi foto utama. Batas pratinjau: 8 foto, 10 MB/foto. Foto hanya dibaca pada perangkat.</FieldDescription></Field>
    </FieldGroup>{photoError && <Alert variant="destructive"><AlertDescription>{photoError}</AlertDescription></Alert>}
      <div className="grid grid-cols-2 gap-3">{draft.info.photos.map((photo, index) => <div key={photo.id} className="flex min-w-0 flex-col gap-2"><Image src={photo.src} alt={`Pratinjau ${photo.name}`} width={600} height={400} unoptimized className="aspect-video w-full rounded-xl object-cover" /><p className="truncate text-xs">{index === 0 ? "Foto utama" : `Foto ${index + 1}`} · {photo.name}</p><div className="flex gap-2"><Button size="icon-sm" variant="outline" disabled={index === 0} aria-label={`Jadikan ${photo.name} foto utama`} onClick={() => updateInfo({ photos: [photo, ...draft.info.photos.filter(item => item.id !== photo.id)] })}><ArrowUpIcon /></Button><Button size="icon-sm" variant="outline" aria-label={`Hapus foto ${photo.name}`} onClick={() => updateInfo({ photos: draft.info.photos.filter(item => item.id !== photo.id) })}><TrashIcon /></Button></div></div>)}</div>
      {!draft.info.photos.length && <Button variant="outline" onClick={() => updateInfo({ photos: [{ id: "sample", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", name: "Ilustrasi gunung contoh" }] })}>Gunakan foto ilustrasi contoh</Button>}
      <Problems errors={validateListingInfo(draft.info)} /><Button disabled={validateListingInfo(draft.info).length > 0} onClick={() => goStep(1)}>Lanjut ke rencana</Button>
    </section>}
    {step === 1 && <PlanEditor initial={{ plan: draft.plan, durationMinutes: draft.info.durationMinutes, zone: draft.info.zone }} onApply={plan => { setDraft(current => ({ ...current, plan })); goStep(2) }} />}
    {step === 2 && <AvailabilityEditor initial={{ ...draft.availability, zone: draft.info.zone, durationMinutes: draft.info.durationMinutes }} onApply={(availability, slots) => { if (availability.durationMinutes !== draft.info.durationMinutes || availability.zone !== draft.info.zone) { setMessage("Zona dan durasi jadwal harus sama dengan informasi trip. Perbaiki informasi atau jadwal terlebih dahulu."); return } setDraft(current => ({ ...current, availability, slots })); goStep(3) }} />}
    {step === 3 && <section className="flex flex-col gap-5"><h2 className="font-heading text-lg font-extrabold">Harga dan syarat</h2><Badge variant="outline" className="w-fit">{draft.availability.listingType} · {draft.availability.capacity} orang</Badge><FieldGroup>
      <Field><FieldLabel htmlFor={`${id}-price`}>Harga {booking.packageType === "per group" ? "per rombongan" : "per peserta"} (Rp)</FieldLabel><Input id={`${id}-price`} type="number" min={1} step={1} value={draft.pricing.price} onChange={event => updatePrice({ price: Number(event.target.value) })} /></Field>
      <Field><FieldLabel htmlFor={`${id}-minimum`}>Peserta minimum</FieldLabel><Input id={`${id}-minimum`} type="number" min={1} max={draft.availability.capacity} step={1} value={draft.pricing.minimumParticipants} onChange={event => updatePrice({ minimumParticipants: Number(event.target.value) })} /></Field>
      <Field orientation="horizontal"><Checkbox id={`${id}-dp`} checked={draft.pricing.dpEnabled} onCheckedChange={value => updatePrice({ dpEnabled: value === true })} /><FieldLabel htmlFor={`${id}-dp`}>Tawarkan DP 50% dalam contoh ini</FieldLabel></Field>
      {draft.pricing.dpEnabled && <Choice label="Tenggat pelunasan sebelum mulai" value={String(draft.pricing.dpDeadlineHours)} options={[{ value: "168", label: "7 hari" }, { value: "72", label: "3 hari" }, { value: "24", label: "24 jam" }]} onChange={value => updatePrice({ dpDeadlineHours: Number(value) as ListingPricing["dpDeadlineHours"] })} />}
      <FieldDescription>DP tersembunyi saat checkout bila tenggatnya kurang dari 24 jam lagi. Seluruh biaya layanan 2% dibayar pada pembayaran pertama; pelunasan lewat QRIS AturTrip.</FieldDescription>
      <Choice label="Template pembatalan" value={draft.pricing.cancellation} options={Object.entries(CANCELLATION_TEMPLATES).map(([value, template]) => ({ value, label: template.label }))} onChange={value => updatePrice({ cancellation: value as ListingPricing["cancellation"] })} />
    </FieldGroup><CancellationTerms template={draft.pricing.cancellation} /><h3 className="font-heading text-base font-bold">Add-on opsional</h3><p className="text-xs text-muted-foreground">Harga contoh per booking rombongan. Semua add-on mengikuti template refund yang sama.</p>
      {draft.pricing.addons.map((addon, index) => <Card key={addon.id} size="sm"><CardContent className="flex flex-col gap-3"><Field><FieldLabel htmlFor={`${id}-addon-${index}`}>Nama add-on {index + 1}</FieldLabel><Input id={`${id}-addon-${index}`} maxLength={120} value={addon.name} onChange={event => updatePrice({ addons: draft.pricing.addons.map(item => item.id === addon.id ? { ...item, name: event.target.value } : item) })} /></Field><Field><FieldLabel htmlFor={`${id}-addon-price-${index}`}>Harga (Rp)</FieldLabel><Input id={`${id}-addon-price-${index}`} type="number" min={1} step={1} value={addon.price} onChange={event => updatePrice({ addons: draft.pricing.addons.map(item => item.id === addon.id ? { ...item, price: Number(event.target.value) } : item) })} /></Field><Button variant="outline" onClick={() => updatePrice({ addons: draft.pricing.addons.filter(item => item.id !== addon.id) })}><TrashIcon />Hapus add-on</Button></CardContent></Card>)}
      <Button variant="outline" onClick={() => updatePrice({ addons: [...draft.pricing.addons, { id: crypto.randomUUID(), name: "", price: 0 }] })}><PlusIcon />Tambah add-on</Button><Problems errors={validateListingPricing(draft.pricing, draft.availability.capacity)} /><Button disabled={validateListingPricing(draft.pricing, draft.availability.capacity).length > 0} onClick={() => goStep(4)}>Tinjau seluruh listing</Button>
    </section>}
    {step === 4 && <section className="flex flex-col gap-5"><h2 className="font-heading text-lg font-extrabold">Pratinjau dan review</h2><Card><CardHeader><CardTitle>{draft.info.title}</CardTitle></CardHeader><CardContent className="flex flex-col gap-3"><p className="text-sm">{draft.info.location} · {draft.info.zone}</p><p className="text-sm">{draft.info.category} · {draft.info.difficulty} · {formatDuration(draft.info.durationMinutes)}</p>{draft.info.photos[0] && <Image src={draft.info.photos[0].src} alt={`Foto utama ${draft.info.title}`} width={800} height={500} unoptimized className="aspect-video w-full rounded-xl object-cover" />}<p className="whitespace-pre-line text-sm leading-relaxed">{draft.info.description}</p><p className="whitespace-pre-line text-xs text-muted-foreground">{draft.info.preparation}</p><p className="whitespace-pre-line text-xs text-muted-foreground">{draft.info.included}</p></CardContent></Card>
      {!!draft.slots.length && <DeparturePicker slots={draft.slots} zone={draft.info.zone} value={slot?.id ?? ""} onChange={setSlotId} allowUnavailable />}
      {!errors.length && slot && <InteractiveItinerary plan={visiblePlan(draft.plan, "public")} slot={slot} zone={draft.info.zone} />}
      {!validateListingPricing(draft.pricing, draft.availability.capacity).length && <PriceSummary booking={booking} prices={previewPrice(booking, draft.pricing.minimumParticipants, draft.pricing.addons.map(addon => addon.id), previewPayment)} participants={draft.pricing.minimumParticipants} payment={previewPayment} />}
      <p className="text-xs text-muted-foreground">Rincian contoh untuk jumlah peserta minimum, termasuk semua add-on. Add-on tetap opsional saat checkout.</p><CancellationTerms template={draft.pricing.cancellation} />
      {!locked && <Choice label="Simulasi status identitas penyedia" value={identity} options={[{ value: "unsubmitted", label: "Belum dikirim" }, { value: "pending", label: "Menunggu verifikasi staf" }, { value: "revision", label: "Perlu perbaikan dokumen" }, { value: "verified", label: "Disetujui dalam simulasi" }]} onChange={value => setIdentity(value as IdentityPreviewState)} />}
      {identity !== "verified" && <Alert variant="warning"><AlertDescription>KTP dan swafoto harus ditinjau staf sebelum listing dapat dikirim. Pilihan status ini hanya menguji alur; tidak memverifikasi identitas nyata.</AlertDescription></Alert>}
      {active && <Alert><AlertTitle>{needsStaffReview ? "Usulan memerlukan review ulang" : "Koreksi kecil contoh"}</AlertTitle><AlertDescription>{needsStaffReview ? reviewChanges.join(", ") : "Tidak ada perubahan harga/syarat, foto utama, rute inti, durasi, kapasitas, atau kesulitan. Versi booking lama tetap tersimpan."}</AlertDescription></Alert>}
      <Problems errors={errors} />
      {status === "revision" && <Alert variant="warning"><AlertTitle>Revisi diminta dalam simulasi</AlertTitle><AlertDescription>{revisionReason}</AlertDescription></Alert>}
      {!locked && <Button disabled={errors.length > 0 || identity !== "verified"} onClick={submit}>{needsStaffReview ? "Simulasikan kirim listing untuk review" : "Terapkan koreksi kecil contoh"}</Button>}
      {status === "pending" && submitted && <Card size="sm"><CardHeader><CardTitle className="text-sm">Pengajuan contoh: {submitted.info.title}</CardTitle></CardHeader><CardContent className="flex flex-col gap-3"><p className="text-xs text-muted-foreground">Ini simulasi respons untuk meninjau UX pemandu. Keputusan staf nyata hanya berasal dari API; tidak ada halaman admin di sini.</p><Button variant="outline" onClick={() => { setStatus("revision"); setRevisionReason("Jelaskan perlengkapan yang tidak termasuk dan periksa kembali titik temu. Alasan ini contoh respons staf."); setMessage("Draf dikembalikan untuk diperbaiki. Versi aktif lama tetap berlaku.") }}>Simulasikan permintaan revisi</Button><Button variant="outline" onClick={() => { if (identity !== "verified") return; setActive(structuredClone(submitted)); setDraft(structuredClone(submitted)); setStatus("approved"); setMessage("Versi disetujui dalam simulasi. Tidak ada listing yang diterbitkan ke katalog/API.") }}>Simulasikan persetujuan listing</Button></CardContent></Card>}
      {status === "approved" && <Button variant="outline" onClick={() => { setStatus("draft"); setSubmitted(null); setMessage("Draf versi baru dibuka. Versi aktif contoh tetap terpisah selama revisi.") }}>Buat usulan versi baru</Button>}
    </section>}
    {message && <Alert variant="info"><AlertDescription>{message}</AlertDescription></Alert>}
    {step > 0 && !locked && <Button variant="ghost" onClick={() => goStep(step - 1)}>Kembali ke {STEPS[step - 1].toLowerCase()}</Button>}
  </main>
}
