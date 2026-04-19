import { HomeHeader } from "@/components/shared/home-header"
import { BottomNavbar } from "./_components/bottom-navbar"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-dvh w-full overflow-y-auto">
      <div className="h-full">
        <HomeHeader />
        {children}
        <div className="pb-30" />
      </div>
      <BottomNavbar />
    </div>
  )
}
