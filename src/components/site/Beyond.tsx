'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Play, Square } from 'lucide-react'
import { articles, profile } from '@/data/profile'
import { Em, Reveal, SectionHeading, Spotlight } from './ui'

/* ------------------------------------------------------------------ */
/* Piano — a playable two-octave keyboard (Web Audio, no samples)      */
/* ------------------------------------------------------------------ */

const WHITE = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84] // C4 … C6
// black key → index of the white key it sits after
const BLACK: { midi: number; after: number }[] = [
  { midi: 61, after: 0 }, { midi: 63, after: 1 }, { midi: 66, after: 3 }, { midi: 68, after: 4 }, { midi: 70, after: 5 },
  { midi: 73, after: 7 }, { midi: 75, after: 8 }, { midi: 78, after: 10 }, { midi: 80, after: 11 }, { midi: 82, after: 12 },
]
const KEYMAP: Record<string, number> = {
  a: 60, w: 61, s: 62, e: 63, d: 64, f: 65, t: 66, g: 67, y: 68, h: 69, u: 70, j: 71, k: 72, o: 73, l: 74, p: 75,
}
// Opening of Chopin's Nocturne Op. 9 No. 2 — [midi, beats]
const PHRASE: [number, number][] = [
  [70, 1], [79, 3], [77, 1], [79, 1], [77, 1], [75, 3], [70, 1], [79, 2], [72, 1], [84, 2], [79, 1], [82, 2], [80, 1], [79, 3],
]

