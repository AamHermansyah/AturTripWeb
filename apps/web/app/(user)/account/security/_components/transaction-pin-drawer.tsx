'use client'

import { useState } from "react"
import { KeyIcon, ShieldCheckIcon } from "@phosphor-icons/react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
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

const PIN_LENGTH = 6

function PinField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      {/* data-vaul-no-drag: cegah drawer ikut ter-drag saat menyeret di area OTP. */}
      <div data-vaul-no-drag>
        <InputOTP
          maxLength={PIN_LENGTH}
          value={value}
          onChange={onChange}
          containerClassName="gap-2"
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup className="gap-2">
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="size-11 rounded-xl border border-input text-base first:rounded-xl first:border last:rounded-xl data-[active=true]:border-primary data-[active=true]:ring-primary/30"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  )
}

export function TransactionPinDrawer({
  active,
  onActiveChange,
}: {
  active: boolean
  onActiveChange: (value: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setPin("")
      setConfirmPin("")
    }
    setOpen(nextOpen)
  }

  function handleSave() {
    const wasActive = active
    onActiveChange(true)
    handleOpenChange(false)
    toast.success(wasActive ? "PIN transaksi diperbarui" : "PIN transaksi aktif", {
      description: "PIN ini akan diminta setiap kali kamu membayar atau menarik dana.",
    })
  }

  // repositionInputs={false}: lihat catatan di change-contact-drawer.tsx —
  // focus() dari vaul merusak pelacakan caret input-otp.
  return (
    <Drawer open={open} onOpenChange={handleOpenChange} repositionInputs={false}>
      <DrawerTrigger asChild>
        <SecurityRow
          icon={KeyIcon}
          label={active ? "Ubah PIN Transaksi" : "Atur PIN Transaksi"}
          badge={
            active
              ? { label: "AKTIF", variant: "success" }
              : { label: "BELUM DIATUR", variant: "warning" }
          }
        />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-extrabold">
            {active ? "Ubah PIN Transaksi" : "Atur PIN Transaksi"}
          </DrawerTitle>
          <DrawerDescription>
            PIN 6 digit ini diminta setiap kali kamu membayar atau menarik dana.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-5 overflow-y-auto px-4 pb-2">
          <PinField
            label={active ? "PIN baru" : "Buat PIN"}
            value={pin}
            onChange={setPin}
          />
          <PinField label="Konfirmasi PIN" value={confirmPin} onChange={setConfirmPin} />

          <div className="flex items-start gap-2 rounded-xl bg-muted/50 px-3 py-2.5">
            <ShieldCheckIcon weight="fill" className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Hindari angka berurutan atau tanggal lahir. Jangan bagikan PIN ini ke siapa pun,
              termasuk yang mengaku dari AturTrip.
            </p>
          </div>
        </div>

        <DrawerFooter className="flex-row gap-2">
          <DrawerClose asChild>
            <Button variant="outline" className="flex-1">
              Batal
            </Button>
          </DrawerClose>
          <Button className="flex-1" onClick={handleSave}>
            Simpan PIN
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
