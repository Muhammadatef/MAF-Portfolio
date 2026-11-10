import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mohamed Atef Fahmy — Senior Data Engineer',
  description:
    'Senior Data Engineer in Abu Dhabi. 95+ production pipelines behind a national price index, real-time systems on Kafka and Spark, ML and agent infrastructure. Explore animated architectures or ask my AI.',
  keywords:
    'Senior Data Engineer, Abu Dhabi, Spark, Kafka, Airflow, Databricks, Scala, Python, MLflow, LangGraph, DSPy, Data Engineering Bootcamp, MAF',
  authors: [{ name: 'Mohamed Atef Fahmy' }],
  openGraph: {
    title: 'Mohamed Atef Fahmy — Senior Data Engineer',
    description:
      'Data a nation can trust. Animated architectures, real numbers, and an AI version of me you can question.',
    siteName: 'MAF — Portfolio',
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080d1a',
}

// Apply the saved theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
