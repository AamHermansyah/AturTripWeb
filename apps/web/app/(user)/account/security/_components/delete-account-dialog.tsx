'use client'

import { useState } from "react"
import { TrashIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SecurityRow } from "./security-row"

const CONSEQUENCES = [
  "Seluruh riwayat perjalanan dan ulasanmu akan dihapus permanen.",
  "Pemesanan yang sedang berjalan otomatis dibatalkan tanpa refund.",
  "Sisa saldo di dompet AturTrip tidak dapat ditarik kembali.",
]

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SecurityRow icon={TrashIcon} label="Hapus Akun" tone="destructive" />
      </DialogTrigger>

      <DialogContent className="gap-5">
        <DialogHeader>
          <DialogTitle>Hapus Akun</DialogTitle>
          <DialogDescription>
            Tindakan ini permanen dan tidak dapat diurungkan.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <WarningCircleIcon weight="fill" className="size-4 shrink-0" />
            <p className="text-xs font-bold uppercase tracking-widest">Yang akan terjadi</p>
          </div>

          <ul className="flex flex-col gap-2">
            {CONSEQUENCES.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive/60" />
                <p className="text-xs leading-relaxed text-muted-foreground">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className="flex-col gap-2">
          <Button
            variant="destructive-fill"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Ya, Hapus Akun Saya
          </Button>
          <Button
            variant="ghost"
            className="w-full hover:bg-transparent"
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
