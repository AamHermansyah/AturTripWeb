'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LockKeyIcon } from "@phosphor-icons/react"
import { PasswordInput } from "@/components/core/password-input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SecurityRow } from "./security-row"

export function ChangePasswordDrawer() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  function handleForgotPassword() {
    setOpen(false)
    router.push("/forgot-password")
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <SecurityRow
          icon={LockKeyIcon}
          label="Ubah Kata Sandi"
          value="Diubah 3 bln lalu"
        />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-extrabold">Ubah Kata Sandi</DrawerTitle>
          <DrawerDescription>
            Gunakan kombinasi huruf, angka, dan simbol agar akunmu lebih sulit ditebak.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-2">
          <div className="space-y-1.5">
            <Label>Kata sandi saat ini</Label>
            <PasswordInput placeholder="Masukkan kata sandi saat ini" />
          </div>

          <div className="space-y-1.5">
            <Label>Kata sandi baru</Label>
            <PasswordInput placeholder="Masukkan kata sandi baru" showStrength />
          </div>

          <div className="space-y-1.5">
            <Label>Konfirmasi kata sandi baru</Label>
            <PasswordInput placeholder="Ulangi kata sandi baru" />
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-fit text-xs font-semibold text-primary underline-offset-2 hover:underline"
          >
            Lupa kata sandi saat ini?
          </button>
        </div>

        <DrawerFooter className="flex-row gap-2">
          <DrawerClose asChild>
            <Button variant="outline" className="flex-1">
              Batal
            </Button>
          </DrawerClose>
          <Button className="flex-1" onClick={() => setOpen(false)}>
            Simpan
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
