import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Dancing_Script, Bodoni_Moda } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-provider"
import { LoadingScreen } from "@/components/loading-screen"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
})

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
})

export const metadata: Metadata = {
  title: "Wanderlust - Your Travel Companion",
  description: "Plan your perfect trip with our all-in-one travel planning tool",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${dancingScript.variable} ${bodoniModa.variable} font-montserrat`}>
        <LoadingScreen />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
