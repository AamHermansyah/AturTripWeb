import { ScrollArea } from "@/components/ui/scroll-area"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ScrollArea className="h-dvh">
      {children}
    </ScrollArea>
  )
}
