import { Nunito_Sans, Lora } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SplashScreen } from "@/components/splash-screen"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";

const lora = Lora({ subsets: ['latin'], variable: '--font-heading' })

const nunitoSans = Nunito_Sans({
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
        nunitoSans.variable,
        "font-sans",
        lora.variable,
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
