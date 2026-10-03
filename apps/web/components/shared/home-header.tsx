'use client'

import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/logo"
import { BellIcon, CaretLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { usePathname } from "next/navigation"
import Link from "next/link"

const MAIN_PATHS = ["/", "/explore", "/my-trips", "/saved", "/conversations", "/account"]

export function HomeHeader() {
  const pathname = usePathname()
  const parentPath = pathname.slice(0, pathname.lastIndexOf("/")) || "/explore"

  const isMainScreen = MAIN_PATHS.includes(pathname)

  return (
    <header className="sticky top-0 bg-background/90 backdrop-blur-md flex items-center justify-between px-5 py-2 z-50">
      {isMainScreen ? (
        <>
          <Logo className="size-10 mb-0" />
          {pathname === "/explore" && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifikasi"
              asChild
            >
              <Link href="/notifications">
                <BellIcon weight="regular" className="size-5" />
              </Link>
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Kembali"
            asChild
            className="hover:bg-transparent dark:hover:bg-transparent w-max px-0 pr-1"
          >
            <Link href={parentPath}><CaretLeftIcon weight="bold" className="size-4" /></Link>
          </Button>
          <Logo className="size-10 mb-0" />
        </>
      )}
    </header>
  )
}
