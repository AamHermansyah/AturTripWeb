"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DYNAMIC_PATTERN, NAV_ITEMS, VISIBLE_PATHS } from "@/lib/constants/user-navigation"

export function BottomNavbar() {
  const pathname = usePathname()

  const isVisible =
    VISIBLE_PATHS.has(pathname) && !DYNAMIC_PATTERN.test(pathname)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-xs -translate-x-1/2 px-4 pb-5">
      <nav className="flex items-center justify-center rounded-4xl border border-border bg-background/90 px-2 py-2 shadow-lg shadow-black/10 backdrop-blur-md">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex flex-1 flex-col items-center gap-1 rounded-xl p-1 transition-all duration-200",
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
                  "text-[11px] font-semibold leading-none",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
