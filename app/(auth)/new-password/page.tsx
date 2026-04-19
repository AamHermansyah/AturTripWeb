"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/core/password-input"
import Logo from "@/components/shared/logo"

export default function NewPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const isMatch = password === confirm && password.length > 0

  return (
    <div className="flex min-h-dvh flex-col items-center justify-start bg-background px-6 py-10">
      <Logo />

      <div className="mt-6 flex w-full flex-col gap-2">
        <h1 className="font-heading text-2xl font-extrabold text-foreground">
          Buat Password Baru
        </h1>
        <p className="text-sm text-muted-foreground">
          Password barumu harus berbeda dari password yang pernah digunakan sebelumnya.
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 flex w-full flex-col gap-3">
        <PasswordInput
          placeholder="Password Baru"
          showStrength
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          placeholder="Konfirmasi Password Baru"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {confirm.length > 0 && !isMatch && (
          <p className="text-xs text-destructive">
            Password tidak cocok.
          </p>
        )}

        <Button
          size="lg"
          className="mt-2 w-full font-semibold"
          disabled={!isMatch}
          onClick={() => router.push("/login")}
        >
          Simpan Password
        </Button>
      </div>
    </div>
  )
}
