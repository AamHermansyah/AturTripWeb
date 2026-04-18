import { Nunito_Sans, Urbanist } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SplashScreen } from "@/components/splash-screen"
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const dmSans = Urbanist({ subsets: ['latin'], variable: '--font-heading' })

const sourceSans3 = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: 'AturTrip | Pandu kearah yang tepat!'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        sourceSans3.variable,
        "font-sans",
        dmSans.variable,
      )}
    >
      <body className="bg-muted">
        <ThemeProvider>
          <SplashScreen />
          <div className="max-w-sm mx-auto bg-background h-dvh overflow-y-hidden">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
