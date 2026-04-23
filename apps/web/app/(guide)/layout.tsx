import { ScrollArea } from "@/components/ui/scroll-area"

export default function GuideLayout({
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
