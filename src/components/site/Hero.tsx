'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import { heroStats, profile } from '@/data/profile'
import DataStream from './DataStream'
import { Counter, ease } from './ui'
import { logos } from './logos'
import { openChat } from '../ai/ChatWidget'

const line1 = ['Data', 'a', 'nation']
const line2 = ['can']

const floating = [
  { key: 'spark', className: '-left-6 top-10', delay: 0 },
  { key: 'kafka', className: '-right-5 top-24', delay: 0.8 },
  { key: 'airflow', className: '-left-8 bottom-24', delay: 1.6 },
  { key: 'python', className: '-right-7 bottom-10', delay: 2.4 },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTitleIndex((i) => (i + 1) % profile.titles.length), 2800)
    return () => clearInterval(id)
  }, [])

  // the floating logo chips are a desktop flourish; phones never build them
  const [wide, setWide] = useState(false)
  useEffect(() => setWide(window.matchMedia('(min-width: 640px) and (pointer: fine)').matches), [])

  // portrait tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 16 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 140, damping: 16 })

  const word = (w: string, i: number, base: number) => (
    <span key={w + i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: base + i * 0.05, ease }}
      >
        {w}&nbsp;
      </motion.span>
    </span>
  )

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      <div className="backdrop-grid absolute inset-0" aria-hidden />
      <DataStream />
      <div
        aria-hidden
        className="glow-accent pointer-events-none absolute -top-56 left-1/2 h-[640px] w-[1000px] max-w-[160vw] -translate-x-1/2"
      />

      <div className="container-x relative grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
        {/* copy */}
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-surface/70 px-4 py-2 backdrop-blur"
          >
            <span className="eyebrow !tracking-[0.16em]">Senior Data Engineer</span>
            <span className="h-3 w-px bg-line" />
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted">
              <MapPin size={11} /> {profile.location}
            </span>
          </motion.div>

          <h1 className="font-display text-[15vw] font-semibold leading-[0.95] tracking-[-0.035em] text-bright sm:text-7xl lg:text-[5.6rem]">
            <span className="block">{line1.map((w, i) => word(w, i, 0))}</span>
            <span className="block">
              {line2.map((w, i) => word(w, i, 0.15))}
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.em
                  className="inline-block pr-2 font-serif font-normal italic text-accent"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                >
                  trust.
                </motion.em>
              </span>
            </span>
          </h1>

          {/* no fade-in here: this paragraph is the largest text on a phone screen, and it
              should be readable from the very first paint */}
          <motion.p
            initial={false}
            className="mt-7 max-w-xl text-lg leading-relaxed text-body"
          >
            I&apos;m <span className="font-semibold text-bright">{profile.name}</span> — Fahmi. I own
            the 95+ pipelines behind Abu Dhabi&apos;s Consumer Price Index, and I build the streaming,
            ML and agent infrastructure around them.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 flex h-7 items-center gap-2 font-mono text-sm text-muted"
          >
            <span className="text-flow">▸</span>
            <span className="relative h-7 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0 flex items-center text-bright"
                >
                  {profile.titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#work" className="btn-primary">
              See the architectures <ArrowDown size={16} />
            </a>
            <button onClick={() => openChat()} className="btn-ghost">
              <Sparkles size={16} className="text-accent" /> Ask my AI
            </button>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Résumé <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* portrait */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px]"
          style={{ perspective: 1000 }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            mx.set((e.clientX - r.left) / r.width - 0.5)
            my.set((e.clientY - r.top) / r.height - 0.5)
          }}
          onMouseLeave={() => {
            mx.set(0)
            my.set(0)
          }}
        >
          <div
            aria-hidden
            className="glow-accent absolute -inset-10"
            style={{ '--glow': 0.3 } as React.CSSProperties}
          />
          <motion.div
            style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-accent/40 bg-surface p-2 shadow-2xl shadow-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.webp"
                srcSet="/avatar-480.webp 480w, /avatar.webp 720w"
                sizes="(max-width: 640px) 300px, 360px"
                decoding="async"
                alt="Pixel-art portrait of Mohamed Atef Fahmy surrounded by his interests: data pipelines, piano, anime, meditation, books and the gym"
                width={720}
                height={720}
                className="aspect-square w-full rounded-[1.6rem] object-cover"
              />
              <div className="flex items-center justify-between px-3 pb-1.5 pt-3">
                <span className="font-mono text-[11px] text-muted">fahmi@abu-dhabi</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-flow">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flow" />
                  6+ yrs in production
                </span>
              </div>
            </div>

            {wide && floating.map((f) => {
              const l = logos[f.key]
              return (
                <div
                  key={f.key}
                  className={`absolute ${f.className} animate-floaty`}
                  style={{ animationDelay: `${f.delay}s`, transform: 'translateZ(60px)' }}
                >
                  <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-3 py-2 shadow-xl shadow-black/30 backdrop-blur">
                    <l.Icon size={18} style={{ color: l.color }} className={l.color ? '' : 'text-bright'} />
                    <span className="font-mono text-[11px] text-bright">{l.name}</span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* stat strip */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
        className="relative border-t border-line/70 bg-ink/40 backdrop-blur"
      >
        <dl className="container-x grid grid-cols-2 gap-y-6 py-7 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="sm:border-l sm:border-line/60 sm:pl-6 sm:first:border-0 sm:first:pl-0">
              <dd className="font-display text-4xl font-semibold tracking-tight text-bright sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