function Piano() {
  const ctxRef = useRef<AudioContext | null>(null)
  const timers = useRef<number[]>([])
  const [down, setDown] = useState<Record<number, boolean>>({})
  const [playing, setPlaying] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const inView = useInView(boxRef)

  const tone = useCallback((midi: number, length = 1.4) => {
    try {
      // One AudioContext for the whole page, kept on window. Browsers cap how many
      // a page may open (about six), so creating one per mount eventually goes silent.
      const w = window as any
      if (!w.__mafAudio || w.__mafAudio.state === 'closed') {
        const AC = window.AudioContext || w.webkitAudioContext
        w.__mafAudio = new AC()
      }
      const ctx: AudioContext = w.__mafAudio
      ctxRef.current = ctx
      // 'suspended' (autoplay policy, tab switch) or Safari's 'interrupted'
      if (ctx.state !== 'running') ctx.resume()
      const f = 440 * Math.pow(2, (midi - 69) / 12)
      const now = ctx.currentTime
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + length)
      gain.connect(ctx.destination)
      const partials: [OscillatorType, number, number][] = [['triangle', 1, 1], ['sine', 2, 0.28], ['sine', 3, 0.08]]
      partials.forEach(([type, mult, vol]) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = type
        o.frequency.value = f * mult
        g.gain.value = vol
        o.connect(g)
        g.connect(gain)
        o.start(now)
        o.stop(now + length + 0.05)
      })
    } catch {
      /* audio unavailable — keys still animate */
    }
  }, [])

  const press = useCallback(
    (midi: number, ms = 220) => {
      tone(midi)
      setDown((d) => ({ ...d, [midi]: true }))
      window.setTimeout(() => setDown((d) => ({ ...d, [midi]: false })), ms)
    },
    [tone]
  )

  const stop = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setPlaying(false)
  }, [])

  const playPhrase = () => {
    if (playing) return stop()
    setPlaying(true)
    const beat = 300
    let at = 0
    PHRASE.forEach(([midi, beats]) => {
      timers.current.push(window.setTimeout(() => press(midi, beats * beat * 0.85), at))
      at += beats * beat
    })
    timers.current.push(window.setTimeout(() => setPlaying(false), at + 200))
  }

  // computer keyboard plays too, while the piano is on screen
  useEffect(() => {
    if (!inView) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      const midi = KEYMAP[e.key.toLowerCase()]
      if (midi) press(midi)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inView, press])

  useEffect(() => stop, [stop])

  const whiteW = 100 / WHITE.length

  return (
    <div ref={boxRef}>
      <div className="relative h-36 select-none overflow-hidden rounded-xl border border-line bg-raised p-1.5 sm:h-44">
        <div className="relative flex h-full gap-[3px]">
          {WHITE.map((m) => (
            <button
              key={m}
              onPointerDown={() => press(m)}
              aria-label={`Piano key ${m}`}
              className={`h-full flex-1 rounded-b-md border border-black/10 transition-all duration-100 ${
                down[m] ? 'translate-y-[3px] bg-accent' : 'bg-[#f6f1e6] hover:bg-white'
              }`}
            />
          ))}
          {BLACK.map((b) => (
            <button
              key={b.midi}
              onPointerDown={() => press(b.midi)}
              aria-label={`Piano key ${b.midi}`}
              style={{ left: `calc(${(b.after + 1) * whiteW}% - ${whiteW * 0.3}%)`, width: `${whiteW * 0.6}%` }}
              className={`absolute top-0 h-[60%] rounded-b-md transition-all duration-100 ${
                down[b.midi] ? 'translate-y-[2px] bg-accent' : 'bg-[#0b1224] hover:bg-[#1a2647]'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={playPhrase} className="btn-ghost !px-4 !py-2 text-xs">
          {playing ? <Square size={12} /> : <Play size={12} />}
          {playing ? 'Stop' : 'Play a Chopin phrase'}
        </button>
        <span className="font-mono text-[11px] text-muted">
          click the keys, or type <span className="text-bright">A S D F G H J K</span>
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Football — a build-up that ends in a shot, with its xG              */
/* ------------------------------------------------------------------ */

const MOVE = [
  [52, 150], [96, 96], [150, 132], [196, 70], [246, 112], [268, 86], [306, 100],
] as const

function Pitch() {
  const reduce = useReducedMotion()
  const d = MOVE.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
  // keyframe times follow distance covered, so the ball stays on the tip of the line
  const dist = MOVE.map((p, i) => (i === 0 ? 0 : Math.hypot(p[0] - MOVE[i - 1][0], p[1] - MOVE[i - 1][1])))
  const total = dist.reduce((a, b) => a + b, 0)
  let run = 0
  const times = dist.map((seg) => {
    run += seg
    return run / total
  })
  const loop = { duration: 5.5, repeat: Infinity, repeatDelay: 1.4, ease: 'linear' as const }

  return (
    <svg viewBox="0 0 320 200" className="w-full rounded-xl border border-line bg-raised/50" role="img" aria-label="Animated football pitch showing a passing move that ends with a shot on goal">
      <g fill="none" stroke="rgb(var(--color-line))" strokeWidth="1.2">
        <rect x="6" y="6" width="308" height="188" rx="4" />
        <line x1="160" y1="6" x2="160" y2="194" />
        <circle cx="160" cy="100" r="26" />
        <rect x="262" y="48" width="52" height="104" />
        <rect x="292" y="74" width="22" height="52" />
        <rect x="6" y="48" width="52" height="104" />
        <rect x="6" y="74" width="22" height="52" />
        <rect x="314" y="88" width="4" height="24" stroke="rgb(var(--color-accent))" />
      </g>
      {/* opposition */}
      {[[120, 60], [178, 118], [222, 150], [232, 62], [282, 122]].map((p) => (
        <circle key={p.join()} cx={p[0]} cy={p[1]} r="4.5" fill="rgb(var(--color-muted) / 0.45)" />
      ))}
      {/* the move */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgb(var(--color-accent))"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={reduce ? undefined : { pathLength: [0, 1] }}
        transition={loop}
      />
      {MOVE.slice(0, -1).map((p, i) => (
        <motion.circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r="5.5"
          fill="rgb(var(--color-surface))"
          stroke="rgb(var(--color-accent))"
          strokeWidth="1.6"
          animate={reduce ? undefined : { scale: [1, 1, 1.5, 1, 1] }}
          transition={{ ...loop, times: [0, Math.max(times[i] - 0.03, 0), times[i], Math.min(times[i] + 0.08, 1), 1] }}
          style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
        />
      ))}
      {!reduce && (
        <motion.circle
          r="3.6"
          fill="rgb(var(--color-bright))"
          animate={{ cx: MOVE.map((p) => p[0]), cy: MOVE.map((p) => p[1]) }}
          transition={{ ...loop, times }}
        />
      )}
      <motion.g
        animate={reduce ? undefined : { opacity: [0, 0, 1, 1] }}
        transition={{ ...loop, times: [0, 0.86, 0.96, 1] }}
      >
        <rect x="226" y="20" width="62" height="20" rx="10" fill="rgb(var(--color-accent))" />
        <text x="257" y="34" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="rgb(var(--color-ink))" style={{ fontFamily: 'var(--font-mono)' }}>
          xG 0.41
        </text>
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Meditation — breathe with the circle                                */
/* ------------------------------------------------------------------ */

const BREATH = [
  { label: 'Breathe in', seconds: 4, scale: 1 },
  { label: 'Hold', seconds: 2, scale: 1 },
  { label: 'Breathe out', seconds: 6, scale: 0.58 },
]

function Breath() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const id = setTimeout(() => setPhase((p) => (p + 1) % BREATH.length), BREATH[phase].seconds * 1000)
    return () => clearTimeout(id)
  }, [phase, inView, reduce])

  const b = BREATH[phase]
  return (
    <div ref={ref} className="relative flex h-44 items-center justify-center">
      {[1, 0.78, 0.56].map((ring, i) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-flow/40"
          style={{ width: 168 * ring, height: 168 * ring, background: i === 2 ? 'rgb(var(--color-flow) / 0.14)' : undefined }}
          animate={{ scale: reduce ? 1 : b.scale }}
          transition={{ duration: b.seconds, ease: 'easeInOut', delay: i * 0.08 }}
        />
      ))}
      <AnimatePresence mode="wait">
        <motion.span
          key={b.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative font-serif text-xl italic text-bright"
        >
          {reduce ? 'Breathe' : b.label}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Anime — Kakashi hides what matters                                  */
/* ------------------------------------------------------------------ */

const SECRETS = [
  { k: 'email', v: 'sara.k@acme.ae' },
  { k: 'api_key', v: 'sk-live-9f2c41ab7e' },
  { k: 'iban', v: 'AE07 0331 2345 6789' },
  { k: 'emirates_id', v: '784-1990-1234567-1' },
]

function Masking() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [masked, setMasked] = useState(false)

  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setMasked((m) => !m), 2600)
    return () => clearInterval(id)
  }, [inView, reduce])

  const hide = masked || !!reduce
  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border border-line bg-raised/50 p-4 font-mono text-[12px] leading-7">
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted">
        <span>customers.yaml</span>
        <span className={hide ? 'text-flow' : 'text-accent'}>{hide ? '● safe for agents' : '● raw'}</span>
      </div>
      {SECRETS.map((s, i) => (
        <div key={s.k} className="flex gap-2 whitespace-nowrap">
          <span className="text-muted">{s.k}:</span>
          <span className="relative">
            <motion.span
              className="text-bright"
              animate={{ opacity: hide ? 0 : 1 }}
              transition={{ duration: 0.25, delay: i * 0.12 }}
            >
              {s.v}
            </motion.span>
            <motion.span
              aria-hidden
              className="absolute inset-y-[7px] left-0 right-0 origin-left rounded-sm bg-accent"
              animate={{ scaleX: hide ? 1 : 0 }}
              transition={{ duration: 0.35, delay: i * 0.12, ease: 'easeInOut' }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* AI engineering — the agent loop                                     */
/* ------------------------------------------------------------------ */

const LOOP = ['Observe', 'Plan', 'Act', 'Verify']

function AgentLoop() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % LOOP.length), 1300)
    return () => clearInterval(id)
  }, [inView, reduce])

  const R = 62
  return (
    <div ref={ref} className="relative mx-auto h-44 w-44">
      <svg viewBox="-90 -90 180 180" className="absolute inset-0" aria-hidden>
        <circle r={R} fill="none" stroke="rgb(var(--color-line))" strokeDasharray="3 6" />
        <motion.circle
          r="5"
          fill="rgb(var(--color-flow))"
          animate={{
            cx: R * Math.cos((i / LOOP.length) * Math.PI * 2 - Math.PI / 2),
            cy: R * Math.sin((i / LOOP.length) * Math.PI * 2 - Math.PI / 2),
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        />
      </svg>
      {LOOP.map((label, n) => {
        const a = (n / LOOP.length) * Math.PI * 2 - Math.PI / 2
        return (
          <span
            key={label}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors duration-300 ${
              n === i ? 'border-accent bg-accent text-ink' : 'border-line bg-surface text-muted'
            }`}
            style={{ left: `${50 + (R / 1.8) * Math.cos(a)}%`, top: `${50 + (R / 1.8) * Math.sin(a)}%` }}
          >
            {label}
          </span>
        )
      })}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-lg italic text-bright">
        agent
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Reading — a shelf that breathes                                     */
/* ------------------------------------------------------------------ */

