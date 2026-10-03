"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PasswordInput } from "@/components/core/password-input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { canResetPreviewPassword, type AuthRole } from "@/lib/auth-preview"
import { AuthFrame } from "./auth-frame"
import { useAuthPreview } from "./auth-preview-provider"

export function NewPasswordForm({ role }: { role: AuthRole }) {
  const router = useRouter()
  const { challenge, setChallenge } = useAuthPreview()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [now, setNow] = useState<number | undefined>(undefined)
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])
  const ready =
    challenge?.role === role && canResetPreviewPassword(challenge, now)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canResetPreviewPassword(challenge) || challenge?.role !== role) {
      setNow(Date.now())
      return
    }
    const nextErrors: Record<string, string> = {}
    if (password.length < 8)
      nextErrors.password = "Gunakan sedikitnya 8 karakter."
    if (!confirm || password !== confirm)
      nextErrors.confirm = "Konfirmasi kata sandi belum cocok."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setPassword("")
    setConfirm("")
    setChallenge(null)
    router.replace(`/login?role=${role}&notice=reset`)
  }

  return (
    <AuthFrame
      title="Buat kata sandi baru"
      description="Pilih kata sandi yang kuat dan mudah kamu ingat."
    >
      {ready ? (
        <form noValidate onSubmit={submit}>
          <FieldGroup className="gap-4">
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="new-password">Kata sandi baru</FieldLabel>
              <PasswordInput
                id="new-password"
                name="password"
                autoComplete="new-password"
                showStrength
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "new-password-error" : undefined
                }
              />
              {errors.password && (
                <FieldError id="new-password-error">
                  {errors.password}
                </FieldError>
              )}
            </Field>
            <Field data-invalid={!!errors.confirm}>
              <FieldLabel htmlFor="new-password-confirm">
                Konfirmasi kata sandi baru
              </FieldLabel>
              <PasswordInput
                id="new-password-confirm"
                name="confirm"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-invalid={!!errors.confirm}
                aria-describedby={
                  errors.confirm ? "new-confirm-error" : undefined
                }
              />
              {errors.confirm && (
                <FieldError id="new-confirm-error">{errors.confirm}</FieldError>
              )}
            </Field>
            <Button type="submit" size="lg">
              Simpan kata sandi
            </Button>
            <Button asChild variant="outline">
              <Link
                href={`/login?role=${role}`}
                onClick={() => setChallenge(null)}
              >
                Batal
              </Link>
            </Button>
          </FieldGroup>
        </form>
      ) : (
        <>
          <Alert>
            <AlertTitle>Verifikasi diperlukan</AlertTitle>
            <AlertDescription>
              Verifikasi identitasmu terlebih dahulu atau ulangi pemulihan jika
              kode contoh sudah kedaluwarsa.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link href={`/forgot-password?role=${role}`}>
              Ulangi pemulihan sandi
            </Link>
          </Button>
        </>
      )}
    </AuthFrame>
  )
}
