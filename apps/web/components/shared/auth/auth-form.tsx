"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EnvelopeSimpleIcon, PhoneIcon, UserIcon } from "@phosphor-icons/react"
import { PasswordInput } from "@/components/core/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  createPreviewChallenge,
  normalizeIdentity,
  type AuthRole,
} from "@/lib/auth-preview"
import { AuthFrame } from "./auth-frame"
import { useAuthPreview } from "./auth-preview-provider"

type FormMode = "login" | "register" | "forgot"
const COPY = {
  login: {
    title: "Selamat datang kembali",
    description: "Masuk dan lanjutkan perjalananmu.",
    action: "Masuk",
  },
  register: {
    title: "Bergabung dengan AturTrip",
    description:
      "Temukan perjalananmu atau bagikan pengalaman sebagai pemandu.",
    action: "Buat akun",
  },
  forgot: {
    title: "Lupa kata sandi?",
    description: "Verifikasi identitasmu untuk membuat kata sandi baru.",
    action: "Kirim kode verifikasi",
  },
}

export function AuthForm({
  mode,
  initialRole,
  notice,
}: {
  mode: FormMode
  initialRole: AuthRole
  notice?: string
}) {
  const router = useRouter()
  const { setChallenge } = useAuthPreview()
  const [role, setRole] = useState(initialRole)
  const [identity, setIdentity] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [complete, setComplete] = useState(false)
  const isGuide = role === "guide"
  const copy = COPY[mode]

  function changeRole(value: string) {
    setRole(value === "guide" ? "guide" : "traveler")
    setIdentity("")
    setPassword("")
    setConfirm("")
    setErrors({})
    setComplete(false)
    setChallenge(null)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = normalizeIdentity(role, identity)
    const nextErrors: Record<string, string> = {}
    if (!normalized)
      nextErrors.identity = isGuide
        ? "Masukkan alamat email yang valid."
        : "Masukkan nomor HP Indonesia yang valid, misalnya 081234567890."
    if (mode === "register" && !name.trim())
      nextErrors.name = "Masukkan nama lengkapmu."
    if (mode !== "forgot" && !password)
      nextErrors.password = "Masukkan kata sandimu."
    if (mode === "register") {
      if (password.length < 8)
        nextErrors.password = "Gunakan sedikitnya 8 karakter."
      if (!confirm || password !== confirm)
        nextErrors.confirm = "Konfirmasi kata sandi belum cocok."
      if (!agreed)
        nextErrors.agreed = "Persetujuan diperlukan untuk melanjutkan."
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length || !normalized) return
    setPassword("")
    setConfirm("")
    if (mode === "login") {
      setChallenge(null)
      setComplete(true)
      return
    }
    const flow = mode === "register" ? "register" : "reset"
    setChallenge(createPreviewChallenge(role, normalized, flow))
    router.push(`/verify?flow=${flow}&role=${role}`)
  }

  return (
    <AuthFrame title={copy.title} description={copy.description}>
      {notice && (
        <Alert variant="success">
          <AlertTitle>{notice}</AlertTitle>
          <AlertDescription>
            Silakan masuk untuk melanjutkan pratinjau.
          </AlertDescription>
        </Alert>
      )}
      <Tabs value={role} onValueChange={changeRole}>
        <TabsList className="w-full" aria-label="Jenis akun">
          <TabsTrigger value="traveler">Wisatawan</TabsTrigger>
          <TabsTrigger value="guide">Pemandu</TabsTrigger>
        </TabsList>
        <TabsContent value={role} className="mt-4">
          {complete ? (
            <div className="flex flex-col gap-4">
              <Alert variant="success">
                <AlertTitle>
                  Pratinjau masuk {isGuide ? "pemandu" : "wisatawan"} berhasil
                </AlertTitle>
                <AlertDescription>
                  Login rutin cukup dengan {isGuide ? "email" : "nomor HP"} dan
                  kata sandi. Tidak ada OTP pada langkah ini. Sesi nyata belum
                  tersedia.
                </AlertDescription>
              </Alert>
              <Button asChild size="lg">
                <Link href={isGuide ? "/guide-mode" : "/explore"}>
                  Lanjutkan pratinjau
                </Link>
              </Button>
              <Button variant="outline" onClick={() => setComplete(false)}>
                Kembali ke form masuk
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <FieldGroup className="gap-4">
                {mode === "register" && (
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="auth-name">Nama lengkap</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <UserIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="auth-name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama lengkapmu"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "auth-name-error" : undefined
                        }
                      />
                    </InputGroup>
                    {errors.name && (
                      <FieldError id="auth-name-error">
                        {errors.name}
                      </FieldError>
                    )}
                  </Field>
                )}
                <Field data-invalid={!!errors.identity}>
                  <FieldLabel htmlFor="auth-identity">
                    {isGuide ? "Alamat email" : "Nomor HP"}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      {isGuide ? <EnvelopeSimpleIcon /> : <PhoneIcon />}
                    </InputGroupAddon>
                    <InputGroupInput
                      id="auth-identity"
                      name={isGuide ? "email" : "phone"}
                      type={isGuide ? "email" : "tel"}
                      inputMode={isGuide ? "email" : "tel"}
                      autoComplete={isGuide ? "email" : "tel"}
                      placeholder={
                        isGuide ? "nama@email.com" : "0812 3456 7890"
                      }
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                      aria-invalid={!!errors.identity}
                      aria-describedby="auth-identity-help auth-identity-error"
                    />
                  </InputGroup>
                  <FieldDescription id="auth-identity-help">
                    {mode === "login"
                      ? isGuide
                        ? "Gunakan email akun pemandumu."
                        : "Gunakan nomor HP akun wisatawanmu."
                      : `Kode verifikasi diterima melalui ${isGuide ? "email" : "WhatsApp. Pastikan nomor ini aktif di WhatsApp"}.`}
                  </FieldDescription>
                  {errors.identity && (
                    <FieldError id="auth-identity-error">
                      {errors.identity}
                    </FieldError>
                  )}
                </Field>
                {mode !== "forgot" && (
                  <Field data-invalid={!!errors.password}>
                    <FieldLabel htmlFor="auth-password">Kata sandi</FieldLabel>
                    <PasswordInput
                      id="auth-password"
                      name="password"
                      autoComplete={
                        mode === "register"
                          ? "new-password"
                          : "current-password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      showStrength={mode === "register"}
                      aria-invalid={!!errors.password}
                      aria-describedby={
                        errors.password ? "auth-password-error" : undefined
                      }
                    />
                    {errors.password && (
                      <FieldError id="auth-password-error">
                        {errors.password}
                      </FieldError>
                    )}
                  </Field>
                )}
                {mode === "register" && (
                  <>
                    <Field data-invalid={!!errors.confirm}>
                      <FieldLabel htmlFor="auth-confirm">
                        Konfirmasi kata sandi
                      </FieldLabel>
                      <PasswordInput
                        id="auth-confirm"
                        name="confirm"
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        aria-invalid={!!errors.confirm}
                        aria-describedby={
                          errors.confirm ? "auth-confirm-error" : undefined
                        }
                      />
                      {errors.confirm && (
                        <FieldError id="auth-confirm-error">
                          {errors.confirm}
                        </FieldError>
                      )}
                    </Field>
                    <Field data-invalid={!!errors.agreed}>
                      <Field orientation="horizontal">
                        <Checkbox
                          id="auth-terms"
                          checked={agreed}
                          onCheckedChange={(v) => setAgreed(v === true)}
                          aria-invalid={!!errors.agreed}
                          aria-describedby="auth-terms-help"
                        />
                        <FieldLabel htmlFor="auth-terms">
                          Saya setuju dengan syarat layanan dan kebijakan
                          privasi.
                        </FieldLabel>
                      </Field>
                      <FieldDescription id="auth-terms-help">
                        Persetujuan contoh untuk meninjau alur pendaftaran.
                      </FieldDescription>
                      {errors.agreed && (
                        <FieldError>{errors.agreed}</FieldError>
                      )}
                    </Field>
                  </>
                )}
                {mode === "login" && (
                  <Link
                    href={`/forgot-password?role=${role}`}
                    className="self-end text-sm font-medium text-primary hover:underline"
                  >
                    Lupa kata sandi?
                  </Link>
                )}
                <Button type="submit" size="lg">
                  {copy.action}
                </Button>
              </FieldGroup>
            </form>
          )}
        </TabsContent>
      </Tabs>
      <p className="text-center text-sm text-muted-foreground">
        {mode === "login"
          ? "Belum punya akun? "
          : mode === "register"
            ? "Sudah punya akun? "
            : "Ingat kata sandimu? "}
        <Link
          href={`${mode === "login" ? "/register" : "/login"}?role=${role}`}
          className="font-semibold text-primary hover:underline"
        >
          {mode === "login" ? "Daftar" : "Masuk"}
        </Link>
      </p>
    </AuthFrame>
  )
}
