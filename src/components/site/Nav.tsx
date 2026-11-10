'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '@/data/profile'
import ThemeToggle from '../ThemeToggle'

export const sections = [
  { id: 'impact', label: 'Impact' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'top' ? '' : e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['top'].concat(sections.map((s) => s.id)).forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-line/70 bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-flow" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-flow" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-bright">
              MAF<span className="text-accent">.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative rounded-full px-3.5 py-2 text-sm transition ${
                  active === s.id ? 'text-bright' : 'text-muted hover:text-bright'
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-surface"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-accent/50 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-ink sm:block"
            >
              Résumé
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-lg border border-line p-2 text-bright lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-xl lg:hidden"
              aria-label="Sections"
            >
              <div className="container-x flex flex-col py-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="border-b border-line/50 py-3.5 font-display text-xl text-bright last:border-0"
                  >
                    {s.label}
                  </a>
                ))}
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 font-display text-xl text-accent sm:hidden"
                >
                  Résumé
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
