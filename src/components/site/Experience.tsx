'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { experience } from '@/data/profile'
import { Em, Reveal, SectionHeading } from './ui'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title={
            <>
              Six years, <Em>one direction.</Em>
            </>
          }
          intro="From spreadsheets in Mansoura to the data behind national statistics in Abu Dhabi."
        />

        <div ref={ref} className="relative">
          {/* the line that draws itself */}
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line md:left-[calc(11rem+7px)]" aria-hidden />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(11rem+7px)]"
            style={{ scaleY }}
          />

          <ol className="space-y-12 sm:space-y-16">
            {experience.map((e, i) => (
              <li key={e.company + e.period} className="relative grid gap-3 pl-9 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0">
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-ink md:left-[11rem]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {i === 0 && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />}
                </motion.span>

                <Reveal className="md:pr-8 md:text-right" y={12}>
                  <div className="font-mono text-xs text-accent">{e.period}</div>
                  <div className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-muted">
                    <MapPin size={10} /> {e.location}
                  </div>
                </Reveal>

                <Reveal className="md:pl-12" delay={0.08}>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-bright sm:text-3xl">
                    {e.company}
                  </h3>
                  <div className="mt-1 text-body">{e.role}</div>
                  <p className="mt-3 font-serif text-xl italic text-accent">{e.headline}</p>
                  <ul className="mt-4 max-w-3xl space-y-2.5">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-body">
                        <span className="mt-[10px] h-px w-3 shrink-0 bg-accent/70" />
                        <span>{h}.</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.stack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
