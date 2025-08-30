import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

export const metadata: Metadata = {
  title: '푸앙운세',
  description: 'Created with v0',
  generator: 'v0.app',
  viewport: 'width=device-width, initial-scale=1',
}

const cafe24Surround = localFont({
  src: '../fonts/Cafe24Ssurround-v2.0.woff2',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cafe24Surround.className}>{children}</body>
    </html>
  )
}
