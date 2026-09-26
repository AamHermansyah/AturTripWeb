import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SplashScreen } from "@/components/splash-screen"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "AturTrip | Pandu ke arah yang tepat!",
  description:
    "Temukan trip dan pemandu lokal terpercaya, pesan slot, lalu atur perjalananmu dalam satu aplikasi.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#15120f" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        plusJakartaSans.variable,
        "font-sans",
      )}
    >
      <body className="bg-secondary">
        <ThemeProvider>
          <SplashScreen />
          <div className="max-w-sm mx-auto bg-background h-dvh overflow-y-hidden">
            {children}
          </div>
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
