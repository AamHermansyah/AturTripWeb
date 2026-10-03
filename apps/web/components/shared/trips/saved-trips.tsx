"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { JourneyCard } from "./journey-card"
import { useSavedPreview, type SavedTripPreview } from "./saved-preview-provider"

export function SavedTrips({ examples }: { examples: SavedTripPreview[] }) {
  const { trips, clear, addExamples } = useSavedPreview()
  const [query, setQuery] = useState("")
  const [clearOpen, setClearOpen] = useState(false)
  const matches = trips.filter(trip => query.trim().toLocaleLowerCase("id-ID").split(/\s+/).every(term => `${trip.journey.title} ${trip.journey.location}`.toLocaleLowerCase("id-ID").includes(term)))
  return <main className="flex flex-col gap-5 px-5 py-6"><Badge variant="secondary" className="w-fit">Simpanan contoh</Badge><div><h1 className="font-heading text-2xl font-extrabold">Trip disimpan</h1><p className="mt-2 text-sm text-muted-foreground">Kumpulkan perjalanan yang ingin kamu tinjau kembali.</p></div><Alert><AlertDescription>Simpanan hanya ada selama navigasi sesi pratinjau ini. Muat ulang mengosongkan daftar; belum tersambung ke akun/API.</AlertDescription></Alert>
    {!trips.length ? <><Alert><AlertTitle>Belum ada trip disimpan</AlertTitle><AlertDescription>Ketuk ikon hati pada kartu atau detail trip untuk menambahkannya di sini.</AlertDescription></Alert><Button asChild><Link href="/explore">Temukan perjalanan</Link></Button><Button variant="outline" onClick={() => addExamples(examples)}>Isi daftar contoh</Button></> : <>
      <Field><FieldLabel htmlFor="saved-trip-search">Cari dalam simpanan</FieldLabel><Input id="saved-trip-search" type="search" maxLength={120} value={query} onChange={event => setQuery(event.target.value)} placeholder="Nama trip atau lokasi" /></Field><div className="flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground" role="status">{matches.length} dari {trips.length} trip disimpan</p><Button size="sm" variant="ghost" onClick={() => setClearOpen(true)}>Hapus semua</Button></div>
      {matches.length ? matches.map(trip => <JourneyCard key={trip.href} journey={trip.journey} href={trip.href} className="w-full" />) : <Alert><AlertTitle>Tidak ada simpanan yang cocok</AlertTitle><AlertDescription>Coba lokasi/nama lain atau <button type="button" className="font-semibold underline underline-offset-4" onClick={() => setQuery("")}>reset pencarian</button>.</AlertDescription></Alert>}
    </>}
    <Dialog open={clearOpen} onOpenChange={setClearOpen}><DialogContent><DialogHeader><DialogTitle>Hapus semua simpanan contoh?</DialogTitle><DialogDescription>{trips.length} trip akan dihapus dari daftar pratinjau. Kamu dapat menyimpannya lagi dari Explore atau detail trip.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setClearOpen(false)}>Batal</Button><Button variant="destructive" onClick={() => { clear(); setQuery(""); setClearOpen(false) }}>Hapus semua</Button></DialogFooter></DialogContent></Dialog>
  </main>
}