const SPINES = [
  { h: 78, w: 16, c: 'bg-accent/80' }, { h: 92, w: 22, c: 'bg-flow/60' }, { h: 70, w: 14, c: 'bg-bright/70' },
  { h: 88, w: 18, c: 'bg-accent/50' }, { h: 100, w: 24, c: 'bg-muted/60' }, { h: 74, w: 15, c: 'bg-flow/80' },
  { h: 94, w: 20, c: 'bg-bright/40' }, { h: 82, w: 17, c: 'bg-accent/70' }, { h: 68, w: 13, c: 'bg-muted/40' },
  { h: 96, w: 21, c: 'bg-flow/50' },
]

function Shelf() {
  return (
    <div className="flex h-28 items-end gap-1.5 border-b-2 border-line px-1">
      {SPINES.map((s, i) => (
        <motion.div
          key={i}
          className={`origin-bottom rounded-t-sm ${s.c}`}
          style={{ height: `${s.h}%`, width: s.w }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 160, damping: 16, delay: i * 0.05 }}
        />
      ))}
      <motion.div
        className="mb-0 ml-1 h-4 w-20 origin-bottom-left rounded-sm bg-accent/40"
        initial={{ rotate: 0 }}
        whileInView={{ rotate: -68 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 80, damping: 9, delay: 0.7 }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Tile({
  label,
  title,
  children,
  text,
  className = '',
  delay = 0,
  footer,
}: {
  label: string
  title: string
  children: React.ReactNode
  text: React.ReactNode
  className?: string
  delay?: number
  footer?: React.ReactNode
}) {
  return (
    <Reveal className={className} delay={delay}>
      <Spotlight className="flex h-full min-w-0 flex-col p-6 sm:p-7">
        <div className="eyebrow mb-2">{label}</div>
        <h3 className="mb-5 font-display text-2xl font-semibold tracking-tight text-bright">{title}</h3>
        <div className="mb-5 flex flex-1 flex-col justify-center">{children}</div>
        <p className="text-sm leading-relaxed text-body">{text}</p>
        {footer}
      </Spotlight>
    </Reveal>
  )
}

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1 text-sm text-accent underline-offset-4 hover:underline"
    >
      {children} <ArrowUpRight size={14} />
    </a>
  )
}

