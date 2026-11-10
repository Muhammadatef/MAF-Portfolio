'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

/** True on phones and other touch-first devices. False during SSR and the first render. */
export function useCoarse() {
  const [coarse, setCoarse] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(pointer: coarse), (max-width: 767px)')
    const on = () => setCoarse(m.matches)
    on()
    if (m.addEventListener) m.addEventListener('change', on)
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', on)
    }
  }, [])
  return coarse
}

/**
 * Pauses every CSS animation inside it while it is off-screen
 * (see [data-paused] in globals.css), so looping decorations cost nothing when unseen.
 */
export function PauseOffscreen({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      el.dataset.paused = e.isIntersecting ? 'false' : 'true'
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const coarse = useCoarse()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // On phones: show content the moment it enters, quickly, with no stagger.
      // A fast thumb-scroll should never land on blank space waiting to fade in.
      viewport={{ once: true, margin: coarse ? '0px 0px 120px 0px' : '-80px' }}
      transition={coarse ? { duration: 0.4, ease } : { duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Section heading: mono index, big display title, optional intro. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
}) {
  return (
    <Reveal className="mb-12 max-w-3xl sm:mb-16">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[11px] text-muted">{index}</span>
        <span className="h-px w-10 bg-accent/60" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-bright sm:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{intro}</p>}
    </Reveal>
  )
}

/** Serif-italic emphasis used inside headings. */
export function Em({ children }: { children: React.ReactNode }) {
  return <em className="font-serif font-normal italic text-accent">{children}</em>
}

/** Number that counts up when it enters the viewport. */
export function Counter({
  to,
  from = 0,
  decimals = 0,
  duration = 1.8,
  prefix = '',
  suffix = '',
  className,
}: {
  to: number
  from?: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, reduce, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/** Card whose glow follows the cursor (see .card in globals.css). */
export function Spotlight({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`card ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      {children}
    </div>
  )
}
