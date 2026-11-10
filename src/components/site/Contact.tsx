'use client'

import { useState } from 'react'
import { ArrowUp, ArrowUpRight, BookOpen, Check, Copy, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { profile } from '@/data/profile'
import { Em, Reveal } from './ui'
import { openChat } from '../ai/ChatWidget'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const links = [
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: Github, label: 'GitHub', href: profile.github },
    { icon: BookOpen, label: 'Medium', href: profile.medium },
  ]

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line/70 pt-24 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]"
      />
      <div className="container-x relative">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted">07</span>
            <span className="h-px w-10 bg-accent/60" />
            <span className="eyebrow">Contact</span>
          </div>
          <h2 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-bright sm:text-7xl lg:text-8xl">
            Let&apos;s build something people can <Em>rely on.</Em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            Always happy to talk data platforms, streaming, ML infrastructure, football analytics or
            the bootcamp.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn-primary !px-6 !py-4 !text-base">
            <Mail size={18} /> {profile.email}
          </a>
          <button onClick={copy} className="btn-ghost !py-4" aria-label="Copy email address">
            {copied ? <Check size={16} className="text-flow" /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button onClick={() => openChat('contact')} className="btn-ghost !py-4">
            <Sparkles size={16} className="text-accent" /> Or ask my AI
          </button>
        </Reveal>

        <Reveal delay={0.16} className="mt-12 grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-line bg-surface/60 px-5 py-4 backdrop-blur transition hover:border-accent/60"
            >
              <span className="flex items-center gap-3 font-display text-lg text-bright">
                <l.icon size={18} className="text-accent" /> {l.label}
              </span>
              <ArrowUpRight
                size={18}
                className="text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </a>
          ))}
        </Reveal>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-line py-7 text-sm text-muted sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <span className="font-mono text-[11px]">Built with Next.js, Framer Motion and a lot of Airflow retries.</span>
          <a href="#top" className="inline-flex items-center gap-1.5 text-bright transition hover:text-accent">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
