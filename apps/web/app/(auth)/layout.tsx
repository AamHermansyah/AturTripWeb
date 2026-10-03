import { ScrollArea } from "@/components/ui/scroll-area"
import { AuthPreviewProvider } from "@/components/shared/auth/auth-preview-provider"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ScrollArea className="h-dvh">
      <AuthPreviewProvider>{children}</AuthPreviewProvider>
    </ScrollArea>
  )
}
