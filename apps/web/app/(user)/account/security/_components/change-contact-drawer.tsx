"use client"

import { useState, type FormEvent } from "react"
import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
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
import { OtpVerification } from "@/components/shared/auth/otp-verification"
import {
  createPreviewChallenge,
  maskIdentity,
  normalizeIdentity,
  type PreviewChallenge,
} from "@/lib/auth-preview"
import { SecurityRow } from "./security-row"

export type ContactType = "email" | "phone"

export function ChangeContactDrawer({
  type,
  currentValue,
  onValueChange,
}: {
  type: ContactType
  currentValue: string
  onValueChange: (value: string) => void
}) {
  const role = type === "email" ? "guide" : "traveler"
  const Icon = type === "email" ? EnvelopeSimpleIcon : PhoneIcon
  const label = type === "email" ? "Alamat email" : "Nomor HP"
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [challenge, setChallenge] = useState<PreviewChallenge | null>(null)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      setValue("")
      setError("")
      setChallenge(null)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = normalizeIdentity(role, value)
    if (!normalized) {
      setError(
        type === "email"
          ? "Masukkan alamat email yang valid."
          : "Masukkan nomor HP Indonesia yang valid."
      )
      return
    }
    if (normalized === normalizeIdentity(role, currentValue)) {
      setError("Identitas baru harus berbeda dari identitas saat ini.")
      return
    }
    setError("")
    setChallenge(createPreviewChallenge(role, normalized, "register"))
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      repositionInputs={false}
    >
      <DrawerTrigger asChild>
        <SecurityRow
          icon={Icon}
          label={`Ubah ${label.toLowerCase()}`}
          value={maskIdentity(role, currentValue)}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ubah {label.toLowerCase()}</DrawerTitle>
          <DrawerDescription>
            {challenge
              ? "Verifikasi identitas baru sebelum perubahan diterapkan."
              : `Kode verifikasi untuk identitas baru diterima melalui ${type === "email" ? "email" : "WhatsApp"}.`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-2">
          {challenge ? (
            <OtpVerification
              key={challenge.identity}
              challenge={challenge}
              onResend={() =>
                setChallenge(
                  createPreviewChallenge(role, challenge.identity, "register")
                )
              }
              onVerified={() => {
                onValueChange(challenge.identity)
                handleOpenChange(false)
                toast.success(`${label} contoh diperbarui`, {
                  description:
                    "Perubahan hanya berlaku di pratinjau ini dan belum disimpan.",
                })
              }}
            />
          ) : (
            <form id={`change-${type}`} noValidate onSubmit={submit}>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel>{label} saat ini</FieldLabel>
                  <FieldDescription className="break-all">
                    {currentValue}
                  </FieldDescription>
                </Field>
                <Field data-invalid={!!error}>
                  <FieldLabel htmlFor={`new-${type}`}>{label} baru</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Icon />
                    </InputGroupAddon>
                    <InputGroupInput
                      id={`new-${type}`}
                      type={type === "email" ? "email" : "tel"}
                      inputMode={type === "email" ? "email" : "tel"}
                      autoComplete={type === "email" ? "email" : "tel"}
                      placeholder={
                        type === "email" ? "nama@email.com" : "0812 3456 7890"
                      }
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      aria-invalid={!!error}
                      aria-describedby={error ? `new-${type}-error` : undefined}
                    />
                  </InputGroup>
                  {error && (
                    <FieldError id={`new-${type}-error`}>{error}</FieldError>
                  )}
                </Field>
                <FieldDescription>
                  Mode contoh. Pesan verifikasi belum dikirim dan perubahan
                  belum disimpan.
                </FieldDescription>
              </FieldGroup>
            </form>
          )}
        </div>
        <DrawerFooter>
          {challenge ? (
            <Button variant="outline" onClick={() => setChallenge(null)}>
              Ubah {label.toLowerCase()}
            </Button>
          ) : (
            <Button type="submit" form={`change-${type}`}>
              Kirim kode verifikasi
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="ghost">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
