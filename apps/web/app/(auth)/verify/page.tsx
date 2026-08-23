"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"
import Logo from "@/components/shared/logo"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const RESEND_SECONDS = 59

/** Halaman ini dipakai dua alur: pendaftaran akun baru dan reset kata sandi. */
const FLOW_COPY = {
  register: {
    title: "Verifikasi Emailmu",
    description:
      "Kami telah mengirimkan kode 4-digit ke alamat emailmu. Masukkan kode tersebut untuk mengaktifkan akun.",
    next: "/login",
  },
  reset: {
    title: "Verifikasi Akunmu",
    description: "Kami telah mengirimkan kode 4-digit ke email dan nomor teleponmu.",
    next: "/new-password",
  },
} as const

type Flow = keyof typeof FLOW_COPY

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const flow: Flow = searchParams.get("flow") === "register" ? "register" : "reset"
  const copy = FLOW_COPY[flow]

  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((v) => v - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const handleResend = () => {
    setCountdown(RESEND_SECONDS)
    setOtp("")
  }

  const formatted = `00:${String(countdown).padStart(2, "0")}`

  return (
    <div className="flex min-h-dvh flex-col items-center justify-start bg-background px-6 py-10">
      <Logo />

      <div className="mt-6 flex w-full flex-col gap-2">
        <h1 className="font-heading text-2xl font-extrabold text-foreground">
          {copy.title}
        </h1>
        <p className="text-sm text-muted-foreground">{copy.description}</p>
      </div>

      {/* OTP Input */}
      <div className="mt-8 flex w-full flex-col items-center gap-6">
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

        {/* Resend */}
        <div className="flex flex-col items-center gap-1">
          {countdown > 0 ? (
            <p className="text-sm text-muted-foreground">
              Kirim ulang kode dalam{" "}
              <span className="font-semibold text-primary">{formatted}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Tidak menerima kode?</p>
          )}
          <button
            onClick={handleResend}
            disabled={countdown > 0}
            className="text-sm font-semibold text-muted-foreground transition-colors disabled:pointer-events-none disabled:opacity-40 enabled:text-primary enabled:hover:underline"
          >
            Kirim Ulang Kode
          </button>
        </div>

        <Button
          size="lg"
          className="w-full font-semibold"
          disabled={otp.length < 4}
          onClick={() => router.push(copy.next)}
        >
          Konfirmasi
        </Button>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  // useSearchParams butuh batas Suspense agar halaman tetap bisa di-prerender.
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh w-full animate-pulse flex-col items-center justify-center">
          <Spinner className="size-8 text-primary" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  )
}
