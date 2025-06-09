import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from '@vercel/speed-insights/next';





const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SpaceBar - Modern Typing Practice",
  description: "A beautiful, minimalist typing practice app with voice recognition and advanced features",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} style={{ colorScheme: "dark" }}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&f[]=satoshi@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
