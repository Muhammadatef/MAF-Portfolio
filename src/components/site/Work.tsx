'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Pause, Play, Star } from 'lucide-react'
import { architectures, projects } from '@/data/profile'
import ArchDiagram from './ArchDiagram'
import { Em, Reveal, SectionHeading, Spotlight, ease } from './ui'

const STEP_MS = 4600

const contextTone: Record<string, string> = {
  Production: 'border-accent/50 text-accent',
  'Open source': 'border-flow/50 text-flow',
  'Personal build': 'border-line text-muted',
}

export default function Work() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { margin: '-25% 0px -25% 0px' })
  const reduce = useReducedMotion()

  const arch = architectures[index]
  const running = playing && inView && !reduce

  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => setStep((s) => (s + 1) % arch.steps.length), STEP_MS)
    return () => clearTimeout(id)
  }, [running, step, arch])

  const select = (i: number) => {
    setIndex(i)
    setStep(0)
    setPlaying(true)
  }

  const featuredLinks = architectures.map((a) => a.link)
  const more = projects.filter((p) => featuredLinks.indexOf(p.link) === -1 && p.name !== 'MAF Bootcamp')

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Architectures, <Em>in motion.</Em>
            </>
          }
          intro="Pick a system and watch the data move through it. Each one plays its own flow, step by step."
        />

        <div ref={stageRef} className="space-y-5">
          {/* selector */}
          <Reveal>
            <div
              role="tablist"
              aria-label="Projects"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
            >
              {architectures.map((a, i) => {
                const on = i === index
                return (
                  <button
                    key={a.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => select(i)}
                    className={`group relative w-[230px] shrink-0 rounded-2xl border px-4 py-3.5 text-left transition sm:w-auto ${
                      on ? 'border-accent/60 bg-surface' : 'border-line/70 bg-transparent hover:border-line hover:bg-surface/60'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="work-marker"
                        className="absolute inset-x-4 top-0 h-[3px] rounded-full bg-accent"
                      />
                    )}
                    <span className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`rounded-full border px-1.5 py-px normal-case tracking-normal ${contextTone[a.context]}`}>
                        {a.context}
                      </span>
                    </span>
                    <span
                      className={`block font-display text-[15px] font-medium leading-snug ${
                        on ? 'text-bright' : 'text-body group-hover:text-bright'
                      }`}
                    >
                      {a.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* stage */}
          <Reveal delay={0.1}>
            <Spotlight className="p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={arch.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-2xl">
                      <div className="eyebrow mb-2">{arch.kind}</div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-bright sm:text-3xl">
                        {arch.name}
                      </h3>
                      <p className="mt-3 leading-relaxed text-body">{arch.pitch}</p>
                    </div>
                    {arch.link && (
                      <a
                        href={arch.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-bright transition hover:border-accent/60"
                      >
                        <Github size={14} /> Source <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>

                  <dl className="mt-6 grid grid-cols-3 gap-3">
                    {arch.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-line bg-raised/40 px-4 py-3">
                        <dd className="font-display text-xl font-semibold tracking-tight text-bright sm:text-2xl">
                          {m.value}
                        </dd>
                        <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                          {m.label}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  {/* diagram */}
                  <div className="thin-scrollbar relative mt-6 overflow-x-auto rounded-2xl border border-line bg-ink/60 p-3 sm:p-4">
                    <ArchDiagram arch={arch} step={step} />
                  </div>
                  <p className="mt-2 text-right font-mono text-[10px] text-muted md:hidden">swipe the diagram →</p>

                  {/* flow player */}
                  <div className="mt-5 grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
                    <button
                      onClick={() => setPlaying((p) => !p)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-bright transition hover:border-accent/60"
                      aria-label={playing ? 'Pause the flow' : 'Play the flow'}
                    >
                      {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                    </button>
                    <div>
                      <ol className="flex flex-wrap gap-2">
                        {arch.steps.map((s, i) => {
                          const on = i === step
                          return (
                            <li key={s.title}>
                              <button
                                onClick={() => {
                                  setStep(i)
                                  setPlaying(false)
                                }}
                                aria-current={on ? 'step' : undefined}
                                className={`relative overflow-hidden rounded-full border px-3.5 py-1.5 font-mono text-xs transition ${
                                  on ? 'border-accent/60 text-bright' : 'border-line text-muted hover:text-bright'
                                }`}
                              >
                                {on && running && (
                                  <motion.span
                                    key={`${arch.id}-${step}`}
                                    className="absolute inset-0 origin-left bg-accent/20"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                                  />
                                )}
                                {on && !running && <span className="absolute inset-0 bg-accent/20" />}
                                <span className="relative">
                                  {i + 1}. {s.title}
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ol>
                      <div className="mt-3 min-h-[3.5rem]" aria-live="polite">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={`${arch.id}-${step}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className="leading-relaxed text-bright"
                          >
                            {arch.steps[step].text}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {arch.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Spotlight>
          </Reveal>
        </div>

        {/* more builds */}
        <Reveal className="mb-6 mt-20 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-bright sm:text-3xl">
            More from the <Em>workshop</Em>
          </h3>
          <a
            href="https://github.com/Muhammadatef"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-sm text-muted transition hover:text-accent sm:inline-flex"
          >
            All repositories <ArrowUpRight size={14} />
          </a>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p, i) => (
            <Reveal key={p.name} delay={0.05 * (i % 3)}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
                <Spotlight className="flex h-full flex-col p-6 transition-colors group-hover:border-accent/50">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="eyebrow">{p.kind}</span>
                    {p.stars > 0 && (
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted">
                        <Star size={11} className="text-accent" /> {p.stars}
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-medium leading-snug text-bright">
                    {p.name}
                    <ArrowUpRight
                      size={16}
                      className="ml-1 inline -translate-y-0.5 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-1 group-hover:text-accent"
                    />
                  </h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </Spotlight>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
