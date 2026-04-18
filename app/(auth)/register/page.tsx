"use client"

import { useState } from "react"
import Link from "next/link"
import {
  UserIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  LockSimpleIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Logo from "@/components/shared/logo"
import OauthButton from "@/components/shared/oauth-button"

export default function RegisterPage() {
  const [agreed, setAgreed] = useState(false)

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
        <div className="relative">
          <UserIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Nama Lengkap"
            className="h-12 pl-10 text-sm"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <EnvelopeSimpleIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Alamat Email"
            className="h-12 pl-10 text-sm"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <PhoneIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="Nomor Telepon"
            className="h-12 pl-10 text-sm"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <LockSimpleIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="password"
            placeholder="Kata Sandi"
            className="h-12 pl-10 text-sm"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <LockSimpleIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            className="h-12 pl-10 text-sm"
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5 mt-4 w-full"> {/* Tambahkan max-width di sini untuk testing */}
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
        <Button
          size="lg"
          className="mt-2 h-12 w-full text-base font-semibold"
          disabled={!agreed}
        >
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
