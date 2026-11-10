'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { achievements } from '@/data/profile'
import { Counter, Em, Reveal, SectionHeading, Spotlight } from './ui'

function Stat({ stat }: { stat: string }) {
  const m = stat.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!m) return <>{stat}</>
  const decimals = m[1].includes('.') ? m[1].split('.')[1].length : 0
  return <Counter to={parseFloat(m[1])} decimals={decimals} suffix={m[2]} />
}

/** The 16h → 2h job, raced side by side. */
function Race() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduce = useReducedMotion()
  const go = inView || !!reduce

  const bars = [
    { label: 'Before', hours: 16, width: '100%', duration: 3.6, tone: 'bg-muted/50', text: 'text-muted' },
    { label: 'After', hours: 2, width: '12.5%', duration: 0.45, tone: 'bg-accent', text: 'text-accent' },
  ]

  return (
    <div ref={ref} className="space-y-5">
      {bars.map((b) => (
        <div key={b.label}>
          <div className="mb-2 flex items-baseline justify-between font-mono text-xs">
            <span className="uppercase tracking-[0.18em] text-muted">{b.label}</span>
            <span className={b.text}>
              {go ? <Counter to={b.hours} duration={b.duration} /> : 0} h
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-raised">
            <motion.div
              className={`relative h-full rounded-full ${b.tone}`}
              initial={{ width: 0 }}
              animate={go ? { width: b.width } : { width: 0 }}
              transition={{ duration: reduce ? 0 : b.duration, ease: 'linear', delay: 0.3 }}
            />
          </div>
        </div>
      ))}
      <p className="font-mono text-xs text-muted">
        Spark / Scala · tens of millions of customer records
      </p>
    </div>
  )
}

export default function Impact() {
  const [feature, ...rest] = achievements

  return (
    <section id="impact" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Impact"
          title={
            <>
              Numbers I can <Em>defend.</Em>
            </>
          }
          intro="Every figure here comes from a system that ran in production, with people depending on it the next morning."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Spotlight className="h-full p-7 sm:p-10">
              <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
                <div>
                  <div className="eyebrow mb-3">{feature.organization}</div>
                  <div className="font-display text-7xl font-semibold tracking-tight text-bright sm:text-8xl">
                    <Stat stat={feature.stat} />
                  </div>
                  <div className="mt-2 font-serif text-2xl italic text-accent">faster, overnight job</div>
                </div>
                <Race />
              </div>
              <p className="mt-8 max-w-2xl border-t border-line pt-6 leading-relaxed text-body">
                {feature.description}.
              </p>
            </Spotlight>
          </Reveal>

          {rest.map((a, i) => (
            <Reveal key={a.title} delay={0.06 * (i + 1)}>
              <Spotlight className="flex h-full flex-col p-7">
                <div className="mb-6 flex items-center justify-between">
                  <span className="eyebrow">{a.organization}</span>
                  <span className="font-mono text-[11px] text-muted">{a.year}</span>
                </div>
                <div className="font-display text-6xl font-semibold tracking-tight text-bright">
                  <Stat stat={a.stat} />
                </div>
                <h3 className="mt-3 font-display text-lg font-medium text-bright">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{a.description}.</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
