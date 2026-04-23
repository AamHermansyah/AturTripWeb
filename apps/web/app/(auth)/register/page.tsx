"use client"

import { useState } from "react"
import Link from "next/link"
import { UserIcon, EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { PasswordInput } from "@/components/core/password-input"
import Logo from "@/components/shared/logo"
import OauthButton from "@/components/shared/oauth-button"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false)
  const router = useRouter()

  return (
    <div className="flex min-h-dvh flex-col items-center justify-start bg-background px-6 py-10">
      <Logo />

      <h1 className="font-heading text-center text-2xl font-extrabold text-foreground">
        Bergabung dengan Atur<span className="text-primary">Trip</span>
      </h1>
      <p className="mt-1.5 text-center text-sm text-muted-foreground">
        Mulai petualangan terbaik bersama pemandu lokal.
      </p>

      {/* Form */}
      <div className="mt-8 flex w-full flex-col gap-3">
        {/* Full Name */}
        <InputGroup>
          <InputGroupAddon>
            <UserIcon />
          </InputGroupAddon>
          <InputGroupInput type="text" placeholder="Nama Lengkap" />
        </InputGroup>

        {/* Email */}
        <InputGroup>
          <InputGroupAddon>
            <EnvelopeSimpleIcon />
          </InputGroupAddon>
          <InputGroupInput type="email" placeholder="Alamat Email" />
        </InputGroup>

        {/* Phone */}
        <InputGroup>
          <InputGroupAddon>
            <PhoneIcon />
          </InputGroupAddon>
          <InputGroupInput type="tel" placeholder="Nomor Telepon" />
        </InputGroup>

        {/* Password */}
        <PasswordInput placeholder="Kata Sandi" showStrength />

        {/* Confirm Password */}
        <PasswordInput placeholder="Konfirmasi Kata Sandi" />

        {/* Terms */}
        <div className="flex items-start gap-2.5 mt-4 w-full">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(!!v)}
          />
          <Label
            htmlFor="terms"
            className="text-sm leading-tight text-muted-foreground cursor-pointer"
          >
            <span>
              Saya setuju dengan{" "}
              <Link href="#" className="text-primary underline-offset-2 hover:underline">
                Syarat Layanan
              </Link>{" "}
              &amp;{" "}
              <Link href="#" className="text-primary underline-offset-2 hover:underline">
                Kebijakan Privasi
              </Link>
            </span>
          </Label>
        </div>

        {/* CTA */}
        <Button size="lg" disabled={!agreed} onClick={() => router.push('/login')}>
          Buat Akun
        </Button>
      </div>

      <OauthButton />

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-primary underline-offset-2 hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  )
}
