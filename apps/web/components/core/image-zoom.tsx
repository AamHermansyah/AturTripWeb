"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ImageZoom({ image, onClose }: { onClose: () => void; image: { src: string; alt: string } | null }) {
  return <Dialog open={!!image} onOpenChange={open => { if (!open) onClose() }}><DialogContent className="max-h-[90dvh] overflow-y-auto p-4">
    <DialogHeader className="pr-8"><DialogTitle>{image?.alt ?? "Foto perjalanan"}</DialogTitle><DialogDescription>Pratinjau foto. Tekan Escape atau tombol tutup untuk kembali.</DialogDescription></DialogHeader>
    {image && <img src={image.src} alt={image.alt} className="max-h-[65dvh] w-full rounded-xl object-contain" style={{ touchAction: "pinch-zoom" }} />}
  </DialogContent></Dialog>
}
