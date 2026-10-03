"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  createPreviewChallenge,
  type AuthRole,
  type VerificationFlow,
} from "@/lib/auth-preview"
import { AuthFrame } from "./auth-frame"
import { useAuthPreview } from "./auth-preview-provider"
import { OtpVerification } from "./otp-verification"

export function VerificationScreen({
  role,
  flow,
}: {
  role: AuthRole
  flow: VerificationFlow
}) {
  const router = useRouter()
  const { challenge, setChallenge } = useAuthPreview()
  const returnPath = `${flow === "register" ? "/register" : "/forgot-password"}?role=${role}`
  const ready =
    challenge &&
    challenge.role === role &&
    challenge.flow === flow &&
    !challenge.verified

  return (
    <AuthFrame
      title={
        flow === "register" ? "Verifikasi akunmu" : "Verifikasi pemulihan sandi"
      }
      description={`Verifikasi melalui ${role === "guide" ? "email" : "WhatsApp"} menjaga akses akunmu.`}
    >
      {ready ? (
        <>
          <OtpVerification
            challenge={challenge}
            onResend={() =>
              setChallenge(
                createPreviewChallenge(role, challenge.identity, flow)
              )
            }
            onVerified={() => {
              if (flow === "reset") {
                setChallenge({ ...challenge, verified: true })
                router.replace(`/new-password?role=${role}`)
              } else {
                setChallenge(null)
                router.replace(`/login?role=${role}&notice=verified`)
              }
            }}
          />
          <Button asChild variant="outline">
            <Link href={returnPath} onClick={() => setChallenge(null)}>
              Ubah {role === "guide" ? "email" : "nomor HP"}
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Alert>
            <AlertTitle>Mulai verifikasi dari form</AlertTitle>
            <AlertDescription>
              Isi identitasmu terlebih dahulu. Jika halaman dimuat ulang, alur
              contoh perlu dimulai lagi.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link href={returnPath}>
              Kembali ke{" "}
              {flow === "register" ? "pendaftaran" : "pemulihan sandi"}
            </Link>
          </Button>
        </>
      )}
    </AuthFrame>
  )
}
