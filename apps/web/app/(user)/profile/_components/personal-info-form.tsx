'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const GENDERS = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
  { value: "undisclosed", label: "Tidak ingin menyebutkan" },
]

export function PersonalInfoForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1.5">
        <Label>Nama lengkap</Label>
        <Input defaultValue="Aam Hermansyah" placeholder="Masukkan nama lengkap" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Tanggal lahir</Label>
          <Input type="date" defaultValue="1998-04-17" className="px-3" />
        </div>

        <div className="space-y-1.5">
          <Label>Jenis kelamin</Label>
          <Select defaultValue="male">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Kota domisili</Label>
        <Input defaultValue="Tasikmalaya, Jawa Barat" placeholder="Contoh: Bandung, Jawa Barat" />
      </div>

      <div className="space-y-1.5">
        <Label>
          Bio <span className="font-normal text-muted-foreground">(opsional)</span>
        </Label>
        <Textarea
          defaultValue="Suka jalan kaki jauh, kopi pahit, dan pulang dengan sepatu berlumpur."
          placeholder="Ceritakan sedikit tentang dirimu..."
          className="min-h-20 resize-none text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Bio ini tampil di profil publikmu dan bisa dilihat pemandu.
        </p>
      </div>
    </div>
  )
}
