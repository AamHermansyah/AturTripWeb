'use client'

import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/logo"
import { BellIcon, CaretLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { usePathname, useRouter } from "next/navigation"

const MAIN_PATHS = ["/", "/explore", "/trips", "/saved", "/inbox", "/account"]

export function HomeHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const isMainScreen = MAIN_PATHS.includes(pathname)

  return (
    <div className="sticky top-0 bg-background flex items-center justify-between px-5 py-4 z-50">
      {isMainScreen ? (
        <>
          <Logo className="size-10 mb-0" />
          {pathname === "/explore" && (
            <Button variant="ghost" size="icon" className="rounded-full text-foreground" aria-label="Notifikasi">
              <BellIcon weight="regular" className="size-5" />
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Kembali"
            onClick={() => router.back()}
            className="hover:bg-transparent w-max px-0 pr-1"
          >
            <CaretLeftIcon weight="bold" className="size-4" />
          </Button>
          <Logo className="size-10 mb-0" />
        </>
      )}
    </div>
  )
}