export default function Beyond() {
  const meditationEssay = (articles.filter((x) => x.url.indexOf('meditation') !== -1)[0] || articles[0]).url
  const [quote, author] = profile.favoriteQuote.split(' — ')
  return (
    <section id="beyond" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Beyond the pipeline"
          title={
            <>
              What keeps the <Em>engineer</Em> human.
            </>
          }
          intro="Piano, football, anime, books and a daily meditation practice. Everything in this section is live. Go on, play it."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          <Tile
            className="md:col-span-4"
            label="Piano"
            title="Slowly, toward Chopin."
            text="I practise on a Roland FP-10, slowly working my way toward Chopin and exploring cinema music. The keyboard below is real. Try it."
          >
            <Piano />
          </Tile>

          <Tile
            className="md:col-span-2"
            delay={0.08}
            label="Meditation"
            title="Stillness, daily."
            text="A daily practice. I wrote about how it made me a better person and a better data engineer."
            footer={<MoreLink href={meditationEssay}>Read the essay</MoreLink>}
          >
            <Breath />
          </Tile>

          <Tile
            className="md:col-span-3"
            label="Football analysis"
            title="Arsenal, through the data."
            footer={<MoreLink href="https://github.com/Muhammadatef/gunners-analysis">GunnersAnalysis on GitHub</MoreLink>}
            text="I watch Arsenal every weekend, then I measure it. GunnersAnalysis wakes up 30 minutes after full time, ingests ~1,400 events and draws the pass networks and shot maps for me."
          >
            <Pitch />
          </Tile>

          <Tile
            className="md:col-span-3"
            delay={0.08}
            label="Anime"
            title="Hide what matters."
            text="A Naruto fan. My open-source privacy tool is named Kakashi, after the Copy Ninja who keeps his face covered. It does the same for your secrets."
            footer={<MoreLink href="https://github.com/Muhammadatef/kakashi">Kakashi on GitHub</MoreLink>}
          >
            <Masking />
          </Tile>

          <Tile
            className="md:col-span-2"
            label="AI engineering"
            title="Agents that check themselves."
            text="LangGraph, DSPy and RAG. I like agents built so they cannot invent an answer: observe, plan, act, verify."
          >
            <AgentLoop />
          </Tile>

          <Tile
            className="md:col-span-4"
            delay={0.08}
            label="Reading & writing"
            title="A why-first learner."
            text={
              <>
                <span className="font-serif text-lg italic leading-snug text-bright">“{quote}”</span>
                <span className="mt-1 block font-mono text-[11px] text-muted">— {author}</span>
              </>
            }
            footer={<MoreLink href={profile.medium}>My writing on Medium, in English and Arabic</MoreLink>}
          >
            <Shelf />
          </Tile>
        </div>
      </div>
    </section>
  )
}
