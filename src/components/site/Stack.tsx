'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { skills } from '@/data/profile'
import { orbitRings } from './logos'
import { Em, PauseOffscreen, Reveal, SectionHeading } from './ui'

// radius as % of the stage, rotation period in seconds
const rings = [
  { radius: 21, duration: 36, reverse: false, size: 30 },
  { radius: 35, duration: 58, reverse: true, size: 26 },
  { radius: 48, duration: 84, reverse: false, size: 22 },
]

function Orbit() {
  // 24 logos are heavy markup; mount them only when the section is nearly on screen
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { once: true, margin: '500px' })
  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden>
      {near && <OrbitRings />}
    </div>
  )
}

function OrbitRings() {
  return (
    <PauseOffscreen className="absolute inset-0">
      {/* core */}
      <div className="absolute left-1/2 top-1/2 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/50 bg-surface shadow-[0_0_80px_rgb(var(--color-accent)/0.25)]">
        <span className="font-display text-xl font-semibold text-bright sm:text-2xl">
          MAF<span className="text-accent">.</span>
        </span>
      </div>

      {rings.map((ring, r) => {
        const items = orbitRings[r]
        const vars = { '--orbit-duration': `${ring.duration}s` } as React.CSSProperties
        return (
          <div key={r} className="absolute inset-0">
            {/* track */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line"
              style={{ width: `${ring.radius * 2}%`, height: `${ring.radius * 2}%` }}
            />
            {/* rotating layer */}
            <div className={`absolute inset-0 ${ring.reverse ? 'orbit-reverse' : 'orbit'}`} style={vars}>
              {items.map((l, i) => {
                const angle = (i / items.length) * Math.PI * 2
                const x = 50 + ring.radius * Math.cos(angle)
                const y = 50 + ring.radius * Math.sin(angle)
                return (
                  <div
                    key={l.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {/* counter-rotate so logos stay upright */}
                    <div className={ring.reverse ? 'orbit' : 'orbit-reverse'} style={vars}>
                      <div
                        title={l.name}
                        className="flex items-center justify-center rounded-2xl border border-line bg-surface p-2.5 shadow-lg shadow-black/20 sm:p-3"
                      >
                        <l.Icon
                          size={ring.size}
                          style={{ color: l.color }}
                          className={l.color ? '' : 'text-bright'}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </PauseOffscreen>
  )
}

export default function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Stack"
          title={
            <>
              Tools in <Em>orbit.</Em>
            </>
          }
          intro="Languages at the core, engines around them, the platform on the outside. Grouped the way I actually reach for them."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Orbit />
          </Reveal>

          <div className="space-y-6">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={0.04 * i} y={16}>
                <div className="grid gap-2 border-t border-line pt-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{s.group}</h3>
                  <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[15px] leading-relaxed text-bright">
                    {s.items.map((item, j) => (
                      <li key={item}>
                        {item}
                        {j < s.items.length - 1 && <span className="ml-2 text-line">/</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
