"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Logo from "@/components/shared/logo"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const RESEND_SECONDS = 59

export default function VerifyPage() {
  const router = useRouter()
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
          Verifikasi Akunmu
        </h1>
        <p className="text-sm text-muted-foreground">
          Kami telah mengirimkan kode 4-digit ke email dan nomor teleponmu.
        </p>
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
          onClick={() => router.push("/new-password")}
        >
          Konfirmasi
        </Button>
      </div>
    </div>
  )
}
