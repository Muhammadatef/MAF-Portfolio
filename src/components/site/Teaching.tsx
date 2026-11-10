'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, GraduationCap, Star } from 'lucide-react'
import { articles, bootcamp, certifications, education, profile } from '@/data/profile'
import { Em, Reveal, SectionHeading, Spotlight } from './ui'

function Curriculum() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const show = inView || !!reduce
  return (
    <ol ref={ref} className="flex flex-wrap items-center gap-y-3">
      {bootcamp.curriculum.map((c, i) => (
        <li key={c} className="flex items-center">
          <motion.span
            initial={false}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.45, delay: i * 0.13 }}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs ${
              i === bootcamp.curriculum.length - 1
                ? 'border-accent bg-accent text-ink'
                : 'border-line bg-raised/50 text-bright'
            }`}
          >
            <span className="mr-1.5 text-[10px] opacity-60">{String(i + 1).padStart(2, '0')}</span>
            {c}
          </motion.span>
          {i < bootcamp.curriculum.length - 1 && (
            <motion.span
              aria-hidden
              className="mx-1 block h-px w-5 origin-left bg-accent"
              initial={false}
              animate={{ scaleX: show ? 1 : 0 }}
              transition={{ duration: 0.3, delay: i * 0.13 + 0.12 }}
            />
          )}
        </li>
      ))}
    </ol>
  )
}

export default function Teaching() {
  return (
    <section id="teaching" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow="Teaching & writing"
          title={
            <>
              I learn it, then I <Em>pass it on.</Em>
            </>
          }
          intro="A bootcamp in Abu Dhabi, an open roadmap for Arabic speakers, and essays on the craft."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {/* bootcamp */}
          <Reveal className="lg:col-span-2">
            <Spotlight className="h-full p-7 sm:p-10">
              <div className="eyebrow mb-3">MAF Bootcamp · On-site · Abu Dhabi</div>
              <h3 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-bright sm:text-4xl">
                {bootcamp.headline}
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-body">{bootcamp.description}</p>
              <div className="mt-7">
                <Curriculum />
              </div>
              <a href={`mailto:${profile.email}?subject=MAF%20Bootcamp`} className="btn-primary mt-8">
                <GraduationCap size={16} /> Ask me about the next cohort <ArrowUpRight size={16} />
              </a>
            </Spotlight>
          </Reveal>

          {/* roadmap */}
          <Reveal delay={0.08}>
            <a
              href="https://github.com/Muhammadatef/Data-Engineering-Roadmap-For-Arabic-Speaker"
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <Spotlight className="flex h-full flex-col p-7 transition-colors group-hover:border-accent/50">
                <div className="eyebrow mb-3">Open source · Community</div>
                <div className="flex items-baseline gap-2 font-display text-6xl font-semibold tracking-tight text-bright">
                  132 <Star size={26} className="fill-accent text-accent" />
                </div>
                <h3 className="mt-3 font-display text-xl font-medium text-bright">
                  Data Engineering Roadmap for Arabic Speakers
                </h3>
                <p dir="rtl" lang="ar" className="mt-2 text-lg text-accent">
                  خارطة طريق هندسة البيانات
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                  The Arabic-first curriculum that became the backbone of the bootcamp.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                  Open the roadmap <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Spotlight>
            </a>
          </Reveal>
        </div>

        {/* writing + credentials */}
        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div id="writing">
            <Reveal className="mb-5 flex items-end justify-between">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-bright">Writing</h3>
              <a
                href={profile.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-accent"
              >
                Medium <ArrowUpRight size={14} />
              </a>
            </Reveal>
            <ul>
              {articles.map((a, i) => (
                <Reveal key={a.url} delay={0.04 * i} y={14}>
                  <li className="border-t border-line last:border-b">
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 py-4 transition-[padding] duration-300 hover:pl-2"
                    >
                      <span className="mt-1 w-28 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        {a.tag}
                        <span className="mt-0.5 block text-muted">{a.year}</span>
                      </span>
                      <span className="flex-1 leading-snug text-bright">{a.title}</span>
                      <ArrowUpRight
                        size={16}
                        className="mt-0.5 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div id="credentials">
            <Reveal className="mb-5">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-bright">Credentials</h3>
            </Reveal>
            <ul>
              {education.concat(certifications).map((c, i) => (
                <Reveal key={c.name} delay={0.025 * i} y={10}>
                  <li className="flex items-baseline justify-between gap-4 border-t border-line py-3 last:border-b">
                    <span className={`leading-snug ${i < education.length ? 'font-medium text-bright' : 'text-bright'}`}>
                      {i < education.length && <GraduationCap size={14} className="mr-2 inline -translate-y-px text-accent" />}
                      {c.name}
                    </span>
                    <span className="shrink-0 text-right font-mono text-[11px] text-muted">{c.org}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
