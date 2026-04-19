import { BellIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/logo"

export function ExploreHeader() {
  return (
    <div className="sticky top-0 bg-background flex items-center justify-between px-6 py-4 z-10">
      <Logo className="size-10 mb-0" />
      <Button variant="ghost" size="icon" className="rounded-full text-foreground" aria-label="Notifikasi">
        <BellIcon weight="regular" />
      </Button>
    </div>
  )
}
