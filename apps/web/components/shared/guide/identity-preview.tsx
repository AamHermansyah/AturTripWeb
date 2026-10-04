"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { PreviewNotice } from "@/components/shared/preview-notice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IdentityPreviewState } from "@/lib/listing-preview"

type DocumentPreview = { name: string; size: number; example: boolean }
const STATUS = { unsubmitted: "Belum diajukan", pending: "Menunggu tinjauan staf", revision: "Perlu perbaikan", verified: "Disetujui dalam simulasi" }

export function IdentityPreview() {
  const id = useId()
  const [role, setRole] = useState("individual")
  const [name, setName] = useState("")
  const [ktp, setKtp] = useState<DocumentPreview | null>(null)
  const [selfie, setSelfie] = useState<DocumentPreview | null>(null)
  const [certificate, setCertificate] = useState<DocumentPreview | null>(null)
  const [ownership, setOwnership] = useState(false)
  const [status, setStatus] = useState<IdentityPreviewState>("unsubmitted")
  const [certificateStatus, setCertificateStatus] = useState<"none" | "pending" | "approved" | "revision">("none")
  const [error, setError] = useState<string | null>(null)
  const [revision, setRevision] = useState<string | null>(null)
  const locked = status === "pending" || status === "verified"
  const ready = !!name.trim() && !!ktp && !!selfie && ownership

  function choose(file: File | undefined, kind: "ktp" | "selfie" | "certificate") {
    const allowed = kind === "selfie" ? ["image/jpeg", "image/png", "image/webp"] : ["image/jpeg", "image/png", "image/webp", "application/pdf"]
    if (!file || !allowed.includes(file.type) || file.size > 10 * 1024 * 1024) { setError("Pilih format yang sesuai, maksimal 10 MB per berkas pada pratinjau."); return }
    const document = { name: file.name, size: file.size, example: false }
    if (kind === "ktp") setKtp(document)
    else if (kind === "selfie") setSelfie(document)
    else { setCertificate(document); setCertificateStatus("none") }
    setError(null)
  }
  function submit() {
    if (!ready) { setError("Lengkapi nama, KTP, swafoto, serta pernyataan kepemilikan."); return }
    setStatus("pending"); setCertificateStatus(certificate ? "pending" : "none"); setRevision(null); setError(null)
  }
  const fields = [
    { kind: "ktp" as const, label: "KTP", value: ktp, description: "Foto atau PDF KTP yang jelas. Tidak ditampilkan pada profil publik.", accept: "image/jpeg,image/png,image/webp,application/pdf" },
    { kind: "selfie" as const, label: "Swafoto", value: selfie, description: "Foto wajah yang jelas untuk tinjauan staf. Tidak ditampilkan pada profil publik.", accept: "image/jpeg,image/png,image/webp" },
    { kind: "certificate" as const, label: "Sertifikat (opsional)", value: certificate, description: "Sertifikat bukan syarat minimum identitas. Badge hanya muncul setelah sertifikat disetujui.", accept: "image/jpeg,image/png,image/webp,application/pdf" },
  ]
  return <main className="flex flex-col gap-7 px-5 py-6 pb-24">
    <Button asChild variant="ghost" className="w-fit"><Link href="/account">Kembali ke akun</Link></Button><Badge variant={status === "pending" || status === "revision" ? "warning" : status === "verified" ? "success" : "secondary"} className="w-fit">{STATUS[status]}</Badge>
    <div><h1 className="font-heading text-[1.75rem] font-bold leading-[1.2]">Verifikasi pemandu</h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground">KTP dan swafoto ditinjau staf sebelum penyedia dapat menjual trip.</p></div>
    <PreviewNotice>Berkas tidak diunggah atau disimpan. Halaman ini hanya membaca nama/ukuran berkas; isinya tidak dibaca. Gunakan berkas contoh untuk meninjau alur. Muat ulang menghapus semua pilihan dan status.</PreviewNotice>
    <FieldGroup><Field><FieldLabel htmlFor={`${id}-role`}>Peran contoh</FieldLabel><Select value={role} disabled={locked} onValueChange={setRole}><SelectTrigger id={`${id}-role`} className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="individual">Pemandu individu</SelectItem><SelectItem value="owner">Pemilik grup</SelectItem><SelectItem value="member">Pemandu anggota grup</SelectItem></SelectGroup></SelectContent></Select><FieldDescription>{role === "member" ? "Pemandu yang memimpin harus ditetapkan dan terverifikasi sebelum slot grup dijual." : role === "owner" ? "Pemilik grup perlu terverifikasi. Pemandu anggota yang memimpin juga wajib memenuhi syarat." : "Identitas disetujui belum berarti setiap listing baru dapat langsung terbit."}</FieldDescription></Field>
      <Field><FieldLabel htmlFor={`${id}-name`}>Nama sesuai identitas</FieldLabel><Input id={`${id}-name`} maxLength={120} autoComplete="name" disabled={locked} value={name} onChange={event => setName(event.target.value)} /></Field>
      {fields.map(field => <Field key={field.kind}><FieldLabel htmlFor={`${id}-${field.kind}`}>{field.label}</FieldLabel><Input id={`${id}-${field.kind}`} type="file" accept={field.accept} disabled={locked} onChange={event => { choose(event.target.files?.[0], field.kind); event.target.value = "" }} /><FieldDescription>{field.description} Batas contoh 10 MB.</FieldDescription>{field.value && <div className="flex min-w-0 items-center gap-2 rounded-xl border p-3"><p className="min-w-0 flex-1 truncate text-xs">{field.value.name} · {field.value.example ? "berkas contoh" : `${Math.ceil(field.value.size / 1024)} KB`}</p><Button size="sm" variant="ghost" disabled={locked} onClick={() => { if (field.kind === "ktp") setKtp(null); else if (field.kind === "selfie") setSelfie(null); else { setCertificate(null); setCertificateStatus("none") } }}>Hapus</Button></div>}</Field>)}
      <Field orientation="horizontal"><Checkbox id={`${id}-ownership`} checked={ownership} disabled={locked} onCheckedChange={value => setOwnership(value === true)} /><FieldLabel htmlFor={`${id}-ownership`}>Saya meninjau contoh dokumen milik penyedia yang sesuai.</FieldLabel></Field>
    </FieldGroup>
    {!locked && <Button variant="outline" onClick={() => { setName("Pemandu Contoh"); setKtp({ name: "ktp-contoh.jpg", size: 0, example: true }); setSelfie({ name: "swafoto-contoh.jpg", size: 0, example: true }); setOwnership(true); setError(null) }}>Isi dengan berkas contoh</Button>}
    {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
    {revision && <Alert variant="warning"><AlertTitle>Perbaikan diminta dalam simulasi</AlertTitle><AlertDescription>{revision}</AlertDescription></Alert>}
    {!locked && <Button disabled={!ready} onClick={submit}>Simulasikan kirim untuk verifikasi</Button>}
    {status === "pending" && <Card><CardHeader><CardTitle className="text-base">Pengajuan menunggu tinjauan</CardTitle></CardHeader><CardContent className="flex flex-col gap-3"><p className="text-sm leading-relaxed">Identitas belum disetujui. Staf nyata akan memeriksa dokumen dan mengirim hasil melalui aplikasi serta email. Tidak ada notifikasi yang dikirim pada simulasi ini.</p><Button variant="outline" onClick={() => { setStatus("revision"); setRevision("Swafoto contoh kurang jelas. Pilih kembali berkas yang memperlihatkan wajah, kemudian kirim ulang."); setSelfie(null); setCertificateStatus("none") }}>Simulasikan perlu perbaikan</Button><Button variant="outline" onClick={() => { setStatus("verified"); setRevision(null) }}>Simulasikan identitas disetujui</Button></CardContent></Card>}
    {status === "verified" && <Alert variant="success"><AlertTitle>Identitas disetujui dalam simulasi</AlertTitle><AlertDescription>Listing baru tetap harus melalui review staf. Status ini tidak menjadi sesi atau izin API dan tidak mengubah status contoh pada wizard listing.</AlertDescription></Alert>}
    {certificate && status === "verified" && <Card size="sm"><CardHeader><CardTitle className="text-sm">Tinjauan sertifikat terpisah</CardTitle></CardHeader><CardContent className="flex flex-col gap-3"><Badge variant={certificateStatus === "approved" ? "success" : "outline"} className="w-fit">{certificateStatus === "approved" ? "Badge sertifikat contoh" : certificateStatus === "revision" ? "Sertifikat perlu perbaikan" : "Sertifikat menunggu tinjauan"}</Badge><p className="text-xs text-muted-foreground">Sertifikat opsional tidak mengubah hasil verifikasi identitas. Tidak ada badge publik nyata yang dibuat.</p>{certificateStatus !== "approved" && <Button variant="outline" onClick={() => setCertificateStatus("approved")}>Simulasikan sertifikat disetujui</Button>}{certificateStatus === "pending" && <Button variant="outline" onClick={() => setCertificateStatus("revision")}>Simulasikan sertifikat perlu perbaikan</Button>}</CardContent></Card>}
    {status === "verified" && <Button asChild><Link href="/guide-mode/listing">Tinjau wizard listing</Link></Button>}
    {locked && <Button variant="ghost" onClick={() => { setStatus("unsubmitted"); setCertificateStatus("none"); setRevision(null); setError(null) }}>Ulangi simulasi verifikasi</Button>}
    <p className="text-xs leading-relaxed text-muted-foreground">Pada integrasi, dokumen pribadi hanya boleh diakses pihak berwenang. Keputusan staf dan izin menjual berasal dari API; nama/metadata berkas pada halaman ini tidak membuktikan verifikasi.</p>
  </main>
}
