import {
  GoogleLogoIcon,
  AppleLogoIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

function OauthButton({ className }: IProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Divider */}
      <div className="mt-6 flex w-full items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">Atau lanjutkan dengan</span>
        <Separator className="flex-1" />
      </div>

      {/* Social login */}
      <div className="mt-4 flex w-full gap-3">
        <Button variant="outline" size="lg" className="flex-1 gap-2 font-medium">
          <GoogleLogoIcon className="h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" size="lg" className="flex-1 gap-2 font-medium">
          <AppleLogoIcon className="h-4 w-4" />
          Apple
        </Button>
      </div>
    </div>
  )
}

export default OauthButton