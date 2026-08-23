'use client'

import { useState } from "react"
import {
  FingerprintIcon,
  WhatsappLogoIcon,
  DeviceMobileIcon,
  QrCodeIcon,
  CheckCircleIcon,
  InfoIcon,
} from "@phosphor-icons/react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const METHODS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Kode dikirim ke 0812••••7890",
    icon: WhatsappLogoIcon,
  },
  {
    id: "sms",
    label: "SMS",
    description: "Kode dikirim lewat pesan singkat",
    icon: DeviceMobileIcon,
  },
  {
    id: "authenticator",
    label: "Aplikasi Authenticator",
    description: "Google Authenticator, Authy, dan sejenisnya",
    icon: QrCodeIcon,
  },
]

export function TwoFactorSection({
  enabled,
  onEnabledChange,
}: {
  enabled: boolean
  onEnabledChange: (value: boolean) => void
}) {
  const [method, setMethod] = useState("whatsapp")

  return (
    <div className="space-y-3">
      <h2 className="pl-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        Verifikasi Dua Langkah
      </h2>

      <div className="space-y-4 rounded-4xl bg-muted/40 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-primary shadow-xs">
            <FingerprintIcon weight="fill" className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight">Aktifkan 2FA</p>
            <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
              Tambahan satu langkah verifikasi setiap kali masuk dari perangkat baru.
            </p>
          </div>

          <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        </div>

        {enabled && (
          <div className="space-y-3 animate-in fade-in-50 duration-300">
            <Separator />

            <p className="text-xs font-bold text-foreground">Metode verifikasi</p>

            <RadioGroup value={method} onValueChange={setMethod} className="gap-2">
              {METHODS.map(({ id, label, description, icon: Icon }) => {
                const isActive = method === id

                return (
                  <label
                    key={id}
                    htmlFor={`2fa-${id}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-3 py-2.5 transition-all active:scale-[0.99]",
                      isActive
                        ? "border-primary bg-primary/5"
                        : "border-border/60 bg-background"
                    )}
                  >
                    <RadioGroupItem value={id} id={`2fa-${id}`} className="sr-only" />
                    <Icon
                      weight="fill"
                      className={cn(
                        "size-5 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-tight">{label}</p>
                      <p className="truncate text-xs text-muted-foreground">{description}</p>
                    </div>
                    {isActive && (
                      <CheckCircleIcon weight="fill" className="size-4 shrink-0 text-primary" />
                    )}
                  </label>
                )
              })}
            </RadioGroup>

            <div className="flex items-start gap-2 rounded-xl bg-background px-3 py-2.5">
              <InfoIcon weight="fill" className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Simpan kode cadangan di tempat aman. Kode ini dipakai jika kamu kehilangan akses
                ke metode verifikasi di atas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
