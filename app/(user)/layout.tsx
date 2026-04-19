import { BottomNavbar } from "./_components/bottom-navbar"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-dvh w-full overflow-y-auto">
      <div className="pb-22">
        {children}
      </div>
      <BottomNavbar />
    </div>
  )
}
