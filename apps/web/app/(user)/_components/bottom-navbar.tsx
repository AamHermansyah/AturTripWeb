"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DYNAMIC_PATTERN, NAV_ITEMS, VISIBLE_PATHS } from "@/lib/constants/user-navigation"

interface IProps {
  children: React.ReactNode
}

export function BottomNavbar({ children }: IProps) {
  const pathname = usePathname()

  const isVisible =
    VISIBLE_PATHS.has(pathname) && !DYNAMIC_PATTERN.test(pathname)

  return (
    <>
      <div className="min-h-full flex flex-col">
        {children}
        <div className={cn(isVisible ? "pb-30" : "pb-5")} />
      </div>
      {isVisible && (
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-sm -translate-x-1/2">
          <nav aria-label="Navigasi utama" className="flex items-center justify-center border-t border-border bg-card px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex min-h-12 flex-1 flex-col items-center gap-1 rounded-xl p-1 transition-[color,scale] duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-xl p-1.5 transition-all duration-200",
                      isActive ? "bg-primary/10" : "group-hover:bg-secondary"
                    )}
                  >
                    <Icon
                      size={22}
                      weight={isActive ? "fill" : "regular"}
                      className="transition-all duration-200"
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs leading-none",
                      isActive ? "font-bold" : "font-medium"
                    )}
                  >
                    {label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
