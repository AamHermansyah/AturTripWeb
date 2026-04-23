"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { EnvelopeSimpleIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import Logo from "@/components/shared/logo"

export default function ForgotPasswordPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-dvh flex-col items-center justify-start bg-background px-6 py-10">
      <Logo />

      <div className="mt-6 flex w-full flex-col gap-2">
        <h1 className="font-heading text-2xl font-extrabold text-foreground">
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Masukkan email atau nomor teleponmu dan kami akan mengirimkan kode untuk mereset kata sandimu.
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 flex w-full flex-col gap-4">
        <InputGroup>
          <InputGroupAddon>
            <EnvelopeSimpleIcon />
          </InputGroupAddon>
          <InputGroupInput
            type="text"
            placeholder="Email atau Nomor Telepon"
          />
        </InputGroup>

        <Button
          size="lg"
          className="w-full font-semibold"
          onClick={() => router.push("/verify")}
        >
          Kirim Kode Reset
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Ingat kata sandimu?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          Masuk
        </Link>
      </p>
    </div>
  )
}
