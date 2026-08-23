'use client'

import { useState } from "react"
import { EnvelopeSimpleIcon, PhoneIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SecurityRow } from "./security-row"

export type ContactType = "email" | "phone"

const CONFIG = {
  email: {
    icon: EnvelopeSimpleIcon,
    rowLabel: "Ubah Email",
    title: "Ubah Alamat Email",
    description: "Kami akan mengirim kode verifikasi ke alamat email barumu.",
    currentLabel: "Email saat ini",
    fieldLabel: "Alamat email baru",
    placeholder: "nama@email.com",
    inputType: "email",
    sentTo: "email",
  },
  phone: {
    icon: PhoneIcon,
    rowLabel: "Ubah Nomor HP",
    title: "Ubah Nomor HP",
    description: "Kami akan mengirim kode verifikasi ke nomor barumu via WhatsApp.",
    currentLabel: "Nomor saat ini",
    fieldLabel: "Nomor HP baru",
    placeholder: "Contoh: 08123456789",
    inputType: "tel",
    sentTo: "WhatsApp",
  },
} as const

/** Menyamarkan sebagian nilai agar tetap dikenali pemilik tanpa terbaca penuh. */
function maskContact(type: ContactType, value: string) {
  if (type === "email") {
    const [local, domain] = value.split("@")
    if (!domain) return value
    return `${local.slice(0, 3)}•••@${domain}`
  }

  const digits = value.replace(/\s/g, "")
  return `${digits.slice(0, 4)}••••${digits.slice(-4)}`
}

export function ChangeContactDrawer({
  type,
  currentValue,
}: {
  type: ContactType
  currentValue: string
}) {
  const config = CONFIG[type]
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"form" | "otp">("form")
  const [otp, setOtp] = useState("")

  function handleVerify() {
    handleOpenChange(false)
    toast.success("Verifikasi berhasil", {
      description:
        "Kami sudah mengirim tautan konfirmasi ke emailmu. Buka email tersebut untuk menyelesaikan perubahan.",
    })
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setStep("form")
      setOtp("")
    }
    setOpen(nextOpen)
  }

  // repositionInputs={false}: vaul memanggil focus() + transform pada input untuk
  // mengakali keyboard mobile, sementara input-otp melacak slot aktif lewat
  // setSelectionRange — refocus dari vaul merusak pelacakan caret itu.
  return (
    <Drawer open={open} onOpenChange={handleOpenChange} repositionInputs={false}>
      <DrawerTrigger asChild>
        <SecurityRow
          icon={config.icon}
          label={config.rowLabel}
          value={maskContact(type, currentValue)}
        />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-extrabold">{config.title}</DrawerTitle>
          <DrawerDescription>
            {step === "form"
              ? config.description
              : `Masukkan 4 digit kode yang kami kirim lewat ${config.sentTo}.`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-2">
          {step === "form" ? (
            <>
              <div className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {config.currentLabel}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{currentValue}</p>
              </div>

              <Separator />

              <div className="space-y-1.5">
                <Label>{config.fieldLabel}</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <config.icon />
                  </InputGroupAddon>
                  <InputGroupInput
                    type={config.inputType}
                    inputMode={type === "phone" ? "tel" : "email"}
                    placeholder={config.placeholder}
                  />
                </InputGroup>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-5 py-2">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <PaperPlaneTiltIcon weight="fill" className="size-6 text-primary" />
              </div>

              {/* data-vaul-no-drag: cegah drawer ikut ter-drag saat menyeret di area OTP. */}
              <div data-vaul-no-drag>
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={setOtp}
                  containerClassName="gap-3"
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup className="gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="size-14 rounded-xl border border-input text-lg first:rounded-xl first:border last:rounded-xl data-[active=true]:border-primary data-[active=true]:ring-primary/30"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-primary underline-offset-2 hover:underline"
              >
                Kirim ulang kode
              </button>
            </div>
          )}
        </div>

        <DrawerFooter className="flex-row gap-2">
          {step === "form" ? (
            <>
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  Batal
                </Button>
              </DrawerClose>
              <Button className="flex-1" onClick={() => setStep("otp")}>
                Kirim Kode
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="flex-1" onClick={() => setStep("form")}>
                Kembali
              </Button>
              <Button className="flex-1" onClick={handleVerify}>
                Verifikasi
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
