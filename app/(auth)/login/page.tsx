"use client"

import Link from "next/link"
import {
  EnvelopeSimpleIcon,
  LockSimpleIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import Logo from "@/components/shared/logo"
import OauthButton from "@/components/shared/oauth-button"

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-start bg-background px-6 py-10">
      <Logo />

      <h1 className="font-heading text-center text-2xl font-extrabold text-foreground">
        Selamat Datang Kembali
      </h1>
      <p className="mt-1.5 text-center text-sm text-muted-foreground">
        Masuk untuk melanjutkan petualanganmu.
      </p>

      {/* Form */}
      <div className="mt-8 flex w-full flex-col gap-3">
        {/* Email */}
        <InputGroup>
          <InputGroupAddon>
            <EnvelopeSimpleIcon />
          </InputGroupAddon>
          <InputGroupInput type="email" placeholder="Alamat Email" />
        </InputGroup>

        {/* Password */}
        <InputGroup>
          <InputGroupAddon>
            <LockSimpleIcon />
          </InputGroupAddon>
          <InputGroupInput type="password" placeholder="Kata Sandi" />
        </InputGroup>

        {/* Forgot password */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary underline-offset-2 hover:underline"
          >
            Lupa kata sandi?
          </Link>
        </div>

        {/* CTA */}
        <Button size="lg" className="w-full font-semibold">
          Masuk
        </Button>
      </div>

      <OauthButton />

      {/* Register link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-primary underline-offset-2 hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  )
}
