import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mohamed Atef Fahmy — AI Portfolio',
  description:
    'Interactive AI portfolio of Mohamed Atef Fahmy (Fahmi), Senior Data Engineer in Abu Dhabi. Ask about his projects, experience, skills, and his 4-month Data Engineering bootcamp.',
  keywords:
    'Data Engineering, AI Portfolio, Abu Dhabi, Spark, Airflow, Kafka, Databricks, Python, Bootcamp, MAF',
  authors: [{ name: 'Mohamed Atef Fahmy' }],
  openGraph: {
    title: 'Mohamed Atef Fahmy — AI Portfolio',
    description:
      'Ask my AI anything about my work, projects, and the MAF Data Engineering Bootcamp in Abu Dhabi.',
    siteName: 'MAF — AI Portfolio',
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
