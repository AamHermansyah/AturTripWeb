"use client"

import { useEffect, useState, type FormEvent } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  checkPreviewOtp,
  maskIdentity,
  PREVIEW_OTP,
  PREVIEW_OTP_LIFETIME_MS,
  PREVIEW_RESEND_MS,
  type PreviewChallenge,
} from "@/lib/auth-preview"

export function OtpVerification({
  challenge,
  onVerified,
  onResend,
}: {
  challenge: PreviewChallenge
  onVerified: () => void
  onResend: () => void
}) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [now, setNow] = useState(challenge.issuedAt)
  const [simulateExpired, setSimulateExpired] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const seconds = Math.max(
    0,
    Math.ceil((challenge.issuedAt + PREVIEW_RESEND_MS - now) / 1000)
  )
  const expired =
    simulateExpired || now >= challenge.issuedAt + PREVIEW_OTP_LIFETIME_MS
  const channel = challenge.role === "guide" ? "email" : "WhatsApp"

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = checkPreviewOtp(challenge, otp)
    if (simulateExpired || result === "expired") {
      setError(
        "Kode sudah kedaluwarsa. Kirim ulang untuk mendapatkan kode baru."
      )
    } else if (result !== "valid") {
      setError("Kode belum sesuai. Periksa kembali 4 digit kode verifikasimu.")
    } else {
      onVerified()
    }
  }

  function resend() {
    if (Date.now() < challenge.issuedAt + PREVIEW_RESEND_MS) return
    setOtp("")
    setError("")
    setSimulateExpired(false)
    setNow(Date.now())
    onResend()
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-4">
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        Masukkan kode dari {channel} untuk{" "}
        <span className="font-semibold break-all text-foreground">
          {maskIdentity(challenge.role, challenge.identity)}
        </span>
        .
      </p>
      <FieldGroup className="gap-4">
        <Field data-invalid={!!error || expired}>
          <FieldLabel htmlFor="verification-code">Kode verifikasi</FieldLabel>
          <div data-vaul-no-drag className="flex justify-center">
            <InputOTP
              id="verification-code"
              aria-label="Kode verifikasi 4 digit"
              aria-invalid={!!error || expired}
              aria-describedby="verification-help verification-error"
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              autoComplete="one-time-code"
              inputMode="numeric"
              value={otp}
              onChange={(value) => {
                setOtp(value)
                setError("")
              }}
            >
              <InputOTPGroup>
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot key={index} index={index} className="size-14" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <FieldDescription id="verification-help">
            Untuk pratinjau, gunakan kode {PREVIEW_OTP}. Kode contoh berlaku 5
            menit.
          </FieldDescription>
          {(error || expired) && (
            <FieldError id="verification-error">
              {error || "Kode sudah kedaluwarsa. Silakan kirim ulang kode."}
            </FieldError>
          )}
        </Field>
        <Button type="submit" size="lg" disabled={otp.length !== 4 || expired}>
          Verifikasi
        </Button>
      </FieldGroup>
      <div className="flex flex-col items-center gap-1">
        <p role="status" className="text-center text-sm text-muted-foreground">
          {seconds > 0
            ? `Kirim ulang tersedia dalam ${seconds} detik`
            : "Belum menerima kode?"}
        </p>
        <Button
          type="button"
          variant="link"
          disabled={seconds > 0}
          onClick={resend}
        >
          Kirim ulang kode
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={expired}
          onClick={() => setSimulateExpired(true)}
        >
          Pratinjau kode kedaluwarsa
        </Button>
      </div>
    </form>
  )
}
