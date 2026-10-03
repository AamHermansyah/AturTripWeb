"use client"

import { useId, useState } from "react"
import { ShareNetworkIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ShareTripButton({ href, title }: { href: string; title: string }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  function showShare() {
    const link = new URL(href, window.location.origin)
    const current = new URL(window.location.href)
    for (const key of ["tab", "slot"]) { const value = current.searchParams.get(key); if (value) link.searchParams.set(key, value) }
    setUrl(link.toString()); setOpen(true); setMessage(null)
  }
  async function copy() {
    try { await navigator.clipboard.writeText(url); setMessage("Tautan disalin. Kamu dapat mengirimkannya lewat aplikasi pilihanmu.") }
    catch { setMessage("Salin manual dari kolom tautan. Browser belum mengizinkan akses papan salin.") }
  }
  return <><Button type="button" variant="outline" size="icon-sm" aria-label={`Bagikan ${title}`} className="border-none bg-black/40 text-white hover:bg-black/60 hover:text-white" onClick={showShare}><ShareNetworkIcon weight="bold" /></Button><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Bagikan trip</DialogTitle><DialogDescription>Salin tautan publik {title}. Pada pratinjau lokal, penerima perlu akses ke server yang sama.</DialogDescription></DialogHeader><Field><FieldLabel htmlFor={id}>Tautan publik</FieldLabel><Input id={id} readOnly value={url} onFocus={event => event.target.select()} /></Field><Button onClick={copy}>Salin tautan</Button>{message && <Alert><AlertDescription>{message}</AlertDescription></Alert>}</DialogContent></Dialog></>
}
