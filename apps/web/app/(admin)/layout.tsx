import { ScrollArea } from "@/components/ui/scroll-area"

export default function AdminLayout({
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
