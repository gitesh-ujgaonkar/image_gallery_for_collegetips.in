import type React from "react"
import type { Metadata } from "next/types"
import { Inter, Fredoka, Comic_Neue } from "next/font/google"
import "./globals.css"

// Initialize the fonts
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
})

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic",
  weight: ["300", "400", "700"],
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CollegeTips Gallery",
  description: "A vibrant gallery showcasing CollegeTips moments",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${fredoka.variable} ${comicNeue.variable}`}>{children}</body>
    </html>
  )
}
