'use client'

import Link from "next/link"
import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  SealCheckIcon,
  FirstAidKitIcon,
} from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const RELATIONS = [
  { value: "parent", label: "Orang tua" },
  { value: "sibling", label: "Saudara" },
  { value: "spouse", label: "Pasangan" },
  { value: "friend", label: "Teman" },
  { value: "other", label: "Lainnya" },
]

function VerifiedContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-4 py-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-primary shadow-xs">
        <Icon weight="fill" className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-semibold text-foreground">{value}</p>
          <SealCheckIcon weight="fill" className="size-3.5 shrink-0 text-info" />
        </div>
      </div>

      <Link
        href="/account/security"
        className="shrink-0 text-xs font-bold text-primary hover:underline"
      >
        Ubah
      </Link>
    </div>
  )
}

export function ContactSection() {
  return (
    <div className="flex flex-col gap-4">
      <VerifiedContactRow
        icon={EnvelopeSimpleIcon}
        label="Email"
        value="aam.hermansyah@example.com"
      />
      <VerifiedContactRow icon={PhoneIcon} label="Nomor HP" value="0812 3456 7890" />

      <Separator />

      <div className="flex items-start gap-2">
        <FirstAidKitIcon weight="fill" className="mt-0.5 size-4 shrink-0 text-destructive" />
        <div>
          <p className="text-sm font-bold leading-tight">Kontak Darurat</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            Dihubungi pemandu hanya jika terjadi keadaan darurat selama perjalanan.
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Nama kontak darurat</Label>
        <Input defaultValue="Siti Nurhaliza" placeholder="Masukkan nama" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Nomor HP</Label>
          <Input defaultValue="0813 9876 5432" inputMode="tel" placeholder="08..." />
        </div>

        <div className="space-y-1.5">
          <Label>Hubungan</Label>
          <Select defaultValue="sibling">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              {RELATIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
