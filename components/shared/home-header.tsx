'use client'

import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/logo"
import { BellIcon } from "@phosphor-icons/react"
import { usePathname } from "next/navigation"

export function HomeHeader() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 bg-background flex items-center justify-between px-6 py-4 z-10">
      <Logo className="size-10 mb-0" />
      {pathname === "/explore" && (
        <Button variant="ghost" size="icon" className="rounded-full text-foreground" aria-label="Notifikasi">
          <BellIcon weight="regular" />
        </Button>
      )}
    </div>
  )
}
